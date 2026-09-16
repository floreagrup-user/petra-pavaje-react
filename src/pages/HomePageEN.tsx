import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Sun, Leaf, Zap, Trees, MapPin, Phone, Clock, Navigation } from 'lucide-react'
import { factories } from '@/data/site'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertHreflangPair, resetSEO } from '@/hooks/seo-utils'

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Premium Paver\nManufacturer',
    subtitle: 'In Harmony with Nature',
    description: '800+ Products · 4 Factories Nationwide · 24,000 sqm/day',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/stretto-homepage.webp',
    cta: 'Browse Products (RO)',
    ctaLink: '/pavaje-premium',
  },
  {
    id: 2,
    title: 'STONE\nCOMES\nTO LIFE',
    subtitle: 'Premium Pavers',
    description: 'The full range of premium pavers for exceptional outdoor landscaping',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/relief-homepage.avif',
    cta: 'See the Catalog',
    ctaLink: '/catalog',
  },
  {
    id: 3,
    title: 'Woodstone\nPetrified Wood',
    subtitle: 'Premium Technology',
    description: 'The beauty of wood combined with the durability of premium concrete',
    image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/gemina-homepage.avif',
    cta: 'Explore the Collection (RO)',
    ctaLink: '/woodstone-lemn-pietrificat',
  },
]

const STATS = [
  { value: '30', label: 'years of Florea Grup entrepreneurship' },
  { value: '4', label: 'factories nationwide' },
  { value: '24,000', label: 'sqm of daily production' },
  { value: '800', suffix: '+', label: 'products in the range' },
]

const SUSTAINABILITY_STATS = [
  { icon: Sun, value: '469 MWh', label: 'Solar Capacity / Year' },
  { icon: Leaf, value: '148 tons', label: 'CO₂ Reduction / Year' },
  { icon: Zap, value: '100%', label: 'Partially Electric Fleet' },
  { icon: Trees, value: '4', label: 'Showcase Gardens' },
]

export function HomePageEN() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const url = `${window.location.origin}/en`
    const title = `Petra Pavaje - Premium Paver Manufacturer | ${SEO_SITE_NAME}`
    const description =
      'Premium and Standard pavers, slabs, curbs, blocks, planters, fences, drainage elements. National manufacturer with 4 factories in Romania.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertHreflangPair('/', '/en')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    return resetSEO
  }, [])

  const slide = HERO_SLIDES[currentSlide]

  return (
    <>
      <section className="relative h-screen min-h-[650px] overflow-hidden">
        <div className="absolute inset-0 will-change-transform" style={{ transform: 'translateZ(0)' }}>
          {HERO_SLIDES.map((s, i) => (
            <div
              key={s.id}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
              style={{ backgroundImage: `url(${s.image})`, opacity: i === currentSlide ? 1 : 0 }}
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
                  360° Virtual Tour
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-10">
          <div className="container-premium">
            <div className="flex items-center">
              {HERO_SLIDES.map((_, index) => (
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
      </section>

      <section className="bg-white border-b border-charcoal-100">
        <div className="container-premium py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y divide-x-0 md:divide-y-0 md:divide-x divide-charcoal-100">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="px-2 py-4 md:px-8 md:py-0 text-center md:text-left first:pl-0"
              >
                <div className="text-3xl md:text-4xl font-bold text-brand-600 mb-1">
                  {stat.value}
                  {stat.suffix && <span className="text-brand-400">{stat.suffix}</span>}
                </div>
                <p className="text-sm text-charcoal-500 leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Who We Are</p>
            <h2 className="heading-h1 text-charcoal-900 mb-4">Petra Pavaje, part of Florea Grup</h2>
            <p className="text-body-lg text-charcoal-500">
              A premium manufacturer of pavers, curbs, fences and concrete elements, backed by 30 years of
              Romanian entrepreneurship and 4 factories nationwide.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link to="/en/despre-noi" className="card-premium p-6 text-center hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-charcoal-900 mb-1">About Us</h3>
              <p className="text-sm text-charcoal-500">Our story, technology and expansion</p>
            </Link>
            <Link to="/en/sustenabilitate" className="card-premium p-6 text-center hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-charcoal-900 mb-1">Sustainability</h3>
              <p className="text-sm text-charcoal-500">Green energy and community impact</p>
            </Link>
            <Link to="/en/calculator-pavaj" className="card-premium p-6 text-center hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-charcoal-900 mb-1">Paving Calculator</h3>
              <p className="text-sm text-charcoal-500">Estimate the paving you need</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-stone-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-noise" />
        <div className="container-premium relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">In Harmony with Nature</p>
              <h2 className="heading-h1 text-charcoal-900 mb-6">
                CONCRETE THAT<br />RESPECTS<br />THE PLANET
              </h2>
              <p className="text-body-lg text-charcoal-500 mb-8">
                At Petra Pavaje factories, every product is made with environmental responsibility in mind. We've
                implemented concrete practices that significantly reduce our carbon footprint.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {SUSTAINABILITY_STATS.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                    className="flex flex-col"
                  >
                    <stat.icon className="w-6 h-6 text-brand-600 mb-2" />
                    <p className="text-2xl md:text-3xl font-bold text-charcoal-900">{stat.value}</p>
                    <p className="text-sm font-medium text-charcoal-700">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
              <Link to="/en/sustenabilitate" className="link-premium inline-flex items-center gap-1.5 mt-8">
                See our full sustainability commitment
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-premium">
                <img
                  src="https://petrapavaje.ro/wp-content/uploads/energie-verde-si-emsii-0-web1-1.avif"
                  alt="Petra Pavaje sustainability"
                  width="800"
                  height="600"
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

      <section ref={ref} className="section-padding bg-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Nationwide Network</p>
            <h2 className="heading-h1 text-charcoal-900 mb-4">Our Factories</h2>
            <p className="text-body-lg text-charcoal-600 max-w-2xl mx-auto">
              4 production centers strategically located to always be close to you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {factories.map((factory, index) => (
              <motion.div
                key={factory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 bg-charcoal-50 rounded-xl"
              >
                <span className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-bold mb-4">
                  {index + 1}
                </span>
                <h3 className="font-semibold text-charcoal-900 mb-3">{factory.name}</h3>
                <div className="space-y-2 text-sm text-charcoal-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                    <span>{factory.address}</span>
                  </div>
                  <a href={`tel:${factory.phone}`} className="flex items-center gap-2 hover:text-brand-600 transition-colors">
                    <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                    {factory.phone}
                  </a>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                    <span>Mon - Fri: 08:00 - 17:00</span>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${factory.lat},${factory.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-4 text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  GPS Directions
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
