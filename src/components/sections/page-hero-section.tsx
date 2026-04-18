interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  align?: "center" | "left";
}

export default function PageHeroSection({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  align = "center",
}: Props) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  const maxWidthClass = align === "center" ? "max-w-3xl mx-auto" : "max-w-3xl";

  return (
    <section className="page-hero relative overflow-hidden border-b border-ploy-border-primary">
      <div className="page-hero__backdrop absolute inset-0 pointer-events-none">
        <div className="page-hero__glow absolute -top-24 left-1/3 -translate-x-1/2 w-[32rem] h-[32rem] rounded-full bg-ploy-accent-primary/8 blur-[110px]" />
      </div>
      <div className={`page-hero__container relative max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-28 flex flex-col ${alignClass}`}>
        {eyebrow && (
          <p className="page-hero__eyebrow uppercase tracking-[0.14em] text-xs text-ploy-text-secondary font-medium mb-5">
            {eyebrow}
          </p>
        )}
        <h1 className={`page-hero__title font-heading font-semibold text-ploy-text-primary tracking-tight leading-[1.08] text-3xl md:text-4xl lg:text-5xl text-balance ${maxWidthClass}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`page-hero__subtitle text-ploy-text-secondary text-lg leading-relaxed mt-5 ${maxWidthClass}`}>
            {subtitle}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className={`page-hero__actions flex flex-wrap gap-3 mt-8 ${align === "center" ? "justify-center" : ""}`}>
            {primaryCta && (
              <a
                href={primaryCta.href}
                target={primaryCta.href.startsWith("http") ? "_blank" : undefined}
                rel={primaryCta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="page-hero__cta page-hero__cta--primary bg-ploy-button-primary-background text-ploy-button-primary-text border border-ploy-button-primary-border px-6 py-3 rounded-[var(--radius-button)] font-medium text-sm inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                {primaryCta.label} <span>→</span>
              </a>
            )}
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                className="page-hero__cta page-hero__cta--secondary bg-transparent text-ploy-text-primary border border-ploy-border-primary hover:border-ploy-text-primary px-6 py-3 rounded-[var(--radius-button)] font-medium text-sm inline-flex items-center gap-2 transition-colors"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
