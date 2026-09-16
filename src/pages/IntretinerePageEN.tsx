import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SprayCan, AlertTriangle } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, upsertHreflangPair, resetSEO } from '@/hooks/seo-utils'

const R2 = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev'

type Product = {
  title: string
  image: string
  description: string
  application: string
  coverage: string
  warning: string
}

const PRODUCTS: Product[] = [
  {
    title: 'Anti-Mold',
    image: `${R2}/Anti-mucegai.avif`,
    description:
      'An alkaline solution specially formulated to remove mold, damp, tannin, algae and moss stains from mineral surfaces. Used on pavers, natural stone, concrete, marble or granite, restoring their original cleanliness and appearance.',
    application:
      'Apply evenly to the desired surface with a brush or by spraying. Let it work for a few hours, then scrub with a plastic brush, and finally rinse thoroughly with water, preferably two to three times.',
    coverage: 'Up to 10 sqm / 1L',
    warning: 'Do not mix with other products. Avoid contact with eyes. Wear gloves. Strong oxidizing action.',
  },
  {
    title: 'Professional Alkaline Detergent',
    image: `${R2}/Detergent-alcalin.avif`,
    description:
      'A concentrated, very powerful detergent designed to remove oil, smog, dust or rubber-mark stains. Ideal for efficiently cleaning pavers, fences, concrete, natural stone, marble and granite.',
    application:
      'Apply evenly to the desired surface using a brush or a sprayer. Let it work for a few minutes, then scrub with a plastic brush, remove any excess with a dry cloth, and rinse thoroughly with water two to three times.',
    coverage: '5–10 sqm / 1L (stubborn stains) · 10–30 sqm / 1L (general cleaning)',
    warning: 'Do not mix with other detergents. Avoid contact with eyes. Wear gloves.',
  },
  {
    title: 'Wet-Look Impregnator',
    image: `${R2}/impregnant-efect-umded.avif`,
    description:
      'A protective, enhancing product that deepens natural color and waterproofs the treated surface. Applied to pavers, stone, concrete, marble and granite to boost resistance to water, smog, frost and dirt.',
    application:
      'Apply evenly to a clean, dry surface using a brush, roller or sprayer. Let it work for 15–20 minutes, then wipe off any excess with a dry cloth.',
    coverage: '10–30 sqm / 1L',
    warning: 'Do not mix with other products. Avoid contact with eyes. Wear gloves.',
  },
  {
    title: 'Natural-Look Impregnator',
    image: `${R2}/impregnant-efect-natural.avif`,
    description:
      'An invisible protective solution that preserves the natural look of the surface while providing effective waterproofing. Suitable for pavers, fences, steps and other vertical or horizontal concrete surfaces.',
    application:
      'Apply evenly to the desired surface with a brush, roller or by spraying. Let it work for 15–20 minutes, then remove the excess with a dry cloth.',
    coverage: '10–30 sqm / 1L',
    warning: 'Flammable. Avoid contact with eyes. Wear gloves.',
  },
  {
    title: 'Anti-Efflorescence',
    image: `${R2}/Anti-eflorescenta.avif`,
    description:
      'A detergent specially designed to remove white efflorescence, cement or adhesive stains that appear on concrete surfaces. Used on pavers, fences, stone or other mineral surfaces, cleaning deep without damaging the structure.',
    application:
      'Apply evenly to the desired surface with a brush or by spraying. Let it work for a few minutes, then scrub with a plastic brush and rinse thoroughly with water.',
    coverage: '4–8 sqm / 1L',
    warning: 'Do not apply to polished marble. Avoid contact with eyes. Wear gloves.',
  },
  {
    title: 'Anti-Rust',
    image: `${R2}/Anti-rugina.avif`,
    description:
      'A product designed to clean rust stains that appear on outdoor hard surfaces, with fast and effective action. Applied to pavers, stone, concrete, marble and granite without compromising their finish.',
    application:
      'Apply evenly to the desired surface using a brush or sprayer. Let it work for a few hours, then scrub with a plastic brush and rinse thoroughly with water.',
    coverage: '8–12 sqm / 1L',
    warning: 'Do not use on polished marble. Avoid contact with eyes. Wear gloves.',
  },
]

export function IntretinerePageEN() {
  useEffect(() => {
    const url = `${window.location.origin}/en/intretinere`
    const title = `Maintenance Product Recommendations | ${SEO_SITE_NAME}`
    const description =
      'Discover maintenance products for cleaning pavers and natural stone. Restore the original look!'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertHreflangPair('/intretinere', '/en/intretinere')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', PRODUCTS[0].image)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/en` },
        { '@type': 'ListItem', position: 2, name: 'Maintenance', item: url },
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
              <span className="text-white">Maintenance</span>
            </nav>
            <p className="text-brand-500 text-sm font-medium tracking-[0.2em] uppercase mb-3">Guide</p>
            <h1 className="heading-h1 mb-2 max-w-3xl">Maintenance Product Recommendations</h1>
            <p className="text-xl text-charcoal-300 mb-6">Professional solutions for your paving</p>
            <p className="text-body-lg text-charcoal-400 max-w-2xl">
              Keep your pavers looking flawless with our professional maintenance products. From specialized
              detergents to anti-efflorescence solutions and protective impregnators, find everything you need for
              cleaning, protection and beautification.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
                className="rounded-xl border border-charcoal-100 bg-white overflow-hidden flex flex-col"
              >
                <div className="aspect-square bg-charcoal-50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    loading={index < 3 ? 'eager' : 'lazy'}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <SprayCan className="w-4 h-4 text-brand-600 shrink-0" />
                    <h2 className="text-lg font-bold text-charcoal-900">{product.title}</h2>
                  </div>
                  <p className="text-charcoal-600 leading-relaxed text-sm mb-4">{product.description}</p>

                  <div className="mb-4">
                    <h3 className="text-xs font-semibold tracking-[0.1em] uppercase text-charcoal-400 mb-1.5">
                      How to Apply
                    </h3>
                    <p className="text-charcoal-600 leading-relaxed text-sm">{product.application}</p>
                  </div>

                  <div className="mb-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold">
                      Coverage: {product.coverage}
                    </span>
                  </div>

                  <div className="mt-auto flex gap-2 p-3 rounded-lg bg-amber-50 border border-amber-100">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-amber-800 text-xs leading-relaxed">{product.warning}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
