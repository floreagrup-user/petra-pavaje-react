// Monthly newsletter subscriber report.
// Runs on a Cron Trigger (see wrangler.toml: 1st of every month, 06:00 UTC),
// reports the PREVIOUS calendar month's new subscribers to marketing@petrapavaje.ro.
//
// Sends via the Amazon SES v2 HTTPS API, signed with a hand-rolled AWS
// SigV4 signature (same approach as functions/api/contact.ts in the main
// Pages project - Workers can't use the AWS SDK's Node-only dependencies).

export interface Env {
  NEWSLETTER_DB: D1Database
  AWS_ACCESS_KEY_ID: string
  AWS_SECRET_ACCESS_KEY: string
  AWS_SES_REGION: string
}

async function hmac(key: ArrayBuffer | Uint8Array, data: string): Promise<ArrayBuffer> {
  const cryptoKey = await crypto.subtle.importKey('raw', key as BufferSource, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(data))
}

async function sha256Hex(data: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data))
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function hex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function signSesRequest(opts: { accessKeyId: string; secretAccessKey: string; region: string; body: string }) {
  const { accessKeyId, secretAccessKey, region, body } = opts
  const service = 'ses'
  const host = `email.${region}.amazonaws.com`
  const path = '/v2/email/outbound-emails'
  const now = new Date()
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '')
  const dateStamp = amzDate.slice(0, 8)

  const payloadHash = await sha256Hex(body)
  const canonicalHeaders = `content-type:application/json\nhost:${host}\nx-amz-date:${amzDate}\n`
  const signedHeaders = 'content-type;host;x-amz-date'
  const canonicalRequest = `POST\n${path}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`
  const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${credentialScope}\n${await sha256Hex(canonicalRequest)}`

  const kDate = await hmac(new TextEncoder().encode(`AWS4${secretAccessKey}`), dateStamp)
  const kRegion = await hmac(kDate, region)
  const kService = await hmac(kRegion, service)
  const kSigning = await hmac(kService, 'aws4_request')
  const signature = hex(await hmac(kSigning, stringToSign))

  const authorization = `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`

  return {
    url: `https://${host}${path}`,
    headers: { 'Content-Type': 'application/json', 'X-Amz-Date': amzDate, Authorization: authorization },
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)
}

const RO_MONTHS = [
  'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
  'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie',
]

async function sendReport(env: Env) {
  const now = new Date()
  // "now" is the 1st of the current month (per the cron schedule) - report on the month before it.
  const periodStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1))
  const periodEnd = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1))
  const monthLabel = `${RO_MONTHS[periodStart.getUTCMonth()]} ${periodStart.getUTCFullYear()}`

  const { results } = await env.NEWSLETTER_DB
    .prepare('SELECT email, created_at FROM subscribers WHERE created_at >= ? AND created_at < ? ORDER BY created_at ASC')
    .bind(periodStart.toISOString(), periodEnd.toISOString())
    .all()

  const subscribers = results as { email: string; created_at: string }[]

  const rowsHtml = subscribers.length
    ? subscribers.map((s) => `<tr><td>${escapeHtml(s.email)}</td><td>${escapeHtml(s.created_at)}</td></tr>`).join('')
    : '<tr><td colspan="2">Niciun abonat nou luna aceasta.</td></tr>'

  const html = `
    <h2>Raport abonați newsletter - ${monthLabel}</h2>
    <p><strong>${subscribers.length}</strong> abonați noi în această perioadă.</p>
    <table border="1" cellpadding="6" cellspacing="0">
      <tr><th>Email</th><th>Data înregistrării</th></tr>
      ${rowsHtml}
    </table>
  `

  const sesBody = JSON.stringify({
    FromEmailAddress: 'Petra Pavaje <no-reply@petrapavaje.ro>',
    Destination: { ToAddresses: ['marketing@petrapavaje.ro'] },
    Content: {
      Simple: {
        Subject: { Data: `Raport newsletter - ${monthLabel}`, Charset: 'UTF-8' },
        Body: { Html: { Data: html, Charset: 'UTF-8' } },
      },
    },
  })

  const region = env.AWS_SES_REGION || 'eu-central-1'
  const { url, headers } = await signSesRequest({
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region,
    body: sesBody,
  })

  const res = await fetch(url, { method: 'POST', headers, body: sesBody })
  if (!res.ok) {
    throw new Error(`SES send failed: ${res.status} ${await res.text()}`)
  }
}

export default {
  async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(sendReport(env))
  },
  // Manual trigger for testing: GET this Worker's URL directly.
  async fetch(_request: Request, env: Env) {
    try {
      await sendReport(env)
      return new Response('Report sent', { status: 200 })
    } catch (error) {
      return new Response(`Error: ${error}`, { status: 500 })
    }
  },
}
