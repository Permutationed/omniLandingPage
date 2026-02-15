import { HeroSection } from '@/components/hero/hero-section'
import {
  AudienceTabs,
  FAQSection,
  SecuritySection,
  FeatureGrid,
  ArchitectureSection,
  FutureVisionSection,
  CTASection,
  ProductivitySection,
} from '@/components/content-sections'
import { CalculatorSection } from '@/components/calculator'

export default function Page() {
  return (
    <>
      <HeroSection />

      <FeatureGrid />

      <ArchitectureSection />

      <ProductivitySection />

      <CalculatorSection />

      <AudienceTabs />

      <SecuritySection />

      <FAQSection />

      <FutureVisionSection />

      <CTASection />
    </>
  )
}
