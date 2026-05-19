import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Phone, ChevronLeft, ChevronRight, Ruler, Weight, BadgeCheck } from 'lucide-react'
import { getProductBySlug, getProductsByCategory } from '@/data/products'

const productGalleryMap: Record<string, string[]> = {
  roca: [
    'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
    'https://petrapavaje.ro/wp-content/uploads/mediterana-homepage.avif',
    'https://petrapavaje.ro/wp-content/uploads/relief-homepage.avif',
    'https://petrapavaje.ro/wp-content/uploads/gemina-homepage.avif',
    'https://petrapavaje.ro/wp-content/uploads/holland-Medium.avif',
  ],
  antic: [
    'https://petrapavaje.ro/wp-content/uploads/Antic-MIX-6.72-gri-antic-1-Medium.avif',
    'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
    'https://petrapavaje.ro/wp-content/uploads/mediterana-homepage.avif',
  ],
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

  const product = getProductBySlug(productSlug || '')
  const images = productGalleryMap[productSlug || ''] || product?.gallery || []
  const relatedProducts = product ? getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4) : []

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

      <section className="py-12 md:py-16">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 mb-4 group">
                <img
                  src={images[currentImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      <ChevronLeft className="w-5 h-5 text-charcoal-900" />
                    </button>
                    <button
                      onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5 text-charcoal-900" />
                    </button>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
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
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  product.category === 'premium'
                    ? 'bg-brand-100 text-brand-700'
                    : 'bg-charcoal-100 text-charcoal-700'
                }`}>
                  {product.category === 'premium' ? 'Pavaj Premium' : 'Pavaj Standard'}
                </span>
                <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-stone-100 text-charcoal-700">
                  <BadgeCheck className="w-3 h-3" />
                  Garanție 5 ani
                </span>
              </div>

              <h1 className="heading-h1 text-charcoal-900 mb-4">{product.name}</h1>
              <p className="text-body-lg text-charcoal-600 mb-8">{product.description}</p>

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
                <h3 className="text-sm font-semibold text-charcoal-900 mb-2">Culori disponibile</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <span key={color.name} className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-100 text-charcoal-700 text-sm rounded-lg">
                      <span
                        className="w-4 h-4 rounded-full border border-charcoal-200"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.name}
                    </span>
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

              {product.dimensionsList && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-charcoal-900 mb-4">Dimensiuni și Ambalare</h3>
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
                            <td className="text-right py-2 px-2 text-charcoal-600">{dim.kgPerPallet}</td>
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
                  Solicita Ofertă
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

      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-16 bg-charcoal-50">
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
                      src={productGalleryMap[p.slug]?.[0] || p.image}
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
    </div>
  )
}
