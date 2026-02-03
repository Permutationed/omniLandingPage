import { HeroSection } from '@/components/hero/hero-section'
import { HowYouEarnSection } from '@/components/how-you-earn'
import { AudienceTabs } from '@/components/content-sections'
import { CalculatorSection } from '@/components/calculator'

export default function Page() {
  return (
    <>
      <HeroSection />

      <HowYouEarnSection />

      <CalculatorSection />

      <AudienceTabs />

      {/* FAQ */}
      <section id="faq" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">FAQ</h2>
          <p className="text-muted-foreground">Section placeholder</p>
        </div>
      </section>
    </>
  )
}
