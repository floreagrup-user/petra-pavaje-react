import { useEffect } from 'react'
import type { Product, ProductFAQ } from '@/data/types'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from './seo-utils'

const TITLE = `Pavaje Premium - 19 Modele de Pavaj Beton Premium | ${SEO_SITE_NAME}`
const DESCRIPTION =
  'Descoperă gama Pavaje Premium Petra Pavaje: 19 modele, zeci de culori și finisaje, tehnologie Color Lock și rezistență la îngheț. Filtrează după culoare, grosime și utilizare.'

export function usePremiumCategorySEO(products: Product[], faq: ProductFAQ[]) {
  useEffect(() => {
    if (!products.length) return

    const url = `${window.location.origin}/produse/pavaje-premium`
    const image = products[0]?.heroImages?.[0] || products[0]?.image

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
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: product.name,
        url: `${window.location.origin}/produse/pavaje-premium/${product.slug}`,
        image: product.image,
      })),
    })

    upsertJsonLd(
      'faq-schema',
      faq.length
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }
        : null
    )

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Pavaje Premium', item: url },
      ],
    })

    return resetSEO
  }, [products, faq])
}
