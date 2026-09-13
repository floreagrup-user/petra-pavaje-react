import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, SlidersHorizontal, X, ArrowRight, MessageCircle } from 'lucide-react'
import { getProductsByCategory } from '@/data/products'
import type { ProductFAQ } from '@/data/types'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { useCategoryListSEO } from '@/hooks/useCategoryListSEO'
import { ProductGridCard } from '@/components/product/ProductGridCard'
import { CategoryFilterPanel, ActiveFilterChips } from '@/components/product/CategoryFilterPanel'
import {
  buildProductFacets,
  matchesFilters,
  sortProducts,
  parseFiltersFromSearchParams,
  parseSortFromSearchParams,
  filtersToSearchParams,
  hasAnyFilters,
  EMPTY_FILTERS,
  type SortKey,
  type ProductFilters,
} from '@/lib/product-filters'

const SORT_LABELS: Record<SortKey, string> = {
  recomandate: 'Recomandate',
  'nume-asc': 'Nume A-Z',
  'nume-desc': 'Nume Z-A',
  'grosime-asc': 'Grosime crescător',
  'grosime-desc': 'Grosime descrescător',
}

const BORDURI_FAQ: ProductFAQ[] = [
  {
    question: 'Câte tipuri de borduri oferă Petra Pavaje?',
    answer:
      '19 formate de bordură din beton vibropresat — de la bordura standard 50×5×20, la formate late și înalte (40×15×20, 50×20×30), profiluri decorative (arcade, rotunjite, teșite F10/F15), o bordură cilindrică pentru curbe, și elemente speciale pentru rampe, racorduri și treceri pietonale.',
  },
  {
    question: 'Ce culori sunt disponibile pentru borduri?',
    answer:
      'În funcție de format, bordurile Petra Pavaje sunt disponibile în până la 12 culori: Gri, Roșu, Negru, Galben, Maro, Alb, Gri Antic, Gri Bazaltic, Terra, Rossa, Negru Violet și Moka. Bordura standard 50×5×20 și cea 100×8×25 au cea mai largă paletă.',
  },
  {
    question: 'Ce bordură se recomandă pentru curbe și sensuri giratorii?',
    answer:
      'Bordura cilindrică 106×9×25 rotunjită este gândită special pentru delimitarea curbelor, a insulelor de sens giratoriu și a oricărei zone cu contur circular.',
  },
  {
    question: 'Cum aleg bordura pentru acces auto peste aliniament?',
    answer:
      'Bordura rampă 50×25×25 permite accesul vehiculelor peste linia de bordură (de exemplu la o intrare auto), iar bordura racord 50×25×25 teșită asigură tranziția curată către restul aliniamentului.',
  },
  {
    question: 'Toate bordurile au aceeași garanție?',
    answer:
      'Da, toate bordurile din beton Petra Pavaje beneficiază de o garanție de 5 ani, conform standardelor de calitate certificate ISO ale companiei.',
  },
]

export function BorduriCategoryPage() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const filterTriggerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const allProducts = useMemo(() => getProductsByCategory('borduri'), [])
  const facets = useMemo(() => buildProductFacets(allProducts), [allProducts])
  const filters = useMemo(() => parseFiltersFromSearchParams(searchParams), [searchParams])
  const sortKey = useMemo(() => parseSortFromSearchParams(searchParams), [searchParams])

  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter((p) => matchesFilters(p, filters))
    return sortProducts(filtered, sortKey)
  }, [allProducts, filters, sortKey])

  useCategoryListSEO(allProducts, BORDURI_FAQ, {
    path: '/borduri',
    title: 'Borduri Beton - 19 Formate pentru Delimitare | Petra Pavaje',
    description:
      'Borduri din beton vibropresat Petra Pavaje: 19 formate — drepte, teșite, rotunjite, cilindrice, rampă și racord — în până la 12 culori, cu garanție 5 ani.',
    breadcrumbLabel: 'Borduri',
  })

  const updateFilters = (next: ProductFilters) => {
    setSearchParams(filtersToSearchParams(next, sortKey), { replace: true })
  }
  const updateSort = (next: SortKey) => {
    setSearchParams(filtersToSearchParams(filters, next), { replace: true })
  }
  const clearFilters = () => {
    setSearchParams(filtersToSearchParams(EMPTY_FILTERS, sortKey), { replace: true })
  }

  const activeFilters = hasAnyFilters(filters)

  useEffect(() => {
    if (!mobileFiltersOpen) return
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileFiltersOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileFiltersOpen])

  const closeMobileFilters = () => {
    setMobileFiltersOpen(false)
    filterTriggerRef.current?.focus()
  }

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-16 md:py-20">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6">
              <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
              <span>/</span>
              <span className="text-white">Borduri</span>
            </nav>
            <h1 className="heading-h1 mb-4">Borduri</h1>
            <p className="text-body-lg text-charcoal-400 max-w-3xl">
              19 formate de bordură din beton vibropresat pentru încadrarea și delimitarea aleilor, trotuarelor,
              parcărilor și spațiilor verzi — de la modelul standard, la profiluri decorative, rampe și racorduri.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-white border-b border-charcoal-100">
        <div className="container-premium">
          <h2 className="heading-h3 text-charcoal-900 mb-3">Ce sunt bordurile Petra Pavaje?</h2>
          <p className="text-body text-charcoal-600 max-w-3xl">
            Bordurile sunt elemente esențiale în lucrările de pavare, folosite ca aliniamente de încadrare și
            delimitare a drumurilor de acces rutier sau pietonal, a trotuarelor, aleilor, spațiilor verzi sau a
            zonelor insulare ale sensurilor giratorii. Gama Petra Pavaje acoperă profiluri drepte, teșite și
            rotunjite, o variantă cilindrică pentru curbe, plus elemente speciale de rampă, racord și trecere
            pietonală — toate rezistente la îngheț-dezgheț și acoperite de garanție de 5 ani.
          </p>
        </div>
      </section>

      <section ref={ref} className="py-12 md:py-16">
        <div className="container-premium">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-charcoal-100">
            <p className="text-sm text-charcoal-500">
              <span className="font-semibold text-charcoal-900">{filteredProducts.length}</span>{' '}
              {filteredProducts.length === 1 ? 'produs' : 'produse'}
              {activeFilters && <span> găsite</span>}
            </p>
            <div className="flex items-center gap-3">
              <button
                ref={filterTriggerRef}
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2 border border-charcoal-200 rounded-lg text-sm font-medium text-charcoal-700 hover:border-charcoal-400 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtre
                {activeFilters && <span className="w-2 h-2 rounded-full bg-brand-600" />}
              </button>
              <div className="relative">
                <select
                  value={sortKey}
                  onChange={(e) => updateSort(e.target.value as SortKey)}
                  className="appearance-none pl-4 pr-9 py-2 border border-charcoal-200 rounded-lg text-sm font-medium text-charcoal-700 hover:border-charcoal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  aria-label="Sortare produse"
                >
                  {Object.entries(SORT_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal-400" />
              </div>
            </div>
          </div>

          <ActiveFilterChips facets={facets} filters={filters} onChange={updateFilters} onClear={clearFilters} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="hidden lg:block lg:col-span-1" aria-label="Filtre produse">
              <CategoryFilterPanel
                facets={facets}
                filters={filters}
                onChange={updateFilters}
                onClear={clearFilters}
                hasActiveFilters={activeFilters}
              />
            </aside>

            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 px-4 bg-stone-50 rounded-xl">
                  <p className="text-charcoal-600 mb-4">Niciun produs nu corespunde filtrelor selectate.</p>
                  <button type="button" onClick={clearFilters} className="btn-secondary">
                    Șterge filtrele
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.05 }}
                    >
                      <ProductGridCard product={product} basePath="/borduri" badgeLabel="Standard" />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filtre produse">
          <div className="absolute inset-0 bg-charcoal-950/50" onClick={closeMobileFilters} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto bg-white rounded-t-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="heading-h3 text-charcoal-900">Filtre</h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMobileFilters}
                className="p-2 -mr-2 text-charcoal-500 hover:text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg"
                aria-label="Închide filtrele"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <CategoryFilterPanel
              facets={facets}
              filters={filters}
              onChange={updateFilters}
              onClear={clearFilters}
              hasActiveFilters={activeFilters}
            />
            <button type="button" onClick={closeMobileFilters} className="btn-primary w-full mt-6">
              Vezi {filteredProducts.length} {filteredProducts.length === 1 ? 'produs' : 'produse'}
            </button>
          </div>
        </div>
      )}

      <section className="py-12 md:py-16 bg-charcoal-50">
        <div className="container-premium">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-h3 text-charcoal-900 mb-3">Nu știi ce bordură să alegi?</h2>
            <p className="text-body text-charcoal-600 mb-6">
              Echipa noastră te poate ajuta să alegi formatul și culoarea potrivite pentru proiectul tău, sau poți
              solicita direct o ofertă personalizată.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/contact" className="btn-primary">
                <MessageCircle className="w-4 h-4 mr-2" />
                Cere o ofertă
              </Link>
            </div>
            <p className="text-sm text-charcoal-500 mt-6">
              Cauți și pavaj pentru suprafață?{' '}
              <Link to="/pavaje-premium" className="link-premium">
                Vezi gama Pavaje Premium
                <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-premium">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">Întrebări Frecvente</p>
            <h2 className="heading-h2 text-charcoal-900">Tot ce trebuie să știi despre borduri</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {BORDURI_FAQ.map((item, idx) => (
              <div key={item.question} className="bg-white rounded-xl border border-charcoal-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-4 text-left"
                >
                  <span className="font-medium text-charcoal-900">{item.question}</span>
                  <ChevronDown className={`w-5 h-5 text-charcoal-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <p className="px-4 pb-4 text-sm text-charcoal-600 leading-relaxed">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
