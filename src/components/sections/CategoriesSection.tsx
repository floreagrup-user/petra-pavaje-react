import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { categories } from '@/data/site'

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
  banci: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2020/06/banci-1200x800-1.jpg',
  treapta: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/treapta.avif',
  'bloc-de-zid': 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1.-Bloc-de-zid-alb-Large.avif',
  'elemente-de-canalizare': 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/slider-infrastructura-rutiera-petra-pavaje.webp',
}

export function CategoriesSection() {
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
            Gama de Produse
          </p>
          <h2 className="heading-h1 text-charcoal-900 mb-4">
            Descoperă universul Petra Pavaje
          </h2>
          <p className="text-body-lg text-charcoal-500 max-w-2xl mx-auto">
            De la pavaje premium la elemente de arhitectură, oferim soluții complete pentru orice proiect de amenajare.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/produse/${category.slug}`}
                className="group block card-premium"
              >
                <div className="relative aspect-[16/10] overflow-hidden" style={{ aspectRatio: '16/10' }}>
                  <img
                    src={categoryImages[category.id] || category.image}
                    alt={category.name}
                    width="1600"
                    height="1000"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {category.productCount} produse
                    </p>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <p className="text-sm text-charcoal-500 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center text-brand-600 font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                    Vezi produse
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
