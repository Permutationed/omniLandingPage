interface Reason {
  title: string;
  description: string;
}

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  reasons: Reason[];
  background?: "primary" | "secondary";
}

export default function WhyChooseSection({
  eyebrow,
  title,
  subtitle,
  reasons,
  background = "primary",
}: Props) {
  const bg = background === "secondary" ? "bg-ploy-neutral-primary-s2" : "bg-ploy-background-primary";
  return (
    <section className={`why border-b border-ploy-border-primary py-24 lg:py-32 ${bg}`}>
      <div className="why__container max-w-7xl mx-auto px-6 lg:px-8">
        <div className="why__header max-w-2xl mb-14">
          {eyebrow && (
            <p className="why__eyebrow uppercase tracking-[0.14em] text-xs text-ploy-text-secondary font-medium mb-4">
              {eyebrow}
            </p>
          )}
          <h2 className="why__title font-heading font-semibold text-ploy-text-primary tracking-tight leading-[1.1] text-3xl md:text-4xl lg:text-5xl text-balance">
            {title}
          </h2>
          {subtitle && (
            <p className="why__subtitle text-ploy-text-secondary text-base lg:text-lg leading-relaxed mt-4">
              {subtitle}
            </p>
          )}
        </div>
        <div className="why__grid grid grid-cols-1 md:grid-cols-2 gap-px bg-ploy-border-primary border border-ploy-border-primary">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="why__item bg-ploy-background-primary p-8 lg:p-10"
            >
              <div className="why__rule h-px w-10 bg-ploy-accent-primary mb-5" />
              <h3 className="why__item-title font-heading font-semibold text-ploy-text-primary text-lg md:text-xl">
                {reason.title}
              </h3>
              <p className="why__item-description text-ploy-text-secondary text-sm md:text-base leading-relaxed mt-3">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
