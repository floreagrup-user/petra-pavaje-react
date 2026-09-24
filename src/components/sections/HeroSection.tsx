import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import { isEnglishPath } from '@/lib/i18n-routes'

const heroSlides = [
  {
    id: 1,
    title: 'Producător Premium\nde Pavaje',
    subtitle: 'În armonie cu natura',
    description: '800+ Produse · 4 Fabrici Naționale · 24.000 mp/zi',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/stretto-homepage.webp',
    cta: 'Descoperă Produsele',
    ctaLink: '/pavaje-premium',
  },
  {
    id: 2,
    title: 'PIATRA\nPRINDE\nVIAȚĂ',
    subtitle: 'Pavaje Premium',
    description: 'Gama completă de pavaje premium pentru amenajări outdoor de excepție',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/relief-homepage.avif',
    cta: 'Vezi Catalogul',
    ctaLink: '/catalog',
  },
  {
    id: 3,
    title: 'Woodstone\nLemn Pietrificat',
    subtitle: 'Tehnologie Premium',
    description: 'Frumusețea lemnului combinată cu durabilitatea betonului premium',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/pavaj-woodstone1-scaled.avif',
    cta: 'Explorează Colecția',
    ctaLink: '/woodstone-lemn-pietrificat',
  },
]

const heroSlidesEn = [
  {
    id: 1,
    title: 'Premium Paver\nManufacturer',
    subtitle: 'In Harmony with Nature',
    description: '800+ Products · 4 National Factories · 24,000 sqm/day',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/stretto-homepage.webp',
    cta: 'Browse Premium Pavers',
    ctaLink: '/en/pavaje-premium',
  },
  {
    id: 2,
    title: 'STONE\nCOMES\nTO LIFE',
    subtitle: 'Premium Pavers',
    description: 'The full range of premium pavers for exceptional outdoor landscaping',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/relief-homepage.avif',
    cta: 'See the Catalog (RO)',
    ctaLink: '/catalog',
  },
  {
    id: 3,
    title: 'Woodstone\nPetrified Wood',
    subtitle: 'Premium Technology',
    description: 'The beauty of wood combined with the durability of premium concrete',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/pavaj-woodstone1-scaled.avif',
    cta: 'Explore the Collection (RO)',
    ctaLink: '/woodstone-lemn-pietrificat',
  },
]

export function HeroSection() {
  const isEnglish = isEnglishPath(useLocation().pathname)
  const slides = isEnglish ? heroSlidesEn : heroSlides
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [slides.length])

  const slide = slides[currentSlide]

  return (
    <section ref={containerRef} className="relative h-screen min-h-[650px] overflow-hidden">
      <div className="absolute inset-0 will-change-transform" style={{ transform: 'translateZ(0)' }}>
        {slides.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${s.image})`,
              opacity: i === currentSlide ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </div>

      <div className="relative h-full flex items-center">
        <div className="container-premium w-full">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-brand-300 text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4"
            >
              {slide.subtitle}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.95] mb-6 whitespace-pre-line"
            >
              {slide.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-white/60 mb-8 max-w-xl"
            >
              {slide.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to={slide.ctaLink} className="btn-primary group text-base">
                {slide.cta}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/tur-virtual" className="btn-outline-light group text-base">
                <Play className="w-4 h-4 mr-2" />
                {isEnglish ? '360° Virtual Tour (RO)' : 'Tur Virtual 360°'}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="container-premium">
          <div className="flex items-center">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="group p-2.5 flex items-center justify-center"
                aria-label={`Slide ${index + 1}`}
              >
                <span
                  className={`block h-1 rounded-full transition-all duration-500 ${
                    index === currentSlide ? 'w-12 bg-brand-500' : 'w-6 bg-white/20 group-hover:bg-white/40'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center"
        >
          <motion.div className="w-1 h-2 bg-white/40 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  )
}
