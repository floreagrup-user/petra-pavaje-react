import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Settings2, Microscope, Award } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, upsertHreflangPair, resetSEO } from '@/hooks/seo-utils'

export function GarantiePageEN() {
  useEffect(() => {
    const url = `${window.location.origin}/en/garantie`
    const title = `Warranty - 5 Years on Pavers, Slabs and Curbs | ${SEO_SITE_NAME}`
    const description =
      'Our automated production line and rigorous in-house lab testing back a 5-year warranty on every Petra Pavaje product.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertHreflangPair('/garantie', '/en/garantie')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/en` },
        { '@type': 'ListItem', position: 2, name: 'Warranty', item: url },
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
              <span className="text-white">Warranty</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Guaranteed Quality</p>
            <h1 className="heading-h1 mb-4 max-w-3xl">5-Year Warranty</h1>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              Every Petra Pavaje product comes with a 5-year warranty, backed by fully automated production and
              rigorous testing in our own laboratory.
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
            className="grid sm:grid-cols-3 gap-6 mb-14"
          >
            <div className="rounded-xl bg-charcoal-50 p-6">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center mb-4">
                <Settings2 className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="font-semibold text-charcoal-900 mb-1.5">Automated Production</h2>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                A fully automated production line, with continuous monitoring and quality control.
              </p>
            </div>
            <div className="rounded-xl bg-charcoal-50 p-6">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center mb-4">
                <Microscope className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="font-semibold text-charcoal-900 mb-1.5">In-House Lab Testing</h2>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Concrete precast units are rigorously tested against custom schedules tailored to each product type.
              </p>
            </div>
            <div className="rounded-xl bg-charcoal-50 p-6">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center mb-4">
                <Award className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="font-semibold text-charcoal-900 mb-1.5">5-Year Warranty</h2>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                On pavers, slabs and curbs — backed by innovative technology across the whole production flow.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 text-body-lg text-charcoal-600 leading-relaxed"
          >
            <p>
              Our fully automated production line runs a continuous quality-monitoring and control system. Combined
              with the innovative technologies embedded across the entire production flow, this lets us create
              products that are pioneering for the Romanian market in terms of dimensions, shape, surface
              treatments, and more.
            </p>
            <p>
              Alongside the automated systems on the production line, our concrete precast units are rigorously
              tested in our own laboratory, following custom schedules for each product type.
            </p>
            <p className="font-semibold text-charcoal-900">
              All of this is what makes it possible to offer a 5-year warranty on pavers, slabs and curbs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-xl bg-charcoal-50 p-8 text-center"
          >
            <p className="text-charcoal-600 mb-6">
              For more details on how the warranty works, get in touch with us directly.
            </p>
            <Link to="/en/contact" className="btn-primary">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
