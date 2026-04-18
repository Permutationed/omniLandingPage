const steps = [
  { step: "Step 1", title: "Raw Ingestion", description: "Clinical data enters the pipeline from disparate sources. The ingestion layer normalizes formats and validates integrity before downstream processing." },
  { step: "Step 2", title: "CDASH Mapping", description: "Raw clinical data is mapped to CDISC CDASH standards. AI-verified completeness checks eliminate weeks of manual annotation." },
  { step: "Step 3", title: "SDTM Generation", description: "CDASH data is transformed into SDTM submission-ready datasets. Define.xml, reviewer guides, and validation reports generated with full traceability." },
  { step: "Step 4", title: "ADaM Transformation", description: "SDTM datasets transformed into analysis-ready ADaM datasets. Derivation logic, population flags, and BDS/ADSL generation with automated QC." },
  { step: "Step 5", title: "TLF Production", description: "Analysis datasets feed into automated Tables, Listings, and Figures generation. Submission-ready TLFs with version control and audit trails." },
];

const capabilities = ["Data refinement", "Standards generation", "Statistical execution", "Cross-track validation", "Report automation", "Full traceability"];

export default function PipelineFeatureSection() {
  return (
    <section id="pipeline" className="pipeline py-20 lg:py-32">
      <div className="pipeline__container max-w-7xl mx-auto px-6 lg:px-8">
        <div className="pipeline__header max-w-2xl mb-16">
          <p className="pipeline__eyebrow tracking-[0.1em] uppercase text-ploy-text-secondary font-medium text-xs mb-4">Pipeline</p>
          <h2 className="pipeline__title font-heading tracking-tight leading-[1.1] font-semibold text-3xl lg:text-[2.75rem] text-balance">
            Five stages. One automated pipeline.
          </h2>
          <p className="pipeline__subtitle text-ploy-text-secondary leading-relaxed text-base lg:text-lg mt-5">
            From raw data ingestion to submission-ready outputs, every transformation is traceable, validated, and audit-ready.
          </p>
        </div>
        <div className="pipeline__steps grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ploy-border-primary border border-ploy-border-primary">
          {steps.map((item) => (
            <div key={item.title} className="pipeline__step bg-ploy-background-primary p-6 lg:p-8">
              <span className="pipeline__step-number text-ploy-accent-primary font-heading font-semibold text-sm">{item.step}</span>
              <h3 className="pipeline__step-title font-heading font-semibold text-xl leading-tight mt-3 mb-3">{item.title}</h3>
              <p className="pipeline__step-description text-ploy-text-secondary text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
          <div className="pipeline__capabilities bg-ploy-background-inverse p-6 lg:p-8 flex flex-col justify-between">
            <ul className="pipeline__capabilities-list space-y-3 list-none m-0 p-0">
              {capabilities.map((cap) => (
                <li key={cap} className="pipeline__capability text-ploy-text-inverse text-sm flex items-center gap-2">
                  <span className="pipeline__capability-dot w-1 h-1 bg-ploy-accent-primary rounded-full shrink-0" />
                  {cap}
                </li>
              ))}
            </ul>
            <a target="_blank" rel="noopener noreferrer" href="https://cal.com/team/astraea/product-demo"
              className="pipeline__cta bg-ploy-text-inverse text-ploy-background-inverse border border-ploy-text-inverse px-5 py-2.5 rounded-[var(--radius-button)] font-medium text-sm inline-flex items-center gap-2 mt-8 w-fit transition-opacity duration-200 hover:opacity-90">
              Request Demo <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
