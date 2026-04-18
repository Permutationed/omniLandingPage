export default function DemoRequestSection() {
  return (
    <section id="request-demo" className="cta bg-ploy-background-primary py-20 lg:py-28 border-t border-ploy-border-primary">
      <div className="cta__container max-w-6xl mx-auto px-6">
        <div className="cta__grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="cta__content">
            <p className="cta__eyebrow text-ploy-accent-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Partner With Us
            </p>
            <h2 className="cta__title font-heading font-semibold text-3xl md:text-4xl tracking-tight leading-[1.12] text-ploy-text-primary text-balance mb-6">
              Ready to ship your clinical trials faster?
            </h2>
            <p className="cta__description text-ploy-text-secondary text-base md:text-lg leading-relaxed mb-8">
              Let&apos;s accelerate together. See how Astraea can transform your
              trial data pipeline from months to days.
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://cal.com/team/astraea/product-demo"
              className="cta__button bg-ploy-button-primary-background text-ploy-button-primary-text font-medium px-6 py-3 rounded-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Request Demo
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="cta__image-wrapper flex justify-end">
            <img
              src="https://www.tryastraea.com/pharmaimage2.webp"
              alt="Pharmaceutical research"
              className="cta__image w-full max-w-md rounded-sm object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
