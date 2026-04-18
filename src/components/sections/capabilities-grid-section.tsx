interface Capability {
  title: string;
  description?: string;
}

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  capabilities: Capability[];
}

export default function CapabilitiesGridSection({
  eyebrow,
  title,
  subtitle,
  capabilities,
}: Props) {
  return (
    <section className="capabilities border-b border-ploy-border-primary py-24 lg:py-32 bg-ploy-background-primary">
      <div className="capabilities__container max-w-7xl mx-auto px-6 lg:px-8">
        <div className="capabilities__header text-center max-w-2xl mx-auto mb-14">
          {eyebrow && (
            <p className="capabilities__eyebrow uppercase tracking-[0.14em] text-xs text-ploy-text-secondary font-medium mb-4">
              {eyebrow}
            </p>
          )}
          <h2 className="capabilities__title font-heading font-semibold text-ploy-text-primary tracking-tight leading-[1.1] text-3xl md:text-4xl lg:text-5xl text-balance">
            {title}
          </h2>
          {subtitle && (
            <p className="capabilities__subtitle text-ploy-text-secondary text-base lg:text-lg leading-relaxed mt-4">
              {subtitle}
            </p>
          )}
        </div>
        <div className="capabilities__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ploy-border-primary border border-ploy-border-primary">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="capabilities__item bg-ploy-background-primary p-7 lg:p-8"
            >
              <div className="capabilities__dot w-1.5 h-1.5 bg-ploy-accent-primary rounded-full mb-4" />
              <h3 className="capabilities__item-title font-heading font-semibold text-base md:text-lg text-ploy-text-primary">
                {cap.title}
              </h3>
              {cap.description && (
                <p className="capabilities__item-description text-ploy-text-secondary text-sm leading-relaxed mt-2">
                  {cap.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
