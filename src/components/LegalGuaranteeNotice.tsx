import { useEffect, useRef, useState } from 'react'
import { ExternalLink, X, ZoomIn } from 'lucide-react'

// EU harmonised notice on the legal guarantee of conformity (Implementing
// Regulation (EU) 2025/1960). Commission guidance for websites: a permanent
// "your legal guarantee rights" link that shows the full colour notice on the
// first click, legible, unedited and in its original file format, with a
// clickable link to the same Your Europe page as its QR code. The files are
// the official ones, unchanged: RO as PNG, EN only exists as PDF in the package.

export const LEGAL_GUARANTEE_URL_RO = 'https://europa.eu/youreurope/garanții'
export const LEGAL_GUARANTEE_URL_EN = 'https://europa.eu/youreurope/guarantees'

const BASE = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/garantie-legala'
const NOTICE_RO = `${BASE}/notificare-garantie-legala-ro.png`
const NOTICE_EN = `${BASE}/legal-guarantee-notice-en.pdf`

interface Props {
  isEnglish: boolean
  className?: string
}

export function LegalGuaranteeNotice({ isEnglish, className }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const label = isEnglish ? 'Your legal guarantee rights' : 'Drepturile tale de garanție legală'

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className={className}>
        {label}
      </button>

      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false)
        }}
        aria-label={label}
        className="m-auto w-[min(820px,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl bg-white p-0 text-left text-charcoal-800 shadow-xl backdrop:bg-black/60"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-charcoal-200 bg-white px-5 py-4">
          <h2 className="text-base font-semibold text-charcoal-900">{label}</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={isEnglish ? 'Close' : 'Închide'}
            className="-mr-2 -mt-1 rounded-md p-2 text-charcoal-600 hover:bg-charcoal-100 active:bg-charcoal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 py-4">
          {open &&
            (isEnglish ? (
              <iframe src={NOTICE_EN} title={label} className="h-[70dvh] w-full rounded border border-charcoal-200" />
            ) : (
              <img
                src={NOTICE_RO}
                alt="Garanția legală: protecția oferită de garanția legală minimă de doi ani pentru bunurile vândute în Uniunea Europeană. Vânzătorii sunt răspunzători pentru orice neconformitate existentă la livrare și trebuie să ofere repararea sau înlocuirea gratuită, iar în unele cazuri reducerea prețului sau rambursarea integrală. Dacă bunurile primite sunt neconforme, contactați vânzătorul cât mai curând și furnizați o dovadă a achiziției. Cod QR către europa.eu/youreurope/garanții."
                width={1654}
                height={2339}
                className="mx-auto h-auto w-full"
              />
            ))}

          <div className="mt-4 space-y-2 text-sm">
            <a
              href={isEnglish ? LEGAL_GUARANTEE_URL_EN : LEGAL_GUARANTEE_URL_RO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800"
            >
              {isEnglish ? 'europa.eu/youreurope/guarantees' : 'europa.eu/youreurope/garanții'}
              <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
            <div>
              <a
                href={isEnglish ? NOTICE_EN : NOTICE_RO}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 text-charcoal-600 underline underline-offset-2 hover:text-charcoal-900"
              >
                <ZoomIn className="w-4 h-4 shrink-0" aria-hidden="true" />
                {isEnglish ? 'Open the notice full size' : 'Deschide notificarea la dimensiune mare'}
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
