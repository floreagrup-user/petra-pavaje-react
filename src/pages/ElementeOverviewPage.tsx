import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight, MessageCircle, ChevronDown } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-scroll'
import { categories } from '@/data/site'
import { categoryImages } from '@/components/sections/CategoriesSection'
import { getElementBySlug, getElementsByParent } from '@/data/elements'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'
import { categoryUrl } from '@/lib/product-urls'
import type { ProductFAQ } from '@/data/types'

const ELEMENT_IDS = ['borduri', 'rigole', 'boltari', 'garduri', 'jardiniere', 'palisada', 'banci', 'treapta', 'bloc-de-zid', 'elemente-de-canalizare']

const cards = ELEMENT_IDS.map((id) => {
  const category = categories.find((c) => c.id === id)!
  const image = categoryImages[id] || getElementBySlug(id)?.image || getElementsByParent(id)[0]?.image || category.image
  return { ...category, image }
})

const ELEMENTE_FAQ: ProductFAQ[] = [
  {
    question: 'Ce cuprinde gama Elemente Petra Pavaje?',
    answer:
      'Elemente cuprinde toate produsele complementare pavajelor: borduri, rigole, bolțari, garduri (Robusto, Modern, Baroc), jardiniere, palisadă, bănci, trepte, bloc de zid și elemente de canalizare — pentru amenajări complete, de la delimitare la infrastructură.',
  },
  {
    question: 'Ce diferență este între borduri, rigole și bolțari?',
    answer:
      'Bordurile delimitează și încadrează suprafețele pavate, rigolele colectează și dirijează apele pluviale, iar bolțarii sunt elemente de zidărie pentru fundații și pereți.',
  },
  {
    question: 'Ce game de garduri sunt disponibile?',
    answer:
      'Trei game: Robusto (masiv, 16 cm grosime), Modern (sistem 3D cu îmbinare Nut-Feder) și Baroc (eleganță clasică, inclusiv formate Vintage).',
  },
  {
    question: 'Ce elemente sunt disponibile pentru rețele de canalizare?',
    answer:
      'Bloc de beton, elemente pentru cămine de vizitare (800 și 1000 mm), tub fântână, tuburi și timpane, precum și capace carosabile și necarosabile pentru infrastructură rutieră.',
  },
]

export function ElementeOverviewPage() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const url = `${window.location.origin}/elemente`
    const title = `Elemente - Borduri, Rigole, Bolțari, Garduri și Canalizare | ${SEO_SITE_NAME}`
    const description =
      'Elemente Petra Pavaje: borduri, rigole, bolțari, garduri, jardiniere, palisadă, bănci, trepte, bloc de zid și elemente de canalizare — pentru amenajări complete, din beton certificat.'
    const image = cards[0]?.image

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('itemlist-schema', {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: cards.map((c, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: c.name,
        url: `${window.location.origin}${categoryUrl(c.slug)}`,
        image: c.image,
      })),
    })

    upsertJsonLd(
      'faq-schema',
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: ELEMENTE_FAQ.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    )

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Elemente', item: url },
      ],
    })

    return resetSEO
  }, [])

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-16 md:py-20">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6">
              <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
              <span>/</span>
              <span className="text-white">Elemente</span>
            </nav>
            <h1 className="heading-h1 mb-4">Elemente</h1>
            <p className="text-body-lg text-charcoal-400 max-w-3xl">
              Produsele complementare pavajelor Petra Pavaje — de la borduri și rigole, la garduri, jardiniere și
              elemente de canalizare — pentru amenajări complete, din beton vibropresat certificat.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-white border-b border-charcoal-100">
        <div className="container-premium">
          <h2 className="heading-h3 text-charcoal-900 mb-3">Ce cuprinde gama Elemente?</h2>
          <p className="text-body text-charcoal-600 max-w-3xl">
            Pe lângă pavaje, orice amenajare completă are nevoie de elemente de delimitare, drenaj, structură și
            mobilier urban. Gama Elemente acoperă toate aceste nevoi — borduri pentru încadrarea suprafețelor,
            rigole pentru gestionarea apelor pluviale, bolțari pentru fundații și ziduri, garduri prefabricate în
            trei stiluri, jardiniere și bănci pentru grădină, trepte pentru diferențe de nivel, și elemente de
            canalizare pentru infrastructură.
          </p>
        </div>
      </section>

      <section ref={ref} className="section-padding bg-white">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cards.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(index, 8) * 0.06 }}
              >
                <Link to={categoryUrl(category.slug)} className="group block card-premium">
                  <div className="relative aspect-[16/10] overflow-hidden" style={{ aspectRatio: '16/10' }}>
                    <img
                      src={category.image}
                      alt={category.name}
                      width="1600"
                      height="1000"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{category.name}</h3>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <p className="text-sm text-charcoal-500 mb-4 line-clamp-2">{category.description}</p>
                    <div className="flex items-center text-brand-600 font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                      Vezi produsele
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-charcoal-50">
        <div className="container-premium">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-h3 text-charcoal-900 mb-3">Ai nevoie de o ofertă personalizată?</h2>
            <p className="text-body text-charcoal-600 mb-6">
              Echipa noastră te poate ajuta să alegi elementele potrivite pentru proiectul tău, de la delimitare la
              infrastructură completă.
            </p>
            <Link to="/contact" className="btn-primary inline-flex">
              <MessageCircle className="w-4 h-4 mr-2" />
              Cere o ofertă
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-premium">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-brand-600 uppercase tracking-widest mb-2">Întrebări Frecvente</p>
            <h2 className="heading-h2 text-charcoal-900">Tot ce trebuie să știi despre Elemente</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {ELEMENTE_FAQ.map((item, idx) => (
              <div key={item.question} className="bg-white rounded-xl border border-charcoal-100 overflow-hidden">
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
    </div>
  )
}
