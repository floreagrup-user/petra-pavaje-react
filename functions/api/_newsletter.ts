// Newsletter: Mailchimp is the list the newsletter is sent from, and the
// only place people unsubscribe (its link is in every campaign).
//
//   - sign-up on the site: the address is stored in D1 `subscribers` (kept
//     for the monthly report to marketing@) and added to the Mailchimp
//     audience straight away (addToMailchimp);
//   - unsubscribe in Mailchimp: its webhook calls
//     /api/newsletter/mailchimp-webhook, which removes the address from
//     `subscribers` and records it in `newsletter_unsubscribes`, so it is
//     never re-imported by mistake. The address is kept there 30 days, then
//     only a salted hash and the date remain.

const KEEP_EMAIL_DAYS = 30

const SCHEMA = `CREATE TABLE IF NOT EXISTS newsletter_unsubscribes (
  email_hash TEXT PRIMARY KEY,
  email TEXT,
  subscribed_at TEXT,
  source TEXT,
  unsubscribed_at TEXT NOT NULL,
  reason TEXT
)`

export interface NewsletterEnv {
  NEWSLETTER_DB?: any
  MAILCHIMP_API_KEY?: string
  MAILCHIMP_AUDIENCE_ID?: string
  MAILCHIMP_WEBHOOK_SECRET?: string
}

async function hex(algorithm: string, data: string): Promise<string> {
  const digest = await crypto.subtle.digest(algorithm, new TextEncoder().encode(data))
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function ensureUnsubscribeTable(db: any) {
  await db.prepare(SCHEMA).run()
}

function emailHash(email: string): Promise<string> {
  return hex('SHA-256', `petra-newsletter:${email}`)
}

// --- Mailchimp ---------------------------------------------------------------

export function mailchimpConfigured(env: NewsletterEnv): boolean {
  return Boolean(env.MAILCHIMP_API_KEY?.trim() && env.MAILCHIMP_AUDIENCE_ID?.trim())
}

async function mailchimp(env: NewsletterEnv, method: string, path: string, body?: unknown) {
  const key = env.MAILCHIMP_API_KEY!.trim()
  // The key ends in its data centre, e.g. "...-us21".
  const dc = key.split('-').pop()
  return fetch(`https://${dc}.api.mailchimp.com/3.0${path}`, {
    method,
    headers: { Authorization: `Basic ${btoa(`petra:${key}`)}`, 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
}

// Adds a new sign-up to the audience as subscribed, tagged with where it
// came from. Someone who once unsubscribed in Mailchimp cannot be switched
// back on by the API; they are set to "pending" instead, and Mailchimp
// emails them to confirm, which is also what the law expects for a re-opt-in.
export async function addToMailchimp(env: NewsletterEnv, email: string, source: string, ip?: string): Promise<boolean> {
  if (!mailchimpConfigured(env)) return false
  const audience = env.MAILCHIMP_AUDIENCE_ID!.trim()
  const member = `/lists/${audience}/members/${await hex('MD5', email)}`
  const res = await mailchimp(env, 'PUT', member, {
    email_address: email,
    status_if_new: 'subscribed',
    ...(ip ? { ip_signup: ip } : {}),
    timestamp_signup: new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00'),
  })
  if (!res.ok) {
    console.error('Mailchimp add member failed', res.status, (await res.text()).slice(0, 300))
    return false
  }
  const data: any = await res.json()
  if (data.status === 'unsubscribed' || data.status === 'cleaned') {
    const again = await mailchimp(env, 'PATCH', member, { status: 'pending' })
    if (!again.ok) console.error('Mailchimp re-opt-in failed', again.status, (await again.text()).slice(0, 300))
  }
  const tag = await mailchimp(env, 'POST', `${member}/tags`, { tags: [{ name: `site-${source}`.slice(0, 100), status: 'active' }] })
  if (!tag.ok) console.error('Mailchimp tag failed', tag.status)
  return true
}

// --- unsubscribe record ------------------------------------------------------

export async function recordUnsubscribe(env: NewsletterEnv, email: string, reason: string) {
  const db = env.NEWSLETTER_DB
  await ensureUnsubscribeTable(db)
  const row = await db.prepare('SELECT created_at, source FROM subscribers WHERE email = ?').bind(email).first()
  await db.batch([
    db
      .prepare(
        `INSERT INTO newsletter_unsubscribes (email_hash, email, subscribed_at, source, unsubscribed_at, reason) VALUES (?, ?, ?, ?, ?, ?)
         ON CONFLICT(email_hash) DO UPDATE SET email = excluded.email, subscribed_at = COALESCE(excluded.subscribed_at, subscribed_at),
           source = COALESCE(excluded.source, source), unsubscribed_at = excluded.unsubscribed_at, reason = excluded.reason`,
      )
      .bind(await emailHash(email), email, row?.created_at ?? null, row?.source ?? null, new Date().toISOString(), reason),
    db.prepare('DELETE FROM subscribers WHERE email = ?').bind(email),
  ])
}

// Someone who unsubscribed and signs up again gives a new consent: the old
// unsubscribe record no longer applies.
export async function clearUnsubscribe(env: NewsletterEnv, email: string) {
  const db = env.NEWSLETTER_DB
  await ensureUnsubscribeTable(db)
  await db.prepare('DELETE FROM newsletter_unsubscribes WHERE email_hash = ?').bind(await emailHash(email)).run()
}

export async function forgetOldUnsubscribeEmails(db: any) {
  await ensureUnsubscribeTable(db)
  const cutoff = new Date(Date.now() - KEEP_EMAIL_DAYS * 86_400_000).toISOString()
  await db.prepare('UPDATE newsletter_unsubscribes SET email = NULL WHERE email IS NOT NULL AND unsubscribed_at < ?').bind(cutoff).run()
}
