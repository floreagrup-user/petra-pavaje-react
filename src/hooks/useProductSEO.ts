import { useEffect } from 'react'
import type { Product } from '@/data/types'

const SITE_NAME = 'Petra Pavaje'
const DEFAULT_TITLE = 'Petra Pavaje - Producător Premium de Pavaje'
const DEFAULT_DESCRIPTION =
  'Pavaje Premium si Standard, Dale, Borduri, Boltari, Jardiniere, Garduri, Elemente de canalizare. Producator national cu 4 fabrici in Romania.'

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id: string, data: object | null) {
  const existing = document.getElementById(id)
  if (existing) existing.remove()
  if (!data) return
  const script = document.createElement('script')
  script.id = id
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

export function useProductSEO(product: Product | undefined) {
  useEffect(() => {
    if (!product) return

    const categoryLabel = product.category === 'premium' ? 'Pavaj Premium' : 'Pavaj Standard'
    const categorySlug = product.category === 'premium' ? 'pavaje-premium' : 'pavaje-standard'
    const title = `${product.name} - ${categoryLabel} | ${SITE_NAME}`
    const description =
      product.shortDescription && product.description
        ? `${product.shortDescription}. ${product.description}`.slice(0, 300)
        : (product.description || DEFAULT_DESCRIPTION).slice(0, 300)
    const url = `${window.location.origin}/produse/${categorySlug}/${product.slug}`
    const image = product.heroImages?.[0] || product.image

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)

    upsertMeta('property', 'og:type', 'product')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:site_name', SITE_NAME)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)

    upsertJsonLd('product-schema', {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: [product.image, ...(product.heroImages || []), ...(product.gallery || [])].filter(Boolean).slice(0, 10),
      category: categoryLabel,
      brand: { '@type': 'Brand', name: SITE_NAME },
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
        { '@type': 'ListItem', position: 2, name: categoryLabel, item: `${window.location.origin}/produse/${categorySlug}` },
        { '@type': 'ListItem', position: 3, name: product.name, item: url },
      ],
    })

    return () => {
      document.title = DEFAULT_TITLE
      upsertMeta('name', 'description', DEFAULT_DESCRIPTION)
      upsertJsonLd('product-schema', null)
      upsertJsonLd('faq-schema', null)
      upsertJsonLd('breadcrumb-schema', null)
    }
  }, [product])
}
