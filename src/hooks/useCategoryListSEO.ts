import { useEffect } from 'react'
import type { ProductFAQ } from '@/data/types'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, upsertHreflangPair, resetSEO } from './seo-utils'

interface CategoryListSEOConfig {
  path: string
  title: string
  description: string
  breadcrumbLabel: string
  /** RO path this page mirrors, when `path` is itself the /en/... page. Set only from the EN side of a pair. */
  roPath?: string
  /** EN path this page mirrors, when `path` is itself the RO page. Set only from the RO side of a pair -- together with `roPath` above, enables reciprocal hreflang (both sides of a pair call upsertHreflangPair) without touching the other, untranslated callers. */
  enPath?: string
}

interface CategoryListItem {
  slug: string
  name: string
  image: string
  heroImages?: string[]
}

export function useCategoryListSEO(products: CategoryListItem[], faq: ProductFAQ[], config: CategoryListSEOConfig) {
  useEffect(() => {
    if (!products.length) return

    const { path, title, description, breadcrumbLabel, roPath, enPath } = config
    const isEnglish = Boolean(roPath)
    const url = `${window.location.origin}${path}`
    const image = products[0]?.heroImages?.[0] || products[0]?.image

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    if (roPath) upsertHreflangPair(roPath, path)
    if (enPath) upsertHreflangPair(path, enPath)

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)

    upsertJsonLd('itemlist-schema', {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: product.name,
        url: `${url}/${product.slug}`,
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
        { '@type': 'ListItem', position: 1, name: isEnglish ? 'Home' : 'Acasă', item: `${window.location.origin}${isEnglish ? '/en' : '/'}` },
        { '@type': 'ListItem', position: 2, name: breadcrumbLabel, item: url },
      ],
    })

    return resetSEO
  }, [products, faq, config])
}
