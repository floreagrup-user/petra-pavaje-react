// Shared Turnstile server-side verification. Files prefixed with `_` are
// not routed by Cloudflare Pages Functions, so this is safe to import from
// contact.ts and newsletter.ts without becoming its own endpoint.

export async function verifyTurnstile(token: string, secretKey: string, remoteIp?: string): Promise<boolean> {
  if (!token) return false

  const body = new URLSearchParams({ secret: secretKey, response: token })
  if (remoteIp) body.set('remoteip', remoteIp)

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (!res.ok) return false
  const data = (await res.json()) as { success: boolean }
  return data.success === true
}
