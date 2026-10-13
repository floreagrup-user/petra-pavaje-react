import { useEffect, useMemo } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Navigation, Phone, Quote, Star } from 'lucide-react'
import { factories } from '@/data/site'
import { FACTORY_REVIEWS } from '@/data/factory-reviews'
import { blogPosts } from '@/data/blog'
import {
  FLOREA_GRUP_ABOUT,
  factoriesHubPath,
  factoryCity,
  factoryPagePath,
  type FactoryImage,
  type FactoryPageData,
} from '@/data/factory-pages'
import { FLOREA_GRUP_ABOUT_EN, getFactoryPages } from '@/data/factory-pages.en'
import type { Factory } from '@/data/types'
import { isEnglishPath } from '@/lib/i18n-routes'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { buildFactorySchema } from '@/lib/factory-schema'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, upsertHreflangPair, resetSEO } from '@/hooks/seo-utils'

const T = {
  ro: {
    home: 'Acasă',
    factories: 'Fabrici',
    directions: 'Indicații rutiere',
    productsMadeHere: 'Produse fabricate aici',
    about: 'Despre Petra Pavaje și Florea Grup',
    floreaStory: 'Povestea Florea Grup',
    contactTitle: 'Contact fabrică',
    openMaps: 'Deschide în Google Maps',
    googleReviews: 'recenzii Google',
    googleReview: 'recenzie Google',
    quote: 'Cere o ofertă',
    history: 'Din istoria fabricii',
    others: 'Celelalte fabrici Petra Pavaje',
    all: 'Toate fabricile Petra Pavaje',
    schedule: 'Luni - Vineri: 08:00 - 17:00',
  },
  en: {
    home: 'Home',
    factories: 'Factories',
    directions: 'Get directions',
    productsMadeHere: 'Products made here',
    about: 'About Petra Pavaje and Florea Grup',
    floreaStory: 'The Florea Grup story',
    contactTitle: 'Factory contact',
    openMaps: 'Open in Google Maps',
    googleReviews: 'Google reviews',
    googleReview: 'Google review',
    quote: 'Request a quote',
    history: 'From the factory\'s history',
    others: 'Other Petra Pavaje factories',
    all: 'All Petra Pavaje factories',
    schedule: 'Monday - Friday: 08:00 - 17:00',
  },
}

const directionsUrl = (f: Factory) => `https://www.google.com/maps/dir/?api=1&destination=${f.lat},${f.lng}`

function useFactorySEO(page: FactoryPageData | undefined, factory: Factory | undefined, isEnglish: boolean) {
  useEffect(() => {
    if (!page || !factory) return
    const origin = window.location.origin
    const roPath = factoryPagePath(page.slug)
    const enPath = factoryPagePath(page.slug, true)
    const url = `${origin}${isEnglish ? enPath : roPath}`
    const image = `${origin}${page.images[0].lg}`
    document.title = page.metaTitle
    upsertMeta('name', 'description', page.metaDescription)
    upsertCanonical(url)
    upsertHreflangPair(roPath, enPath)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', page.metaTitle)
    upsertMeta('property', 'og:description', page.metaDescription)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', page.metaTitle)
    upsertMeta('name', 'twitter:description', page.metaDescription)
    upsertMeta('name', 'twitter:image', image)

    const schema = buildFactorySchema(factory.id, origin, { url, description: page.metaDescription })
    upsertJsonLd('factory-schema', schema && { '@context': 'https://schema.org', ...schema })
    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEnglish ? 'Home' : 'Acasă', item: `${origin}${isEnglish ? '/en' : '/'}` },
        { '@type': 'ListItem', position: 2, name: isEnglish ? 'Factories' : 'Fabrici', item: `${origin}${factoriesHubPath(isEnglish)}` },
        { '@type': 'ListItem', position: 3, name: page.name, item: url },
      ],
    })
    return () => {
      // resetSEO() does not know this page-specific id, so remove it here or
      // the factory schema would linger on the next page in the SPA.
      upsertJsonLd('factory-schema', null)
      resetSEO()
    }
  }, [page, factory, isEnglish])
}

function FactoryPicture({ image, eager = false }: { image: FactoryImage; eager?: boolean }) {
  return (
    <img
      src={image.lg}
      srcSet={`${image.sm} 800w, ${image.lg} ${image.width}w`}
      sizes="(min-width: 1024px) 50vw, 100vw"
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      className="w-full h-auto rounded-2xl object-cover"
    />
  )
}

export function FactoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const isEnglish = isEnglishPath(useLocation().pathname)
  const t = isEnglish ? T.en : T.ro
  const pages = getFactoryPages(isEnglish)
  const page = pages.find((p) => p.slug === slug)
  const factory = page ? factories.find((f) => f.id === page.factoryId) : undefined
  const review = page ? FACTORY_REVIEWS.find((r) => r.factoryId === page.factoryId) : undefined
  const articles = useMemo(
    () =>
      (page?.blogSlugs ?? [])
        .map((s) => blogPosts.find((p) => p.slug === s))
        .filter((p): p is NonNullable<typeof p> => Boolean(p)),
    [page]
  )
  useFactorySEO(page, factory, isEnglish)

  if (!page || !factory) return <NotFoundPage />

  const [heroImage, ...moreImages] = page.images
  const others = pages.filter((p) => p.slug !== page.slug)
  const prefix = isEnglish ? '/en' : ''

  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-charcoal-950 text-white py-14 md:py-20">
        <div className="container-premium grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div className="min-w-0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <nav className="flex flex-wrap items-center gap-2 text-sm text-charcoal-400 mb-6" aria-label="Breadcrumb">
              <Link to={isEnglish ? '/en' : '/'} className="hover:text-white transition-colors">{t.home}</Link>
              <span aria-hidden="true">/</span>
              <Link to={factoriesHubPath(isEnglish)} className="hover:text-white transition-colors">{t.factories}</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white">{page.place}</span>
            </nav>
            <p className="text-brand-400 text-sm font-medium tracking-[0.2em] uppercase mb-3">{page.place}</p>
            <h1 className="heading-h1 mb-5">{page.name}</h1>
            <p className="text-body-lg text-charcoal-300">{page.lead}</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href={`tel:${factory.phone.replace(/\s/g, '')}`} className="btn-primary">
                <Phone className="w-4 h-4 mr-2" />
                {factory.phone}
              </a>
              <a href={directionsUrl(factory)} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
                <Navigation className="w-4 h-4 mr-2" />
                {t.directions}
              </a>
            </div>
          </motion.div>
          <div className="min-w-0">
            <FactoryPicture image={heroImage} eager />
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-charcoal-100">
        <dl className="container-premium grid grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-0 lg:divide-x divide-charcoal-100">
          {page.facts.map((fact) => (
            <div key={fact.label} className="py-6 lg:py-8 lg:px-4 lg:first:pl-0 flex flex-col-reverse">
              <dt className="text-sm text-charcoal-500 mt-1">{fact.label}</dt>
              <dd className="text-3xl md:text-4xl font-bold text-charcoal-900">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-premium grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_22rem] gap-10 lg:gap-14 items-start">
          <div className="min-w-0 space-y-12">
            {page.sections.map((section, idx) => (
              <div key={section.heading}>
                <h2 className="heading-h2 text-charcoal-900 mb-4">{section.heading}</h2>
                <div className="space-y-4 max-w-[65ch]">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)} className="text-body text-charcoal-700 leading-relaxed">{p}</p>
                  ))}
                </div>
                {idx === 0 && (
                  <div className="mt-6 flex flex-wrap gap-2" aria-label={t.productsMadeHere}>
                    {page.products.map((product) => (
                      <Link
                        key={product.href}
                        to={product.href}
                        className="inline-flex items-center gap-1 rounded-full border border-charcoal-200 px-4 py-2 text-sm text-charcoal-800 hover:border-brand-600 hover:text-brand-700 transition-colors"
                      >
                        {product.label}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ))}
                  </div>
                )}
                {moreImages
                  .filter((img, i) => (img.afterSection ?? i) === idx)
                  .map((img) => (
                    <figure key={img.lg} className="mt-8">
                      <FactoryPicture image={img} />
                    </figure>
                  ))}
              </div>
            ))}

            <div className="rounded-2xl bg-charcoal-50 p-6 md:p-8">
              <h2 className="heading-h3 text-charcoal-900 mb-3">{t.about}</h2>
              <p className="text-body text-charcoal-700 leading-relaxed max-w-[65ch]">{isEnglish ? FLOREA_GRUP_ABOUT_EN : FLOREA_GRUP_ABOUT}</p>
              <Link to={`${prefix}/florea-grup`} className="link-premium inline-block mt-4">{t.floreaStory}</Link>
            </div>
          </div>

          <aside className="min-w-0 lg:sticky lg:top-28 space-y-4">
            <div className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal-900 mb-4">{t.contactTitle}</h2>
              <ul className="space-y-3 text-sm text-charcoal-700">
                <li className="flex gap-3">
                  <MapPin className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{factory.address}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <a href={`tel:${factory.phone.replace(/\s/g, '')}`} className="hover:text-brand-700">{factory.phone}</a>
                </li>
                <li className="flex gap-3">
                  <Mail className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <a href={`mailto:${factory.email}`} className="hover:text-brand-700 [overflow-wrap:anywhere]">{factory.email}</a>
                </li>
                <li className="flex gap-3">
                  <Clock className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{isEnglish ? t.schedule : factory.schedule}</span>
                </li>
              </ul>
              <a
                href={directionsUrl(factory)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full mt-5 justify-center"
              >
                <Navigation className="w-4 h-4 mr-2" />
                {t.openMaps}
              </a>
            </div>

            {factory.googleRating && (
              <div className="rounded-2xl bg-charcoal-50 p-6">
                <a
                  href={factory.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-charcoal-700 hover:text-brand-700"
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  <span className="font-semibold text-charcoal-900">{factory.googleRating.toFixed(1)}</span>
                  <span>({factory.googleReviewCount} {t.googleReviews})</span>
                </a>
                {review && (
                  <blockquote className="mt-3 flex gap-2 text-sm text-charcoal-600">
                    <Quote className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="italic leading-relaxed">&ldquo;{isEnglish ? review.textEn : review.textRo}&rdquo;</p>
                      <footer className="mt-1.5 text-xs font-medium text-charcoal-500">{review.author} · {t.googleReview}</footer>
                    </div>
                  </blockquote>
                )}
              </div>
            )}

            <Link to={`${prefix}/contact`} className="btn-primary w-full justify-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              {t.quote}
            </Link>
          </aside>
        </div>
      </section>

      {articles.length > 0 && (
        <section className="py-12 md:py-16 bg-charcoal-50">
          <div className="container-premium">
            <h2 className="heading-h2 text-charcoal-900 mb-8">{t.history}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="group flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden border border-charcoal-100">
                  <div className="sm:w-48 aspect-[16/10] sm:aspect-auto shrink-0 overflow-hidden bg-charcoal-100">
                    <img src={post.image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5 min-w-0">
                    <h3 className="font-semibold text-charcoal-900 group-hover:text-brand-700 transition-colors mb-2">{post.title}</h3>
                    <p className="text-sm text-charcoal-600 line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16">
        <div className="container-premium">
          <h2 className="heading-h3 text-charcoal-900 mb-6">{t.others}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  to={factoryPagePath(other.slug, isEnglish)}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-charcoal-100 p-5 hover:border-brand-600 transition-colors"
                >
                  <span className="min-w-0">
                    <span className="block font-semibold text-charcoal-900 group-hover:text-brand-700">
                      {isEnglish ? `${factoryCity(other)} Factory` : `Fabrica ${factoryCity(other)}`}
                    </span>
                    <span className="block text-sm text-charcoal-500">{other.place}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:text-brand-600 shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <Link to={factoriesHubPath(isEnglish)} className="link-premium inline-block mt-6">{t.all}</Link>
        </div>
      </section>
    </div>
  )
}
