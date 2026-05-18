import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react'
import { getProductBySlug, getProductsByCategory } from '@/data/products'
import { Product } from '@/data/types'

const productImages: Record<string, string[]> = {
  roca: [
    'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
    'https://petrapavaje.ro/wp-content/uploads/mediterana-homepage.avif',
    'https://petrapavaje.ro/wp-content/uploads/relief-homepage.avif',
  ],
  antic: [
    'https://petrapavaje.ro/wp-content/uploads/Antic-MIX-6.72-gri-antic-1-Medium.avif',
    'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  ],
  gemina: [
    'https://petrapavaje.ro/wp-content/uploads/web-Gemina-maro-si-galben-Medium.avif',
    'https://petrapavaje.ro/wp-content/uploads/gemina-homepage.avif',
  ],
}

export function ProductDetailPage() {
  const { product: productSlug } = useParams<{ product: string }>()
  const [currentImage, setCurrentImage] = useState(0)

  const product = getProductBySlug(productSlug || '')
  const images = productImages[productSlug || ''] || product?.gallery || []
  const relatedProducts = product ? getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4) : []

  if (!product) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="heading-h1 text-anthracite-900 mb-4">Produs negasit</h1>
        <Link to="/produse" className="btn-primary">Inapoi la produse</Link>
      </div>
    )
  }

  return (
    <div className="pt-20 md:pt-24">
      {/* Breadcrumbs */}
      <div className="bg-anthracite-50 border-b border-anthracite-100">
        <div className="container-premium py-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" className="text-anthracite-500 hover:text-anthracite-700 transition-colors">Acasa</Link>
            <span className="text-anthracite-300">/</span>
            <Link to={`/produse/pavaje-${product.category}`} className="text-anthracite-500 hover:text-anthracite-700 transition-colors capitalize">
              Pavaje {product.category}
            </Link>
            <span className="text-anthracite-300">/</span>
            <span className="text-anthracite-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Hero */}
      <section className="py-12 md:py-16">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 mb-4">
                <img
                  src={images[currentImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImage ? 'border-primary-600' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  product.category === 'premium'
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-anthracite-100 text-anthracite-700'
                }`}>
                  {product.category === 'premium' ? 'Premium' : 'Standard'}
                </span>
              </div>

              <h1 className="heading-h1 text-anthracite-900 mb-4">{product.name}</h1>
              <p className="text-body-lg text-anthracite-600 mb-6">{product.description}</p>

              {/* Colors */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-anthracite-900 mb-2">Culori disponibile</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <span key={color} className="px-3 py-1.5 bg-stone-100 text-anthracite-700 text-sm rounded-lg">
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div className="mb-6 p-4 bg-anthracite-50 rounded-xl">
                <h3 className="text-sm font-semibold text-anthracite-900 mb-3">Specificatii tehnice</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.specs.map((spec) => (
                    <div key={spec.label}>
                      <p className="text-xs text-anthracite-500">{spec.label}</p>
                      <p className="text-sm font-medium text-anthracite-900">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Usage */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-anthracite-900 mb-2">Utilizare recomandata</h3>
                <div className="flex flex-wrap gap-2">
                  {product.usage.map((u) => (
                    <span key={u} className="px-3 py-1.5 bg-accent-50 text-accent-700 text-sm rounded-lg">
                      {u}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact" className="btn-primary flex-1 justify-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Solicita Oferta
                </Link>
                {product.pdfUrl && (
                  <a href={product.pdfUrl} className="btn-secondary flex-1 justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Descarca Fisa
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-16 bg-anthracite-50">
          <div className="container-premium">
            <h2 className="heading-h2 text-anthracite-900 mb-8">Produse similare</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/produse/pavaje-${p.category}/${p.slug}`} className="group block">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 mb-3">
                    <img
                      src={productImages[p.slug]?.[0] || p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-semibold text-anthracite-900 group-hover:text-primary-600 transition-colors">
                    {p.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
