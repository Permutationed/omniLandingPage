interface Props {
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function FinalCtaSection({
  title = "Ready to transform your clinical trials?",
  subtitle = "See how Astraea can compress your biometrics-to-reporting window by 30–50% with standards-native, audit-ready AI.",
  primaryCta = { label: "Request a Demo", href: "https://cal.com/team/astraea/product-demo" },
  secondaryCta = { label: "Contact Sales", href: "/contact" },
}: Props) {
  return (
    <section className="final-cta bg-ploy-background-inverse text-ploy-text-inverse py-24 lg:py-32">
      <div className="final-cta__container max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="final-cta__title font-heading font-semibold text-ploy-text-inverse tracking-tight leading-[1.1] text-3xl md:text-4xl lg:text-5xl text-balance">
          {title}
        </h2>
        {subtitle && (
          <p className="final-cta__subtitle text-ploy-text-inverse-secondary text-base lg:text-lg leading-relaxed mt-6 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="final-cta__actions flex flex-wrap items-center justify-center gap-3 mt-10">
          {primaryCta && (
            <a
              href={primaryCta.href}
              target={primaryCta.href.startsWith("http") ? "_blank" : undefined}
              rel={primaryCta.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="final-cta__button final-cta__button--primary bg-ploy-accent-primary text-ploy-text-on-accent-primary border border-ploy-accent-primary px-6 py-3 rounded-[var(--radius-button)] font-medium text-sm inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              {primaryCta.label} <span>→</span>
            </a>
          )}
          {secondaryCta && (
            <a
              href={secondaryCta.href}
              className="final-cta__button final-cta__button--secondary bg-transparent text-ploy-text-inverse border border-ploy-border-inverse hover:border-ploy-text-inverse px-6 py-3 rounded-[var(--radius-button)] font-medium text-sm inline-flex items-center gap-2 transition-colors"
            >
              {secondaryCta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
