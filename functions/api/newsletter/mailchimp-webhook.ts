// Mailchimp audience webhook: https://petrapavaje.ro/api/newsletter/mailchimp-webhook?key=<MAILCHIMP_WEBHOOK_SECRET>
// Mailchimp does not sign its webhooks, so the secret in the URL is what
// proves the call comes from our Mailchimp account. It sends a GET when the
// webhook is created (to check the URL) and form-encoded POSTs afterwards.
// Handled: unsubscribe, cleaned (address bounced), upemail (address changed).

import { forgetOldUnsubscribeEmails, recordUnsubscribe } from '../_newsletter'

function authorised(env: any, request: Request): boolean {
  const expected = env.MAILCHIMP_WEBHOOK_SECRET?.trim()
  const given = new URL(request.url).searchParams.get('key') || ''
  if (!expected || given.length !== expected.length) return false
  let diff = 0
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ given.charCodeAt(i)
  return diff === 0
}

export async function onRequestGet(context: any) {
  return new Response(authorised(context.env, context.request) ? 'ok' : 'forbidden', { status: authorised(context.env, context.request) ? 200 : 403 })
}

export async function onRequestPost(context: any) {
  const { env, request } = context
  if (!authorised(env, request)) return new Response('forbidden', { status: 403 })
  if (!env.NEWSLETTER_DB) return new Response('not configured', { status: 503 })

  try {
    const form = await request.formData()
    const type = String(form.get('type') || '')
    const listId = String(form.get('data[list_id]') || '')
    if (env.MAILCHIMP_AUDIENCE_ID && listId && listId !== env.MAILCHIMP_AUDIENCE_ID.trim()) return new Response('ignored')

    const email = String(form.get('data[email]') || '').trim().toLowerCase()
    if ((type === 'unsubscribe' || type === 'cleaned') && email) {
      await recordUnsubscribe(env, email, type === 'cleaned' ? 'adresa invalida (cleaned)' : `dezabonare Mailchimp${form.get('data[reason]') ? ` (${form.get('data[reason]')})` : ''}`)
    } else if (type === 'upemail') {
      const oldEmail = String(form.get('data[old_email]') || '').trim().toLowerCase()
      const newEmail = String(form.get('data[new_email]') || '').trim().toLowerCase()
      if (oldEmail && newEmail) {
        await env.NEWSLETTER_DB.prepare('UPDATE OR IGNORE subscribers SET email = ? WHERE email = ?').bind(newEmail, oldEmail).run()
      }
    }
    if (Math.random() < 0.2) await forgetOldUnsubscribeEmails(env.NEWSLETTER_DB)
    return new Response('ok')
  } catch (error) {
    console.error('Mailchimp webhook error', error)
    return new Response('error', { status: 500 })
  }
}
