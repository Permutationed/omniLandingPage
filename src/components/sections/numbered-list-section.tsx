interface Item {
  title: string;
  description: string;
}

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: Item[];
  background?: "primary" | "secondary";
}

export default function NumberedListSection({
  eyebrow,
  title,
  subtitle,
  items,
  background = "primary",
}: Props) {
  const bg = background === "secondary" ? "bg-ploy-neutral-primary-s2" : "bg-ploy-background-primary";
  return (
    <section className={`numbered border-b border-ploy-border-primary py-24 lg:py-32 ${bg}`}>
      <div className="numbered__container max-w-6xl mx-auto px-6 lg:px-8">
        <div className="numbered__header max-w-2xl mb-14">
          {eyebrow && (
            <p className="numbered__eyebrow uppercase tracking-[0.14em] text-xs text-ploy-text-secondary font-medium mb-4">
              {eyebrow}
            </p>
          )}
          <h2 className="numbered__title font-heading font-semibold text-ploy-text-primary tracking-tight leading-[1.1] text-3xl md:text-4xl lg:text-5xl text-balance">
            {title}
          </h2>
          {subtitle && (
            <p className="numbered__subtitle text-ploy-text-secondary text-base lg:text-lg leading-relaxed mt-4">
              {subtitle}
            </p>
          )}
        </div>
        <ol className="numbered__list divide-y divide-ploy-border-primary border-y border-ploy-border-primary">
          {items.map((item, i) => (
            <li key={item.title} className="numbered__item grid grid-cols-[auto_1fr] md:grid-cols-[6rem_1fr_2fr] gap-6 md:gap-10 py-8 lg:py-10">
              <div className="numbered__index font-heading text-ploy-accent-primary font-semibold text-xl md:text-2xl tracking-tight">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="numbered__item-title font-heading font-semibold text-ploy-text-primary text-lg md:text-xl col-span-full md:col-span-1 -mt-1 md:mt-0">
                {item.title}
              </h3>
              <p className="numbered__item-description text-ploy-text-secondary text-sm md:text-base leading-relaxed col-span-full md:col-span-1">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
