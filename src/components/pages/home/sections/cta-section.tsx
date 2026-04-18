export default function CtaSection() {
  return (
    <section id="request-demo" className="cta border-t border-ploy-border-primary py-20 lg:py-32">
      <div className="cta__container max-w-7xl mx-auto px-6 lg:px-8">
        <div className="cta__grid grid items-center gap-12 lg:gap-16 grid-cols-1 lg:grid-cols-2">
          <div className="cta__content">
            <p className="cta__eyebrow tracking-[0.1em] uppercase text-ploy-text-secondary font-medium text-xs mb-4">Partner With Us</p>
            <h2 className="cta__title font-heading tracking-tight leading-[1.1] font-semibold text-3xl lg:text-[2.75rem] mb-6 text-balance">
              Ready to ship your clinical trials faster? Let&apos;s accelerate together.
            </h2>
            <a target="_blank" rel="noopener noreferrer" href="https://cal.com/team/astraea/product-demo"
              className="cta__button bg-ploy-button-primary-background text-ploy-button-primary-text border border-ploy-button-primary-border px-6 py-3 rounded-[var(--radius-button)] font-medium text-sm inline-flex items-center gap-2 transition-opacity duration-200 hover:opacity-90">
              Request Demo <span>→</span>
            </a>
          </div>
          <div className="cta__image-wrapper flex justify-end">
            <img src="/pharmaimage2.webp" alt="Pharmaceutical research" className="cta__image w-full max-w-md object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
