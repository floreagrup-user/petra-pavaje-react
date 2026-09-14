import { useEffect } from 'react'
import type { Product } from '@/data/types'
import { categories } from '@/data/site'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, resetSEO, truncateDescription } from './seo-utils'
import { categoryUrl, productUrl } from '@/lib/product-urls'

export function useProductSEO(product: Product | undefined) {
  useEffect(() => {
    if (!product) return

    const categoryMeta = categories.find((c) => c.id === product.category)
    const categoryLabel = categoryMeta?.name || product.category
    const categorySlug = categoryMeta?.slug || product.category
    const title = `${product.name} - ${categoryLabel} | ${SEO_SITE_NAME}`
    const description = truncateDescription(
      product.shortDescription && product.description
        ? `${product.shortDescription}. ${product.description}`
        : product.description || ''
    )
    const url = `${window.location.origin}${productUrl(categorySlug, product.slug)}`
    const image = product.heroImages?.[0] || product.image

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)

    upsertMeta('property', 'og:type', 'product')
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
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: [...new Set([product.image, ...(product.heroImages || []), ...(product.gallery || [])].filter(Boolean))].slice(0, 10),
      category: categoryLabel,
      brand: { '@type': 'Brand', name: SEO_SITE_NAME },
      manufacturer: { '@type': 'Organization', name: 'Florea Grup' },
      ...(product.colors?.length ? { color: product.colors.map((c) => c.name).join(', ') } : {}),
    })

    upsertJsonLd(
      'faq-schema',
      product.faq?.length
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: product.faq.map((f) => ({
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
        { '@type': 'ListItem', position: 2, name: categoryLabel, item: `${window.location.origin}${categoryUrl(categorySlug)}` },
        { '@type': 'ListItem', position: 3, name: product.name, item: url },
      ],
    })

    return resetSEO
  }, [product])
}
