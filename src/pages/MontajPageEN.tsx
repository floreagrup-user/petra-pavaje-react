import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Wrench, Shovel, Ruler, Layers, Hammer, Sparkles, ArrowRight } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, upsertHreflangPair, resetSEO } from '@/hooks/seo-utils'

const R2 = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev'

const TOOLS_ITEMS = [
  'Wheelbarrow, shovels, pickaxe, rake (for preparing the soil and base layer)',
  'Plate compactor (with a rubber extension attachment)',
  'Profiled pipes (3-6 cm) and an aluminum screed board (for leveling the sand layer)',
  'Rubber mallet (for setting pavers in place)',
  'Grinder or paver splitter (for cutting edges/curbs)',
  'Broom (for filling the joints between pavers)',
  'Level, theodolite (for establishing grades and alignments)',
]

const SUBSTRATE_THICKNESS = [
  'Minimum 15 cm, for pedestrian pathways',
  'Minimum 20 cm, for car traffic',
  'Minimum 30 cm, for heavy, intense traffic (trucks)',
]

const STEPS = [
  {
    icon: Shovel,
    title: 'Preparing the Surface',
    image: `${R2}/montare-1-web.jpg`,
    alt: 'Surface preparation',
    width: '1094',
    height: '547',
    paragraphs: [
      'After taking measurements, the area is fenced off and the top soil layer is stripped (roughly 10-35 cm). For proper drainage, the finished surface should have a gentle, even slope.',
      'The stripped area is filled with successive layers of gravel or crushed stone, which are compacted using the plate compactor.',
    ],
    subheading: 'Base Layer Thickness',
    list: SUBSTRATE_THICKNESS,
  },
  {
    icon: Ruler,
    title: 'Installing the Curbs',
    image: `${R2}/montare-2-web.jpg`,
    alt: 'Surface compaction',
    width: '1094',
    height: '729',
    paragraphs: [
      'Curbs are installed after the base layer has been compacted, by digging the necessary trench. Curb elevations are set using a level, and alignments using a theodolite.',
      'Curbs are set on a concrete foundation of roughly 10×15 cm for small curbs and 10×20 cm for road curbs. They are then backfilled and wedged on the side (at least one-third of the curb\'s height) to withstand the forces transferred by the paving.',
    ],
  },
  {
    icon: Layers,
    title: 'Leveling the Sand Bed',
    image: `${R2}/montare-3-web.jpg`,
    alt: 'Sand leveling',
    width: '1000',
    height: '647',
    paragraphs: [
      'Pavers are laid on a sand bed that helps position them correctly. Generally, you need a 4-6 cm layer of 0-4 mm grain-size sand, combined with an 8-16 mm grain-size aggregate.',
      'This is done most easily using parallel profiled pipes as guides and a screed board to level the sand evenly with left-right sweeping motions.',
    ],
  },
  {
    icon: Hammer,
    title: 'Laying the Pavers',
    image: `${R2}/montare-4-web.jpg`,
    alt: 'Preparing to lay pavers',
    width: '1090',
    height: '728',
    paragraphs: [
      'Laying pavers on the leveled sand surface should start either from a square 90° corner or from a straight line, to avoid extra cutting work.',
      'Pavers are placed side by side, keeping them aligned. When placing them, do not tilt them, as this will disturb the leveled sand bed. A rubber mallet can be used to adjust the pavers.',
      'You can walk on the installed surface right away. Don\'t forget to check the slope of the paving: minimum 2-2.5% for proper water drainage.',
    ],
  },
  {
    icon: Sparkles,
    title: 'Jointing Sand and Compaction',
    image: `${R2}/montare-5-web.jpg`,
    alt: 'Paving compaction',
    width: '1000',
    height: '637',
    paragraphs: [
      'Once the pavers are laid across the whole surface, a thin layer of fine, dry sand (0.2 mm) is swept over it with a broom to fill all the joints.',
      'Excess sand is removed, then the surface is compacted with the plate compactor (fitted with the rubber extension attachment). Compact both lengthwise and crosswise for even pressure. Repeat the sanding step until the joints are completely filled.',
      'For extra strength, the surface can be dampened and left for 2-3 days before removing the excess sand. This process secures the pavers permanently in place.',
    ],
  },
]

export function MontajPageEN() {
  useEffect(() => {
    const url = `${window.location.origin}/en/montaj`
    const title = `Installation Tips and Instructions - Pavers, Slabs | ${SEO_SITE_NAME}`
    const description =
      'A complete installation guide for Petra Pavaje pavers. Find the best installation methods, including tips for surface prep, alignment and the base layer.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertHreflangPair('/montaj', '/en/montaj')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', `${R2}/montare-4-web.jpg`)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/en` },
        { '@type': 'ListItem', position: 2, name: 'Installation', item: url },
      ],
    })

    upsertJsonLd('howto-schema', {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Installation tips and instructions for pavers and slabs',
      description,
      step: STEPS.map((step) => ({
        '@type': 'HowToStep',
        name: step.title,
        text: step.paragraphs.join(' '),
        image: step.image,
      })),
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
              <span className="text-white">Installation</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Helpful</p>
            <h1 className="heading-h1 mb-2 max-w-3xl">Installation Tips and Instructions</h1>
            <p className="text-xl text-charcoal-300 mb-6">Pavers and Slabs</p>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              A complete installation guide for Petra Pavaje pavers. Follow the right steps for a durable surface
              and a professional finish.
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
            className="mb-14 rounded-xl bg-charcoal-50 p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">Tools Needed</h2>
            </div>
            <ul className="space-y-3">
              {TOOLS_ITEMS.map((item) => (
                <li key={item} className="flex gap-3 text-charcoal-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2.5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-14"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-charcoal-400">
                    Step {index + 1}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">{step.title}</h2>
                <div className="space-y-4 text-body-lg text-charcoal-600 leading-relaxed mb-6">
                  {step.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {step.subheading && step.list && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-charcoal-900 mb-3">{step.subheading}</h3>
                    <ul className="space-y-3">
                      {step.list.map((item) => (
                        <li key={item} className="flex gap-3 text-charcoal-600 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-2.5 shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="w-full h-auto"
                    width={step.width}
                    height={step.height}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              </motion.div>
            )
          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-charcoal-50 p-8 md:p-10 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-3">Your Paving is Installed</h2>
            <p className="text-charcoal-600 mb-6 max-w-xl mx-auto">
              To keep its look and durability over time, follow our maintenance recommendations.
            </p>
            <Link to="/en/intretinere" className="btn-primary inline-flex">
              See the Maintenance Guide
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
