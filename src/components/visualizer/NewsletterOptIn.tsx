import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Loader2, Mail } from 'lucide-react'
import { CONSENT_TEXTS } from './consent-texts'

interface Props {
  getToken: () => Promise<string>
  // True once an image has been generated: the moment the client is most
  // taken with the idea, so the invitation speaks to it.
  hasResult: boolean
}

const ERRORS: Record<string, string> = {
  'bad-email': 'Adresa de email nu pare corectă. Verifică să aibă forma nume@exemplu.ro.',
  'consent-required': 'Bifează acordul pentru newsletter, apoi încearcă din nou.',
  'verification-failed': 'Nu am putut confirma că ești o persoană reală. Reîncarcă pagina și încearcă din nou.',
}
const GENERIC = 'Nu am putut face abonarea acum. Încearcă din nou peste câteva momente.'

// Optional invitation to the newsletter. It never gates the visualizer:
// the images are the same with or without it, and the box starts unticked.
export function NewsletterOptIn({ getToken, hasResult }: Props) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (busy || !consent) return
    setBusy(true)
    setError(null)
    try {
      const turnstileToken = await Promise.race([getToken(), new Promise<string>((r) => setTimeout(() => r(''), 15_000))])
      const res = await fetch('/api/visualizer/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consentNewsletter: true, turnstileToken }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(ERRORS[data.error] ?? GENERIC)
        return
      }
      setDone(true)
    } catch {
      setError(GENERIC)
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div role="status" className="flex gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900">
        <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />
        <p>
          <strong>Mulțumim, ești abonat!</strong> Te așteptăm cu idei și oferte pe <span className="break-all">{email}</span>. Te poți dezabona
          oricând din linkul din fiecare mesaj.
        </p>
      </div>
    )
  }

  return (
    <section aria-labelledby="viz-news-title" className="rounded-lg border border-brand-200 bg-brand-50 p-4 text-sm text-charcoal-800">
      <h3 id="viz-news-title" className="mb-1 flex items-center gap-2 font-semibold text-charcoal-900">
        <Mail className="w-4 h-4 shrink-0 text-brand-700" aria-hidden="true" />
        {hasResult ? 'Îți place cum arată? Mai avem multe idei pentru curtea ta' : 'Idei pentru curtea ta, direct în inbox'}
      </h3>
      <p className="mb-3">
        Abonează-te la newsletterul Petra Pavaje și primești inspirație pentru amenajare: proiecte realizate, combinații de culori și
        formate care arată bine și oferte la pavaje. Doar lucruri utile, fără spam.
      </p>

      <form onSubmit={submit} className="space-y-3" noValidate>
        <div>
          <label htmlFor="viz-news-email" className="mb-1 block font-medium text-charcoal-900">
            Adresa de email
          </label>
          <input
            id="viz-news-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error === ERRORS['bad-email']}
            aria-describedby={error ? 'viz-news-error' : undefined}
            className="w-full min-w-0 rounded-md border border-charcoal-400 bg-white px-3 py-2 text-charcoal-900 focus:border-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 aria-[invalid=true]:border-red-600"
          />
        </div>
        <label className="flex items-start gap-3">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 w-5 h-5 shrink-0 accent-brand-600" />
          <span>
            {CONSENT_TEXTS.newsletter} Detalii în{' '}
            <Link to="/confidentialitate" target="_blank" className="text-brand-700 underline underline-offset-2">
              Politica de confidențialitate
            </Link>
            .
          </span>
        </label>
        <button type="submit" disabled={!consent || !email.trim()} aria-busy={busy} className="btn-primary w-full gap-2 disabled:opacity-50 disabled:pointer-events-none">
          {busy && <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />}
          {busy ? 'Se face abonarea' : 'Da, vreau idei și oferte'}
        </button>
      </form>

      {error && (
        <p id="viz-news-error" role="alert" className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </p>
      )}
    </section>
  )
}
