import { HeroContent } from './hero-content'
import { MetricCards } from './metric-cards'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center py-24 lg:py-32">
      {/* Gradient mesh background */}
      <div className="hero-gradient" aria-hidden="true" />

      <div className="container relative z-10">
        <div>
          <HeroContent />
        </div>

        <div className="mt-16 sm:mt-20">
          <MetricCards />
        </div>
      </div>
    </section>
  )
}
