// Signs and sends transactional email via the Amazon SES v2 HTTPS API.
// Cloudflare Pages Functions can't open raw SMTP sockets, so SES is called
// over its REST API with a hand-rolled AWS SigV4 signature (Web Crypto only,
// no AWS SDK — the SDK's Node dependencies don't run in the Workers runtime).

import { verifyTurnstile } from './_turnstile'

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

async function signSesRequest(opts: {
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

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)
}

export async function onRequestPost(context: any) {
  try {
    const body = await context.request.json()
    const { name, email, phone, county, message, type, repEmail, repName, turnstileToken } = body

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: 'Name and email are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SES_REGION, TURNSTILE_SECRET_KEY } = context.env

    if (TURNSTILE_SECRET_KEY) {
      const remoteIp = context.request.headers.get('CF-Connecting-IP') || undefined
      const humanVerified = await verifyTurnstile(turnstileToken, TURNSTILE_SECRET_KEY, remoteIp)
      if (!humanVerified) {
        return new Response(
          JSON.stringify({ error: 'Verification failed' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        )
      }
    }

    if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
      console.error('AWS SES credentials are not configured - contact form message was not emailed')
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const region = AWS_SES_REGION || 'eu-central-1'
    const recipient = repEmail || 'contact@petrapavaje.ro'
    const subject = type === 'quote'
      ? `Cerere Oferta - ${name}`
      : type === 'career'
      ? `Aplicație Carieră - ${name}`
      : `Mesaj de pe site - ${name}`

    const html = `
      <h2>Mesaj nou de pe PetraPavaje.ro</h2>
      <table>
        <tr><td><strong>Nume:</strong></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><strong>Telefon:</strong></td><td>${escapeHtml(phone || 'Nespecificat')}</td></tr>
        <tr><td><strong>Județ:</strong></td><td>${escapeHtml(county || 'Nespecificat')}</td></tr>
        ${repName ? `<tr><td><strong>Reprezentant:</strong></td><td>${escapeHtml(repName)} (${escapeHtml(repEmail)})</td></tr>` : ''}
      </table>
      <h3>Mesaj:</h3>
      <p>${escapeHtml(message || 'Niciun mesaj').replace(/\n/g, '<br>')}</p>
    `

    const sesBody = JSON.stringify({
      FromEmailAddress: 'Petra Pavaje <contact@petrapavaje.ro>',
      Destination: { ToAddresses: [recipient] },
      ReplyToAddresses: [email],
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: 'UTF-8' },
          Body: { Html: { Data: html, Charset: 'UTF-8' } },
        },
      },
    })

    const { url, headers } = await signSesRequest({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region,
      body: sesBody,
    })

    const sesResponse = await fetch(url, { method: 'POST', headers, body: sesBody })
    const emailSent = sesResponse.ok

    if (!emailSent) {
      console.error('SES API error', sesResponse.status, await sesResponse.text())
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, emailSent: true, message: 'Message received' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Contact form error', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
