import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ThermometerSnowflake, Snowflake, CarFront, Footprints } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'

const R2 = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev'

const USE_CASES = [
  {
    icon: CarFront,
    title: 'Rampe de acces auto și platforme de încărcare',
    body: 'Sistemele de degivrare complet automatizate previn derapajul autoturismelor și utilajelor pe rampe și platforme de încărcare.',
  },
  {
    icon: Footprints,
    title: 'Trotuare și căi de acces',
    body: 'Elimină riscul de accidentare provocat de polei și îngheț pe trotuare și pe diferitele căi de acces pietonale.',
  },
]

export function DegivrarePage() {
  useEffect(() => {
    const url = `${window.location.origin}/degivrare`
    const title = `Degivrare Pavaj Iarna - Soluții Eficiente | ${SEO_SITE_NAME}`
    const description =
      'Termostatul inteligent ajută la degivrarea pavajului iarna, prevenind accidentările pe trotuare și rampa de acces auto.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', `${R2}/degivrare.jpg`)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Degivrare', item: url },
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
              <span className="text-white">Degivrare</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Utile</p>
            <h1 className="heading-h1 mb-2 max-w-3xl">Degivrarea</h1>
            <p className="text-xl text-charcoal-300 max-w-2xl">
              Sisteme automate de topire a zăpezii și gheții
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <ThermometerSnowflake className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">Cum funcționează?</h2>
            </div>
            <div className="space-y-4 text-body-lg text-charcoal-600 leading-relaxed">
              <p>
                Termostatul inteligent detectează, cu ajutorul senzorilor exteriori de temperatură, când aceasta
                scade sub pragul de îngheț sau când se depune zăpadă. Corelat cu senzorul de umiditate, termostatul
                inteligent comandă încălzirea cablului suprafeței protejate și ajută la prevenirea înghețului pe
                suprafața acesteia.
              </p>
              <p>
                La fel de eficient este și în cazul căderilor de zăpadă, când topirea progresivă se face până la
                eliminarea riscului formării gheții și a zăpezii.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl overflow-hidden mb-12"
          >
            <img
              src={`${R2}/degivrare.jpg`}
              alt="Sistem degivrare"
              className="w-full h-auto"
              width="794"
              height="324"
              loading="eager"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <Snowflake className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">Unde se folosește</h2>
            </div>
            <div className="space-y-4">
              {USE_CASES.map((useCase) => {
                const Icon = useCase.icon
                return (
                  <div key={useCase.title} className="rounded-xl bg-charcoal-50 p-6 flex gap-4">
                    <Icon className="w-5 h-5 text-brand-600 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-charcoal-900 mb-1.5">{useCase.title}</h3>
                      <p className="text-charcoal-600 leading-relaxed text-sm">{useCase.body}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl overflow-hidden"
          >
            <img
              src={`${R2}/degivrare-10.jpg`}
              alt="Sistem degivrare automat"
              className="w-full h-auto"
              width="575"
              height="437"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
