import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { Sun, Leaf, Zap, Trees } from 'lucide-react'

const stats = [
  {
    icon: Sun,
    value: '469 MW/h',
    label: 'Capacitate Fotovoltaică / An',
    description: 'Parc fotovoltaic propriu la fabrica Roman',
  },
  {
    icon: Leaf,
    value: '148 tone',
    label: 'Reducere CO₂ / An',
    description: 'Economie de emisii certificate',
  },
  {
    icon: Zap,
    value: '100%',
    label: 'Flotă Parțial Electrică',
    description: 'Stații de încărcare la toate fabricile',
  },
  {
    icon: Trees,
    value: '4',
    label: 'Grădini Expoziționale',
    description: 'Spații verzi amenajate la fiecare fabrică',
  },
]

export function SustainabilitySection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section ref={ref} className="section-padding bg-stone-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-noise" />

      <div className="container-premium relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">
              În Armonie cu Natura
            </p>
            <h2 className="heading-h1 text-charcoal-900 mb-6">
              BETON CARE<br />RESPECTĂ<br />PLANETA
            </h2>
            <p className="text-body-lg text-charcoal-500 mb-8">
              La fabricile Petra Pavaje, fiecare produs este creat cu responsabilitate față de mediu. Am implementat practici concrete care reduc semnificativ amprenta de carbon.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex flex-col"
                >
                  <stat.icon className="w-6 h-6 text-brand-600 mb-2" />
                  <p className="text-2xl md:text-3xl font-bold text-charcoal-900">{stat.value}</p>
                  <p className="text-sm font-medium text-charcoal-700">{stat.label}</p>
                  <p className="text-xs text-charcoal-400 mt-1">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-premium">
              <img
                src="https://petrapavaje.ro/wp-content/uploads/energie-verde-si-emsii-0-web1-1.avif"
                alt="Sustenabilitate Petra Pavaje"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-brand-600/10 rounded-2xl -z-10" />
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-brand-600/10 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
