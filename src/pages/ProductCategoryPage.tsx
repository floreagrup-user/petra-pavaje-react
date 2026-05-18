import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Filter, Grid, List } from 'lucide-react'
import { products, getProductsByCategory } from '@/data/products'
import { useIntersectionObserver } from '@/hooks/use-scroll'

const productImages: Record<string, string> = {
  roca: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  antic: 'https://petrapavaje.ro/wp-content/uploads/Antic-MIX-6.72-gri-antic-1-Medium.avif',
  primo: 'https://petrapavaje.ro/wp-content/uploads/Primo-20x10x6-rosu-Medium.avif',
  'grand-urban': 'https://petrapavaje.ro/wp-content/uploads/Grand-urban-100-x-50-cm-gri-bazaltic-1-Medium.avif',
  gemina: 'https://petrapavaje.ro/wp-content/uploads/web-Gemina-maro-si-galben-Medium.avif',
  cubic: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  mistic: 'https://petrapavaje.ro/wp-content/uploads/Mistic-MIX-6.30-gri-bazaltic-Medium.avif',
  mediterana: 'https://petrapavaje.ro/wp-content/uploads/mediterana-homepage.avif',
  viena: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  maya: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  roman: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  sahara: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  alpin: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  pastel: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  timber: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  terranova: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  dacic: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  relief: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-Medium.avif',
  stretto: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  holland: 'https://petrapavaje.ro/wp-content/uploads/holland-Medium.avif',
  autobloc: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  unda: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  quatro: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  con: 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
  'pavaje-eco': 'https://petrapavaje.ro/wp-content/uploads/web-prima-pagina-1-Medium.avif',
}

const categoryInfo: Record<string, { title: string; description: string }> = {
  'pavaje-premium': {
    title: 'Pavaje Premium',
    description: 'Pavaje de cea mai inalta calitate, inspirate din natura. Varietatea nuantelor si texturilor creeaza spatii outdoor de exceptie.',
  },
  'pavaje-standard': {
    title: 'Pavaje Standard',
    description: 'Solutii eficiente si durabile pentru orice proiect. Raport optim calitate-pret pentru amenajari functionale.',
  },
}

export function ProductCategoryPage() {
  const { category } = useParams<{ category: string }>()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  const categoryProducts = category ? getProductsByCategory(category.replace('pavaje-', '')) : products
  const info = category ? categoryInfo[category] : { title: 'Toate Produsele', description: '' }

  return (
    <div className="pt-20 md:pt-24">
      {/* Breadcrumbs */}
      <div className="bg-charcoal-50 border-b border-charcoal-100">
        <div className="container-premium py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-charcoal-500 hover:text-charcoal-700 transition-colors">Acasa</Link>
            <span className="text-charcoal-300">/</span>
            <span className="text-charcoal-900 font-medium">{info?.title}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="section-padding bg-white pb-12">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-h1 text-charcoal-900 mb-4">{info?.title}</h1>
            <p className="text-body-lg text-charcoal-500 max-w-3xl">{info?.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section ref={ref} className="pb-16 md:pb-24">
        <div className="container-premium">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-charcoal-100">
            <p className="text-sm text-charcoal-500">
              {categoryProducts.length} produse
            </p>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-charcoal-50 transition-colors">
                <Filter className="w-5 h-5 text-charcoal-600" />
              </button>
              <div className="flex items-center gap-1 bg-charcoal-50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid className="w-4 h-4 text-charcoal-600" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="w-4 h-4 text-charcoal-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
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
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal-900 group-hover:text-brand-600 transition-colors mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-charcoal-500 mb-2">{product.shortDescription}</p>
                  <div className="flex items-center text-brand-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Vezi detalii
                    <ArrowRight className="w-4 h-4 ml-1" />
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
