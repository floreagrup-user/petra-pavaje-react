import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { getProductsByCategory } from '@/data/products'
import { productImages } from '@/data/images'
import { useIntersectionObserver } from '@/hooks/use-scroll'

const groups: { title: string; description: string; match: (slug: string) => boolean }[] = [
  {
    title: 'Quatro Clasic',
    description: 'Formatul pătrat standard, în 7 dimensiuni și 6 culori.',
    match: (s) => /^quatro-(10x10|20x20x6$|20x20x8$|30x30|40x40|50x50)/.test(s),
  },
  {
    title: 'Quatro Smart',
    description: 'Rezistență sporită pentru trafic auto intens.',
    match: (s) => s.startsWith('quatro-smart-'),
  },
  {
    title: 'Quatro Tactil',
    description: 'Dale de ghidare tactilă pentru persoane cu deficiențe de vedere.',
    match: (s) => s.startsWith('quatro-tactil-'),
  },
  {
    title: 'Dale de Marcaj',
    description: 'Marcaj urban durabil integrat direct în pavaj — parcare, dizabilități și acces biciclete.',
    match: (s) => s.startsWith('quatro-parcare-') || s.startsWith('quatro-acces-'),
  },
]

export function QuatroPage() {
  const allQuatro = getProductsByCategory('standard').filter((p) => p.slug.startsWith('quatro-'))
  const { ref: gridRef, isIntersecting: gridVisible } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-6">
        <div className="container-premium">
          <nav className="flex items-center gap-2 text-sm text-charcoal-400">
            <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
            <span>/</span>
            <Link to="/produse/pavaje-standard" className="hover:text-white transition-colors">Pavaje Standard</Link>
            <span>/</span>
            <span className="text-white">Quatro</span>
          </nav>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-premium">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-brand-700 bg-brand-50 border border-brand-200 rounded-full mb-4">
            ★ Pavaj Standard
          </span>
          <h1 className="heading-h1 text-charcoal-900 mb-3">Quatro</h1>
          <p className="text-body-lg text-brand-600 font-semibold mb-4">Echilibru și design flexibil</p>
          <p className="text-body-lg text-charcoal-600 max-w-3xl leading-relaxed mb-6">
            Forma pătrată oferă posibilitatea de a crea o suprafață în care predomină echilibrul, simetria, lăsând impresia unei table de șah în care orice mișcare este foarte minuțios gândită. Gama Quatro include 19 variante: formatul clasic în 7 dimensiuni, varianta Smart cu rezistență sporită pentru trafic auto intens, dale tactile de ghidare pentru persoane cu deficiențe de vedere și dale de marcaj urban (parcare, dizabilități, acces biciclete).
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-700 text-sm rounded-lg">
              <Check className="w-3.5 h-3.5" />
              19 Variante
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-700 text-sm rounded-lg">
              <Check className="w-3.5 h-3.5" />
              6 Culori
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-700 text-sm rounded-lg">
              <Check className="w-3.5 h-3.5" />
              Garanție 5 ani
            </span>
          </div>
        </div>
      </section>

      <section ref={gridRef} className="py-12 md:py-16 bg-charcoal-50">
        <div className="container-premium space-y-14">
          {groups.map((group) => {
            const items = allQuatro.filter((p) => group.match(p.slug))
            if (items.length === 0) return null
            return (
              <div key={group.title}>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-charcoal-900 mb-1">{group.title}</h2>
                  <p className="text-sm text-charcoal-500">{group.description}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                  {items.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={gridVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.35, delay: i * 0.04 }}
                    >
                      <Link
                        to={`/produse/pavaje-standard/quatro/${p.slug}`}
                        className="group block bg-white rounded-xl overflow-hidden border border-charcoal-100 hover:shadow-md transition-shadow"
                      >
                        <div className="aspect-square bg-stone-50 p-4 flex items-center justify-center overflow-hidden">
                          <img
                            src={productImages[p.slug] || p.image}
                            alt={p.name}
                            className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-charcoal-900 text-sm mb-1">{p.name}</h3>
                          <p className="text-xs text-charcoal-500 line-clamp-1">{p.shortDescription}</p>
                          <span className="inline-flex items-center text-brand-600 text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            Vezi detalii
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
