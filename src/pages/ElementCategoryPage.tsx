import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Check, ShieldCheck, Award, ChevronDown, FileText } from 'lucide-react'
import { getElementBySlug } from '@/data/elements'
import { useElementSEO } from '@/hooks/useElementSEO'
import { categoryUrl } from '@/lib/product-urls'

export function ElementCategoryPage({ slug: slugProp }: { slug?: string } = {}) {
  const { category: parentSlug, element: elementSlug } = useParams<{ category?: string; element?: string }>()
  const slug = slugProp || elementSlug || parentSlug
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const category = getElementBySlug(slug || '')
  useElementSEO(category)

  if (!category) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="heading-h1 text-charcoal-900 mb-4">Categorie negăsită</h1>
        <p className="text-charcoal-500 mb-8">Categoria pe care o cauți nu există.</p>
        <Link to="/produse" className="btn-primary">Înapoi la produse</Link>
      </div>
    )
  }

  const parentHref = category.parent ? categoryUrl(category.parent.slug) : '/produse'
  const parentLabel = category.parent ? category.parent.name : 'Produse'

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-6">
        <div className="container-premium">
          <nav className="flex items-center gap-2 text-sm text-charcoal-400">
            <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
            <span>/</span>
            <Link to={parentHref} className="hover:text-white transition-colors">{parentLabel}</Link>
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
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-brand-700 bg-brand-50 border border-brand-200 rounded-full mb-4">
                {parentLabel}
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

              {category.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-charcoal-900 mb-3">Culori disponibile</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {category.colors.map((color) => (
                      <div key={color.name} className="group relative overflow-hidden rounded-lg border border-charcoal-200 bg-white">
                        {color.image ? (
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                              src={color.image}
                              alt={color.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="aspect-[4/3] w-full" style={{ backgroundColor: color.hex }} />
                        )}
                        <p className="text-xs font-medium text-center py-1.5 text-charcoal-700">{color.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {category.technicalFeatures.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-charcoal-900 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-600" />
                    Caracteristici tehnice
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
                    Avantaje
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
                <h3 className="text-sm font-semibold text-charcoal-900 mb-2">Utilizare recomandată</h3>
                <div className="flex flex-wrap gap-2">
                  {category.usage.map((u) => (
                    <span key={u} className="px-3 py-1.5 bg-brand-50 text-brand-700 text-sm rounded-lg">
                      {u}
                    </span>
                  ))}
                </div>
              </div>

              <Link to="/contact" className="btn-primary justify-center group inline-flex">
                <Phone className="w-4 h-4 mr-2" />
                Solicită Ofertă
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {category.variantGroups.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="container-premium">
            <div className="text-center mb-10">
              <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">Dimensiuni Disponibile</p>
              <h2 className="heading-h2 text-charcoal-900">Date Tehnice și Caracteristici</h2>
            </div>

            <div className="space-y-10 max-w-4xl mx-auto">
              {category.variantGroups.map((group) => {
                const hasPiecesPerMl = group.variants.some((v) => v.piecesPerMl !== undefined)
                const hasPalletizing = group.variants.some((v) => v.mlPerPallet !== undefined)
                const hasPiecesPerTruck = group.variants.some((v) => v.piecesPerTruck !== undefined)
                const hasCode = group.variants.some((v) => v.code && v.code !== '—')
                return (
                  <div key={group.name}>
                    <div className="flex items-baseline justify-between mb-3 gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold text-charcoal-900">{group.name}</h3>
                      <span className="text-sm text-charcoal-500">{group.variants.length} variante</span>
                    </div>
                    {group.note && (
                      <p className="text-sm text-charcoal-500 mb-3">{group.note}</p>
                    )}
                    <div className="overflow-x-auto rounded-xl border border-charcoal-100">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-charcoal-200 bg-charcoal-50">
                            <th className="text-left py-2.5 px-4 font-medium text-charcoal-500">Denumire</th>
                            {hasCode && <th className="text-left py-2.5 px-3 font-medium text-charcoal-500">Cod</th>}
                            <th className="text-left py-2.5 px-3 font-medium text-charcoal-500">Dimensiuni</th>
                            {hasPiecesPerMl && <th className="text-right py-2.5 px-3 font-medium text-charcoal-500">Buc/ML</th>}
                            <th className="text-right py-2.5 px-3 font-medium text-charcoal-500">Kg</th>
                            {hasPalletizing && <th className="text-right py-2.5 px-4 font-medium text-charcoal-500">ML/Palet</th>}
                            {hasPiecesPerTruck && <th className="text-right py-2.5 px-4 font-medium text-charcoal-500">Buc/Camion</th>}
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
                              {hasCode && <td className="py-2.5 px-3 text-charcoal-500">{v.code !== '—' ? v.code : '—'}</td>}
                              <td className="py-2.5 px-3 text-charcoal-600">{v.dimensions}</td>
                              {hasPiecesPerMl && (
                                <td className="text-right py-2.5 px-3 text-charcoal-600">{v.piecesPerMl ?? '—'}</td>
                              )}
                              <td className="text-right py-2.5 px-3 text-charcoal-600">{v.weightKg}</td>
                              {hasPalletizing && (
                                <td className="text-right py-2.5 px-4 text-charcoal-600">{v.mlPerPallet ?? '—'}</td>
                              )}
                              {hasPiecesPerTruck && (
                                <td className="text-right py-2.5 px-4 text-charcoal-600">{v.piecesPerTruck ?? '—'}</td>
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
      )}

      {category.documents && category.documents.length > 0 && (
        <section className="py-12 md:py-16 bg-charcoal-50">
          <div className="container-premium">
            <div className="text-center mb-10">
              <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">Documente Produs</p>
              <h2 className="heading-h2 text-charcoal-900">Fișe Tehnice și Declarații de Performanță</h2>
            </div>
            <div className="max-w-3xl mx-auto divide-y divide-charcoal-100 border border-charcoal-100 rounded-xl overflow-hidden bg-white">
              {category.documents.map((doc) => (
                <div key={doc.label} className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-medium text-charcoal-900">{doc.label}</p>
                    {doc.productCode && (
                      <p className="text-xs text-charcoal-500">cod produs {doc.productCode}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {doc.datasheetUrl && (
                      <a href={doc.datasheetUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal-100 text-charcoal-700 text-xs font-medium rounded-lg hover:bg-charcoal-200 transition-colors">
                        <FileText className="w-3.5 h-3.5" />
                        Fișă tehnică
                      </a>
                    )}
                    {doc.declarationUrl && (
                      <a href={doc.declarationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal-100 text-charcoal-700 text-xs font-medium rounded-lg hover:bg-charcoal-200 transition-colors">
                        <FileText className="w-3.5 h-3.5" />
                        Declarație UE
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {category.faq && category.faq.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="container-premium">
            <div className="text-center mb-10">
              <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">Întrebări Frecvente</p>
              <h2 className="heading-h2 text-charcoal-900">Tot ce trebuie să știi despre {category.title}</h2>
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
    </div>
  )
}
