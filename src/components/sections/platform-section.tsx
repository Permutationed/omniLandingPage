function DashboardMockup() {
  const stages = [
    "Protocol",
    "Site Select",
    "Recruitment",
    "Screening",
    "Treatment",
    "Data Lock",
    "Analysis",
  ];

  return (
    <div className="platform__mockup" data-ploy-component-type="mockup">
      <div className="platform__mockup-window border border-ploy-border-primary bg-ploy-neutral-primary-s0 overflow-hidden rounded-sm">
        <div className="platform__mockup-toolbar flex items-center gap-2 px-4 py-3 border-b border-ploy-border-primary bg-ploy-background-secondary">
          <span className="w-2.5 h-2.5 rounded-full bg-ploy-accent-primary-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-ploy-accent-tertiary" />
          <span className="w-2.5 h-2.5 rounded-full bg-ploy-neutral-primary-400" />
          <span className="text-ploy-text-secondary text-xs ml-2">
            Astraea Trial Dashboard
          </span>
          <span className="flex items-center gap-1.5 ml-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-ploy-text-secondary text-xs">Live</span>
          </span>
        </div>
        <div className="platform__mockup-body p-5">
          <div className="platform__mockup-progress bg-ploy-neutral-primary-s3 h-2 rounded-full overflow-hidden mb-5">
            <div className="bg-ploy-background-inverse h-full rounded-full w-[65%]" />
          </div>
          <div className="platform__mockup-stages flex flex-wrap gap-2">
            {stages.map((stage, i) => (
              <span
                key={stage}
                className={`platform__mockup-stage text-xs font-medium px-3 py-1.5 rounded-sm border ${
                  i < 4
                    ? "bg-ploy-background-inverse text-ploy-text-inverse border-ploy-background-inverse"
                    : "text-ploy-text-secondary border-ploy-border-primary"
                }`}
              >
                {stage}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlatformSection() {
  return (
    <section id="platform" className="platform bg-ploy-background-secondary py-20 lg:py-28">
      <div className="platform__container max-w-6xl mx-auto px-6">
        <div className="platform__grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="platform__content">
            <p className="platform__eyebrow text-ploy-accent-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Platform
            </p>
            <h2 className="platform__title font-heading font-semibold text-3xl md:text-4xl tracking-tight leading-[1.12] text-ploy-text-primary text-balance mb-5">
              Automated data orchestration.
            </h2>
            <p className="platform__description text-ploy-text-secondary text-base md:text-lg leading-relaxed mb-8">
              Track every stage of clinical data analysis from a single
              interface. From raw and cleaned datasets to SDTM, ADaM, TFL,
              DSUR, IB and final outputs, everything stays visible.
            </p>
            <a
              href="#pipeline"
              className="platform__cta bg-ploy-button-primary-background text-ploy-button-primary-text font-medium px-5 py-2.5 rounded-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2 text-sm"
            >
              See Pipeline
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
