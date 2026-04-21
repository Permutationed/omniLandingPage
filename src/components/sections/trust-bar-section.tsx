interface Props {
  tiers?: string[];
}

const DEFAULT_TIERS = [
  "Top-3 Pharma",
  "Top-10 Pharma",
  "Global Biotech",
  "Mid-Size Pharma",
  "Emerging Biotech",
];

export default function TrustBarSection({
  tiers = DEFAULT_TIERS,
}: Props) {
  return (
    <section className="trust-bar border-b border-ploy-border-primary py-12 bg-ploy-neutral-primary-s2">
      <div className="trust-bar__container max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <ul className="trust-bar__tiers flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {tiers.map((tier) => (
            <li
              key={tier}
              className="trust-bar__tier border border-ploy-border-primary bg-ploy-background-primary text-ploy-text-primary text-xs font-medium px-4 py-2 rounded-[var(--radius-button)]"
            >
              {tier}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
