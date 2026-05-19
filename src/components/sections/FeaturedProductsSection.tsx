import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { getFeaturedProducts } from '@/data/products'

const productImages: Record<string, string> = {
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
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">
              Produse Preferate
            </p>
            <h2 className="heading-h1 text-charcoal-900">
              Alegerea clienților noștri
            </h2>
          </div>
          <Link
            to="/produse/pavaje-premium"
            className="mt-4 md:mt-0 inline-flex items-center text-brand-600 font-medium hover:gap-3 gap-2 transition-all group"
          >
            Vezi toate produsele
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-brand-600 text-white text-xs font-medium rounded-md">
                      <Star className="w-3 h-3" />
                      Premium
                    </div>
                  )}
                  <div className="absolute inset-0 bg-charcoal-950/0 group-hover:bg-charcoal-950/10 transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-semibold text-charcoal-900 group-hover:text-brand-600 transition-colors mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-charcoal-500 mb-2">
                  {product.category === 'premium' ? 'Pavaj Premium' : 'Pavaj Standard'}
                </p>
                <div className="flex items-center text-brand-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
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
