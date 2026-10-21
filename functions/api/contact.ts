// Contact and quote form: emails the message to Petra Pavaje through
// Amazon SES (signing lives in _ses.ts).

import { verifyTurnstile } from './_turnstile'
import { signSesRequest } from './_ses'

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

    const { AWS_SES_REGION, TURNSTILE_SECRET_KEY } = context.env
    // Trimmed because a pasted secret can carry a trailing space or newline,
    // which breaks the SigV4 Authorization header (SES answers 403).
    const AWS_ACCESS_KEY_ID = context.env.AWS_ACCESS_KEY_ID?.trim()
    const AWS_SECRET_ACCESS_KEY = context.env.AWS_SECRET_ACCESS_KEY?.trim()

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
