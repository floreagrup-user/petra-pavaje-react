import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, upsertHreflangPair, resetSEO } from '@/hooks/seo-utils'
import { PavingCalculator } from '@/components/calculator/PavingCalculator'

const FAQ_ITEMS = [
  {
    question: 'How do I calculate how many square meters of paving I need?',
    answer:
      'Measure the length and width of the surface (or of each zone, if there are several) and multiply them to get the square meters. The calculator does this automatically and adds your chosen waste percentage, then rounds up to a whole number of pallets.',
  },
  {
    question: 'How much extra paving should I order?',
    answer:
      'We recommend 5% waste for a simple, straight layout with few cuts. For surfaces with corners, irregular shapes, or an angled layout, choose 7-10% to have enough material for cutting.',
  },
  {
    question: 'How many paver pieces are needed per square meter?',
    answer:
      'It depends on the format — each product has its own pieces/sqm figure, shown automatically in the calculator once you pick the product and format. For Mix models, the quantity is calculated directly in sqm, without a fixed number of pieces per format.',
  },
  {
    question: 'How do I find out how many pallets to order?',
    answer:
      'The calculator divides the total requirement (waste included) by how many sqm (or linear meters, for curbs) fit on a pallet, and rounds up to a whole pallet, since a pallet can\'t be ordered partially.',
  },
  {
    question: 'What if the surface has an irregular shape?',
    answer:
      'In advanced mode you can choose shapes like triangle, circle or semicircle, or enter the surface area directly in sqm if you already have the measurement. You can combine several shapes by adding separate zones, and the calculator adds them up.',
  },
  {
    question: 'Can I also calculate curbs?',
    answer:
      'Yes — the "Curbs & Edging" section of the calculator covers curbs, fences, palisades and other linear elements. Enter the total length in linear meters and the calculator shows the pieces and pallets needed.',
  },
  {
    question: 'Does the calculator include cutting waste?',
    answer:
      'Yes, the chosen waste percentage (5% by default) is applied before rounding up to whole pallets, so it covers both cutting risk and a reserve for any future repairs.',
  },
  {
    question: 'Is the calculator result a final order quantity?',
    answer:
      'It\'s an indicative estimate based on the products\' real technical data. For the final order, we recommend confirming it with a Petra Pavaje specialist, especially for projects with complex shapes or vehicle traffic.',
  },
]

export function CalculatorPavajPageEN() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const url = `${window.location.origin}/en/calculator-pavaj`
    const title = `Paving Calculator – Estimate the Paving You Need | ${SEO_SITE_NAME}`
    const description =
      'Quickly calculate how much paving your project needs. Choose the product, enter the surface area and waste percentage, and get the estimated quantity and number of pallets.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertHreflangPair('/calculator-pavaj', '/en/calculator-pavaj')
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
        { '@type': 'ListItem', position: 2, name: 'Resources', item: `${window.location.origin}/catalog` },
        { '@type': 'ListItem', position: 3, name: 'Paving Calculator', item: url },
      ],
    })

    upsertJsonLd('faq-schema', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    })

    return resetSEO
  }, [])

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-14 md:py-16">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6" aria-label="breadcrumb">
              <Link to="/en" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/catalog" className="hover:text-white transition-colors">Resources</Link>
              <span>/</span>
              <span className="text-white">Paving Calculator</span>
            </nav>
            <h1 className="heading-h1 mb-4">Paving Calculator</h1>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              Choose the product, enter your project's surface area, and instantly see the estimated paving quantity
              and number of pallets, calculated from Petra Pavaje's real technical data.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-charcoal-50">
        <div className="container-premium">
          <PavingCalculator />
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="container-premium max-w-3xl">
          <h2 className="heading-h2 text-charcoal-900 mb-8">Quick Usage Guide</h2>
          <div className="space-y-8 text-body text-charcoal-600 leading-relaxed">
            <div>
              <h3 className="font-semibold text-charcoal-900 mb-2">How is the paving requirement calculated?</h3>
              <p>
                The project's surface area (length × width, or the sum of several zones) is multiplied by the
                number of pieces or sqm/pallet of the chosen format, and the result is rounded up to a whole number
                of pallets — because a pallet can't be ordered as a fraction.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-charcoal-900 mb-2">What waste percentage should I use?</h3>
              <p>
                We recommend 5% by default, enough for a straight layout with minimal cutting. For surfaces with
                multiple corners, irregular shapes, or an angled layout, a 7-10% margin reduces the risk of running
                short of material at the end.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-charcoal-900 mb-2">How is the number of pallets calculated?</h3>
              <p>
                The total requirement (waste included) is divided by how many sqm or linear meters fit on a pallet,
                according to the product's technical data, and the result is always rounded up.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-charcoal-900 mb-2">How do I choose the right paving quantity?</h3>
              <p>
                Start from the real surface area measured on site, choose the format suited to the type of traffic
                (pedestrian, light or heavy), and let the calculator work out both the theoretical requirement and
                the commercial quantity rounded to whole pallets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-charcoal-50">
        <div className="container-premium max-w-3xl">
          <h2 className="heading-h2 text-charcoal-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i
              return (
                <div key={item.question} className="bg-white rounded-xl border border-charcoal-100 overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-charcoal-900">{item.question}</span>
                    <ChevronDown className={`w-5 h-5 text-charcoal-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && <p className="px-5 pb-5 text-sm text-charcoal-600 leading-relaxed">{item.answer}</p>}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
