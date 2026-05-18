import { HeroSection } from '@/components/sections/HeroSection'
import { CategoriesSection } from '@/components/sections/CategoriesSection'
import { FeaturedProductsSection } from '@/components/sections/FeaturedProductsSection'
import { SustainabilitySection } from '@/components/sections/SustainabilitySection'
import { FactoriesSection } from '@/components/sections/FactoriesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CTASection } from '@/components/sections/CTASection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <SustainabilitySection />
      <FactoriesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
