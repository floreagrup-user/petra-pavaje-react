import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Eye, Layers } from 'lucide-react'
import type { Product } from '@/data/types'
import { productImages } from '@/data/images'
import { thicknessRange } from './swatch-utils'

// Test layout card (motion prototype, variant C): pick a shade right on the
// card, open a quick view on the right. Every card shows its colour row so
// cards in a grid row line up; the row is capped to one line (+N opens the
// quick view, which lists every colour).

const SWATCH_LIMIT = 6

export interface SwatchCardVariant {
  product: Product
  href: string
}

interface Props {
  product: Product
  href: string
  /** Optional selectable variants (Quatro): the card switches to the chosen one. */
  variants?: SwatchCardVariant[]
  /** Slug of the variant shown first, when it is in the list. */
  defaultVariantSlug?: string
  onQuickView: (product: Product, href: string, trigger: HTMLButtonElement) => void
  lang?: 'ro' | 'en'
}

export function ProductSwatchCard({ product, href, variants, defaultVariantSlug, onQuickView, lang = 'ro' }: Props) {
  const isEnglish = lang === 'en'
  const reduce = useReducedMotion()
  const [variantIdx, setVariantIdx] = useState(() => Math.max(0, variants?.findIndex((v) => v.product.slug === defaultVariantSlug) ?? 0))
  const [colorIdx, setColorIdx] = useState<number | null>(null)

  const current = variants?.length ? variants[Math.min(variantIdx, variants.length - 1)] : { product, href }
  const p = current.product
  const colors = p.colors
  const shown = colors.slice(0, SWATCH_LIMIT)
  const hidden = colors.length - shown.length
  const activeColor = colorIdx !== null ? colors[colorIdx] : null
  const image = activeColor?.image ?? (productImages[p.slug] || p.image)
  const thickness = thicknessRange(p)
  const formatCount = p.dimensionsList?.length || 0
  const selectId = `variant-${product.id}`

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-charcoal-100 bg-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-charcoal-200 hover:shadow-xl focus-within:border-charcoal-200 focus-within:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <AnimatePresence initial={false}>
          <motion.img
            key={image}
            src={image}
            alt={activeColor ? `${p.name}, ${isEnglish ? 'colour' : 'culoarea'} ${activeColor.name}` : p.name}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </AnimatePresence>
        {variants && variants.length > 1 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-charcoal-900">
            <Layers className="h-3 w-3" aria-hidden="true" />
            {variants.length} {isEnglish ? 'variants' : 'variante'}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-semibold text-charcoal-900">
            <Link to={current.href} className="after:absolute after:inset-0 after:content-[''] hover:text-brand-600 focus:outline-none">
              {variants?.length ? p.name : product.name}
            </Link>
          </h3>
          <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm text-charcoal-500">{p.shortDescription}</p>
        </div>

        {variants && variants.length > 1 && (
          <div className="relative z-10 grid gap-1.5">
            <label htmlFor={selectId} className="text-xs font-medium text-charcoal-600">
              {isEnglish ? 'Variant' : 'Variantă'}
            </label>
            <select
              id={selectId}
              value={variantIdx}
              onChange={(e) => { setVariantIdx(Number(e.target.value)); setColorIdx(null) }}
              className="min-h-[44px] w-full min-w-0 rounded-lg border border-charcoal-300 bg-white px-3 text-sm text-charcoal-900 hover:border-charcoal-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {variants.map((v, i) => <option key={v.product.id} value={i}>{v.product.name}</option>)}
            </select>
          </div>
        )}

        <div className="relative z-10">
          <p className="mb-2 text-xs text-charcoal-600" aria-live="polite">
            {activeColor
              ? <>{isEnglish ? 'Colour' : 'Culoare'}: <span className="font-semibold text-charcoal-900">{activeColor.name}</span></>
              : <>{colors.length} {isEnglish ? (colors.length === 1 ? 'colour' : 'colours') : (colors.length === 1 ? 'nuanță' : 'nuanțe')}</>}
          </p>
          <div className="flex h-8 items-center gap-2" role="group" aria-label={`${isEnglish ? 'Colours' : 'Nuanțe'} ${p.name}`}>
            {shown.map((c, i) => (
              <button
                key={c.name}
                type="button"
                title={c.name}
                aria-label={c.name}
                aria-pressed={colorIdx === i}
                onClick={() => setColorIdx(colorIdx === i ? null : i)}
                className={`h-7 w-7 shrink-0 rounded-full border-2 border-white transition-transform duration-150 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 ${colorIdx === i ? 'ring-2 ring-charcoal-900' : 'ring-1 ring-charcoal-300'}`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {hidden > 0 && (
              <button
                type="button"
                onClick={(e) => onQuickView(p, current.href, e.currentTarget)}
                className="h-7 shrink-0 rounded-full px-2 text-xs font-medium text-charcoal-600 ring-1 ring-charcoal-300 hover:text-charcoal-900 hover:ring-charcoal-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                aria-label={isEnglish ? `${hidden} more colours, open quick view` : `Încă ${hidden} nuanțe, deschide previzualizarea`}
              >
                +{hidden}
              </button>
            )}
          </div>
        </div>

        <p className="text-xs text-charcoal-500">
          {thickness && <span>{isEnglish ? `Thickness ${thickness}` : `Grosime ${thickness}`}</span>}
          {thickness && formatCount > 0 && <span> · </span>}
          {formatCount > 0 && <span>{formatCount} {isEnglish ? (formatCount === 1 ? 'format' : 'formats') : (formatCount === 1 ? 'format' : 'formate')}</span>}
        </p>

        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={(e) => onQuickView(p, current.href, e.currentTarget)}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-md border-2 border-charcoal-900 px-4 text-sm font-medium text-charcoal-900 transition-colors duration-200 hover:bg-charcoal-900 hover:text-white active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            {isEnglish ? 'Quick view' : 'Previzualizare'}
          </button>
        </div>
      </div>
    </article>
  )
}
