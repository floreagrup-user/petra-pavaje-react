import { useState, useCallback } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, ChevronLeft, ChevronRight, Check, ShieldCheck, Award, X, ChevronDown, Calculator } from 'lucide-react'
import { getWoodstoneCategoryBySlug, localizeWoodstoneCategory } from '@/data/woodstone'
import { useWoodstoneSEO } from '@/hooks/useWoodstoneSEO'
import { isEnglishPath } from '@/lib/i18n-routes'

export function WoodstoneCategoryPage() {
  const { category: categorySlug } = useParams<{ category: string }>()
  const isEnglish = isEnglishPath(useLocation().pathname)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const rawCategory = getWoodstoneCategoryBySlug(categorySlug || '')
  const category = rawCategory ? localizeWoodstoneCategory(rawCategory, isEnglish ? 'en' : 'ro') : rawCategory
  useWoodstoneSEO(category, isEnglish)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => setLightboxOpen(false), [])

  const prevLightbox = useCallback(() => {
    if (!category) return
    setLightboxIndex((prev) => (prev - 1 + category.gallery.length) % category.gallery.length)
  }, [category])

  const nextLightbox = useCallback(() => {
    if (!category) return
    setLightboxIndex((prev) => (prev + 1) % category.gallery.length)
  }, [category])

  if (!category) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="heading-h1 text-charcoal-900 mb-4">{isEnglish ? 'Category Not Found' : 'Categorie negăsită'}</h1>
        <p className="text-charcoal-500 mb-8">{isEnglish ? "The Woodstone category you're looking for doesn't exist." : 'Categoria Woodstone pe care o cauți nu există.'}</p>
        <Link to={isEnglish ? '/en/woodstone-lemn-pietrificat' : '/woodstone-lemn-pietrificat'} className="btn-primary">{isEnglish ? 'Back to Woodstone' : 'Înapoi la Woodstone'}</Link>
      </div>
    )
  }

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-6">
        <div className="container-premium">
          <nav className="flex items-center gap-2 text-sm text-charcoal-400">
            <Link to={isEnglish ? '/en' : '/'} className="hover:text-white transition-colors">{isEnglish ? 'Home' : 'Acasă'}</Link>
            <span>/</span>
            <Link to={isEnglish ? '/en/woodstone-lemn-pietrificat' : '/woodstone-lemn-pietrificat'} className="hover:text-white transition-colors">Woodstone</Link>
            <span>/</span>
            <span className="text-white">{category.title}</span>
          </nav>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100">
                <img
                  src={category.gallery[0] || category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              {category.gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 mt-4">
                  {category.gallery.slice(0, 8).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => openLightbox(idx)}
                      className="shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent opacity-70 hover:opacity-100 transition-all"
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-brand-700 bg-brand-50 border border-brand-200 rounded-full mb-4">
                {isEnglish ? '★ Petrified Wood' : '★ Lemn Pietrificat'}
              </span>
              <h1 className="heading-h1 text-charcoal-900 mb-3">{category.title}</h1>
              <p className="text-body-lg text-brand-600 font-semibold mb-4">{category.shortDescription}</p>
              <p className="text-body-lg text-charcoal-600 mb-6 leading-relaxed">{category.description}</p>

              {category.heroFeatures.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-6">
                  {category.heroFeatures.map((f) => (
                    <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-700 text-sm rounded-lg">
                      <Check className="w-3.5 h-3.5" />
                      {f}
                    </span>
                  ))}
                </div>
              )}

              {category.technicalFeatures.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-charcoal-900 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-600" />
                    {isEnglish ? 'Technical Features' : 'Caracteristici tehnice'}
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {category.technicalFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-charcoal-600">
                        <Check className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {category.advantages.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-charcoal-900 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-brand-600" />
                    {isEnglish ? 'Advantages' : 'Avantaje'}
                  </h3>
                  <ul className="space-y-2">
                    {category.advantages.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-charcoal-600">
                        <Check className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-charcoal-900 mb-2">{isEnglish ? 'Recommended Use' : 'Utilizare recomandată'}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.usage.map((u) => (
                    <span key={u} className="px-3 py-1.5 bg-brand-50 text-brand-700 text-sm rounded-lg">
                      {u}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to={isEnglish ? '/en/contact' : '/contact'} className="btn-primary justify-center group inline-flex">
                  <Phone className="w-4 h-4 mr-2" />
                  {isEnglish ? 'Request a Quote' : 'Solicită Ofertă'}
                </Link>
                <Link to={`${isEnglish ? '/en' : ''}/calculator-pavaj?product=${category.slug}`} className="btn-secondary justify-center group inline-flex">
                  <Calculator className="w-4 h-4 mr-2" />
                  {isEnglish ? 'Calculate Requirement' : 'Calculează necesarul'}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-premium">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">{isEnglish ? 'Available Sizes' : 'Dimensiuni Disponibile'}</p>
            <h2 className="heading-h2 text-charcoal-900">{isEnglish ? 'Technical Data and Specifications' : 'Date Tehnice și Caracteristici'}</h2>
          </div>

          <div className="space-y-10 max-w-4xl mx-auto">
            {category.variantGroups.map((group) => {
              const hasPiecesPerMp = group.variants.some((v) => v.piecesPerMp !== undefined)
              const hasPalletizing = group.variants.some((v) => v.palletizing)
              return (
                <div key={group.name}>
                  <div className="flex items-baseline justify-between mb-3 gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-charcoal-900">{group.name}</h3>
                    <span className="text-sm text-charcoal-500">{group.variants.length} {isEnglish ? 'variants' : 'variante'}</span>
                  </div>
                  {group.note && (
                    <p className="text-sm text-charcoal-500 mb-3">{group.note}</p>
                  )}
                  <div className="overflow-x-auto rounded-xl border border-charcoal-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-charcoal-200 bg-charcoal-50">
                          <th className="text-left py-2.5 px-4 font-medium text-charcoal-500">{isEnglish ? 'Name' : 'Denumire'}</th>
                          <th className="text-left py-2.5 px-3 font-medium text-charcoal-500">{isEnglish ? 'Code' : 'Cod'}</th>
                          <th className="text-left py-2.5 px-3 font-medium text-charcoal-500">{isEnglish ? 'Dimensions (cm)' : 'Dimensiuni (cm)'}</th>
                          {hasPiecesPerMp && <th className="text-right py-2.5 px-3 font-medium text-charcoal-500">{isEnglish ? 'Pcs/m²' : 'Buc/m²'}</th>}
                          <th className="text-right py-2.5 px-3 font-medium text-charcoal-500">{isEnglish ? 'Kg/pc' : 'Kg/buc'}</th>
                          {hasPalletizing && <th className="text-right py-2.5 px-4 font-medium text-charcoal-500">{isEnglish ? 'Palletizing' : 'Paletizare'}</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {group.variants.map((v) => (
                          <tr key={v.name} className="border-b border-charcoal-100 last:border-b-0">
                            <td className="py-2.5 px-4 font-medium text-charcoal-900">
                              {v.name}
                              {v.badge && (
                                <span className="ml-2 inline-block px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-brand-100 text-brand-700 rounded">
                                  {v.badge}
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-charcoal-500">{v.code}</td>
                            <td className="py-2.5 px-3 text-charcoal-600">{v.dimensions}</td>
                            {hasPiecesPerMp && (
                              <td className="text-right py-2.5 px-3 text-charcoal-600">{v.piecesPerMp ?? '—'}</td>
                            )}
                            <td className="text-right py-2.5 px-3 text-charcoal-600">{v.weightKg}</td>
                            {hasPalletizing && (
                              <td className="text-right py-2.5 px-4 text-charcoal-600">{v.palletizing || '—'}</td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {category.gallery.length > 0 && (
        <section id="galerie" className="py-12 md:py-16 bg-charcoal-50">
          <div className="container-premium">
            <div className="text-center mb-10">
              <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">{isEnglish ? 'Photo Gallery' : 'Galerie Foto'}</p>
              <h2 className="heading-h2 text-charcoal-900">{category.title} Woodstone</h2>
              <p className="text-charcoal-500 mt-3 max-w-2xl mx-auto">
                {isEnglish
                  ? `Discover our projects using Woodstone ${category.title.toLowerCase()} across a variety of landscaping styles.`
                  : `Descoperă realizările noastre cu ${category.title.toLowerCase()} Woodstone în diverse tipuri de amenajări.`}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {category.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => openLightbox(idx)}
                  className="group aspect-[4/3] rounded-lg overflow-hidden bg-stone-100"
                >
                  <img
                    src={img}
                    alt={`${category.title} - ${category.shortDescription} - ${isEnglish ? 'image' : 'imagine'} ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {category.faq && category.faq.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="container-premium">
            <div className="text-center mb-10">
              <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">{isEnglish ? 'Frequently Asked Questions' : 'Întrebări Frecvente'}</p>
              <h2 className="heading-h2 text-charcoal-900">{isEnglish ? `Everything you need to know about ${category.title}` : `Tot ce trebuie să știi despre ${category.title}`}</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {category.faq.map((item, idx) => (
                <div key={item.question} className="bg-charcoal-50 rounded-xl border border-charcoal-100 overflow-hidden">
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
      )}

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={(e) => {
            if (e.key === 'Escape') closeLightbox()
            if (e.key === 'ArrowLeft') prevLightbox()
            if (e.key === 'ArrowRight') nextLightbox()
          }}
          tabIndex={0}
        >
          <button onClick={closeLightbox} className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10">
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevLightbox() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextLightbox() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <img
            src={category.gallery[lightboxIndex]}
            alt={`${category.title} - ${category.shortDescription} - ${isEnglish ? 'image' : 'imagine'} ${lightboxIndex + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 text-white/60 text-sm">
            {lightboxIndex + 1} / {category.gallery.length}
          </div>
        </div>
      )}
    </div>
  )
}
