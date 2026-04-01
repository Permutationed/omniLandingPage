import { HeroContent } from './hero-content'
import { MetricCards } from './metric-cards'
import { HeroCard3D } from './hero-card-3d'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center py-24 lg:py-32">
      {/* Gradient mesh background */}
      <div className="hero-gradient" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroContent />

          {/* 3D Card - positioned to right on desktop, below on mobile */}
          <div className="order-first lg:order-last">
            <HeroCard3D />
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <MetricCards />
        </div>
      </div>
    </section>
  )
}
