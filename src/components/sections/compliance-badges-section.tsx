interface Props {
  badges?: string[];
}

const DEFAULT_BADGES = [
  "HIPAA Aligned",
  "CDISC Compliant",
  "21 CFR Part 11",
  "GxP Ready",
];

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M11.5 4L5.5 10L2.5 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ComplianceBadgesSection({ badges = DEFAULT_BADGES }: Props) {
  return (
    <section className="compliance border-b border-ploy-border-primary py-8 bg-ploy-background-primary">
      <div className="compliance__container max-w-6xl mx-auto px-6 lg:px-8">
        <ul className="compliance__badges flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {badges.map((label) => (
            <li
              key={label}
              className="compliance__badge flex items-center gap-2 text-ploy-text-primary text-sm font-medium"
            >
              <span className="compliance__icon text-ploy-accent-primary">
                <CheckIcon />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
