import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, SlidersHorizontal, X, ArrowRight, MessageCircle, Calculator } from 'lucide-react'
import { getProductsByCategory } from '@/data/products'
import type { ProductFAQ } from '@/data/types'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { useCategoryListSEO } from '@/hooks/useCategoryListSEO'
import { ProductGridCard } from '@/components/product/ProductGridCard'
import { CategoryFilterPanel, ActiveFilterChips } from '@/components/product/CategoryFilterPanel'
import {
  buildProductFacets,
  buildHubProduct,
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

const STANDARD_FAQ: ProductFAQ[] = [
  {
    question: 'Ce pavaje Standard oferă Petra Pavaje?',
    answer:
      'Gama Standard cuprinde Holland, Autobloc, Unda, Quatro (în 19 variante, cu pagină dedicată), Con și Pavaje Eco (dale tip grilă permeabile) — soluții robuste, cu un raport optim calitate-preț, pentru orice tip de suprafață.',
  },
  {
    question: 'Ce grosimi sunt disponibile și pentru ce trafic se recomandă fiecare?',
    answer:
      'Grosimile variază între 4 și 10 cm. Grosimile de 4-6 cm sunt potrivite pentru trafic pietonal și auto ușor, iar 8-10 cm (disponibile la Autobloc și Holland) sunt recomandate pentru trafic auto intens și tonaj mare — parcări, drumuri de acces, stații de carburanți.',
  },
  {
    question: 'Ce este Quatro și de ce are 19 variante?',
    answer:
      'Quatro este cel mai popular format standard: 9 dimensiuni pătrate clasice, 2 variante SMART întărite pentru trafic auto intens, 4 dale tactile pentru persoane cu deficiențe de vedere și 6 marcaje urbane (parcare, dizabilități, acces biciclete). Toate variantele sunt prezentate pe pagina dedicată Quatro.',
  },
  {
    question: 'Ce este Pavaje Eco și când se folosește?',
    answer:
      'Pavaje Eco este gama de dale tip grilă, cu goluri pentru înierbare sau pietriș, folosită pentru parcări ecologice și suprafețe cu drenaj natural al apei pluviale.',
  },
  {
    question: 'Care este diferența dintre pavajele Standard și Premium?',
    answer:
      'Gama Standard mizează pe robustețe, formate potrivite pentru trafic auto greu și un preț competitiv, cu o paletă de culori mai restrânsă. Gama Premium oferă o paletă mult mai largă de culori și finisaje (suprafețe antichizate, structurate), inspirate din piatră naturală, plus tehnologia Color Lock.',
  },
]

function useStandardProducts() {
  return useMemo(() => {
    const all = getProductsByCategory('standard')
    const quatroVariants = all.filter((p) => p.slug.startsWith('quatro-'))
    const rest = all.filter((p) => !p.slug.startsWith('quatro-'))

    const quatroHub = buildHubProduct(
      {
        id: 'quatro',
        name: 'Quatro',
        slug: 'quatro',
        category: 'standard',
        shortDescription: 'Echilibru, Simetrie, Design Flexibil — 19 variante',
        description:
          'Forma pătrată oferă o suprafață echilibrată, simetrică. Quatro este cel mai popular format de pavaj exterior, disponibil într-o gamă completă de 19 variante: pavaj simplu, variante SMART de înaltă rezistență, dale tactile și marcaje speciale.',
        image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1.-Quatro-20-x-20-cm-gri.avif',
        dimensions: '19 variante',
        weight: 'Vezi pagina dedicată pentru fiecare variantă',
        featured: true,
      },
      quatroVariants
    )

    return [...rest.slice(0, 3), quatroHub, ...rest.slice(3)]
  }, [])
}

export function StandardCategoryPage() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const filterTriggerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const allProducts = useStandardProducts()
  const facets = useMemo(() => buildProductFacets(allProducts), [allProducts])
  const filters = useMemo(() => parseFiltersFromSearchParams(searchParams), [searchParams])
  const sortKey = useMemo(() => parseSortFromSearchParams(searchParams), [searchParams])

  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter((p) => matchesFilters(p, filters))
    return sortProducts(filtered, sortKey)
  }, [allProducts, filters, sortKey])

  useCategoryListSEO(allProducts, STANDARD_FAQ, {
    path: '/pavaje-standard',
    title: 'Pavaje Standard - Holland, Autobloc, Unda, Quatro | Petra Pavaje',
    description:
      'Gama Pavaje Standard Petra Pavaje: Holland, Autobloc, Unda, Quatro, Con și Pavaje Eco — soluții robuste, cu raport optim calitate-preț, pentru trotuare, alei și trafic auto intens.',
    breadcrumbLabel: 'Pavaje Standard',
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
              <span className="text-white">Pavaje Standard</span>
            </nav>
            <h1 className="heading-h1 mb-4">Pavaje Standard</h1>
            <p className="text-body-lg text-charcoal-400 max-w-3xl">
              Soluții robuste din beton vibropresat pentru orice tip de proiect — de la trotuare pietonale până la
              parcări și drumuri de acces cu trafic auto intens, cu cel mai bun raport calitate-preț.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-white border-b border-charcoal-100">
        <div className="container-premium">
          <h2 className="heading-h3 text-charcoal-900 mb-3">Ce sunt pavajele Standard Petra Pavaje?</h2>
          <p className="text-body text-charcoal-600 max-w-3xl">
            Pavajele Standard sunt gândite pentru amenajări funcționale: grosimi de la 4 la 10 cm — inclusiv variante
            întărite pentru trafic auto greu — culori esențiale și, pentru gama Quatro, un sistem complet de dale
            simple, întărite (SMART), tactile și de marcaj urban. Față de gama Premium, Standard păstrează o paletă
            de culori mai restrânsă și mizează pe robustețe și preț.
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
                      <ProductGridCard
                        product={product}
                        basePath="/pavaje-standard"
                        badgeLabel="Popular"
                        extraBadge={product.slug === 'quatro' ? '19 Variante' : undefined}
                      />
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
            <h2 className="heading-h3 text-charcoal-900 mb-3">Nu știi ce pavaj să alegi?</h2>
            <p className="text-body text-charcoal-600 mb-6">
              Echipa noastră te poate ajuta să alegi modelul și grosimea potrivite pentru tipul de trafic al
              proiectului tău, sau poți estima singur cantitatea necesară cu calculatorul de pavaj.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/contact" className="btn-primary">
                <MessageCircle className="w-4 h-4 mr-2" />
                Cere o ofertă
              </Link>
              <Link to="/calculator" className="btn-secondary">
                <Calculator className="w-4 h-4 mr-2" />
                Calculator pavaj
              </Link>
            </div>
            <p className="text-sm text-charcoal-500 mt-6">
              Cauți mai multe culori și finisaje?{' '}
              <Link to="/pavaje-premium" className="link-premium">
                Vezi și gama Pavaje Premium
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
            <h2 className="heading-h2 text-charcoal-900">Tot ce trebuie să știi despre gama Standard</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {STANDARD_FAQ.map((item, idx) => (
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
