export default function HeroSection() {
  return (
    <section className="hero bg-ploy-background-primary pt-20 pb-16 lg:pt-28 lg:pb-20">
      <div className="hero__container max-w-6xl mx-auto px-6">
        <div className="hero__content max-w-3xl mx-auto text-center mb-12">
          <h1 className="hero__title font-heading font-semibold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-ploy-text-primary text-balance mb-6">
            End to end automated data management for clinical trials.
          </h1>
          <p className="hero__subtitle text-ploy-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
            Astraea accelerates the full trial lifecycle from protocol design to
            FDA submission using compliant, enterprise-grade AI designed for
            modern healthcare.
          </p>
          <div className="hero__actions flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://cal.com/team/astraea/product-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__cta hero__cta--primary bg-ploy-button-primary-background text-ploy-button-primary-text font-medium px-6 py-3 rounded-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Request Demo
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#platform"
              className="hero__cta hero__cta--secondary text-ploy-text-secondary font-medium px-6 py-3 rounded-sm border border-ploy-border-primary hover:border-ploy-text-primary hover:text-ploy-text-primary transition-colors inline-flex items-center gap-2"
            >
              Explore Platform
            </a>
          </div>
          <div className="hero__badge flex items-center justify-center gap-2 mt-8">
            <div className="hero__badge-icon w-5 h-5 bg-ploy-accent-primary rounded-sm flex items-center justify-center">
              <span className="text-ploy-text-on-accent-primary text-xs font-bold">Y</span>
            </div>
            <span className="hero__badge-text text-ploy-text-secondary text-sm">
              Backed by Y Combinator
            </span>
          </div>
        </div>
        <div className="hero__image-wrapper max-w-4xl mx-auto overflow-hidden rounded-sm">
          <img
            src="/medicine1.avif"
            alt="Clinical pharmaceutical research"
            className="hero__image w-full h-auto max-h-[28rem] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
