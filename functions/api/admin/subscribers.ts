// Protected export of newsletter subscribers as CSV.
// Access: GET /api/admin/subscribers?key=<NEWSLETTER_ADMIN_KEY>
//   default: current subscribers
//   &status=unsubscribed: who unsubscribed in Mailchimp and when (reported
//            by its webhook); the address is shown for 30 days, then only
//            its hash remains
import { forgetOldUnsubscribeEmails } from '../_newsletter'

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`
  return value
}

export async function onRequestGet(context: any) {
  const url = new URL(context.request.url)
  const providedKey = url.searchParams.get('key') || context.request.headers.get('x-admin-key')
  const expectedKey = context.env.NEWSLETTER_ADMIN_KEY

  if (!expectedKey || providedKey !== expectedKey) {
    return new Response('Unauthorized', { status: 401 })
  }

  const db = context.env.NEWSLETTER_DB
  if (!db) {
    return new Response('Newsletter service not configured', { status: 502 })
  }

  const rows: string[][] = []
  let filename = 'newsletter-subscribers.csv'
  if (url.searchParams.get('status') === 'unsubscribed') {
    await forgetOldUnsubscribeEmails(db)
    const { results } = await db
      .prepare('SELECT email, email_hash, subscribed_at, source, unsubscribed_at, reason FROM newsletter_unsubscribes ORDER BY unsubscribed_at DESC')
      .all()
    rows.push(['email', 'email_hash', 'subscribed_at', 'source', 'unsubscribed_at', 'reason'])
    for (const r of results as any[]) {
      rows.push([r.email || '(ștearsă după 30 de zile)', r.email_hash, r.subscribed_at || '', r.source || '', r.unsubscribed_at, r.reason || ''])
    }
    filename = 'newsletter-unsubscribed.csv'
  } else {
    const { results } = await db.prepare('SELECT email, created_at, source FROM subscribers ORDER BY created_at DESC').all()
    rows.push(['email', 'created_at', 'source'])
    for (const r of results as { email: string; created_at: string; source: string | null }[]) {
      rows.push([r.email, r.created_at, r.source || ''])
    }
  }

  const csv = rows.map((row) => row.map(csvEscape).join(',')).join('\n')

  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
