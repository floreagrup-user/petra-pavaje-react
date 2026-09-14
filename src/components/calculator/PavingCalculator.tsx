import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Plus, Printer } from 'lucide-react'
import { calculatorCatalog } from '@/data/calculator/catalog'
import { CATEGORY_GROUP_LABELS } from '@/data/calculator/catalog'
import { calculatePavingRequirement } from '@/lib/calculator/calculatePaving'
import { DEFAULT_WASTE_PERCENT, WASTE_OPTIONS } from '@/lib/calculator/types'
import type { CalculatorCategoryGroup, CalculatorProduct, CalculatorVariant, ProjectZone } from '@/lib/calculator/types'
import { formatArea } from '@/lib/calculator/formatters'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import { ProductPicker } from './ProductPicker'
import { AreaZoneInput } from './AreaZoneInput'
import { ResultCard } from './ResultCard'
import { LinearElementsSection } from './LinearElementsSection'
import { CalculatorCTA } from './CalculatorCTA'
import { PrintSummary } from './PrintSummary'

const AREA_GROUPS: CalculatorCategoryGroup[] = ['premium', 'standard', 'woodstone']
const areaProducts = calculatorCatalog.filter((p) => AREA_GROUPS.includes(p.categoryGroup) && p.variants.some((v) => v.saleMode !== 'linear'))
const PICKER_GROUPS = AREA_GROUPS.map((id) => ({ id, label: CATEGORY_GROUP_LABELS[id] }))

function makeZone(index: number): ProjectZone {
  return { id: crypto.randomUUID(), label: `Zona ${index}`, shape: 'dreptunghi', inputs: {}, areaM2: 0 }
}

export function PavingCalculator() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category') as CalculatorCategoryGroup | null
  const initialGroup = categoryParam && AREA_GROUPS.includes(categoryParam) ? categoryParam : undefined
  const [mode, setMode] = useState<'rapid' | 'avansat'>('rapid')
  const [zones, setZones] = useState<ProjectZone[]>([makeZone(1)])
  const [wastePercent, setWastePercent] = useState<number>(DEFAULT_WASTE_PERCENT)
  const [customWaste, setCustomWaste] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<CalculatorProduct | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<CalculatorVariant | null>(null)
  const startedTracked = useRef(false)

  // Section 26: URL preselection, e.g. /calculator-pavaj?product=roca&format=60%C3%9730%C3%976%20cm
  useEffect(() => {
    const productSlug = searchParams.get('product')
    if (!productSlug) return
    const product = calculatorCatalog.find((p) => p.slug === productSlug)
    if (!product) return
    setSelectedProduct(product)
    trackEvent('calculator_product_selected', { product: product.slug, category: product.categoryGroup, source: 'url' })
    const formatParam = searchParams.get('format')
    const variant = formatParam ? product.variants.find((v) => v.label === formatParam || v.id === formatParam) : undefined
    setSelectedVariant(variant ?? product.variants[0] ?? null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalArea = useMemo(() => zones.reduce((sum, z) => sum + z.areaM2, 0), [zones])

  const effectiveWaste = customWaste !== '' ? Math.min(100, Math.max(0, Number(customWaste) || 0)) : wastePercent

  const result = useMemo(() => {
    if (!selectedVariant || totalArea <= 0) return null
    return calculatePavingRequirement(totalArea, effectiveWaste, selectedVariant)
  }, [selectedVariant, totalArea, effectiveWaste])

  useEffect(() => {
    if (result && !startedTracked.current) {
      startedTracked.current = true
      trackEvent('calculator_started')
    }
  }, [result])

  useEffect(() => {
    if (result && selectedProduct && selectedVariant) {
      trackEvent('calculator_calculation_completed', {
        product: selectedProduct.slug,
        category: selectedProduct.categoryGroup,
        surface_m2: totalArea,
        waste_percentage: effectiveWaste,
        quantity: result.totalArea,
        pallets: result.pallets ?? undefined,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.totalArea, result?.pallets, effectiveWaste])

  const handleSelectProduct = (product: CalculatorProduct) => {
    setSelectedProduct(product)
    setSelectedVariant(product.variants[0] ?? null)
    trackEvent('calculator_product_selected', { product: product.slug, category: product.categoryGroup })
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setMode('rapid')}
          className={cn(
            'px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors',
            mode === 'rapid' ? 'bg-charcoal-900 text-white' : 'bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200'
          )}
        >
          Calcul rapid
        </button>
        <button
          type="button"
          onClick={() => setMode('avansat')}
          className={cn(
            'px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors',
            mode === 'avansat' ? 'bg-charcoal-900 text-white' : 'bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200'
          )}
        >
          Calcul avansat
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        <div className="space-y-6">
          <section className="rounded-2xl border border-charcoal-200 p-5 md:p-6 bg-white">
            <h2 className="text-sm font-semibold text-charcoal-900 uppercase tracking-wide mb-4">
              {mode === 'rapid' ? 'Suprafață' : 'Suprafețe proiect'}
            </h2>

            <div className="space-y-4">
              {zones.map((zone, idx) => (
                <AreaZoneInput
                  key={zone.id}
                  zone={zone}
                  index={idx}
                  showAdvanced={mode === 'avansat'}
                  onChange={(z) => setZones((prev) => prev.map((p) => (p.id === z.id ? z : p)))}
                  onRemove={mode === 'avansat' && zones.length > 1 ? () => setZones((prev) => prev.filter((p) => p.id !== zone.id)) : undefined}
                />
              ))}
            </div>

            {mode === 'avansat' && (
              <button
                type="button"
                onClick={() => setZones((prev) => [...prev, makeZone(prev.length + 1)])}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                <Plus className="w-4 h-4" />
                Adaugă suprafață
              </button>
            )}

            {zones.length > 1 && (
              <div className="mt-4 pt-4 border-t border-charcoal-100 flex items-center justify-between">
                <span className="text-sm text-charcoal-500">Suprafață totală</span>
                <span className="font-bold text-charcoal-900">{formatArea(totalArea)}</span>
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-charcoal-200 p-5 md:p-6 bg-white">
            <h2 className="text-sm font-semibold text-charcoal-900 uppercase tracking-wide mb-4">Alege produsul</h2>
            <ProductPicker
              products={areaProducts}
              groups={PICKER_GROUPS}
              selectedProduct={selectedProduct}
              selectedVariant={selectedVariant}
              onSelectProduct={handleSelectProduct}
              onSelectVariant={(v) => setSelectedVariant(v)}
              initialGroup={initialGroup}
            />
          </section>

          <section className="rounded-2xl border border-charcoal-200 p-5 md:p-6 bg-white">
            <h2 className="text-sm font-semibold text-charcoal-900 uppercase tracking-wide mb-4">Pierderi la montaj / debitare</h2>
            <div className="flex flex-wrap gap-2">
              {WASTE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setWastePercent(opt.value)
                    setCustomWaste('')
                  }}
                  className={cn(
                    'px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors',
                    customWaste === '' && wastePercent === opt.value
                      ? 'bg-brand-600 border-brand-600 text-white'
                      : 'bg-white border-charcoal-200 text-charcoal-600 hover:border-brand-300'
                  )}
                >
                  {opt.label}
                </button>
              ))}
              <label className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="Personalizat"
                  value={customWaste}
                  onChange={(e) => setCustomWaste(e.target.value)}
                  aria-label="Procent pierderi personalizat"
                  className={cn(
                    'w-28 px-3 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-brand-500',
                    customWaste !== '' ? 'border-brand-600' : 'border-charcoal-200'
                  )}
                />
                <span className="text-sm text-charcoal-500">%</span>
              </label>
            </div>
          </section>

          <LinearElementsSection initialProductSlug={searchParams.get('linear') ?? undefined} />
        </div>

        <div className="lg:sticky lg:top-24 space-y-4">
          {result && selectedProduct && selectedVariant ? (
            <>
              <ResultCard kind="area" result={result} wastePercent={effectiveWaste} title={selectedProduct.name} subtitle={selectedVariant.label} />
              <button
                type="button"
                onClick={() => {
                  trackEvent('calculator_quote_clicked', { source: 'print' })
                  window.print()
                }}
                className="w-full btn-secondary justify-center"
              >
                <Printer className="w-4 h-4 mr-2" />
                Descarcă estimarea (PDF / print)
              </button>
              <CalculatorCTA />
              <p className="text-xs text-charcoal-400 leading-relaxed px-1">
                Calculul este orientativ și poate varia în funcție de modul de montaj, configurația suprafeței, debitare și
                pierderi. Pentru necesarul final recomandăm validarea de către un specialist Petra Pavaje.
              </p>
              <PrintSummary
                product={selectedProduct}
                variant={selectedVariant}
                zones={zones}
                wastePercent={effectiveWaste}
                result={result}
              />
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-charcoal-300 p-8 text-center text-charcoal-500 text-sm">
              <p className="mb-2 font-medium text-charcoal-700">Necesarul tău va apărea aici</p>
              <p>Introdu suprafața și alege un produs pentru a vedea cantitatea estimată și numărul de paleți.</p>
              {!selectedProduct && (
                <p className="mt-3 text-xs">
                  Nu găsești produsul? Vezi <Link to="/produse" className="text-brand-600 hover:underline">toate produsele</Link>.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
