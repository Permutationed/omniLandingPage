import HeroSectionIcon1 from "../svgs/hero-section-icon-1";

const navCards = [
  { href: "#platform", title: "Platform", description: "AI-native trial automation built for regulated environments." },
  { href: "#technology", title: "Technology", description: "Proprietary engine from protocol design through FDA submission." },
  { href: "#pipeline", title: "Pipeline", description: "End-to-end execution across Phase II and III clinical programs." },
];

export default function HeroSection() {
  return (
    <section className="hero py-16 lg:py-24">
      <div className="hero__container max-w-7xl mx-auto px-6 lg:px-8">
        <div className="hero__grid grid gap-12 lg:gap-16 grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-start">
          <div className="hero__content">
            <h1 className="hero__title font-heading font-semibold text-ploy-text-primary tracking-tight leading-[1.05] text-4xl md:text-5xl lg:text-6xl text-balance">
              End-to-end automated data management for clinical trials.
            </h1>
            <p className="hero__subtitle text-ploy-text-secondary text-lg lg:text-xl leading-relaxed mt-6 max-w-xl">
              Astraea accelerates the full trial lifecycle from protocol design to FDA submission using compliant, enterprise-grade AI designed for modern healthcare.
            </p>
            <div className="hero__actions flex flex-wrap items-center gap-4 mt-8">
              <a target="_blank" rel="noopener noreferrer" href="https://cal.com/team/astraea/product-demo"
                className="hero__cta hero__cta--primary bg-ploy-button-primary-background text-ploy-button-primary-text border border-ploy-button-primary-border px-6 py-3 rounded-[var(--radius-button)] font-medium text-sm inline-flex items-center gap-2 transition-all duration-200 hover:opacity-90">
                Request Demo <span className="text-sm">→</span>
              </a>
              <div className="hero__badge flex items-center gap-2 border border-ploy-border-primary px-4 py-2.5 rounded-[var(--radius-button)] transition-all duration-300 hover:-translate-y-0.5 hover:border-ploy-accent-primary hover:shadow-[0_8px_24px_-4px_rgba(242,101,34,0.25)]">
                <HeroSectionIcon1 />
                <span className="text-ploy-text-secondary text-xs font-medium">Backed by Y Combinator</span>
              </div>
            </div>
          </div>
          <div className="hero__image-wrapper overflow-hidden rounded-sm">
            <img src="https://www.tryastraea.com/medicine1.avif" alt="Clinical pharmaceutical research"
              className="hero__image w-full h-auto min-h-[20rem] lg:min-h-[28rem] object-cover" />
          </div>
        </div>
        <div className="hero__cards grid grid-cols-1 md:grid-cols-3 gap-px bg-ploy-border-primary border border-ploy-border-primary mt-16 lg:mt-24">
          {navCards.map((card) => (
            <a key={card.href} href={card.href}
              className="hero__card bg-ploy-background-primary p-6 lg:p-8 group transition-colors duration-200 hover:bg-ploy-neutral-primary-s2">
              <h3 className="hero__card-title font-heading font-semibold text-lg text-ploy-text-primary">{card.title}</h3>
              <p className="hero__card-description text-ploy-text-secondary text-sm leading-relaxed mt-2">{card.description}</p>
              <span className="hero__card-arrow text-ploy-text-secondary text-sm mt-4 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
