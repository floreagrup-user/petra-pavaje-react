import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'

const heroSlides = [
  {
    id: 1,
    title: 'Producător Premium de Pavaje',
    subtitle: 'În armonie cu natura',
    description: '800+ Produse · 4 Fabrici Naționale · 24.000 mp/zi Capacitate',
    image: 'https://petrapavaje.ro/wp-content/uploads/mediterana-homepage.avif',
    cta: 'Descoperă Produsele',
    ctaLink: '/produse/pavaje-premium',
  },
  {
    id: 2,
    title: 'PIATRA\nPRINDE\nVIAȚĂ',
    subtitle: 'Pavaje Premium',
    description: 'Gama completă de pavaje premium pentru amenajări outdoor de excepție',
    image: 'https://petrapavaje.ro/wp-content/uploads/relief-homepage.avif',
    cta: 'Vezi Catalogul',
    ctaLink: '/catalog',
  },
  {
    id: 3,
    title: 'Woodstone',
    subtitle: 'Lemn Pietrificat',
    description: 'Frumusețea lemnului combinată cu durabilitatea betonului premium',
    image: 'https://petrapavaje.ro/wp-content/uploads/gemina-homepage.avif',
    cta: 'Explorează Woodstone',
    ctaLink: '/produse/woodstone',
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const slide = heroSlides[currentSlide]

  return (
    <section ref={containerRef} className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-anthracite-950/60 via-anthracite-950/40 to-anthracite-950/80" />
      </motion.div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container-premium">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-primary-400 text-sm md:text-base font-medium tracking-widest uppercase mb-4"
            >
              {slide.subtitle}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-white leading-none mb-6 whitespace-pre-line"
            >
              {slide.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-white/70 mb-8 max-w-xl"
            >
              {slide.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to={slide.ctaLink} className="btn-primary group">
                {slide.cta}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/tur-virtual" className="btn-secondary border-white/30 text-white hover:bg-white/10 group">
                <Play className="w-4 h-4 mr-2" />
                Tur Virtual
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="container-premium">
          <div className="flex items-center gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? 'w-12 bg-primary-500'
                    : 'w-6 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div className="w-1 h-2 bg-white/50 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  )
}
