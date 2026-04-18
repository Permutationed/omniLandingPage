interface Props {
  eyebrow?: string;
  title?: React.ReactNode;
  body?: string;
  cta?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
  imageSide?: "left" | "right";
}

export default function EmpowerSection({
  eyebrow = "The Mission",
  title = (
    <>
      The standards-aware execution layer for modern clinical development.
    </>
  ),
  body = "Astraea doesn't replace biostatisticians, programmers, or medical writers. It gives them a traceable, standards-native execution layer that collapses handoffs, reuses structured metadata, and produces regulator-ready outputs faster, under human supervision, with full auditability.",
  cta,
  imageSrc,
  imageAlt = "Pharmaceutical research imagery",
  imageSide = "right",
}: Props) {
  // Split layout when an image is provided
  if (imageSrc) {
    const imageFirst = imageSide === "left";
    return (
      <section className="empower border-b border-ploy-border-primary py-24 lg:py-32 bg-ploy-neutral-primary-s2">
        <div className="empower__container max-w-7xl mx-auto px-6 lg:px-8">
          <div className="empower__grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div
              className={`empower__content ${imageFirst ? "lg:order-2" : "lg:order-1"}`}
            >
              {eyebrow && (
                <p className="empower__eyebrow uppercase tracking-[0.14em] text-xs text-ploy-text-secondary font-medium mb-5">
                  {eyebrow}
                </p>
              )}
              <h2 className="empower__title font-heading font-semibold text-ploy-text-primary tracking-tight leading-[1.1] text-3xl md:text-4xl lg:text-5xl text-balance">
                {title}
              </h2>
              <p className="empower__body text-ploy-text-secondary text-base lg:text-lg leading-relaxed mt-6 max-w-xl">
                {body}
              </p>
              {cta && (
                <div className="empower__actions mt-8">
                  <a
                    href={cta.href}
                    className="empower__cta inline-flex items-center gap-2 text-sm font-medium text-ploy-accent-primary hover:gap-3 transition-all"
                  >
                    {cta.label} <span>→</span>
                  </a>
                </div>
              )}
            </div>
            <div
              className={`empower__image-wrapper relative ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
            >
              <div className="empower__image-frame relative aspect-[4/5] lg:aspect-[5/4] overflow-hidden rounded-[var(--radius-card)] border border-ploy-border-primary shadow-xl shadow-black/10">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  loading="lazy"
                  className="empower__image absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Centered fallback
  return (
    <section className="empower border-b border-ploy-border-primary py-24 lg:py-36 bg-ploy-neutral-primary-s2">
      <div className="empower__container max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {eyebrow && (
          <p className="empower__eyebrow uppercase tracking-[0.14em] text-xs text-ploy-text-secondary font-medium mb-5">
            {eyebrow}
          </p>
        )}
        <h2 className="empower__title font-heading font-semibold text-ploy-text-primary tracking-tight leading-[1.1] text-3xl md:text-4xl lg:text-5xl text-balance">
          {title}
        </h2>
        <p className="empower__body text-ploy-text-secondary text-base lg:text-lg leading-relaxed mt-6 max-w-3xl mx-auto">
          {body}
        </p>
        {cta && (
          <div className="empower__actions mt-8">
            <a
              href={cta.href}
              className="empower__cta inline-flex items-center gap-2 text-sm font-medium text-ploy-accent-primary hover:gap-3 transition-all"
            >
              {cta.label} <span>→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
