// Protected export of newsletter subscribers as CSV.
// Access: GET /api/admin/subscribers?key=<NEWSLETTER_ADMIN_KEY>

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

  const { results } = await db
    .prepare('SELECT email, created_at, source FROM subscribers ORDER BY created_at DESC')
    .all()

  const rows = [['email', 'created_at', 'source']]
  for (const r of results as { email: string; created_at: string; source: string | null }[]) {
    rows.push([r.email, r.created_at, r.source || ''])
  }

  const csv = rows.map((row) => row.map(csvEscape).join(',')).join('\n')

  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="newsletter-subscribers.csv"',
    },
  })
}
