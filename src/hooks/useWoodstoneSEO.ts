import { useEffect } from 'react'
import type { WoodstoneCategory } from '@/data/types'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO, truncateDescription } from './seo-utils'

export function useWoodstoneSEO(category: WoodstoneCategory | undefined) {
  useEffect(() => {
    if (!category) return

    const title = `${category.title} - Woodstone Lemn Pietrificat | ${SEO_SITE_NAME}`
    const description = truncateDescription(`${category.shortDescription}. ${category.description}`)
    const url = `${window.location.origin}/woodstone-lemn-pietrificat/${category.slug}`
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
      image: [...new Set([category.image, ...(category.gallery || [])].filter(Boolean))].slice(0, 10),
      category: 'Woodstone Lemn Pietrificat',
      brand: { '@type': 'Brand', name: SEO_SITE_NAME },
      manufacturer: { '@type': 'Organization', name: 'Florea Grup' },
      hasVariant: category.variantGroups.flatMap((g) =>
        g.variants.map((v) => ({
          '@type': 'Product',
          name: v.name,
          sku: v.code,
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

    upsertJsonLd('breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Woodstone', item: `${window.location.origin}/woodstone-lemn-pietrificat` },
        { '@type': 'ListItem', position: 3, name: category.title, item: url },
      ],
    })

    return resetSEO
  }, [category])
}
