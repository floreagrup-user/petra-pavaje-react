import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { categories } from '@/data/site'
import { categoryUrl } from '@/lib/product-urls'
import { isEnglishPath } from '@/lib/i18n-routes'

// Only Premium and Standard are actually translated (see products.en.ts) --
// the rest of the catalog stays Romanian, same scoping as the /en site
// everywhere else. Names/descriptions here are still given an English label
// for a consistent-looking grid; untranslated cards route to the RO page
// and say so, matching the "Blog (RO)" convention used in enMenu.
const CATEGORY_EN: Record<string, { name: string; description: string; translated: boolean }> = {
  premium: { name: 'Premium Pavers', description: 'The highest-quality pavers, inspired by nature. A variety of shades and textures creates exceptional outdoor spaces.', translated: true },
  standard: { name: 'Standard Pavers', description: 'Efficient, durable solutions for any project. The best value for money for functional landscaping.', translated: true },
  woodstone: { name: 'Woodstone - Petrified Wood', description: 'The beauty of wood combined with the durability of concrete. A complete range for natural landscaping.', translated: false },
  borduri: { name: 'Curbs', description: 'Concrete curbs for delimiting and organizing spaces. Multiple sizes and finishes.', translated: false },
  boltari: { name: 'Concrete Blocks', description: 'Concrete blocks for sturdy construction. Solid and durable.', translated: false },
  garduri: { name: 'Fences', description: 'Precast concrete fences in various styles: Baroc, Modern, Robusto.', translated: false },
  rigole: { name: 'Drainage Channels', description: 'An efficient drainage system for walkways, parking lots and road infrastructure.', translated: false },
  jardiniere: { name: 'Planters', description: 'Concrete accessories for landscaping green spaces, terraces and gardens.', translated: false },
  palisada: { name: 'Palisade', description: 'Structure and contour for landscape design.', translated: false },
  treapta: { name: 'Steps', description: 'Concrete steps for level changes in the garden or at the entrance.', translated: false },
  'bloc-de-zid': { name: 'Wall Blocks', description: 'Rugged elements for fences and retaining walls.', translated: false },
  'elemente-de-canalizare': { name: 'Sewage Elements', description: 'Precast concrete elements for sewage networks and road infrastructure.', translated: false },
}

export const categoryImages: Record<string, string> = {
  premium: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/web-prima-pagina-1-Medium.avif',
  standard: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/holland-Medium.avif',
  woodstone: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/woodstoone-Medium.avif',
  borduri: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/borduri-Medium.avif',
  boltari: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/boltari-home-page-1-Medium.avif',
  garduri: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/web-prima-pagina-2-Medium.avif',
  rigole: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2020/06/rigola-1200x800-1.jpg',
  jardiniere: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1.-Jardiniera-40-x-30-x-25cm-rosu-Large.avif',
  palisada: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/palisada.avif',
  treapta: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/treapta.avif',
  'bloc-de-zid': 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1.-Bloc-de-zid-alb-Large.avif',
  'elemente-de-canalizare': 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/slider-infrastructura-rutiera-petra-pavaje.webp',
}

export function CategoriesSection() {
  const isEnglish = isEnglishPath(useLocation().pathname)
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section ref={ref} className="section-padding bg-charcoal-50">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">
            {isEnglish ? 'Product Range' : 'Gama de Produse'}
          </p>
          <h2 className="heading-h1 text-charcoal-900 mb-4">
            {isEnglish ? 'Discover the Petra Pavaje universe' : 'Descoperă universul Petra Pavaje'}
          </h2>
          <p className="text-body-lg text-charcoal-500 max-w-2xl mx-auto">
            {isEnglish
              ? 'From premium pavers to architectural elements, we offer complete solutions for any landscaping project.'
              : 'De la pavaje premium la elemente de arhitectură, oferim soluții complete pentru orice proiect de amenajare.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => {
            const en = CATEGORY_EN[category.id]
            const name = isEnglish && en ? en.name : category.name
            const description = isEnglish && en ? en.description : category.description
            const href = isEnglish && en?.translated ? `/en${categoryUrl(category.slug)}` : categoryUrl(category.slug)
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={href}
                  className="group block card-premium"
                >
                  <div className="relative aspect-[16/10] overflow-hidden" style={{ aspectRatio: '16/10' }}>
                    <img
                      src={categoryImages[category.id] || category.image}
                      alt={name}
                      width="1600"
                      height="1000"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                        {name}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {category.productCount} {isEnglish ? 'products' : 'produse'}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <p className="text-sm text-charcoal-500 mb-4 line-clamp-2">
                      {description}
                    </p>
                    <div className="flex items-center text-brand-600 font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                      {isEnglish && en && !en.translated ? 'View products (RO)' : isEnglish ? 'View products' : 'Vezi produse'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
