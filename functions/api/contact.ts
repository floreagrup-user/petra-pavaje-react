export async function onRequestPost(context: any) {
  try {
    const body = await context.request.json()
    const { name, email, phone, county, message, type, repEmail, repName } = body

    // Validate required fields
    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: 'Name and email are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Send email via Resend (or your preferred email service)
    const RESEND_API_KEY = context.env.RESEND_API_KEY
    let emailSent = false

    if (RESEND_API_KEY) {
      const recipient = repEmail || 'contact@petrapavaje.ro'
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Petra Pavaje <contact@petrapavaje.ro>',
          to: [recipient],
          reply_to: email,
          subject: type === 'quote'
            ? `Cerere Oferta - ${name}`
            : type === 'career'
            ? `Aplicație Carieră - ${name}`
            : `Mesaj de pe site - ${name}`,
          html: `
            <h2>Mesaj nou de pe PetraPavaje.ro</h2>
            <table>
              <tr><td><strong>Nume:</strong></td><td>${name}</td></tr>
              <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
              <tr><td><strong>Telefon:</strong></td><td>${phone || 'Nespecificat'}</td></tr>
              <tr><td><strong>Județ:</strong></td><td>${county || 'Nespecificat'}</td></tr>
              ${repName ? `<tr><td><strong>Reprezentant:</strong></td><td>${repName} (${repEmail})</td></tr>` : ''}
            </table>
            <h3>Mesaj:</h3>
            <p>${message || 'Niciun mesaj'}</p>
          `,
        }),
      })
      emailSent = resendResponse.ok
      if (!emailSent) {
        console.error('Resend API error', resendResponse.status, await resendResponse.text())
      }
    } else {
      console.error('RESEND_API_KEY is not configured - contact form message was not emailed')
    }

    return new Response(
      JSON.stringify({ success: true, emailSent, message: 'Message received' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
