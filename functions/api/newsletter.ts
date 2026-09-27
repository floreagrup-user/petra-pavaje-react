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
