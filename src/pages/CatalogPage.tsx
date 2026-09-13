import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, ExternalLink } from 'lucide-react'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'
import { trackEvent } from '@/lib/analytics'

const CATALOG_PDF_URL = 'https://pub-5dbaf337ef004f7ca4f5287b3e8b701f.r2.dev/Catalog-2025-Petra-Pavaje.pdf'
const CATALOG_VIEWER_URL = 'https://online.fliphtml5.com/Petra_Pavaje/Catalog_2025/'

const STATS = [
  { value: '50+', label: 'Modele' },
  { value: '4', label: 'Fabrici' },
  { value: '5 ani', label: 'Garanție' },
]

interface CatalogCategory {
  title: string
  subtitle: string
  href: string
}

const CATEGORIES: CatalogCategory[] = [
  { title: 'Pavaje Premium', subtitle: '19 colecții disponibile', href: '/pavaje-premium' },
  { title: 'Pavaje Standard', subtitle: '6 modele disponibile', href: '/pavaje-standard' },
  { title: 'Woodstone', subtitle: 'Lemn pietrificat', href: '/woodstone-lemn-pietrificat' },
  { title: 'Borduri', subtitle: '19 tipuri disponibile', href: '/borduri' },
  { title: 'Garduri', subtitle: '3 colecții: Baroc, Modern, Robusto', href: '/garduri' },
  { title: 'Elemente', subtitle: 'Rigole, bolțari, jardiniere', href: '/elemente' },
]

export function CatalogPage() {
  useEffect(() => {
    const url = `${window.location.origin}/catalog`
    const title = `Catalog Petra Pavaje 2025 - Descarcă PDF sau Răsfoiește Online | ${SEO_SITE_NAME}`
    const description =
      'Descoperă întreaga gamă Petra Pavaje — pavaje premium, standard, borduri, garduri și elemente Woodstone. Descarcă catalogul 2025 în format PDF sau răsfoiește-l online.'

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

    upsertJsonLd('product-schema', {
      '@context': 'https://schema.org',
      '@type': 'DigitalDocument',
      name: 'Catalog Petra Pavaje 2025',
      url,
      encodingFormat: 'application/pdf',
      contentUrl: CATALOG_PDF_URL,
      publisher: { '@type': 'Organization', name: SEO_SITE_NAME },
    })

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Catalog', item: url },
      ],
    })

    return resetSEO
  }, [])

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-16 md:py-20 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-72 h-full bg-brand-600/10 pointer-events-none hidden md:block"
          style={{ clipPath: 'polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          aria-hidden="true"
        />
        <div className="container-premium relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6">
              <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
              <span>/</span>
              <span className="text-white">Catalog</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-10">
              <div className="max-w-xl">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20">
                    Catalog 2025
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20">
                    50+ modele
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20">
                    4 fabrici în România
                  </span>
                </div>
                <h1 className="heading-h1 mb-4">Inspiră-te din catalogul nostru</h1>
                <p className="text-body-lg text-charcoal-400">
                  Descoperă întreaga gamă Petra Pavaje — pavaje premium, standard, borduri, garduri și elemente
                  Woodstone pentru orice spațiu exterior.
                </p>
              </div>

              <div className="flex flex-row lg:flex-col gap-3 shrink-0">
                <a
                  href={CATALOG_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('catalog_download')}
                  className="btn-primary inline-flex justify-center whitespace-nowrap"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descarcă PDF
                </a>
                <a
                  href={CATALOG_VIEWER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-white/30 text-white/85 text-sm font-semibold uppercase tracking-wide hover:border-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 whitespace-nowrap"
                >
                  Citește online
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="flex gap-8 md:gap-12 flex-wrap pt-6 border-t border-white/10">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-brand-500 leading-none">{stat.value}</div>
                  <div className="text-xs text-charcoal-400 uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-premium">
          <p className="text-sm font-medium text-charcoal-400 uppercase tracking-widest mb-6">
            Navighează după categorie
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-14">
            {CATEGORIES.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <Link
                  to={category.href}
                  className="group block h-full rounded-lg border border-charcoal-100 bg-white p-4 transition-all hover:-translate-y-1 hover:border-brand-600 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                >
                  <p className="text-sm font-bold text-charcoal-900 uppercase tracking-tight mb-1 group-hover:text-brand-600 transition-colors">
                    {category.title}
                  </p>
                  <p className="text-xs text-charcoal-500 leading-snug">{category.subtitle}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="text-sm font-medium text-charcoal-400 uppercase tracking-widest mb-6">
            Răsfoire online
          </p>
          <div className="rounded-xl border border-charcoal-100 overflow-hidden">
            <div className="flex items-center justify-between gap-3 flex-wrap px-4 md:px-6 py-3 bg-charcoal-50 border-b border-charcoal-100">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-600" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-700">
                  Catalog Petra Pavaje 2025 — răsfoire online
                </span>
              </div>
              <span className="text-xs text-charcoal-500">
                Nu se încarcă?{' '}
                <a href={CATALOG_PDF_URL} target="_blank" rel="noopener noreferrer" className="text-brand-600 font-semibold hover:underline">
                  Descarcă PDF
                </a>
              </span>
            </div>
            <div className="relative w-full bg-charcoal-50" style={{ height: '580px' }}>
              <iframe
                src={CATALOG_VIEWER_URL}
                title="Catalog Petra Pavaje 2025"
                loading="lazy"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
