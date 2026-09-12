import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ExternalLink } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'

interface Brochure {
  id: string
  title: string
  edition: string
  category: string
  accent: string
  description: string
  viewerUrl: string
}

const BROCHURES: Brochure[] = [
  {
    id: 'garduri',
    title: 'Garduri Petra Pavaje',
    edition: 'Ediția 2026',
    category: 'Colecție · Garduri',
    accent: 'border-brand-600',
    description:
      'Soluții complete de împrejmuire — garduri din beton cu design modern, clasic sau rustic pentru orice stil de casă.',
    viewerUrl: 'https://online.fliphtml5.com/Petra_Pavaje/Brosura_garduri_2026/#p=1',
  },
  {
    id: 'woodstone',
    title: 'Lemn Pietrificat Woodstone',
    edition: 'Ediția 2026',
    category: 'Colecție · Woodstone',
    accent: 'border-amber-700',
    description:
      'Descoperă frumusețea lemnului pietrificat — pavaje, palisade, garduri și mobilier urban cu textură naturală autentică.',
    viewerUrl: 'https://online.fliphtml5.com/Petra_Pavaje/Brosura_Woodstone_2026/#p=1',
  },
  {
    id: 'gradini-cu-dichis',
    title: 'Grădini cu Dichis',
    edition: 'Ediție specială',
    category: 'Revistă · Inspirație',
    accent: 'border-emerald-700',
    description:
      'Proiecte de amenajare, tendințe și idei creative pentru grădini de vis — inspirație din proiectele realizate cu Petra Pavaje.',
    viewerUrl: 'https://online.fliphtml5.com/Petra_Pavaje/Gradini-cu-Dichis/#p=1',
  },
]

export function BrosuriPage() {
  const [activeId, setActiveId] = useState(BROCHURES[0].id)
  const active = BROCHURES.find((b) => b.id === activeId) ?? BROCHURES[0]

  useEffect(() => {
    const url = `${window.location.origin}/brosuri`
    const title = `Broșuri Petra Pavaje - Garduri, Woodstone și Grădini cu Dichis | ${SEO_SITE_NAME}`
    const description =
      'Răsfoiește online broșurile Petra Pavaje: colecția de Garduri 2026, Lemn Pietrificat Woodstone și revista Grădini cu Dichis.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('itemlist-schema', {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: BROCHURES.map((b, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: b.title,
        url: b.viewerUrl,
      })),
    })

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Broșuri', item: url },
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
              <span className="text-white">Broșuri</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">
              Petra Pavaje · Publicații
            </p>
            <h1 className="heading-h1 mb-4">Broșurile noastre</h1>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              Răsfoiește online colecțiile Petra Pavaje — Garduri, Lemn Pietrificat Woodstone și Grădini cu Dichis.
              Selectează o broșură pentru a o citi.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-premium">
          <p className="text-sm font-medium text-charcoal-400 uppercase tracking-widest mb-6">
            Selectează o broșură
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {BROCHURES.map((brochure, index) => {
              const isActive = brochure.id === activeId
              return (
                <motion.button
                  key={brochure.id}
                  type="button"
                  onClick={() => setActiveId(brochure.id)}
                  aria-pressed={isActive}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`text-left rounded-xl border bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${
                    isActive ? 'border-brand-600 shadow-lg' : 'border-charcoal-100'
                  }`}
                >
                  <div className={`border-l-4 ${brochure.accent} px-5 py-4`}>
                    <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-charcoal-400 mb-1">
                      {brochure.edition}
                    </p>
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-brand-600 mb-2">
                      {brochure.category}
                    </p>
                    <h3 className="text-2xl font-bold text-charcoal-900 leading-tight">{brochure.title}</h3>
                  </div>
                  <div className={`px-5 py-4 border-t ${isActive ? 'bg-brand-50/40 border-brand-100' : 'border-charcoal-100'}`}>
                    <p className="text-sm text-charcoal-500 leading-relaxed mb-3 line-clamp-3">{brochure.description}</p>
                    <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-md transition-colors ${
                      isActive ? 'bg-brand-600 text-white' : 'bg-charcoal-900 text-white'
                    }`}>
                      <BookOpen className="w-3.5 h-3.5" />
                      Citește
                    </span>
                  </div>
                </motion.button>
              )
            })}
          </div>

          <div className="rounded-xl border border-charcoal-100 overflow-hidden">
            <div className="flex items-center justify-between gap-3 flex-wrap px-4 md:px-6 py-3 bg-charcoal-50 border-b border-charcoal-100">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-700">
                  {active.title}
                </span>
              </div>
              <a
                href={active.viewerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-charcoal-500 border border-charcoal-200 rounded px-3 py-1.5 hover:border-brand-600 hover:text-brand-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                Ecran complet
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="relative w-full bg-charcoal-50" style={{ height: '640px' }}>
              <AnimatePresence mode="wait">
                <motion.iframe
                  key={active.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  src={active.viewerUrl}
                  title={active.title}
                  loading="lazy"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
