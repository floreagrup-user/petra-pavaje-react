import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { products, getProductsByCategory } from '@/data/products'
import { categories } from '@/data/site'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { productImages } from '@/data/images'

export function ProductCategoryPage() {
  const { category } = useParams<{ category: string }>()
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  const categoryData = categories.find(c => c.slug === category)
  const categoryProducts = category
    ? getProductsByCategory(category.replace('pavaje-', ''))
    : products

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-16 md:py-20">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6">
              <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
              <span>/</span>
              <span className="text-white">{categoryData?.name || 'Produse'}</span>
            </nav>
            <h1 className="heading-h1 mb-4">{categoryData?.name || 'Toate Produsele'}</h1>
            <p className="text-body-lg text-charcoal-400 max-w-3xl">
              {categoryData?.description || 'Explorează întreaga gamă de produse Petra Pavaje.'}
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="py-16 md:py-24">
        <div className="container-premium">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-charcoal-100">
            <p className="text-sm text-charcoal-500">
              <span className="font-semibold text-charcoal-900">{categoryProducts.length}</span> produse
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  to={`/produse/${category}/${product.slug}`}
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
                      <div className="absolute top-3 left-3 px-2 py-1 bg-brand-600 text-white text-xs font-medium rounded-md">
                        Premium
                      </div>
                    )}
                    <div className="absolute inset-0 bg-charcoal-950/0 group-hover:bg-charcoal-950/10 transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal-900 group-hover:text-brand-600 transition-colors mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-charcoal-500 mb-2 line-clamp-2">{product.shortDescription}</p>
                  <div className="flex items-center text-brand-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
                    Vezi detalii
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
