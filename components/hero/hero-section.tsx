import { HeroContent } from './hero-content'

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-8 sm:pt-24 sm:pb-10 lg:pt-28 lg:pb-12">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-grid-pattern" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <HeroContent />
      </div>
    </section>
  )
}
