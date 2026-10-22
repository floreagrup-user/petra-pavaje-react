import { useEffect, useRef, useState } from 'react'
import { ExternalLink, X, ZoomIn } from 'lucide-react'
import { GARAN_ELEMENT_LABELS, GARAN_PRODUCT_LABELS, GARAN_WOODSTONE_LABELS } from '@/data/garan-labels'

// EU commercial guarantee label (GARAN). Commission guidance for online sales:
// the small "nested" label may stand in for the full one only as a trigger,
// the full label must open on the first click or tap, it must be zoomable,
// and a clickable link to the Your Europe page (the QR target) sits next to it.

export const YOUR_EUROPE_GUARANTEE_URL = 'https://europa.eu/youreurope/commercial-guarantee-durability/index.htm'

// Labels live in R2 under etichete-garan/; which file belongs to which table
// row is generated into src/data/garan-labels.ts by scripts/build-garan-labels.ts.
const BASE = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/etichete-garan'
const NESTED_SRC = `${BASE}/garan-nested-5.webp`

export function garanLabelSrc(productSlug: string, dimensionLabel: string): string | null {
  const file = GARAN_PRODUCT_LABELS[productSlug]?.[dimensionLabel]
  return file ? `${BASE}/${file}` : null
}

export function garanElementLabelSrc(categorySlug: string, variantName: string): string | null {
  const file = GARAN_ELEMENT_LABELS[categorySlug]?.[variantName]
  return file ? `${BASE}/${file}` : null
}

export function hasGaranLabels(productSlug: string): boolean {
  return Boolean(GARAN_PRODUCT_LABELS[productSlug])
}

export function hasGaranElementLabels(categorySlug: string): boolean {
  return Boolean(GARAN_ELEMENT_LABELS[categorySlug])
}

// Woodstone rows are keyed by product code: the English pages translate the names.
export function garanWoodstoneLabelSrc(categorySlug: string, code: string): string | null {
  const file = GARAN_WOODSTONE_LABELS[categorySlug]?.[code]
  return file ? `${BASE}/${file}` : null
}

export function hasGaranWoodstoneLabels(categorySlug: string): boolean {
  return Boolean(GARAN_WOODSTONE_LABELS[categorySlug])
}

interface GaranLabelButtonProps {
  src: string
  title: string
  isEnglish: boolean
}

// The nested label, as a button that opens the full label in a dialog.
export function GaranLabelButton({ src, title, isEnglish }: GaranLabelButtonProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const heading = isEnglish ? `Guarantee label: ${title}` : `Eticheta de garanție: ${title}`

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={isEnglish ? `Show the GARAN guarantee label for ${title}` : `Vezi eticheta de garanție GARAN pentru ${title}`}
        className="inline-flex min-h-6 items-center rounded px-1 py-0.5 -mx-1 hover:bg-charcoal-100 active:bg-charcoal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <img src={NESTED_SRC} alt="" width={737} height={113} loading="lazy" decoding="async" className="h-4 w-auto" />
      </button>

      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false)
        }}
        aria-label={heading}
        className="m-auto w-[min(560px,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl bg-white p-0 text-charcoal-800 shadow-xl backdrop:bg-black/60"
      >
        <div className="flex items-start justify-between gap-4 border-b border-charcoal-200 px-5 py-4">
          <h2 className="text-base font-semibold text-charcoal-900">{heading}</h2>
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
          {open && (
            <img
              src={src}
              alt={
                isEnglish
                  ? `GARAN label: Petra Pavaje, ${title}, producer guarantee 5 years, QR code to the Your Europe page`
                  : `Eticheta GARAN: Petra Pavaje, ${title}, garanția producătorului 5 ani, cod QR către pagina Your Europe`
              }
              width={1122}
              height={1181}
              className="mx-auto h-auto w-full max-w-[480px]"
            />
          )}

          <div className="mt-4 space-y-2 text-sm">
            <a
              href={YOUR_EUROPE_GUARANTEE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800"
            >
              {isEnglish ? 'Your EU rights: commercial guarantee and durability' : 'Drepturile tale în UE: garanția comercială și durabilitatea'}
              <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
            <div>
              <a
                href={src}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 text-charcoal-600 underline underline-offset-2 hover:text-charcoal-900"
              >
                <ZoomIn className="w-4 h-4 shrink-0" aria-hidden="true" />
                {isEnglish ? 'Open the label full size' : 'Deschide eticheta la dimensiune mare'}
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
