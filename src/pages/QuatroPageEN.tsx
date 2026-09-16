import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check, ShieldCheck, Award, FileText, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { getProductsByCategory, localizeProduct } from '@/data/products'
import { productImages } from '@/data/images'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { upsertHreflangPair, resetSEO, upsertMeta, upsertCanonical } from '@/hooks/seo-utils'

const groups: { title: string; description: string; match: (slug: string) => boolean }[] = [
  {
    title: 'Quatro Classic',
    description: 'The standard square format, in 7 sizes and 6 colors.',
    match: (s) => /^quatro-(10x10|20x20x6$|20x20x8$|30x30|40x40|50x50)/.test(s),
  },
  {
    title: 'Quatro Smart',
    description: 'Extra strength for heavy vehicle traffic.',
    match: (s) => s.startsWith('quatro-smart-'),
  },
  {
    title: 'Quatro Tactil',
    description: 'Tactile guidance tiles for visually impaired pedestrians.',
    match: (s) => s.startsWith('quatro-tactil-'),
  },
  {
    title: 'Marking Tiles',
    description: 'Durable urban markings built directly into the paving — parking, disability and bike access.',
    match: (s) => s.startsWith('quatro-parcare-') || s.startsWith('quatro-acces-'),
  },
]

const colors = [
  { name: 'Grey', hex: '#808080', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-gri-1.jpg' },
  { name: 'Red', hex: '#b22222', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-rosu.jpg' },
  { name: 'Black', hex: '#1a1a1a', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-negru-web-1.jpg' },
  { name: 'Yellow', hex: '#d4a837', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-galben-1.jpg' },
  { name: 'Brown', hex: '#8b7355', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-maro-1.avif' },
  { name: 'White', hex: '#f0f0f0', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-alb-1.jpg' },
]

const technicalFeatures = ['Pedestrian traffic', 'Light vehicle traffic', 'Terraces', 'Parking lots', 'Frost resistant', 'Color Lock']

const advantages = [
  '19 variants, from standard pavers to specific markings',
  'The square shape allows for symmetric compositions',
  'SMART variants for heavy vehicle traffic',
  'TACTIL tiles and markings for public spaces',
  'Frost resistant',
  '5-Year Warranty',
]

const usage = ['Terraces', 'Walkways', 'Yards', 'Parking Lots']

const documents = [
  { label: 'Quatro 10×10×6 cm (beveled edge)', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-10x10x6-cu-cant-Petra-Pavaje-1.pdf' },
  { label: 'Quatro 20×20×6 cm (beveled edge)', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-20x20x6-cu-cant-Petra-Pavaje.pdf' },
  { label: 'Quatro Tactil with dots 20×20×6 cm', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-20x20x6-cu-cant-TACTIL-cu-puncte-Petra-Pavaje.pdf' },
  { label: 'Quatro Tactil with lines 20×20×6 cm', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-20x20x6-cu-cant-TACTIL-cu-linii-Petra-Pavaje.pdf' },
  { label: 'Quatro 20×20×8 cm (beveled edge)', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-20x20x8-cu-cant-Petra-Pavaje.pdf' },
  { label: 'Quatro 30×30×6 cm (beveled edge)', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-30x30x6-cu-cant-Petra-Pavaje.pdf' },
  { label: 'Quatro 40×40×6 cm (beveled edge)', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-40x40x6-cu-cant-Petra-Pavaje.pdf' },
  { label: 'Quatro 50×50×8 cm (micro-bevel)', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-50x50x8-cu-microcant-Petra-Pavaje.pdf' },
  { label: 'Quatro Smart 20×20×8 cm (beveled edge)', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-SMART-20x20x8-cu-cant-Petra-Pavaje.pdf' },
  { label: 'Quatro 20×20×10 cm (SMART)', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-20X20X10-gri-rev2.pdf' },
  { label: 'Quatro Eco 20×20×8 cm (beveled edge)', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-ECO-20x20x8-cu-cant-rev1.pdf' },
]

const faq = [
  { question: 'What is the Quatro paver and why is it so widely used?', answer: "Quatro is a square-shaped paver that brings balance and symmetry to any landscaping project, creating a checkerboard-like effect. It's the most popular outdoor paver format thanks to its versatility in any space." },
  { question: 'How many Quatro variants are there?', answer: 'The Quatro range includes 19 variants: 9 standard and SMART pavers (10×10, 20×20, 30×30, 40×40, 50×50, thicknesses 5–10 cm), 4 TACTIL tactile tiles (dots and lines) and 6 special markings — PARKING, disability PARKING and bike ACCESS.' },
  { question: 'What colors is Quatro available in?', answer: 'The standard Quatro paver is available in 6 colors: grey, red, black, yellow, brown and white. The TACTIL variants are produced in white, and the PARKING and ACCESS markings in black.' },
  { question: 'What does the Quatro SMART variant mean?', answer: 'Quatro SMART is produced with added fiber and a special binder for extra strength, and is recommended for heavy vehicle traffic areas and parking lots, while keeping the classic look.' },
  { question: 'What are the TACTIL, PARKING and ACCESS variants for?', answer: 'The TACTIL tiles (dots or lines) guide visually impaired pedestrians through texture. The PARKING and bike ACCESS markings mark parking spaces, spaces reserved for people with disabilities, and bike access routes.' },
  { question: 'Is there a datasheet and Declaration of Performance for Quatro?', answer: 'Yes. Every Quatro size has a datasheet and EU Declaration of Performance available, depending on thickness and intended use.' },
]

const galleryImages = [
  'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1.-Quatro-20-x-20-cm-gri.avif',
  'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2.-Quatro-20-x-20-cm-gri-si-negru.avif',
  'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/6.-Quatro-20-x-20-cm-negru.avif',
  'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/7.-Quatro-20-x-20-cm-negru.avif',
  'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/8.-Quatro-20-x-20-cm-negru-si-gri.avif',
]

export function QuatroPageEN() {
  const allQuatro = getProductsByCategory('standard')
    .filter((p) => p.slug.startsWith('quatro-'))
    .map((p) => localizeProduct(p, 'en'))
  const { ref: gridRef, isIntersecting: gridVisible } = useIntersectionObserver({ threshold: 0.1 })
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const prevImage = () => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null))
  const nextImage = () => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null))

  useEffect(() => {
    document.title = 'Quatro - Standard Pavers | Petra Pavaje'
    upsertMeta('name', 'description', 'Quatro square paver: 19 variants — classic, SMART reinforced, TACTIL tactile tiles and urban markings for parking and bike access.')
    upsertCanonical(`${window.location.origin}/en/pavaje-standard/quatro`)
    upsertHreflangPair('/pavaje-standard/quatro', '/en/pavaje-standard/quatro')
    return resetSEO
  }, [])

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-6">
        <div className="container-premium">
          <nav className="flex items-center gap-2 text-sm text-charcoal-400">
            <Link to="/en" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/en/pavaje-standard" className="hover:text-white transition-colors">Standard Pavers</Link>
            <span>/</span>
            <span className="text-white">Quatro</span>
          </nav>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-premium grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-brand-700 bg-brand-50 border border-brand-200 rounded-full mb-4">
              ★ Standard Paver · Square Shape
            </span>
            <h1 className="heading-h1 text-charcoal-900 mb-3">Quatro</h1>
            <p className="text-body-lg text-brand-600 font-semibold mb-4">Balance, Symmetry, Flexible Design</p>
            <p className="text-body-lg text-charcoal-600 max-w-3xl leading-relaxed mb-6">
              The square shape creates a surface dominated by balance and symmetry, evoking the look of a chessboard. Quatro is the most popular outdoor paver format, available in a complete range of 19 variants: standard pavers in 9 sizes, high-strength SMART variants, TACTIL tactile tiles and special markings for parking and bike access.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-700 text-sm rounded-lg">
                <Check className="w-3.5 h-3.5" />
                19 Variants
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-700 text-sm rounded-lg">
                <Check className="w-3.5 h-3.5" />
                6 Colors
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-700 text-sm rounded-lg">
                <Check className="w-3.5 h-3.5" />
                5-Year Warranty
              </span>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-charcoal-900 mb-3">Available Colors</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {colors.map((color) => (
                  <div key={color.name} className="group relative overflow-hidden rounded-lg border border-charcoal-200 bg-white">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={color.image}
                        alt={color.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-xs font-medium text-center py-1.5 text-charcoal-700">{color.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-charcoal-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                Technical Features
              </h3>
              <ul className="grid sm:grid-cols-2 gap-2">
                {technicalFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-charcoal-600">
                    <Check className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-charcoal-900 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-600" />
                Advantages
              </h3>
              <ul className="space-y-2">
                {advantages.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-charcoal-600">
                    <Check className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-charcoal-900 mb-2">Recommended Use</h3>
              <div className="flex flex-wrap gap-2">
                {usage.map((u) => (
                  <span key={u} className="px-3 py-1.5 bg-brand-50 text-brand-700 text-sm rounded-lg">
                    {u}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden bg-stone-50 border border-charcoal-100 h-fit">
            <img
              src="https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1.-Quatro-20-x-20-cm-gri.avif"
              alt="Quatro"
              className="w-full aspect-[4/3] object-cover"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section ref={gridRef} className="py-12 md:py-16 bg-charcoal-50">
        <div className="container-premium space-y-14">
          <div className="text-center mb-2">
            <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">Quatro Products — 19 Variants</p>
            <h2 className="heading-h2 text-charcoal-900">Choose the Right Size</h2>
          </div>
          {groups.map((group) => {
            const items = allQuatro.filter((p) => group.match(p.slug))
            if (items.length === 0) return null
            return (
              <div key={group.title}>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-charcoal-900 mb-1">{group.title}</h3>
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
                        to={`/en/pavaje-standard/quatro/${p.slug}`}
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
                            View details
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

      <section className="py-12 md:py-16 bg-white">
        <div className="container-premium">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">Product Documents</p>
            <h2 className="heading-h2 text-charcoal-900">Datasheets and Declarations of Performance</h2>
          </div>
          <div className="max-w-3xl mx-auto divide-y divide-charcoal-100 border border-charcoal-100 rounded-xl overflow-hidden">
            {documents.map((doc) => (
              <div key={doc.label} className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white">
                <p className="font-medium text-charcoal-900">{doc.label}</p>
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal-100 text-charcoal-700 text-xs font-medium rounded-lg hover:bg-charcoal-200 transition-colors">
                  <FileText className="w-3.5 h-3.5" />
                  Datasheet
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-charcoal-50">
        <div className="container-premium">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">Photo Gallery</p>
            <h2 className="heading-h2 text-charcoal-900">Quatro Projects</h2>
            <p className="text-charcoal-500 mt-3 max-w-2xl mx-auto">
              Projects featuring Quatro pavers across a variety of landscaping styles.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="group aspect-[4/3] rounded-lg overflow-hidden bg-stone-100"
              >
                <img
                  src={img}
                  alt={`Quatro paver - modular standard paver range - image ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-premium">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">Frequently Asked Questions</p>
            <h2 className="heading-h2 text-charcoal-900">Everything you need to know about Quatro</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faq.map((item, idx) => (
              <div key={item.question} className="bg-charcoal-50 rounded-xl border border-charcoal-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-4 text-left"
                >
                  <span className="font-medium text-charcoal-900">{item.question}</span>
                  <ChevronDown className={`w-5 h-5 text-charcoal-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <p className="px-4 pb-4 text-sm text-charcoal-600 leading-relaxed">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <button onClick={() => setLightboxIndex(null)} className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10">
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <img
            src={galleryImages[lightboxIndex]}
            alt={`Quatro paver - modular standard paver range - image ${lightboxIndex + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 text-white/60 text-sm">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  )
}
