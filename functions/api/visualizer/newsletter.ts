// Optional newsletter sign-up offered next to the paving visualizer. It is
// separate from the service: the visualizer works the same without it. The
// sign-up itself goes through the site's normal newsletter endpoint (D1 +
// Mailchimp, bot check included); this one only insists on the ticked box
// and files the proof of consent (version + hash of the wording shown).

import { onRequestPost as subscribe } from '../newsletter'
import { recordConsents } from './_consent'
import { hashValue } from './_quota'
import { json, normaliseEmail } from './_http'

export async function onRequestPost(context: any) {
  const { env, request } = context

  let body: any
  try {
    body = await request.json()
  } catch {
    return json({ error: 'bad-request' }, 400)
  }
  const email = normaliseEmail(body?.email)
  if (!email) return json({ error: 'bad-email' }, 400)
  if (body?.consentNewsletter !== true) return json({ error: 'consent-required' }, 400)

  const res: Response = await subscribe({
    ...context,
    request: new Request(request.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': request.headers.get('CF-Connecting-IP') || '' },
      body: JSON.stringify({ email, turnstileToken: body.turnstileToken, source: 'visualizer' }),
    }),
  })
  if (!res.ok) return json({ error: res.status === 403 ? 'verification-failed' : 'signup-failed' }, res.status === 403 ? 403 : 502)

  try {
    await recordConsents(env, `email:${await hashValue(env, 'email', email)}`, ['newsletter'])
  } catch (error) {
    console.error('Visualizer newsletter consent log error', error)
  }
  return json({ ok: true })
}
