import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Clock, Navigation } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { factories } from '@/data/site'

export function FactoriesSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })
  const [activeFactory, setActiveFactory] = useState(0)

  const factoryImages: Record<string, string> = {
    alba: 'https://petrapavaje.ro/wp-content/uploads/petra-pavaje-fabrica-alba.webp',
    prahova: 'https://petrapavaje.ro/wp-content/uploads/fabrica-ploiesti-petra-pavaje.webp',
    arad: 'https://petrapavaje.ro/wp-content/uploads/petra-pavaje-fabrica-arad.webp',
    neamt: 'https://petrapavaje.ro/wp-content/uploads/petra-pavaje-fabrica-neamt.webp',
  }

  return (
    <section ref={ref} className="section-padding bg-charcoal-950 text-white">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-brand-400 text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Rețea Națională
          </p>
          <h2 className="heading-h1 mb-4">
            Fabricile Noastre
          </h2>
          <p className="text-body-lg text-charcoal-400 max-w-2xl mx-auto">
            4 centre de producție strategic poziționate pentru a fi mereu aproape de tine
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            {factories.map((factory, index) => (
              <motion.button
                key={factory.id}
                onClick={() => setActiveFactory(index)}
                className={`w-full text-left p-6 rounded-xl transition-all duration-300 ${
                  activeFactory === index
                    ? 'bg-charcoal-800 shadow-lg ring-1 ring-brand-600/30'
                    : 'bg-charcoal-900 hover:bg-charcoal-800/50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        activeFactory === index
                          ? 'bg-brand-600 text-white'
                          : 'bg-charcoal-700 text-charcoal-400'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-semibold">{factory.name}</h3>
                  </div>
                </div>
                <div className="space-y-2 pl-11">
                  <div className="flex items-start gap-2 text-sm text-charcoal-400">
                    <MapPin className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                    <span>{factory.address}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      href={`tel:${factory.phone}`}
                      className="flex items-center gap-2 text-sm text-brand-500 hover:text-brand-400 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {factory.phone}
                    </a>
                    <span className="flex items-center gap-2 text-sm text-charcoal-500">
                      <Clock className="w-4 h-4" />
                      L-V: 08:00-17:00
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-2xl overflow-hidden aspect-square lg:aspect-auto min-h-[400px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={factories[activeFactory].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <img
                  src={factoryImages[factories[activeFactory].id]}
                  alt={factories[activeFactory].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${factories[activeFactory].lat},${factories[activeFactory].lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700 transition-colors"
              >
                <Navigation className="w-4 h-4" />
                Navigare GPS
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
