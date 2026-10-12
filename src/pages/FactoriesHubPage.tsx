import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, MessageCircle, Phone } from 'lucide-react'
import { factories } from '@/data/site'
import { FACTORY_PAGES, FLOREA_GRUP_ABOUT, factoryPagePath } from '@/data/factory-pages'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'

const PATH = '/fabrici'
const TITLE = 'Fabricile Petra Pavaje - Alba Iulia, Arad, Prahova, Roman | Petra Pavaje'
const DESCRIPTION =
  'Cele 4 fabrici de pavaje Petra Pavaje din Alba Iulia, Arad, Prahova și Roman (Neamț): 6.000 mp pe zi fiecare, peste 800 de produse, grădini expoziționale. Adrese și contact.'

const HUB_FACTS = [
  { label: 'Fabrici în România', value: '4' },
  { label: 'Capacitate totală', value: '24.000 mp/zi' },
  { label: 'Produse', value: '800+' },
  { label: 'Florea Grup, din', value: '1996' },
]

function useFactoriesHubSEO() {
  useEffect(() => {
    const origin = window.location.origin
    const url = `${origin}${PATH}`
    const image = `${origin}${FACTORY_PAGES[0].images[0].lg}`
    document.title = TITLE
    upsertMeta('name', 'description', DESCRIPTION)
    upsertCanonical(url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', TITLE)
    upsertMeta('property', 'og:description', DESCRIPTION)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', TITLE)
    upsertMeta('name', 'twitter:description', DESCRIPTION)
    upsertMeta('name', 'twitter:image', image)
    upsertJsonLd('itemlist-schema', {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: FACTORY_PAGES.map((p, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: p.name,
        url: `${origin}${factoryPagePath(p.slug)}`,
      })),
    })
    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Fabrici', item: url },
      ],
    })
    return resetSEO
  }, [])
}

export function FactoriesHubPage() {
  useFactoriesHubSEO()

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-16 md:py-20">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white">Fabrici</span>
            </nav>
            <h1 className="heading-h1 mb-4">Fabricile Petra Pavaje</h1>
            <p className="text-body-lg text-charcoal-300 max-w-3xl">
              Patru fabrici de pavaje și prefabricate din beton, în Alba Iulia, Arad, Prahova și Roman. Fiecare are o capacitate de
              6.000 mp pe zi și produce din gama de peste 800 de produse, așa că pavajul pentru proiectul tău pleacă dintr-o fabrică
              aflată cât mai aproape.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white border-b border-charcoal-100">
        <dl className="container-premium grid grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-0 lg:divide-x divide-charcoal-100">
          {HUB_FACTS.map((fact) => (
            <div key={fact.label} className="py-6 lg:py-8 lg:px-4 lg:first:pl-0 flex flex-col-reverse">
              <dt className="text-sm text-charcoal-500 mt-1">{fact.label}</dt>
              <dd className="text-3xl md:text-4xl font-bold text-charcoal-900">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="py-12 md:py-20">
        <div className="container-premium space-y-16 md:space-y-24">
          {FACTORY_PAGES.map((page, idx) => {
            const factory = factories.find((f) => f.id === page.factoryId)
            const image = page.images[0]
            return (
              <article
                key={page.slug}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
              >
                <Link
                  to={factoryPagePath(page.slug)}
                  className={`min-w-0 block overflow-hidden rounded-2xl ${idx % 2 === 1 ? 'lg:order-2' : ''}`}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    src={image.lg}
                    srcSet={`${image.sm} 800w, ${image.lg} ${image.width}w`}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </Link>
                <div className="min-w-0">
                  <p className="text-brand-600 text-sm font-medium tracking-[0.2em] uppercase mb-2">{page.place}</p>
                  <h2 className="heading-h2 text-charcoal-900 mb-4">
                    <Link to={factoryPagePath(page.slug)} className="hover:text-brand-700 transition-colors">{page.name}</Link>
                  </h2>
                  <p className="text-body text-charcoal-700 leading-relaxed max-w-[65ch] line-clamp-4">{page.lead}</p>
                  <dl className="grid grid-cols-2 gap-4 mt-6 max-w-md">
                    {page.facts.slice(0, 2).map((fact) => (
                      <div key={fact.label} className="flex flex-col-reverse">
                        <dt className="text-xs text-charcoal-500">{fact.label}</dt>
                        <dd className="text-xl font-semibold text-charcoal-900">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                  {factory && (
                    <ul className="mt-6 space-y-2 text-sm text-charcoal-700">
                      <li className="flex gap-2">
                        <MapPin className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{factory.address}</span>
                      </li>
                      <li className="flex gap-2">
                        <Phone className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" aria-hidden="true" />
                        <a href={`tel:${factory.phone.replace(/\s/g, '')}`} className="hover:text-brand-700">{factory.phone}</a>
                      </li>
                    </ul>
                  )}
                  <Link to={factoryPagePath(page.slug)} className="btn-primary mt-8">
                    Vezi {page.name.replace('Fabrica Petra Pavaje', 'fabrica din')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-charcoal-50">
        <div className="container-premium grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-8 items-center">
          <div className="min-w-0">
            <h2 className="heading-h3 text-charcoal-900 mb-3">Despre Petra Pavaje și Florea Grup</h2>
            <p className="text-body text-charcoal-700 leading-relaxed max-w-[65ch]">{FLOREA_GRUP_ABOUT}</p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link to="/contact" className="btn-primary justify-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Cere o ofertă
            </Link>
            <Link to="/florea-grup" className="btn-secondary justify-center">Povestea Florea Grup</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
