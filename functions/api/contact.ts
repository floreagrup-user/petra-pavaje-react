export async function onRequestPost(context: any) {
  try {
    const body = await context.request.json()
    const { name, email, phone, county, message, type } = body

    // Validate required fields
    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: 'Name and email are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Send email via Resend (or your preferred email service)
    const RESEND_API_KEY = context.env.RESEND_API_KEY

    if (RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Petra Pavaje <contact@petrapavaje.ro>',
          to: ['contact@petrapavaje.ro'],
          subject: type === 'quote'
            ? `Cerere Oferta - ${name}`
            : `Mesaj de pe site - ${name}`,
          html: `
            <h2>Mesaj nou de pe PetraPavaje.ro</h2>
            <table>
              <tr><td><strong>Nume:</strong></td><td>${name}</td></tr>
              <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
              <tr><td><strong>Telefon:</strong></td><td>${phone || 'Nespecificat'}</td></tr>
              <tr><td><strong>Judet:</strong></td><td>${county || 'Nespecificat'}</td></tr>
            </table>
            <h3>Mesaj:</h3>
            <p>${message || 'Niciun mesaj'}</p>
          `,
        }),
      })
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
