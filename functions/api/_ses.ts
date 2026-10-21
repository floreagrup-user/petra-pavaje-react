// Signs and sends transactional email via the Amazon SES v2 HTTPS API.
// Cloudflare Workers can't open raw SMTP sockets, so SES is called over its
// REST API with a hand-rolled AWS SigV4 signature (Web Crypto only, no AWS
// SDK - the SDK's Node dependencies don't run in the Workers runtime).
// Shared by contact.ts and the visualizer's email confirmation.

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

export async function signSesRequest(opts: {
  accessKeyId: string
  secretAccessKey: string
  region: string
  body: string
}): Promise<{ url: string; headers: Record<string, string> }> {
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
    headers: {
      'Content-Type': 'application/json',
      'X-Amz-Date': amzDate,
      Authorization: authorization,
    },
  }
}

export interface SesEnv {
  AWS_SES_REGION?: string
  AWS_ACCESS_KEY_ID?: string
  AWS_SECRET_ACCESS_KEY?: string
}

export function sesConfigured(env: SesEnv): boolean {
  return Boolean(env.AWS_ACCESS_KEY_ID?.trim() && env.AWS_SECRET_ACCESS_KEY?.trim())
}

// Sends one message from contact@petrapavaje.ro. Returns false (and logs
// the SES answer) when SES refuses it.
export async function sendEmail(
  env: SesEnv,
  msg: { to: string; subject: string; html: string; text: string; replyTo?: string },
): Promise<boolean> {
  // Trimmed because a pasted secret can carry a trailing space or newline,
  // which breaks the SigV4 Authorization header (SES answers 403).
  const accessKeyId = env.AWS_ACCESS_KEY_ID?.trim()
  const secretAccessKey = env.AWS_SECRET_ACCESS_KEY?.trim()
  if (!accessKeyId || !secretAccessKey) return false

  const body = JSON.stringify({
    FromEmailAddress: 'Petra Pavaje <contact@petrapavaje.ro>',
    Destination: { ToAddresses: [msg.to] },
    ...(msg.replyTo ? { ReplyToAddresses: [msg.replyTo] } : {}),
    Content: {
      Simple: {
        Subject: { Data: msg.subject, Charset: 'UTF-8' },
        Body: { Html: { Data: msg.html, Charset: 'UTF-8' }, Text: { Data: msg.text, Charset: 'UTF-8' } },
      },
    },
  })
  const { url, headers } = await signSesRequest({ accessKeyId, secretAccessKey, region: env.AWS_SES_REGION || 'eu-central-1', body })
  const res = await fetch(url, { method: 'POST', headers, body })
  if (!res.ok) console.error('SES API error', res.status, (await res.text()).slice(0, 500))
  return res.ok
}
