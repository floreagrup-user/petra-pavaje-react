import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check, ShieldCheck, Award, FileText, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react'
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

const colors = [
  { name: 'Gri', hex: '#808080', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-gri-1.jpg' },
  { name: 'Roșu', hex: '#b22222', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-rosu.jpg' },
  { name: 'Negru', hex: '#1a1a1a', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-negru-web-1.jpg' },
  { name: 'Galben', hex: '#d4a837', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-galben-1.jpg' },
  { name: 'Maro', hex: '#8b7355', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-maro-1.avif' },
  { name: 'Alb', hex: '#f0f0f0', image: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/culoare-alb-1.jpg' },
]

const technicalFeatures = ['Trafic pietonal', 'Trafic auto ușor', 'Terase', 'Parcări', 'Rezistență la îngheț', 'Color Lock']

const advantages = [
  '19 variante, de la pavaj simplu la marcaje specifice',
  'Forma pătrată permite compoziții simetrice',
  'Variante SMART pentru trafic auto intens',
  'Dale TACTIL și marcaje pentru spații publice',
  'Rezistență la îngheț',
  'Garanție 5 ani',
]

const usage = ['Terase', 'Alei', 'Curți', 'Parcări']

const documents = [
  { label: 'Quatro 10×10×6 cm (cu cant)', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-10x10x6-cu-cant-Petra-Pavaje-1.pdf' },
  { label: 'Quatro 20×20×6 cm (cu cant)', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-20x20x6-cu-cant-Petra-Pavaje.pdf' },
  { label: 'Quatro Tactil cu puncte 20×20×6 cm', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-20x20x6-cu-cant-TACTIL-cu-puncte-Petra-Pavaje.pdf' },
  { label: 'Quatro Tactil cu linii 20×20×6 cm', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-20x20x6-cu-cant-TACTIL-cu-linii-Petra-Pavaje.pdf' },
  { label: 'Quatro 20×20×8 cm (cu cant)', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-20x20x8-cu-cant-Petra-Pavaje.pdf' },
  { label: 'Quatro 30×30×6 cm (cu cant)', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-30x30x6-cu-cant-Petra-Pavaje.pdf' },
  { label: 'Quatro 40×40×6 cm (cu cant)', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-40x40x6-cu-cant-Petra-Pavaje.pdf' },
  { label: 'Quatro 50×50×8 cm (microcant)', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-50x50x8-cu-microcant-Petra-Pavaje.pdf' },
  { label: 'Quatro Smart 20×20×8 cm (cu cant)', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-SMART-20x20x8-cu-cant-Petra-Pavaje.pdf' },
  { label: 'Quatro 20×20×10 cm (SMART)', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-20X20X10-gri-rev2.pdf' },
  { label: 'Quatro Eco 20×20×8 cm (cu cant)', url: 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/fisa-tehnica-QUATRO-ECO-20x20x8-cu-cant-rev1.pdf' },
]

const faq = [
  { question: 'Ce este pavajul Quatro și de ce este atât de folosit?', answer: 'Quatro este un pavaj cu formă pătrată care oferă echilibru și simetrie în amenajare, lăsând impresia unei table de șah. Este cel mai popular format de pavaj exterior datorită versatilității în orice spațiu.' },
  { question: 'Câte variante Quatro există?', answer: 'Gama Quatro cuprinde 19 variante: 9 pavaje simple și SMART (10×10, 20×20, 30×30, 40×40, 50×50, grosimi 5–10 cm), 4 dale tactile TACTIL (puncte și linii) și 6 marcaje speciale — PARCARE, PARCARE pentru persoane cu dizabilități și ACCES biciclete.' },
  { question: 'În ce culori este disponibil Quatro?', answer: 'Pavajul Quatro simplu este disponibil în 6 culori: gri, roșu, negru, galben, maro și alb. Variantele TACTIL se produc în alb, iar marcajele PARCARE și ACCES în negru.' },
  { question: 'Ce înseamnă varianta SMART Quatro?', answer: 'Quatro SMART este produs cu adaos de fibră și liant special pentru o rezistență sporită, fiind recomandată pentru zonele de trafic auto intens și parcări, păstrând în același timp aspectul clasic.' },
  { question: 'La ce servesc variantele TACTIL, PARCARE și ACCES?', answer: 'Dalele TACTIL (puncte sau linii) ghidează prin textură persoanele cu deficiențe de vedere. Marcajele PARCARE și ACCES biciclete marchează locurile de parcare, locurile rezervate persoanelor cu dizabilități, respectiv căile de acces pentru biciclete.' },
  { question: 'Există fișă tehnică și Declarație de performanță pentru Quatro?', answer: 'Da. Fiecare dimensiune Quatro are fișă tehnică și Declarație de performanță UE disponibile, în funcție de grosime și destinația de folosință.' },
]

const galleryImages = [
  'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/1.-Quatro-20-x-20-cm-gri.avif',
  'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/2.-Quatro-20-x-20-cm-gri-si-negru.avif',
  'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/6.-Quatro-20-x-20-cm-negru.avif',
  'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/7.-Quatro-20-x-20-cm-negru.avif',
  'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/8.-Quatro-20-x-20-cm-negru-si-gri.avif',
]

export function QuatroPage() {
  const allQuatro = getProductsByCategory('standard').filter((p) => p.slug.startsWith('quatro-'))
  const { ref: gridRef, isIntersecting: gridVisible } = useIntersectionObserver({ threshold: 0.1 })
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const prevImage = () => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null))
  const nextImage = () => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null))

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-6">
        <div className="container-premium">
          <nav className="flex items-center gap-2 text-sm text-charcoal-400">
            <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
            <span>/</span>
            <Link to="/pavaje-standard" className="hover:text-white transition-colors">Pavaje Standard</Link>
            <span>/</span>
            <span className="text-white">Quatro</span>
          </nav>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-premium grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-brand-700 bg-brand-50 border border-brand-200 rounded-full mb-4">
              ★ Pavaj Standard · Formă Pătrată
            </span>
            <h1 className="heading-h1 text-charcoal-900 mb-3">Quatro</h1>
            <p className="text-body-lg text-brand-600 font-semibold mb-4">Echilibru, Simetrie, Design Flexibil</p>
            <p className="text-body-lg text-charcoal-600 max-w-3xl leading-relaxed mb-6">
              Forma pătrată oferă posibilitatea de a crea o suprafață în care predomină echilibrul, simetria, lăsând impresia unei table de șah. Quatro este cel mai popular format de pavaj exterior, disponibil într-o gamă completă de 19 variante: pavaj simplu în 9 dimensiuni, variante SMART de înaltă rezistență, dale tactile TACTIL și marcaje speciale pentru parcare și acces biciclete.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
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

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-charcoal-900 mb-3">Culori disponibile</h3>
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
                Caracteristici tehnice
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
                Avantaje
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
              <h3 className="text-sm font-semibold text-charcoal-900 mb-2">Utilizare recomandată</h3>
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
            <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">Produse Quatro — 19 Variante</p>
            <h2 className="heading-h2 text-charcoal-900">Alege Dimensiunea Potrivită</h2>
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
                        to={`/pavaje-standard/quatro/${p.slug}`}
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

      <section className="py-12 md:py-16 bg-white">
        <div className="container-premium">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">Documente Produs</p>
            <h2 className="heading-h2 text-charcoal-900">Fișe Tehnice și Declarații de Performanță</h2>
          </div>
          <div className="max-w-3xl mx-auto divide-y divide-charcoal-100 border border-charcoal-100 rounded-xl overflow-hidden">
            {documents.map((doc) => (
              <div key={doc.label} className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white">
                <p className="font-medium text-charcoal-900">{doc.label}</p>
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal-100 text-charcoal-700 text-xs font-medium rounded-lg hover:bg-charcoal-200 transition-colors">
                  <FileText className="w-3.5 h-3.5" />
                  Fișă tehnică
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-charcoal-50">
        <div className="container-premium">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">Galerie Foto</p>
            <h2 className="heading-h2 text-charcoal-900">Proiecte Quatro</h2>
            <p className="text-charcoal-500 mt-3 max-w-2xl mx-auto">
              Realizări cu pavaje Quatro în diverse tipuri de amenajări.
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
                  alt={`Quatro ${idx + 1}`}
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
            <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">Întrebări Frecvente</p>
            <h2 className="heading-h2 text-charcoal-900">Tot ce trebuie să știi despre Quatro</h2>
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
            alt={`Quatro ${lightboxIndex + 1}`}
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
