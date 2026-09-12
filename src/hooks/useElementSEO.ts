import { useEffect } from 'react'
import type { ElementCategoryData } from '@/data/types'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO } from './seo-utils'
import { categoryUrl, productUrl } from '@/lib/product-urls'

export function useElementSEO(category: ElementCategoryData | undefined) {
  useEffect(() => {
    if (!category) return

    const parentPath = category.parent ? productUrl(category.parent.slug, category.slug) : categoryUrl(category.slug)
    const title = `${category.title} - ${category.parent ? category.parent.name : 'Elemente'} | ${SEO_SITE_NAME}`
    const description = `${category.shortDescription}. ${category.description}`.slice(0, 300)
    const url = `${window.location.origin}${parentPath}`
    const image = category.gallery?.[0] || category.image

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)

    upsertMeta('property', 'og:type', 'product.group')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)

    upsertJsonLd('product-schema', {
      '@context': 'https://schema.org',
      '@type': 'ProductGroup',
      name: category.title,
      description: category.description,
      image: [category.image, ...(category.gallery || [])].filter(Boolean).slice(0, 10),
      category: category.parent ? category.parent.name : category.name,
      brand: { '@type': 'Brand', name: SEO_SITE_NAME },
      manufacturer: { '@type': 'Organization', name: 'Florea Grup' },
      ...(category.colors.length ? { color: category.colors.map((c) => c.name).join(', ') } : {}),
      hasVariant: category.variantGroups.flatMap((g) =>
        g.variants.map((v) => ({
          '@type': 'Product',
          name: v.name,
          sku: v.code !== '—' ? v.code : undefined,
        }))
      ),
    })

    upsertJsonLd(
      'faq-schema',
      category.faq?.length
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: category.faq.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }
        : null
    )

    const breadcrumbItems = category.parent
      ? [
          { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
          { '@type': 'ListItem', position: 2, name: category.parent.name, item: `${window.location.origin}${categoryUrl(category.parent.slug)}` },
          { '@type': 'ListItem', position: 3, name: category.title, item: url },
        ]
      : [
          { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
          { '@type': 'ListItem', position: 2, name: category.title, item: url },
        ]

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    })

    return resetSEO
  }, [category])
}
