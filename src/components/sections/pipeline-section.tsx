const steps = [
  {
    step: "1",
    title: "Raw Ingestion",
    description:
      "Clinical data enters the pipeline from disparate sources. The ingestion layer normalizes formats and validates integrity before downstream processing.",
  },
  {
    step: "2",
    title: "CDASH Mapping",
    description:
      "Raw clinical data is mapped to CDISC CDASH standards. AI-verified completeness checks eliminate weeks of manual annotation.",
  },
  {
    step: "3",
    title: "SDTM Generation",
    description:
      "CDASH data is transformed into SDTM submission-ready datasets. Define.xml, reviewer guides, and validation reports generated with full traceability.",
  },
  {
    step: "4",
    title: "ADaM Transformation",
    description:
      "SDTM datasets transformed into analysis-ready ADaM datasets. Derivation logic, population flags, and BDS/ADSL generation with automated QC.",
  },
  {
    step: "5",
    title: "TLF Production",
    description:
      "Analysis datasets feed into automated Tables, Listings, and Figures generation. Submission-ready TLFs with version control and audit trails.",
  },
];

const capabilities = [
  "Data refinement",
  "Standards generation",
  "Statistical execution",
  "Cross-track validation",
  "Report automation",
  "Full traceability",
];

export default function PipelineSection() {
  return (
    <section id="pipeline" className="pipeline bg-ploy-background-secondary py-20 lg:py-28">
      <div className="pipeline__container max-w-6xl mx-auto px-6">
        <div className="pipeline__header max-w-2xl mb-16">
          <p className="pipeline__eyebrow text-ploy-accent-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Pipeline
          </p>
          <h2 className="pipeline__title font-heading font-semibold text-3xl md:text-4xl tracking-tight leading-[1.12] text-ploy-text-primary text-balance mb-5">
            From raw data to FDA submission in one continuous pipeline.
          </h2>
          <p className="pipeline__description text-ploy-text-secondary text-base md:text-lg leading-relaxed">
            End-to-end execution across Phase II and III clinical programs.
          </p>
        </div>

        <div className="pipeline__steps grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {steps.map((item) => (
            <div
              key={item.step}
              className="pipeline__step bg-ploy-background-primary border border-ploy-border-primary rounded-sm p-6 flex flex-col"
            >
              <div className="pipeline__step-number w-8 h-8 rounded-full bg-ploy-background-inverse text-ploy-text-inverse text-sm font-semibold flex items-center justify-center mb-4">
                {item.step}
              </div>
              <h3 className="pipeline__step-title font-heading font-semibold text-xl tracking-tight text-ploy-text-primary mb-3">
                {item.title}
              </h3>
              <p className="pipeline__step-description text-ploy-text-secondary text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="pipeline__capabilities border-t border-ploy-border-primary pt-10">
          <div className="pipeline__capabilities-grid grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 mb-10">
            {capabilities.map((cap) => (
              <div key={cap} className="pipeline__capability flex items-center gap-3">
                <span className="pipeline__capability-dot w-1.5 h-1.5 rounded-full bg-ploy-accent-primary flex-shrink-0" />
                <span className="pipeline__capability-label text-ploy-text-primary text-sm">
                  {cap}
                </span>
              </div>
            ))}
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://cal.com/team/astraea/product-demo"
            className="pipeline__cta bg-ploy-button-primary-background text-ploy-button-primary-text font-medium px-5 py-2.5 rounded-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2 text-sm"
          >
            Request Demo
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
