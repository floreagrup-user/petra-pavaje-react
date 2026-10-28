import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ShieldCheck, Sparkles, X } from 'lucide-react'
import { CONSENT_TEXTS, DAILY_LIMIT, GLOBAL_DAILY_CAP } from './consent-texts'

interface Props {
  open: boolean
  onCancel: () => void
  onAccept: () => void
}

// Shown when the client asks for the first image: the rules (2 images per
// day, no account, 200 for the whole site), what happens to the data, the
// warnings, and the two consents. Native <dialog>
// gives the focus trap, Escape to close and the inert background.
export function FirstImageDialog({ open, onCancel, onAccept }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [photo, setPhoto] = useState(false)
  const [age, setAge] = useState(false)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault()
        onCancel()
      }}
      aria-labelledby="viz-dialog-title"
      className="m-auto w-[min(640px,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl bg-white p-0 text-charcoal-800 shadow-xl backdrop:bg-black/60"
    >
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-charcoal-200 bg-white px-5 py-4 md:px-6">
        <h2 id="viz-dialog-title" className="heading-h3 text-charcoal-900">
          Înainte de prima imagine
        </h2>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Închide"
          className="-mr-2 rounded-md p-2 text-charcoal-600 hover:bg-charcoal-100 active:bg-charcoal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <div className="space-y-5 px-5 py-5 text-sm md:px-6">
        <section aria-labelledby="viz-dialog-limits">
          <h3 id="viz-dialog-limits" className="mb-2 font-semibold text-charcoal-900">
            Câte imagini poți genera
          </h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Maximum {DAILY_LIMIT} imagini pe zi</strong>, gratuit, fără cont și fără să ne lași adresa de email. Numărătoarea
              pornește din nou la ora 00:00, ora României.
            </li>
            <li>
              Pe tot site-ul se pot genera cel mult {GLOBAL_DAILY_CAP} de imagini pe zi. Dacă limita e atinsă, poți reveni a doua zi.
            </li>
          </ul>
        </section>

        <section aria-labelledby="viz-dialog-data">
          <h3 id="viz-dialog-data" className="mb-2 flex items-center gap-2 font-semibold text-charcoal-900">
            <ShieldCheck className="w-4 h-4 shrink-0 text-brand-600" aria-hidden="true" />
            Ce se întâmplă cu datele tale
          </h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Fotografia, cu zona marcată acoperită, este trimisă unui furnizor extern de servicii de inteligență artificială, doar pentru
              a genera imaginea. Furnizorul poate prelucra datele în afara Spațiului Economic European, cu garanțiile prevăzute de GDPR.
              Petra Pavaje nu salvează fotografia.
            </li>
            <li>Imaginea generată rămâne doar în browserul tău. Descarc-o dacă vrei s-o păstrezi.</li>
            <li>Pentru limita zilnică păstrăm doar o amprentă criptată a adresei IP, timp de 2 zile, nu adresa în sine.</li>
            <li>Păstrăm dovada acordului tău (data și versiunea textului acceptat) timp de 3 ani.</li>
            <li>Îți poți retrage acordul oricând, fără să afecteze imaginile generate până atunci.</li>
          </ul>
        </section>

        <section aria-labelledby="viz-dialog-warn" className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-900">
          <h3 id="viz-dialog-warn" className="mb-1 flex items-center gap-2 font-semibold">
            <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
            Atenție
          </h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>Nu încărca fotografii în care se văd persoane, numere de înmatriculare sau documente.</li>
            <li>
              Imaginea este generată automat cu inteligență artificială și este orientativă. Modelul, culoarea și dimensiunile reale pot
              diferi. Obiectele din zona marcată sunt redesenate.
            </li>
            <li>Imaginea descărcată poartă mențiunea că este generată cu AI.</li>
          </ul>
        </section>

        <div className="space-y-3">
          <label className="flex items-start gap-3 text-charcoal-800">
            <input
              type="checkbox"
              checked={photo}
              onChange={(e) => setPhoto(e.target.checked)}
              className="mt-0.5 w-5 h-5 shrink-0 accent-brand-600"
            />
            <span>{CONSENT_TEXTS.photo}</span>
          </label>
          <label className="flex items-start gap-3 text-charcoal-800">
            <input type="checkbox" checked={age} onChange={(e) => setAge(e.target.checked)} className="mt-0.5 w-5 h-5 shrink-0 accent-brand-600" />
            <span>{CONSENT_TEXTS.age}</span>
          </label>
          <p className="text-xs text-charcoal-600">
            Detalii, drepturile tale și datele de contact în{' '}
            <Link to="/confidentialitate" target="_blank" className="text-brand-700 underline underline-offset-2">
              Politica de confidențialitate
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-charcoal-200 bg-white px-5 py-4 sm:flex-row sm:justify-end md:px-6">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Renunț
        </button>
        <button
          type="button"
          onClick={onAccept}
          disabled={!photo || !age}
          className="btn-primary gap-2 disabled:opacity-50 disabled:pointer-events-none"
        >
          <Sparkles className="w-5 h-5" aria-hidden="true" />
          Accept și generez
        </button>
      </div>
    </dialog>
  )
}
