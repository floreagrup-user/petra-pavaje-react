import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FlaskConical, HelpCircle, BadgeCheck, ClipboardCheck, Wrench, Phone, Mail, MapPin, ExternalLink } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, upsertHreflangPair, resetSEO } from '@/hooks/seo-utils'
import { trackEvent } from '@/lib/analytics'

const R2 = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev'

const ROLE_ITEMS = [
  'Ensuring the quality and consistent performance of Petra Pavaje products',
  'Developing new products',
  'Testing the durability of concrete precast units',
  'Implementing and testing new surface-protection solutions',
  'Analyzing the raw materials used in our concrete precast mixes',
  'Studying mixes and formulas for Petra Pavaje products',
]

const KNOW_THAT_ITEMS = [
  'The Petra Pavaje laboratory also serves external clients, offering them the experience, impartiality and guaranteed quality of top-tier building-material testing services.',
  'The Petra Pavaje laboratory is among the only construction labs in the country and abroad that performs tensile-splitting/bending tests on concrete precast units permanently in a wet environment — the most unfavorable condition — ensuring markedly higher strength for our elements compared with other manufacturers.',
  'Tests at the Petra Pavaje laboratory are carried out at every stage of a product\'s development: the raw material is analyzed, along with the product fresh off the production line and a product that has aged for a period.',
  'Full traceability is ensured across the entire production flow for every Petra Pavaje product — for any given paver, we can identify exactly which batch of raw materials went into it.',
]

const ANALYSIS_ITEMS = [
  'Determining total water absorption of concrete pavers',
  'Tensile-splitting strength of concrete pavers',
  'Determining total water absorption of concrete slabs',
  'Bending strength of concrete slabs',
  'Determining total water absorption of concrete curbs',
  'Bending strength of concrete curbs',
  'Determining total water absorption of drainage channels',
]

const EQUIPMENT_ITEMS = [
  '3000 kN compression testing press',
  'Secondary bending frame for precast elements and curbs',
  'Marshall press',
  'Marshall compactor',
  'Marshall water bath',
  'Pycnometer',
  'Extraction centrifuge',
  'Automatic Proctor apparatus',
  'Sieve shaker',
  'Spectrophotometer',
  'Engler viscometer',
  'Extractor',
  'Ovens, scales',
  'Thermostatic water bath, automatic penetrometer, magnetic stirrer with heating',
  'Core drill, Benkelman beam, Zorn plate, etc.',
]

export function LaboratorPageEN() {
  useEffect(() => {
    const url = `${window.location.origin}/en/laborator`
    const title = `Laboratory - Petra Pavaje, part of Florea Grup | ${SEO_SITE_NAME}`
    const description =
      'The Petra Pavaje in-house testing laboratory, authorized by the State Construction Inspectorate, tests the durability of concrete precast units to the SR EN ISO/IEC 17025:2018 standard.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertHreflangPair('/laborator', '/en/laborator')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', `${R2}/laborator-echipament-1.png`)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/en` },
        { '@type': 'ListItem', position: 2, name: 'Laboratory', item: url },
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
              <span className="text-white">Laboratory</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Laboratory</p>
            <h1 className="heading-h1 mb-6 max-w-3xl">The Petra Pavaje Laboratory, part of Florea Grup</h1>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              The Petra Pavaje factories operate as open research and innovation hubs. As part of this, every
              factory has its own in-house testing and analysis laboratory. The creative process behind new
              products is grounded in precise tests performed with state-of-the-art equipment, authorized by the
              State Construction Inspectorate.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-premium max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-xl border border-charcoal-100 p-8 md:p-10 flex justify-center">
            <img
              src={`${R2}/Picture-1.png`}
              alt="Florea Grup Laboratory logo"
              className="w-full max-w-md h-auto"
              width="1430"
              height="754"
              loading="eager"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <FlaskConical className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">The Laboratory's Role</h2>
            </div>
            <ul className="space-y-3 mb-6">
              {ROLE_ITEMS.map((item) => (
                <li key={item} className="flex gap-3 text-charcoal-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2.5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-body-lg text-charcoal-600 leading-relaxed">
              The quality of Petra Pavaje products is strengthened by our ongoing focus on continuous improvement.
              This is achieved by studying variables such as the raw materials used, optimizing each product's
              formula and processing parameters, storage methods, traffic volume, and paver age. By analyzing these
              factors, we develop products that best meet customer needs, so they can enjoy their pavers for the
              long term, keeping their appearance attractive as time goes by.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14 rounded-xl bg-charcoal-50 p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">Did You Know…</h2>
            </div>
            <ul className="space-y-4">
              {KNOW_THAT_ITEMS.map((item) => (
                <li key={item} className="flex gap-3 text-charcoal-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2.5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <BadgeCheck className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">Certifications</h2>
            </div>
            <div className="space-y-4 text-body-lg text-charcoal-600 leading-relaxed">
              <p>
                The Florea Grup analysis and testing laboratory is <strong className="text-charcoal-900">authorized by the State Construction Inspectorate</strong>, under authorization no. 2128, since 2006. The laboratory's competence is demonstrated to both its clients and to regulatory, accreditation and control authorities through rigorous implementation of{' '}
                <strong className="text-charcoal-900">SR EN ISO/IEC 17025:2018</strong>.
              </p>
              <p>
                The laboratory is an independent part of the organization and ensures the <strong className="text-charcoal-900">impartiality, confidentiality and professionalism</strong> of its results.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <ClipboardCheck className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">Tests Performed</h2>
            </div>
            <div className="space-y-4 text-body-lg text-charcoal-600 leading-relaxed mb-6">
              <p>
                The Florea Grup analysis and testing laboratory is authorized by the State Construction Inspectorate
                to perform tests in the following profiles:{' '}
                <strong className="text-charcoal-900">B, BA, BP, MBM, GTF, D, MD, EP</strong>.
              </p>
              <p className="font-semibold text-charcoal-900">
                The laboratory carries out a wide range of tests and analyses to study the durability of concrete
                precast units.
              </p>
            </div>
            <ul className="space-y-3 mb-6">
              {ANALYSIS_ITEMS.map((item) => (
                <li key={item} className="flex gap-3 text-charcoal-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2.5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-body-lg text-charcoal-600 leading-relaxed mb-4">
              Tests are carried out with state-of-the-art, calibrated and metrologically verified equipment, in
              dedicated spaces that meet the environmental requirements of current Romanian and European
              regulations and standards.
            </p>
            <p className="text-body-lg text-charcoal-600 leading-relaxed">
              The full list of tests performed by the Florea Grup analysis and testing laboratory can be viewed{' '}
              <a
                href="https://floreagrup.ro/projects/laborator-constructii/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 font-semibold hover:underline inline-flex items-center gap-1"
              >
                here
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              .
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">Laboratory Equipment</h2>
            </div>
            <p className="text-body-lg text-charcoal-600 leading-relaxed mb-6">Our laboratory equipment includes:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
              {EQUIPMENT_ITEMS.map((item) => (
                <li key={item} className="flex gap-3 text-charcoal-600 leading-relaxed text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="rounded-xl overflow-hidden">
              <img
                src={`${R2}/laborator-echipament-1.png`}
                alt="Petra Pavaje laboratory equipment"
                className="w-full h-auto"
                width="2093"
                height="1803"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-charcoal-50 p-8 md:p-10"
          >
            <p className="text-body-lg text-charcoal-600 leading-relaxed mb-6">
              Our commitment to ongoing staff development and improving service quality ensures maximum efficiency
              and professionalism. You can request a personalized quote using the contact details below.
            </p>
            <div className="space-y-3">
              <p className="font-semibold text-charcoal-900">Head of Laboratory: Eng. Gabriela Marchiș</p>
              <div className="flex items-center gap-3 text-charcoal-600">
                <Phone className="w-4 h-4 text-brand-600 shrink-0" />
                <a href="tel:0728999941" className="hover:text-brand-600 transition-colors">0728 999 941</a>
              </div>
              <div className="flex items-center gap-3 text-charcoal-600">
                <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                <a href="mailto:laborator@floreagrup.ro" onClick={() => trackEvent('email_click')} className="hover:text-brand-600 transition-colors">laborator@floreagrup.ro</a>
              </div>
              <div className="flex items-center gap-3 text-charcoal-600">
                <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                <span>Alba Iulia, str. Pietrar nr. 20</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
