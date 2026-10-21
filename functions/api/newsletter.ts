import { verifyTurnstile } from './_turnstile'
import { addToMailchimp, clearUnsubscribe } from './_newsletter'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function onRequestPost(context: any) {
  try {
    const body = await context.request.json()
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''

    if (!email || !EMAIL_RE.test(email)) {
      return new Response(
        JSON.stringify({ error: 'A valid email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { TURNSTILE_SECRET_KEY } = context.env
    if (TURNSTILE_SECRET_KEY) {
      const remoteIp = context.request.headers.get('CF-Connecting-IP') || undefined
      const humanVerified = await verifyTurnstile(body?.turnstileToken, TURNSTILE_SECRET_KEY, remoteIp)
      if (!humanVerified) {
        return new Response(
          JSON.stringify({ error: 'Verification failed' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        )
      }
    }

    const db = context.env.NEWSLETTER_DB
    if (!db) {
      console.error('NEWSLETTER_DB is not bound - subscription was not stored')
      return new Response(
        JSON.stringify({ error: 'Newsletter service not configured' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const result = await db
      .prepare('INSERT INTO subscribers (email, created_at, source) VALUES (?, ?, ?) ON CONFLICT(email) DO NOTHING')
      .bind(email, new Date().toISOString(), body?.source || 'footer')
      .run()

    const alreadySubscribed = (result.meta?.changes ?? 0) === 0
    // A new sign-up is a new consent, so an older unsubscribe no longer applies.
    if (!alreadySubscribed) await clearUnsubscribe(context.env, email)
    // Into the Mailchimp audience right away (also for an address already in
    // D1, in case it never made it there); after the response, so a slow
    // Mailchimp never delays the visitor. D1 stays the backup copy.
    const sync = addToMailchimp(context.env, email, body?.source || 'footer', context.request.headers.get('CF-Connecting-IP') || undefined)
      .catch((error) => console.error('Mailchimp sync error', error))
    if (typeof context.waitUntil === 'function') context.waitUntil(sync)
    else await sync

    return new Response(
      JSON.stringify({ success: true, alreadySubscribed }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Newsletter signup error', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
