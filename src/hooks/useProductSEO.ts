import { useEffect } from 'react'
import type { Product } from '@/data/types'
import { categories } from '@/data/site'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertJsonLd, upsertHreflangPair, resetSEO, truncateDescription } from './seo-utils'
import { categoryUrl, productUrl } from '@/lib/product-urls'

const CATEGORY_LABEL_EN: Record<string, string> = {
  premium: 'Premium Pavers',
  standard: 'Standard Pavers',
}

// Extra Product fields built only from catalog data. No offers, prices or
// reviews: the site publishes none, and inventing them would be false markup.
function productSchemaExtras(product: Product, isEnglish: boolean) {
  const text = [product.description, ...(product.advantages || []), ...(product.faq || []).map((f) => f.answer)].join(' ')
  const material = /vibro-?pres+(at|ed)/i.test(text)
    ? isEnglish ? 'Vibropressed concrete' : 'Beton vibropresat'
    : /beton|concrete/i.test(text) ? (isEnglish ? 'Concrete' : 'Beton') : undefined

  const warrantyYears = Number(
    /(\d+)\s*(ani|years?)/i.exec(product.specs.find((s) => /garan|warrant/i.test(s.label))?.value ?? '')?.[1]
  )

  const packagingLabel = isEnglish ? 'Packaging' : 'Ambalare'
  const unit = isEnglish
    ? { perSqm: 'pcs/sqm', perPallet: 'pcs/pallet', sqmPallet: 'sqm/pallet', kgPallet: 'kg/pallet' }
    : { perSqm: 'buc/mp', perPallet: 'buc/palet', sqmPallet: 'mp/palet', kgPallet: 'kg/palet' }

  const specProps = product.specs.map((s) => ({ '@type': 'PropertyValue', name: s.label, value: s.value }))
  const packagingProps = (product.dimensionsList || [])
    .map((d) => {
      const parts = [
        d.piecesPerMp > 0 && `${d.piecesPerMp} ${unit.perSqm}`,
        d.piecesPerPallet > 0 && `${d.piecesPerPallet} ${unit.perPallet}`,
        d.mpPerPallet > 0 && `${d.mpPerPallet} ${unit.sqmPallet}`,
        d.kgPerPallet > 0 && `${d.kgPerPallet} ${unit.kgPallet}`,
      ].filter(Boolean)
      return parts.length ? { '@type': 'PropertyValue', name: `${packagingLabel} ${d.label}`, value: parts.join(', ') } : null
    })
    .filter(Boolean)

  const documents = (product.documents || []).flatMap((d) => [
    d.datasheetUrl && {
      '@type': 'DigitalDocument',
      name: `${isEnglish ? 'Technical datasheet' : 'Fișă tehnică'} ${d.label}`,
      url: d.datasheetUrl,
      encodingFormat: 'application/pdf',
    },
    d.declarationUrl && {
      '@type': 'DigitalDocument',
      name: `${isEnglish ? 'Declaration of performance' : 'Declarație de performanță'} ${d.label}`,
      url: d.declarationUrl,
      encodingFormat: 'application/pdf',
    },
  ]).filter(Boolean)

  const additionalProperty = [...specProps, ...packagingProps]

  return {
    ...(material ? { material } : {}),
    ...(product.dimensions ? { size: product.dimensions } : {}),
    ...(warrantyYears > 0
      ? {
          warranty: {
            '@type': 'WarrantyPromise',
            durationOfWarranty: { '@type': 'QuantitativeValue', value: warrantyYears, unitCode: 'ANN' },
          },
        }
      : {}),
    ...(additionalProperty.length ? { additionalProperty } : {}),
    ...(documents.length ? { subjectOf: documents } : {}),
  }
}

export function useProductSEO(product: Product | undefined, isEnglish = false) {
  useEffect(() => {
    if (!product) return

    const categoryMeta = categories.find((c) => c.id === product.category)
    const categoryLabel = (isEnglish && CATEGORY_LABEL_EN[product.category]) || categoryMeta?.name || product.category
    const categorySlug = categoryMeta?.slug || product.category
    const roPath = productUrl(categorySlug, product.slug)
    const enPath = `/en${roPath}`
    const title = `${product.name} - ${categoryLabel} | ${SEO_SITE_NAME}`
    const description = truncateDescription(
      product.shortDescription && product.description
        ? `${product.shortDescription}. ${product.description}`
        : product.description || ''
    )
    const url = `${window.location.origin}${isEnglish ? enPath : roPath}`
    const image = product.heroImages?.[0] || product.image

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    if (isEnglish || CATEGORY_LABEL_EN[product.category]) {
      upsertHreflangPair(roPath, enPath)
    }

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
      '@id': `${url}#product`,
      url,
      name: product.name,
      description: product.description,
      image: [...new Set([product.image, ...(product.heroImages || []), ...(product.gallery || [])].filter(Boolean))].slice(0, 10),
      category: categoryLabel,
      brand: { '@type': 'Brand', name: SEO_SITE_NAME, url: `${window.location.origin}/` },
      manufacturer: { '@type': 'Organization', name: 'Florea Grup', url: 'https://floreagrup.ro/' },
      ...(product.colors?.length ? { color: product.colors.map((c) => c.name).join(', ') } : {}),
      ...productSchemaExtras(product, isEnglish),
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
        { '@type': 'ListItem', position: 1, name: isEnglish ? 'Home' : 'Acasă', item: `${window.location.origin}${isEnglish ? '/en' : '/'}` },
        { '@type': 'ListItem', position: 2, name: categoryLabel, item: `${window.location.origin}${isEnglish ? '/en' : ''}${categoryUrl(categorySlug)}` },
        { '@type': 'ListItem', position: 3, name: product.name, item: url },
      ],
    })

    return resetSEO
  }, [product, isEnglish])
}
