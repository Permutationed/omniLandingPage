import { HeroSection } from '@/components/hero/hero-section'
import { DashboardMockup } from '@/components/content-sections/dashboard-mockup'
import { ProblemSolutionStrip } from '@/components/content-sections/problem-solution-strip'
import { AstraeaSection } from '@/components/content-sections/astraea-section'
import { CTASection } from '@/components/content-sections/cta-section'

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <HeroSection />
      <DashboardMockup />
      <ProblemSolutionStrip />
      <AstraeaSection />
      <CTASection />
    </main>
  )
}
