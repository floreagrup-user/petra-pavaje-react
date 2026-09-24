import { useEffect } from 'react'
import { HeroSection } from '@/components/sections/HeroSection'
import { CategoriesSection } from '@/components/sections/CategoriesSection'
import { FeaturedProductsSection } from '@/components/sections/FeaturedProductsSection'
import { SustainabilitySection } from '@/components/sections/SustainabilitySection'
import { FactoriesSection } from '@/components/sections/FactoriesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { HOMEPAGE_FAQ_ITEMS_EN } from '@/data/faq-homepage'
import { SEO_SITE_NAME, upsertMeta, upsertCanonical, upsertHreflangPair, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'

export function HomePageEN() {
  useEffect(() => {
    const url = `${window.location.origin}/en`
    const title = `Petra Pavaje - Premium Paver Manufacturer | ${SEO_SITE_NAME}`
    const description =
      'Premium and Standard pavers, slabs, curbs, blocks, planters, fences, drainage elements. National manufacturer with 4 factories in Romania.'

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)
    upsertHreflangPair('/', '/en')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertJsonLd('faq-schema', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: HOMEPAGE_FAQ_ITEMS_EN.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/\n/g, ' ') },
      })),
    })

    return resetSEO
  }, [])

  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <SustainabilitySection />
      <FactoriesSection />
      <TestimonialsSection />
      <FaqSection />
    </>
  )
}
