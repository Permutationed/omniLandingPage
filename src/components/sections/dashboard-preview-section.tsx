interface Props {
  eyebrow?: string;
  title?: string;
  description?: string;
  background?: "primary" | "secondary";
}

function DashboardMockup() {
  const phases = [
    { label: "Protocol", active: true },
    { label: "Site Select", active: true },
    { label: "Recruitment", active: true },
    { label: "Screening", active: false, note: "42%" },
    { label: "Treatment", active: false },
    { label: "Data Lock", active: false },
    { label: "Analysis", active: false },
    { label: "Submission", active: false },
  ];

  return (
    <div className="dashboard-mockup border border-ploy-border-primary overflow-hidden rounded-[var(--radius-card)] shadow-xl shadow-black/5 bg-ploy-neutral-primary-s0">
      <div className="dashboard-mockup__bar border-b border-ploy-border-primary bg-ploy-neutral-primary-s2 flex items-center gap-2 px-4 py-3">
        <span className="flex gap-1.5">
          <span className="bg-red-400/80 w-2 h-2 block rounded-full" />
          <span className="bg-amber-400/80 w-2 h-2 block rounded-full" />
          <span className="bg-green-400/80 w-2 h-2 block rounded-full" />
        </span>
        <span className="text-ploy-text-secondary text-xs ml-3">Astraea Trial Dashboard</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="bg-green-500 w-1.5 h-1.5 block rounded-full animate-pulse" />
          <span className="text-ploy-text-secondary text-xs">Live</span>
        </span>
      </div>
      <div className="dashboard-mockup__body p-6">
        <div className="dashboard-mockup__meta flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-ploy-text-secondary font-medium">Study</p>
            <p className="text-sm font-heading font-semibold text-ploy-text-primary mt-0.5">ASTR-202 · Phase II · Oncology</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-ploy-text-secondary font-medium">Progress</p>
            <p className="text-sm font-heading font-semibold text-ploy-accent-primary mt-0.5">42% · On track</p>
          </div>
        </div>
        <div className="dashboard-mockup__progress bg-ploy-neutral-primary-s3 h-1.5 overflow-hidden rounded-full mb-6">
          <div className="bg-ploy-accent-primary w-[42%] h-full rounded-full" />
        </div>
        <div className="dashboard-mockup__phases flex flex-wrap gap-1.5">
          {phases.map((phase) => (
            <span
              key={phase.label}
              className={`border text-xs font-medium px-3 py-1.5 rounded-[var(--radius-button)] ${
                phase.active
                  ? "border-ploy-accent-primary text-ploy-accent-primary bg-ploy-accent-primary/5"
                  : "border-ploy-border-primary text-ploy-text-secondary"
              }`}
            >
              {phase.label}
              {phase.note && <span className="ml-1 opacity-70">· {phase.note}</span>}
            </span>
          ))}
        </div>

        <div className="dashboard-mockup__artifacts grid grid-cols-4 gap-3 mt-6">
          {["Protocol v3.1", "SAP v1.4", "aCRF", "SDTM", "ADaM", "TLFs", "Define-XML", "CSR Draft"].map((artifact, i) => (
            <div
              key={artifact}
              className={`border text-xs text-ploy-text-primary font-medium px-2.5 py-2 rounded-[var(--radius-button)] text-center ${
                i < 4 ? "border-ploy-border-primary bg-ploy-background-primary" : "border-dashed border-ploy-border-primary text-ploy-text-secondary"
              }`}
            >
              {artifact}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPreviewSection({
  eyebrow = "Platform",
  title = "Automated data orchestration.",
  description = "Track every stage of clinical data analysis from a single interface. From raw and cleaned datasets to SDTM, ADaM, TLFs, DSUR, and IB, everything stays visible, versioned, and reviewable.",
  background = "primary",
}: Props) {
  const bg = background === "secondary" ? "bg-ploy-neutral-primary-s2" : "bg-ploy-background-primary";
  return (
    <section className={`dashboard-preview border-b border-ploy-border-primary py-24 lg:py-32 ${bg}`}>
      <div className="dashboard-preview__container max-w-7xl mx-auto px-6 lg:px-8">
        <div className="dashboard-preview__grid grid items-center gap-12 lg:gap-16 grid-cols-1 lg:grid-cols-2">
          <div className="dashboard-preview__content">
            {eyebrow && (
              <p className="dashboard-preview__eyebrow uppercase tracking-[0.14em] text-xs text-ploy-text-secondary font-medium mb-4">
                {eyebrow}
              </p>
            )}
            <h2 className="dashboard-preview__title font-heading font-semibold text-ploy-text-primary tracking-tight leading-[1.1] text-3xl md:text-4xl lg:text-5xl text-balance">
              {title}
            </h2>
            {description && (
              <p className="dashboard-preview__description text-ploy-text-secondary text-base lg:text-lg leading-relaxed mt-5 max-w-lg">
                {description}
              </p>
            )}
          </div>
          <div className="dashboard-preview__mockup">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
