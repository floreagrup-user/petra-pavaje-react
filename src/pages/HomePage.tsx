import { useEffect } from 'react'
import { HeroSection } from '@/components/sections/HeroSection'
import { CategoriesSection } from '@/components/sections/CategoriesSection'
import { FeaturedProductsSection } from '@/components/sections/FeaturedProductsSection'
import { SustainabilitySection } from '@/components/sections/SustainabilitySection'
import { FactoriesSection } from '@/components/sections/FactoriesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { HOMEPAGE_FAQ_ITEMS } from '@/data/faq-homepage'
import { upsertHreflangPair, upsertJsonLd, resetSEO } from '@/hooks/seo-utils'

export function HomePage() {
  useEffect(() => {
    upsertHreflangPair('/', '/en')
    upsertJsonLd('faq-schema', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: HOMEPAGE_FAQ_ITEMS.map((item) => ({
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
