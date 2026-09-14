import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CalculatorCategoryGroup, CalculatorProduct, CalculatorVariant } from '@/lib/calculator/types'

interface ProductPickerProps {
  products: CalculatorProduct[]
  groups: { id: CalculatorCategoryGroup; label: string }[]
  selectedProduct: CalculatorProduct | null
  selectedVariant: CalculatorVariant | null
  onSelectProduct: (product: CalculatorProduct) => void
  onSelectVariant: (variant: CalculatorVariant) => void
  initialGroup?: CalculatorCategoryGroup
}

export function ProductPicker({ products, groups, selectedProduct, selectedVariant, onSelectProduct, onSelectVariant, initialGroup }: ProductPickerProps) {
  const [activeGroup, setActiveGroup] = useState<CalculatorCategoryGroup | 'toate'>(initialGroup ?? groups[0]?.id ?? 'toate')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((p) => {
      if (activeGroup !== 'toate' && p.categoryGroup !== activeGroup) return false
      if (q && !p.name.toLowerCase().includes(q) && !p.categoryLabel.toLowerCase().includes(q)) return false
      return true
    })
  }, [products, activeGroup, query])

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 -mx-1 px-1">
        {groups.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActiveGroup(g.id)}
            className={cn(
              'shrink-0 px-3.5 py-2 rounded-full text-sm font-medium transition-colors border',
              activeGroup === g.id
                ? 'bg-brand-600 border-brand-600 text-white'
                : 'bg-white border-charcoal-200 text-charcoal-600 hover:border-brand-300'
            )}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Caută produs (ex: Roca)"
          aria-label="Caută produs"
          className="w-full pl-10 pr-4 py-3 border border-charcoal-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-charcoal-500 py-6 text-center">Niciun produs găsit pentru această căutare.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5 max-h-[420px] overflow-y-auto pr-1">
          {filtered.map((p) => {
            const isSelected = selectedProduct?.id === p.id
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectProduct(p)}
                aria-pressed={isSelected}
                className={cn(
                  'text-left rounded-xl border overflow-hidden bg-white transition-all group',
                  isSelected ? 'border-brand-600 ring-2 ring-brand-500/30' : 'border-charcoal-200 hover:border-brand-300'
                )}
              >
                <div className="aspect-[4/3] bg-charcoal-50 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2.5">
                  <p className="text-sm font-semibold text-charcoal-900 truncate">{p.name}</p>
                  <p className="text-xs text-charcoal-500 truncate">{p.categoryLabel}</p>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {selectedProduct && selectedProduct.variants.length > 0 && (
        <div>
          <p className="text-sm font-medium text-charcoal-900 mb-2">Format {selectedProduct.name}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedProduct.variants.map((v) => {
              const isSelected = selectedVariant?.id === v.id
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => onSelectVariant(v)}
                  aria-pressed={isSelected}
                  className={cn(
                    'flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg border text-sm text-left transition-colors',
                    isSelected ? 'border-brand-600 bg-brand-50 text-brand-900' : 'border-charcoal-200 hover:border-brand-300'
                  )}
                >
                  <span className="font-medium">{v.label}</span>
                  {!v.hasFullData && (
                    <span className="text-[10px] uppercase tracking-wide text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">
                      date parțiale
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
