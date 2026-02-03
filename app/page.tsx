import { HeroSection } from '@/components/hero/hero-section'
import { HowYouEarnSection } from '@/components/how-you-earn'
import { AudienceTabs, FAQSection } from '@/components/content-sections'
import { CalculatorSection } from '@/components/calculator'

export default function Page() {
  return (
    <>
      <HeroSection />

      <HowYouEarnSection />

      <CalculatorSection />

      <AudienceTabs />

      <FAQSection />
    </>
  )
}
