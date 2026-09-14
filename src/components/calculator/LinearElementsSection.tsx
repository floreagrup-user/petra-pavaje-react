import { useMemo, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { calculatorCatalog, CATEGORY_GROUP_LABELS } from '@/data/calculator/catalog'
import { calculateLinearRequirement } from '@/lib/calculator/calculateLinear'
import { formatLength, formatPallets, formatPieces } from '@/lib/calculator/formatters'
import type { CalculatorCategoryGroup, CalculatorVariant } from '@/lib/calculator/types'
import { ResultCard } from './ResultCard'

const LINEAR_GROUPS: CalculatorCategoryGroup[] = ['borduri', 'garduri', 'palisada', 'bloc-de-zid', 'treapta', 'jardiniere']

const linearProducts = calculatorCatalog.filter((p) => LINEAR_GROUPS.includes(p.categoryGroup) && p.variants.some((v) => v.saleMode === 'linear'))

interface LinearElement {
  id: string
  productSlug: string
  variantId: string
  lengthMl: number
}

function newElement(productSlug?: string): LinearElement {
  const first = productSlug ? linearProducts.find((p) => p.slug === productSlug) : linearProducts[0]
  const firstVariant = first?.variants.find((v) => v.saleMode === 'linear')
  return { id: crypto.randomUUID(), productSlug: first?.slug ?? '', variantId: firstVariant?.id ?? '', lengthMl: 0 }
}

interface LinearElementsSectionProps {
  onCalculated?: (hasResults: boolean) => void
  initialProductSlug?: string
}

export function LinearElementsSection({ onCalculated, initialProductSlug }: LinearElementsSectionProps) {
  const [enabled, setEnabled] = useState(Boolean(initialProductSlug))
  const [elements, setElements] = useState<LinearElement[]>([newElement(initialProductSlug)])

  const update = (id: string, patch: Partial<LinearElement>) => {
    setElements((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  }

  const results = useMemo(() => {
    return elements.map((el) => {
      const product = linearProducts.find((p) => p.slug === el.productSlug)
      const variant = product?.variants.find((v) => v.id === el.variantId)
      return { el, product, variant, result: variant ? calculateLinearRequirement(el.lengthMl, variant) : null }
    })
  }, [elements])

  if (linearProducts.length === 0) return null

  return (
    <div className="rounded-2xl border border-charcoal-200 p-5 md:p-6 bg-white">
      <label className="flex items-center gap-3 cursor-pointer mb-1">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => {
            setEnabled(e.target.checked)
            onCalculated?.(false)
          }}
          className="w-4 h-4"
        />
        <span className="font-semibold text-charcoal-900">Adaugă borduri / garduri / delimitări</span>
      </label>
      <p className="text-xs text-charcoal-500 mb-4 ml-7">Calculează separat elementele liniare pentru proiectul tău.</p>

      {enabled && (
        <div className="space-y-5">
          {results.map(({ el, product, variant, result }, idx) => (
            <div key={el.id} className="rounded-xl border border-charcoal-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-charcoal-700">Element {idx + 1}</span>
                {elements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setElements((prev) => prev.filter((e) => e.id !== el.id))}
                    aria-label="Șterge element"
                    className="text-charcoal-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <label className="block">
                  <span className="block text-xs font-medium text-charcoal-600 mb-1">Produs</span>
                  <select
                    value={el.productSlug}
                    onChange={(e) => {
                      const p = linearProducts.find((x) => x.slug === e.target.value)
                      const v = p?.variants.find((x) => x.saleMode === 'linear')
                      update(el.id, { productSlug: e.target.value, variantId: v?.id ?? '' })
                    }}
                    className="w-full px-3.5 py-2.5 border border-charcoal-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    {LINEAR_GROUPS.map((group) => {
                      const opts = linearProducts.filter((p) => p.categoryGroup === group)
                      if (!opts.length) return null
                      return (
                        <optgroup key={group} label={CATEGORY_GROUP_LABELS[group]}>
                          {opts.map((p) => (
                            <option key={p.slug} value={p.slug}>
                              {p.name}
                            </option>
                          ))}
                        </optgroup>
                      )
                    })}
                  </select>
                </label>

                <label className="block">
                  <span className="block text-xs font-medium text-charcoal-600 mb-1">Format</span>
                  <select
                    value={el.variantId}
                    onChange={(e) => update(el.id, { variantId: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-charcoal-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    {product?.variants
                      .filter((v: CalculatorVariant) => v.saleMode === 'linear')
                      .map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.label}
                        </option>
                      ))}
                  </select>
                </label>
              </div>

              <label className="block max-w-xs mb-3">
                <span className="block text-xs font-medium text-charcoal-600 mb-1">Lungime totală</span>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    step={0.1}
                    inputMode="decimal"
                    value={el.lengthMl || ''}
                    onChange={(e) => update(el.id, { lengthMl: e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)) })}
                    className="w-full px-3.5 py-2.5 pr-10 border border-charcoal-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-charcoal-400">ml</span>
                </div>
              </label>

              {result && el.lengthMl > 0 && variant && (
                <div className="flex flex-wrap gap-4 text-sm pt-2 border-t border-charcoal-100">
                  {result.canCalculatePieces && result.estimatedPieces !== null && (
                    <span className="text-charcoal-700">
                      <strong>{formatPieces(result.estimatedPieces)}</strong>
                    </span>
                  )}
                  {result.canCalculatePallets && result.pallets !== null ? (
                    <span className="text-charcoal-700">
                      <strong>{formatPallets(result.pallets)}</strong>
                      {result.commercialLength !== null && ` (${formatLength(result.commercialLength)})`}
                    </span>
                  ) : (
                    <span className="text-amber-700">Paleți: date insuficiente pentru acest format.</span>
                  )}
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => setElements((prev) => [...prev, newElement()])}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            <Plus className="w-4 h-4" />
            Adaugă element
          </button>

          {results.some(({ el, result }) => el.lengthMl > 0 && result) && (
            <div className="pt-2">
              <p className="text-sm font-semibold text-charcoal-900 mb-3">Rezultate delimitări</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {results
                  .filter(({ el, result }) => el.lengthMl > 0 && result)
                  .map(({ el, product, result }) => (
                    <ResultCard key={el.id} kind="linear" result={result!} title={product?.name ?? ''} subtitle={`${el.lengthMl} ml`} />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
