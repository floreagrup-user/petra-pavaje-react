import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { getFeaturedProducts } from '@/data/products'

const productImages: Record<string, string> = {
  gemina: 'https://petrapavaje.ro/wp-content/uploads/web-Gemina-maro-si-galben-Medium.avif',
  antic: 'https://petrapavaje.ro/wp-content/uploads/Antic-MIX-6.72-gri-antic-1-Medium.avif',
  'grand-urban': 'https://petrapavaje.ro/wp-content/uploads/Grand-urban-100-x-50-cm-gri-bazaltic-1-Medium.avif',
  mistic: 'https://petrapavaje.ro/wp-content/uploads/Mistic-MIX-6.30-gri-bazaltic-Medium.avif',
  primo: 'https://petrapavaje.ro/wp-content/uploads/Primo-20x10x6-rosu-Medium.avif',
  relief: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-Medium.avif',
}

export function FeaturedProductsSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })
  const featuredProducts = getFeaturedProducts()

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16"
        >
          <div>
            <p className="text-primary-600 text-sm font-medium tracking-widest uppercase mb-3">
              Produse Preferate
            </p>
            <h2 className="heading-h1 text-anthracite-900">
              Alegerea clienților noștri
            </h2>
          </div>
          <Link
            to="/produse/pavaje-premium"
            className="mt-4 md:mt-0 inline-flex items-center text-primary-600 font-medium hover:gap-3 gap-2 transition-all"
          >
            Vezi toate produsele
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                to={`/produse/pavaje-${product.category}/${product.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-100 mb-4">
                  <img
                    src={productImages[product.slug] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {product.featured && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded-md">
                      <Star className="w-3 h-3" />
                      Premium
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-anthracite-900 group-hover:text-primary-600 transition-colors mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-anthracite-500 mb-2">
                  {product.category === 'premium' ? 'Pavaj Premium' : 'Pavaj Standard'}
                </p>
                <div className="flex items-center text-primary-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Vezi detalii
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
