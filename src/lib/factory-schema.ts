// The one place that describes a factory as schema.org data. Each factory
// must appear exactly once per page: when index.html carried these nodes and
// the factory page added its own with the same @id, Google merged the two and
// reported "multiple aggregate ratings" (a critical error in Search Console).
// So index.html no longer has them; the homepage FactoriesSection emits all
// four and each factory page emits its own, both built here.
import { factories } from '@/data/site'
import { FACTORY_PAGES, factoryCity, factoryPagePath } from '@/data/factory-pages'
import { FACTORY_REVIEWS } from '@/data/factory-reviews'

export function buildFactorySchema(factoryId: string, origin: string, opts: { url?: string; description?: string } = {}) {
  const factory = factories.find((f) => f.id === factoryId)
  const page = FACTORY_PAGES.find((p) => p.factoryId === factoryId)
  if (!factory || !page) return null
  const review = FACTORY_REVIEWS.find((r) => r.factoryId === factoryId)

  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${origin}/#fabrica-${factory.id}`,
    name: `Petra Pavaje - Fabrica ${factoryCity(page)}`,
    ...(opts.description ? { description: opts.description } : {}),
    url: opts.url ?? `${origin}${factoryPagePath(page.slug)}`,
    image: page.images.map((img) => `${origin}${img.lg}`),
    telephone: factory.phone,
    email: factory.email,
    ...(page.opened ? { foundingDate: page.opened } : {}),
    parentOrganization: { '@id': `${origin}/#organization` },
    address: { '@type': 'PostalAddress', ...page.schemaAddress, addressCountry: 'RO' },
    geo: { '@type': 'GeoCoordinates', latitude: factory.lat, longitude: factory.lng },
    hasMap: `https://www.google.com/maps/dir/?api=1&destination=${factory.lat},${factory.lng}`,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
    ...(factory.googleRating && factory.googleReviewCount
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: factory.googleRating,
            reviewCount: factory.googleReviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    ...(review
      ? {
          review: {
            '@type': 'Review',
            author: { '@type': 'Person', name: review.author },
            datePublished: review.datePublished,
            reviewRating: { '@type': 'Rating', ratingValue: review.rating, bestRating: 5 },
            reviewBody: review.textRo,
          },
        }
      : {}),
  }
}
