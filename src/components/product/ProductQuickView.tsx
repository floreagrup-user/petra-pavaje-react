import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, MessageCircle, X } from 'lucide-react'
import type { Product } from '@/data/types'
import { productImages } from '@/data/images'
import { thicknessRange } from './swatch-utils'

// Right-hand quick view for the test category layout. Real product data only.
// Focus moves into the panel, Tab stays inside, Escape closes, and focus
// returns to the button that opened it (handled by the caller via onClose).

interface Props {
  product: Product | null
  href: string
  onClose: () => void
  lang?: 'ro' | 'en'
}

export function ProductQuickView({ product, href, onClose, lang = 'ro' }: Props) {
  const isEnglish = lang === 'en'
  const reduce = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!product) return
    closeRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow }
  }, [product, onClose])

  const duration = reduce ? 0 : 0.32
  const formats = product ? [...new Set((product.dimensionsList || []).map((d) => d.size))] : []
  const ambient = product ? (product.gallery.find((g) => g !== product.image) ?? productImages[product.slug] ?? product.image) : ''

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-charcoal-950/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-[520px] flex-col bg-white shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-charcoal-100 px-5 py-4">
              <h2 id="quick-view-title" className="text-xl font-semibold text-charcoal-900">{product.name}</h2>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={isEnglish ? 'Close quick view' : 'Închide previzualizarea'}
                className="grid h-11 w-11 place-items-center rounded-lg text-charcoal-500 hover:bg-charcoal-50 hover:text-charcoal-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              <div className="aspect-[3/2] overflow-hidden rounded-lg bg-stone-100">
                <img src={ambient} alt={product.name} className="h-full w-full object-cover" />
              </div>
              <p className="text-sm leading-relaxed text-charcoal-600">{product.description}</p>
              <dl className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-5 gap-y-3 text-sm">
                {thicknessRange(product) && (<><dt className="text-charcoal-500">{isEnglish ? 'Thickness' : 'Grosime'}</dt><dd className="font-medium text-charcoal-900">{thicknessRange(product)}</dd></>)}
                {formats.length > 0 && (<><dt className="text-charcoal-500">{isEnglish ? 'Formats' : 'Formate'}</dt><dd className="font-medium text-charcoal-900">{formats.slice(0, 10).join(', ')}{formats.length > 10 ? (isEnglish ? ' and more' : ' și altele') : ''}</dd></>)}
                {product.usage.length > 0 && (<><dt className="text-charcoal-500">{isEnglish ? 'Usage' : 'Utilizare'}</dt><dd className="font-medium text-charcoal-900">{product.usage.join(', ')}</dd></>)}
              </dl>
              {product.colors.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-charcoal-900">{isEnglish ? 'Colours' : 'Nuanțe'} ({product.colors.length})</h3>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-charcoal-700">
                    {product.colors.map((c) => (
                      <li key={c.name} className="flex items-center gap-2">
                        <span className="h-5 w-5 shrink-0 rounded-full ring-1 ring-charcoal-300" style={{ backgroundColor: c.hex }} aria-hidden="true" />
                        {c.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-3 border-t border-charcoal-100 p-5">
              <Link to={href} className="btn-primary group">
                {isEnglish ? 'Product page' : 'Pagina produsului'}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link to={isEnglish ? '/en/contact' : '/contact'} className="btn-secondary">
                <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                {isEnglish ? 'Request a Quote' : 'Cere o ofertă'}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
