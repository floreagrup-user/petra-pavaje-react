import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ThermometerSnowflake, Snowflake, CarFront, Footprints } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, upsertHreflangPair, resetSEO } from '@/hooks/seo-utils'

const R2 = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev'

const USE_CASES = [
  {
    icon: CarFront,
    title: 'Vehicle Access Ramps and Loading Docks',
    body: 'Fully automated de-icing systems prevent cars and equipment from skidding on ramps and loading docks.',
  },
  {
    icon: Footprints,
    title: 'Sidewalks and Pathways',
    body: 'Eliminates the risk of injury caused by ice and frost on sidewalks and various pedestrian pathways.',
  },
]

export function DegivrarePageEN() {
  useEffect(() => {
    const url = `${window.location.origin}/en/degivrare`
    const title = `Winter Paving De-Icing - Effective Solutions | ${SEO_SITE_NAME}`
    const description =
      'A smart thermostat helps de-ice paving in winter, preventing injuries on sidewalks and vehicle access ramps.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertHreflangPair('/degivrare', '/en/degivrare')
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/en` },
        { '@type': 'ListItem', position: 2, name: 'De-icing', item: url },
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
              <Link to="/en" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">De-icing</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Helpful</p>
            <h1 className="heading-h1 mb-2 max-w-3xl">De-Icing</h1>
            <p className="text-xl text-charcoal-300 max-w-2xl">
              Automated systems for melting snow and ice
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
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">How It Works</h2>
            </div>
            <div className="space-y-4 text-body-lg text-charcoal-600 leading-relaxed">
              <p>
                The smart thermostat uses outdoor temperature sensors to detect when it drops below freezing or
                when snow settles on the surface. Combined with the humidity sensor, the smart thermostat triggers
                heating of the cable in the protected surface, helping prevent ice from forming on it.
              </p>
              <p>
                It's just as effective during snowfall, progressively melting the snow until the risk of ice and
                snow buildup is eliminated.
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
              alt="De-icing system"
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
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">Where It's Used</h2>
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
              alt="Automated de-icing system"
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
