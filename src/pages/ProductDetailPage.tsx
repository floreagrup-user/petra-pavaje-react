import { useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, Phone, ChevronLeft, ChevronRight, Ruler, Weight, BadgeCheck, X, Check } from 'lucide-react'
import { getProductBySlug, getProductsByCategory } from '@/data/products'

const productImageMap: Record<string, string> = {
  roca: 'https://petrapavaje.ro/wp-content/uploads/Roca.avif',
  antic: 'https://petrapavaje.ro/wp-content/uploads/Antic.avif',
  primo: 'https://petrapavaje.ro/wp-content/uploads/primo-rosu-2-web.avif',
  'grand-urban': 'https://petrapavaje.ro/wp-content/uploads/Grand-Urban.avif',
  gemina: 'https://petrapavaje.ro/wp-content/uploads/Gemina.avif',
  cubic: 'https://petrapavaje.ro/wp-content/uploads/Cubic-MIX-7.25-gri-antic-web.avif',
  mistic: 'https://petrapavaje.ro/wp-content/uploads/Mistic-1.avif',
  mediterana: 'https://petrapavaje.ro/wp-content/uploads/Mediterana.avif',
  viena: 'https://petrapavaje.ro/wp-content/uploads/Viena.avif',
  maya: 'https://petrapavaje.ro/wp-content/uploads/Maya.avif',
  roman: 'https://petrapavaje.ro/wp-content/uploads/Roman-1.avif',
  sahara: 'https://petrapavaje.ro/wp-content/uploads/Sahara.avif',
  alpin: 'https://petrapavaje.ro/wp-content/uploads/Alpin.avif',
  pastel: 'https://petrapavaje.ro/wp-content/uploads/Pastel.avif',
  timber: 'https://petrapavaje.ro/wp-content/uploads/Timber.avif',
  terranova: 'https://petrapavaje.ro/wp-content/uploads/Terranova.avif',
  dacic: 'https://petrapavaje.ro/wp-content/uploads/Dacic.avif',
  relief: 'https://petrapavaje.ro/wp-content/uploads/Relief.avif',
  holland: 'https://petrapavaje.ro/wp-content/uploads/holland-Medium.avif',
}

const productGalleryMap: Record<string, string[]> = {
  gemina: [
    'https://petrapavaje.ro/wp-content/uploads/web-Gemina-maro-si-galben-Medium.avif',
    'https://petrapavaje.ro/wp-content/uploads/gemina-homepage.avif',
    'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  ],
  'grand-urban': [
    'https://petrapavaje.ro/wp-content/uploads/Grand-urban-100-x-50-cm-gri-bazaltic-1-Medium.avif',
    'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  ],
  mistic: [
    'https://petrapavaje.ro/wp-content/uploads/Mistic-MIX-6.30-gri-bazaltic-Medium.avif',
    'https://petrapavaje.ro/wp-content/uploads/relief-homepage.avif',
  ],
  holland: [
    'https://petrapavaje.ro/wp-content/uploads/holland-Medium.avif',
    'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  ],
}

export function ProductDetailPage() {
  const { product: productSlug } = useParams<{ product: string }>()
  const [currentImage, setCurrentImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [showAllGallery, setShowAllGallery] = useState(false)
  const [showAllPatterns, setShowAllPatterns] = useState(false)

  const product = getProductBySlug(productSlug || '')
  const images = productGalleryMap[productSlug || ''] || product?.gallery || []
  const heroImages = product?.heroImages || images.slice(0, 3)
  const relatedProducts = product ? getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4) : []

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  if (!product) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="heading-h1 text-charcoal-900 mb-4">Produs negăsit</h1>
        <p className="text-charcoal-500 mb-8">Produsul pe care îl cauți nu există.</p>
        <Link to="/produse" className="btn-primary">Înapoi la produse</Link>
      </div>
    )
  }

  const categorySlug = product.category === 'premium' ? 'pavaje-premium' : 'pavaje-standard'
  const displayedGallery = showAllGallery ? images : images.slice(0, 12)
  const displayedPatterns = showAllPatterns ? product.patternImages || [] : (product.patternImages || []).slice(0, 12)

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-6">
        <div className="container-premium">
          <nav className="flex items-center gap-2 text-sm text-charcoal-400">
            <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
            <span>/</span>
            <Link to={`/produse/${categorySlug}`} className="hover:text-white transition-colors capitalize">
              {product.category === 'premium' ? 'Pavaje Premium' : 'Pavaje Standard'}
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 mb-4 group">
                <img
                  src={heroImages[currentImage] || productImageMap[product.slug] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {heroImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      <ChevronLeft className="w-5 h-5 text-charcoal-900" />
                    </button>
                    <button
                      onClick={() => setCurrentImage((prev) => (prev + 1) % heroImages.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5 text-charcoal-900" />
                    </button>
                  </>
                )}
              </div>
              {heroImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {heroImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImage ? 'border-brand-600' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
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
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  product.category === 'premium'
                    ? 'bg-brand-100 text-brand-700'
                    : 'bg-charcoal-100 text-charcoal-700'
                }`}>
                  PAVAJ PREMIUM
                </span>
                <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-stone-100 text-charcoal-700">
                  <BadgeCheck className="w-3 h-3" />
                  Garanție 5 ani
                </span>
              </div>

              <h1 className="heading-h1 text-charcoal-900 mb-3">{product.name}</h1>
              {product.shortDescription && (
                <p className="text-body-lg text-brand-600 font-semibold mb-4">{product.shortDescription}</p>
              )}
              <p className="text-body-lg text-charcoal-600 mb-6 leading-relaxed">{product.description}</p>

              {product.heroFeatures && product.heroFeatures.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-6">
                  {product.heroFeatures.map((f) => (
                    <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-700 text-sm rounded-lg">
                      <Check className="w-3.5 h-3.5" />
                      {f}
                    </span>
                  ))}
                </div>
              )}

              {product.mixModes && product.mixModes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-charcoal-900 mb-2 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-brand-600" />
                    Modele MIX disponibile
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.mixModes.map((mode) => (
                      <span key={mode} className="px-3 py-1.5 bg-charcoal-100 text-charcoal-700 text-sm rounded-lg">
                        {mode}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-charcoal-900 mb-3">Culori disponibile</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {product.colors.map((color) => (
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
                        <div
                          className="aspect-[4/3] w-full"
                          style={{ backgroundColor: color.hex }}
                        />
                      )}
                      <p className="text-xs font-medium text-center py-1.5 text-charcoal-700">{color.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6 p-6 bg-charcoal-50 rounded-xl">
                <h3 className="text-sm font-semibold text-charcoal-900 mb-4 flex items-center gap-2">
                  <Weight className="w-4 h-4 text-brand-600" />
                  Specificații tehnice
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.specs.map((spec) => (
                    <div key={spec.label}>
                      <p className="text-xs text-charcoal-500">{spec.label}</p>
                      <p className="text-sm font-medium text-charcoal-900">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {product.dimensionsList && product.dimensionsList.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-charcoal-900 mb-3">Dimensiuni și Ambalare</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-charcoal-200">
                          <th className="text-left py-2 pr-4 font-medium text-charcoal-500">Dimensiuni</th>
                          <th className="text-right py-2 px-2 font-medium text-charcoal-500">Buc/MP</th>
                          <th className="text-right py-2 px-2 font-medium text-charcoal-500">Buc/Palet</th>
                          <th className="text-right py-2 px-2 font-medium text-charcoal-500">Kg/Palet</th>
                          <th className="text-right py-2 pl-2 font-medium text-charcoal-500">MP/Palet</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.dimensionsList.map((dim) => (
                          <tr key={dim.label} className="border-b border-charcoal-100">
                            <td className="py-2 pr-4 font-medium text-charcoal-900">{dim.label}</td>
                            <td className="text-right py-2 px-2 text-charcoal-600">{dim.piecesPerMp}</td>
                            <td className="text-right py-2 px-2 text-charcoal-600">{dim.piecesPerPallet}</td>
                            <td className="text-right py-2 px-2 text-charcoal-600">{dim.kgPerPallet.toLocaleString()}</td>
                            <td className="text-right py-2 pl-2 text-charcoal-600">{dim.mpPerPallet}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-charcoal-900 mb-2">Utilizare recomandată</h3>
                <div className="flex flex-wrap gap-2">
                  {product.usage.map((u) => (
                    <span key={u} className="px-3 py-1.5 bg-brand-50 text-brand-700 text-sm rounded-lg">
                      {u}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact" className="btn-primary flex-1 justify-center group">
                  <Phone className="w-4 h-4 mr-2" />
                  Solicită Ofertă
                </Link>
                {product.pdfUrl && (
                  <a href={product.pdfUrl} className="btn-secondary flex-1 justify-center group">
                    <Download className="w-4 h-4 mr-2" />
                    Descarcă Fișa
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {product.dimensionImages && product.dimensionImages.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="container-premium">
            <div className="text-center mb-10">
              <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">Dimensiuni Disponibile</p>
              <h2 className="heading-h2 text-charcoal-900">Alege Dimensiunea Potrivită</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {product.dimensionImages.map((dimImg, idx) => {
                const dim = product.dimensionsList?.[idx]
                return (
                  <div key={idx} className="group text-center">
                    <div className="aspect-square rounded-xl overflow-hidden bg-stone-50 border border-charcoal-100 mb-4 p-4 flex items-center justify-center">
                      <img
                        src={dimImg}
                        alt={dim?.label || `Dimensiune ${idx + 1}`}
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <h4 className="font-semibold text-charcoal-900">{dim?.label || `Dimensiune ${idx + 1}`}</h4>
                    {dim && (
                      <p className="text-sm text-charcoal-500">{dim.piecesPerMp} buc/mp</p>
                    )}
                  </div>
                )
              })}
              {product.mixModes && product.mixModes.length > 0 && (
                <div className="group text-center">
                  <div className="aspect-square rounded-xl overflow-hidden bg-brand-50 border border-brand-200 mb-4 flex items-center justify-center">
                    <div className="text-center p-4">
                      <Ruler className="w-10 h-10 text-brand-600 mx-auto mb-2" />
                      <p className="font-semibold text-brand-700">{product.mixModes[0]}</p>
                    </div>
                  </div>
                  <h4 className="font-semibold text-charcoal-900">Mix de dimensiuni</h4>
                  <p className="text-sm text-charcoal-500 mb-2">Ideal pentru spații generoase</p>
                  {(() => {
                    const mixDim = product.dimensionsList?.find(d => d.label.includes('MIX'))
                    if (mixDim?.mixComposition) {
                      return (
                        <div className="space-y-1">
                          {mixDim.mixComposition.map((mc, i) => (
                            <p key={i} className="text-xs text-charcoal-600">
                              {mc.dimensions} — {mc.pieces} buc
                            </p>
                          ))}
                        </div>
                      )
                    }
                    return null
                  })()}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {images.length > 3 && (
        <section id="galerie" className="py-12 md:py-16 bg-charcoal-50">
          <div className="container-premium">
            <div className="text-center mb-10">
              <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">Galerie Foto</p>
              <h2 className="heading-h2 text-charcoal-900">Proiecte {product.name}</h2>
              <p className="text-charcoal-500 mt-3 max-w-2xl mx-auto">
                Descoperă realizările noastre cu pavaje {product.name} în diverse tipuri de amenajări
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {displayedGallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => openLightbox(idx)}
                  className="group aspect-[4/3] rounded-lg overflow-hidden bg-stone-100"
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
            {images.length > 12 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAllGallery(!showAllGallery)}
                  className="btn-secondary"
                >
                  {showAllGallery ? 'Arată mai puține' : `Vezi toate imaginile (${images.length})`}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {product.patternImages && product.patternImages.length > 0 && (
        <section id="modele-montaj" className="py-12 md:py-16 bg-white">
          <div className="container-premium">
            <div className="text-center mb-10">
              <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">Ghid de Montaj</p>
              <h2 className="heading-h2 text-charcoal-900">Modele de Montaj</h2>
              <p className="text-charcoal-500 mt-3 max-w-2xl mx-auto">
                Alege modelul de montaj potrivit pentru proiectul tău. Fiecare model creează un efect vizual unic.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedPatterns.map((img, idx) => (
                <div key={idx} className="group aspect-square rounded-lg overflow-hidden bg-stone-50 border border-charcoal-100">
                  <img
                    src={img}
                    alt={`Model montaj ${idx + 1}`}
                    className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            {product.patternImages.length > 12 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAllPatterns(!showAllPatterns)}
                  className="btn-secondary"
                >
                  {showAllPatterns ? 'Arată mai puține' : `Vezi toate modelele de montaj (${product.patternImages.length})`}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="container-premium">
            <h2 className="heading-h2 text-charcoal-900 mb-8">Produse similare</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/produse/${categorySlug}/${p.slug}`}
                  className="group block"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 mb-3">
                    <img
                      src={p.gallery?.[0] || productImageMap[p.slug] || p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-semibold text-charcoal-900 group-hover:text-brand-600 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-charcoal-500">{p.category === 'premium' ? 'Pavaj Premium' : 'Pavaj Standard'}</p>
                </Link>
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
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
          >
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
            src={images[lightboxIndex]}
            alt={`${product.name} ${lightboxIndex + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 text-white/60 text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  )
}
