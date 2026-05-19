import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Download, X, ChevronLeft, ChevronRight, Star, Image as ImageIcon, Sparkles } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-scroll'

const CDN = 'https://petrapavaje.ro/wp-content/uploads'

const heroImage = `${CDN}/pavaj-woodstone_web.avif`
const heroImage2 = `${CDN}/Woodstone-bordura-neregulata-si-butuc-rotund-45.avif`

const categories = [
  { id: 'pavaj', title: 'Pavaj', description: 'Dale și pavele cu textură autentică de lemn pentru alei și terase.', image: `${CDN}/pavaj-woodstone_web.avif`, slug: 'pavaj' },
  { id: 'palisade', title: 'Palisade și Borduri', description: 'Elemente de delimitare cu aspect rustic pentru grădini.', image: `${CDN}/palisade-woodstone_web.avif`, slug: 'palisade-si-borduri' },
  { id: 'scari', title: 'Scări', description: 'Trepte robuste cu finisaj natural pentru accese exterioare.', image: `${CDN}/trepti-woodstone_web.avif`, slug: 'scari' },
  { id: 'garduri', title: 'Sisteme de Garduri', description: 'Garduri elegante cu aspectul lemnului natural.', image: `${CDN}/gard-woodstone_web.avif`, slug: 'garduri' },
  { id: 'banci', title: 'Bănci și Mese', description: 'Mobilier de exterior durabil și estetic.', image: `${CDN}/banca-woodstone_web.avif`, slug: 'banci-si-mese' },
  { id: 'jardiniere', title: 'Jardiniere Înaltate', description: 'Soluții elegante pentru grădinărit.', image: `${CDN}/jardiniere-woodstone_web.avif`, slug: 'jardiniere-inaltate' },
  { id: 'alte', title: 'Alte Elemente', description: 'Accesorii și elemente decorative complementare.', image: `${CDN}/alte-elemente-woodstone_web.avif`, slug: 'elemente-lemn-pietrificat' },
]

const features = [
  {
    icon: Sparkles,
    title: 'Tehnologie Avansată',
    description: 'Cu ajutorul tehnologiei am creat un produs din beton care redă fidel aspectul autentic al lemnului în-vechit.',
  },
  {
    icon: ImageIcon,
    title: 'Finisaje Deosebite',
    description: 'Detalii precum nodurile, muchiile și colțurile tocite, fisurile și crăpăturile sunt reproduse unic pe suprafață.',
  },
  {
    icon: Star,
    title: 'Durabilitate',
    description: 'Toate elementele sunt impregnate din fabrică cu un strat protector, asigurând rezistența în timp superioară lemnului.',
  },
  {
    icon: Sparkles,
    title: 'Versatilitate',
    description: 'Formele și dimensiunile variate permit realizarea a peste 100 de combinații, conferind unicitate fiecărei amenajări.',
  },
  {
    icon: Star,
    title: 'Rezistență la Îngheț',
    description: 'Toate fisurile sunt deschise spre exterior, permițând apei să se extindă și protejând produsele la îngheț-dezgheț.',
  },
]

const galleryImages = [
  `${CDN}/Woodstone-bordura-neregulata-si-butuc-rotund-45.avif`,
  `${CDN}/scari-woodstone-18_web.avif`,
  `${CDN}/scari-woodstone-17_web.avif`,
  `${CDN}/scari-woodstone-16_web.avif`,
  `${CDN}/scari-woodstone-4_web.avif`,
  `${CDN}/pavaj-woodstone-41_web.avif`,
  `${CDN}/pavaj-woodstone-40_web.avif`,
  `${CDN}/pavaj-woodstone-33_web.avif`,
  `${CDN}/pavaj-woodstone-25_web.avif`,
  `${CDN}/pavaj-woodstone-23_web.avif`,
  `${CDN}/pavaj-woodstone-20_web.avif`,
  `${CDN}/pavaj-woodstone-19_web.avif`,
  `${CDN}/pavaj-woodstone-16_web.avif`,
  `${CDN}/pavaj-woodstone-15_web.avif`,
  `${CDN}/pavaj-woodstone-14_web.avif`,
  `${CDN}/pavaj-woodstone-13_web.avif`,
  `${CDN}/pavaj-woodstone-10_web.avif`,
  `${CDN}/pavaj-woodstone-9_web.avif`,
  `${CDN}/pavaj-woodstone-8_web.avif`,
  `${CDN}/palisada-woodstone-19_web.avif`,
  `${CDN}/palisada-woodstone-17_web.avif`,
  `${CDN}/palisada-woodstone-16_web.avif`,
  `${CDN}/palisada-woodstone-15_web.avif`,
  `${CDN}/palisada-woodstone-14_web.avif`,
  `${CDN}/palisada-woodstone-13_web.avif`,
  `${CDN}/jardiniere-woodstone-4_web.avif`,
  `${CDN}/jardiniere-woodstone-1_web.avif`,
  `${CDN}/banci-mese-woodstone-11_web.avif`,
  `${CDN}/banci-mese-woodstone-9_web.avif`,
  `${CDN}/banci-mese-woodstone-6_web.avif`,
  `${CDN}/banci-mese-woodstone-4_web.avif`,
  `${CDN}/alte-elemente-woodstone-7_web.avif`,
  `${CDN}/alte-elemente-woodstone-6_web.avif`,
  `${CDN}/alte-elemente-woodstone-4_web.avif`,
]

export function WoodstonePage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const { ref: catRef, isIntersecting: catVisible } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: featRef, isIntersecting: featVisible } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: galleryRef, isIntersecting: galleryVisible } = useIntersectionObserver({ threshold: 0.1 })

  const prevImage = () => {
    setLightboxIndex(prev => prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null)
  }

  const nextImage = () => {
    setLightboxIndex(prev => prev !== null ? (prev + 1) % galleryImages.length : null)
  }

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); prevImage() }
      if (e.key === 'ArrowRight') { e.preventDefault(); nextImage() }
      if (e.key === 'Escape') { setLightboxIndex(null) }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex])

  return (
    <div className="pt-20 md:pt-24">
      {/* Breadcrumb */}
      <section className="bg-white border-b border-charcoal-100 py-4">
        <div className="container-premium">
          <nav className="flex items-center gap-2 text-sm text-charcoal-500">
            <Link to="/" className="hover:text-charcoal-900 transition-colors">PetraPavaje</Link>
            <span>/</span>
            <span className="text-charcoal-900 font-medium">WOODSTONE lemn pietrificat</span>
          </nav>
        </div>
      </section>

      {/* Section 1: Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-premium py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-brand-700 bg-brand-50 border border-brand-200 rounded-full mb-4">
                Colecție Exclusivă
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal-900 leading-[0.95] mb-4">
                WOODSTONE{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-amber-500">
                  Lemn Pietrificat
                </span>
              </h1>
              <p className="text-brand-600 text-sm md:text-base font-medium tracking-[0.15em] uppercase mb-4">
                FRUMUSEȚEA LEMNULUI, DURABILITATEA PIETREI
              </p>
              <p className="text-lg md:text-xl text-charcoal-600 leading-relaxed mb-8">
                Noua gamă de produse din beton, creată special pentru a aduce căldura și eleganța lemnului în amenajările exterioare. Produsele inovatoare combină durabilitatea betonului cu aspectul autentic al lemnului, oferind texturi care imită perfect fibra și nuanțele naturale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#categorii" className="btn-primary group text-base">
                  Vezi Produsele
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <button className="btn-secondary group text-base">
                  <Download className="w-4 h-4 mr-2" />
                  Descarcă Broșura
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '800/600' }}>
                <img
                  src={heroImage}
                  alt="Woodstone Lemn Pietrificat - Amenajare Exterioară"
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                  decoding="async"
                  width="800"
                  height="600"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden shadow-lg border-2 border-white">
                <img
                  src={heroImage2}
                  alt="Detaliu Textură Woodstone"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  width="144"
                  height="144"
                />
              </div>
              <div className="absolute top-4 right-4 bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                100+ Combinații posibile
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Categories */}
      <section id="categorii" ref={catRef} className="py-16 md:py-24 bg-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={catVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-brand-600 bg-brand-50 rounded-full mb-4">
              Explorează Gama
            </span>
            <h2 className="heading-h2 text-charcoal-900 mb-4">Categorii de Produse</h2>
            <p className="text-body-lg text-charcoal-500 max-w-2xl mx-auto">
              Descoperă varietatea de produse Woodstone, create pentru a transforma orice spațiu exterior într-un loc de poveste.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {categories.slice(0, 4).map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={catVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to={`/woodstone-lemn-pietrificat/${cat.slug}`}
                  className="group block relative rounded-2xl overflow-hidden bg-charcoal-100"
                  style={{ aspectRatio: '4/5' }}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    width="400"
                    height="500"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{cat.title}</h3>
                    <p className="text-sm text-charcoal-300 mb-3 line-clamp-2">{cat.description}</p>
                    <span className="inline-flex items-center text-brand-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      Explorează
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {categories.slice(4).map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={catVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: (i + 4) * 0.1 }}
              >
                <Link
                  to={`/woodstone-lemn-pietrificat/${cat.slug}`}
                  className="group block relative rounded-2xl overflow-hidden bg-charcoal-100"
                  style={{ aspectRatio: '4/5' }}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    width="400"
                    height="500"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{cat.title}</h3>
                    <p className="text-sm text-charcoal-300 mb-3 line-clamp-2">{cat.description}</p>
                    <span className="inline-flex items-center text-brand-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      Explorează
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Features */}
      <section ref={featRef} className="py-16 md:py-24 bg-charcoal-50">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-amber-600 bg-amber-50 rounded-full mb-4">
              <Star className="w-3 h-3" />
              De ce Woodstone?
            </span>
            <h2 className="heading-h2 text-charcoal-900 mb-4">Caracteristici Unice și Beneficii</h2>
            <p className="text-body-lg text-charcoal-500 max-w-3xl mx-auto">
              Materialele tradiționale au fost reimaginate, combinând durabilitatea betonului cu frumusețea atemporală a lemnului în-vechit. Prin intermediul unor tehnologii inovatoare, am creat produse care nu doar imită aspectul lemnului, ci surprind și detaliile cele mai fine.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={featVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-charcoal-500 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 4: Gallery */}
      <section ref={galleryRef} className="py-16 md:py-24 bg-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={galleryVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-brand-600 bg-brand-50 rounded-full mb-4">
              <ImageIcon className="w-3 h-3" />
              Inspirație
            </span>
            <h2 className="heading-h2 text-charcoal-900 mb-4">Galerie de Amenajări</h2>
            <p className="text-body-lg text-charcoal-500 max-w-2xl mx-auto">
              Descoperă proiecte reale realizate cu produsele Woodstone și lasă-te inspirat pentru amenajarea ta.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {(galleryVisible ? galleryImages : []).map((img, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                onClick={() => setLightboxIndex(i)}
                className="group relative rounded-xl overflow-hidden bg-charcoal-100 cursor-pointer"
                style={{ aspectRatio: '1/1' }}
              >
                <img
                  src={img}
                  alt={`Amenajare Woodstone ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  width="200"
                  height="200"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-charcoal-950/0 group-hover:bg-charcoal-950/30 transition-colors duration-300" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal-950/95 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={galleryImages[lightboxIndex]}
              alt={`Amenajare Woodstone ${lightboxIndex + 1}`}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  )
}
