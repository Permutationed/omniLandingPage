import PipelineFeatureSectionShape1 from "../svgs/pipeline-feature-section-shape-1";

type PipelineStepProps = {
  className: string;
  variant: string;
  surface: string;
  fill: string;
  border: string;
  shadow: string;
  step: string;
  title: string;
  description: string;
};

function PipelineStep({
  className,
  variant,
  surface,
  fill,
  border,
  shadow,
  step,
  title,
  description,
}: PipelineStepProps) {
  return (
    <div
      className={className}
      data-ploy-component-type={variant}
      data-ploy-card-surface={surface}
      data-ploy-card-fill={fill}
      data-ploy-card-border={border}
      data-ploy-card-shadow={shadow}
    >
      <p className="tracking-[0.08em] uppercase text-ploy-text-secondary font-bold text-xs mt-0 mb-3">
        {step}
      </p>
      <h2 className="font-heading tracking-[-0.32px] leading-[1.1] font-semibold text-[2rem] mt-0 mb-4">
        {title}
      </h2>
      <p className="leading-relaxed text-sm max-w-[25rem] my-0">
        {description}
      </p>
    </div>
  );
}

type ProcessLabelProps = {
  label: string;
};

function ProcessLabel({ label }: ProcessLabelProps) {
  return (
    <li className="border-solid border-ploy-neutral-primary-s3 leading-[1.42857] text-sm py-1 border-b">
      {label}
    </li>
  );
}

type FeatureShapeProps = {
  containerClassName: string;
  wrapperClassName: string;
  headerClassName: string;
  title: string;
  badgeClassName: string;
  footerClassName: string;
};

function FeatureShape({
  containerClassName,
  wrapperClassName,
  headerClassName,
  title,
  badgeClassName,
  footerClassName,
}: FeatureShapeProps) {
  return (
    <div className={containerClassName}>
      <div className={wrapperClassName}>
        <PipelineFeatureSectionShape1 />
        <div className={headerClassName}>
          <span className={badgeClassName}>{title}</span>
          <span className={footerClassName}>Pending</span>
        </div>
      </div>
    </div>
  );
}

export const pipelineSteps: PipelineStepProps[] = [
  {
    className: "absolute top-0 inset-x-0",
    variant: "card",
    surface: "primary",
    fill: "transparent",
    border: "none",
    shadow: "flat",
    step: "Step 1 of 5",
    title: "Raw Ingestion",
    description:
      "Clinical data enters the pipeline from disparate sources. The ingestion layer normalizes formats and validates integrity before downstream processing.",
  },
  {
    className: "opacity-0 absolute top-0 inset-x-0",
    variant: "card",
    surface: "primary",
    fill: "transparent",
    border: "none",
    shadow: "flat",
    step: "Step 2 of 5",
    title: "CDASH Mapping",
    description:
      "Raw clinical data is mapped to CDISC CDASH standards. AI-verified completeness checks eliminate weeks of manual annotation.",
  },
  {
    className: "opacity-0 absolute top-0 inset-x-0",
    variant: "card",
    surface: "primary",
    fill: "transparent",
    border: "none",
    shadow: "flat",
    step: "Step 3 of 5",
    title: "SDTM Generation",
    description:
      "CDASH data is transformed into SDTM submission-ready datasets. Define.xml, reviewer guides, and validation reports generated with full traceability.",
  },
  {
    className: "opacity-0 absolute top-0 inset-x-0",
    variant: "",
    surface: "",
    fill: "",
    border: "",
    shadow: "",
    step: "Step 4 of 5",
    title: "ADaM Transformation",
    description:
      "SDTM datasets transformed into analysis-ready ADaM datasets. Derivation logic, population flags, and BDS/ADSL generation with automated QC.",
  },
  {
    className: "opacity-0 absolute top-0 inset-x-0",
    variant: "card",
    surface: "primary",
    fill: "transparent",
    border: "none",
    shadow: "flat",
    step: "Step 5 of 5",
    title: "TLF Production",
    description:
      "Analysis datasets feed into automated Tables, Listings, and Figures generation. Submission-ready TLFs with version control and audit trails.",
  },
];

export const processLabels: ProcessLabelProps[] = [
  { label: "Data refinement" },
  { label: "Standards generation" },
  { label: "Statistical execution" },
  { label: "Cross-track validation" },
  { label: "Report automation" },
  { label: "Full traceability" },
];

export const featureShapes: FeatureShapeProps[] = [
  {
    containerClassName: "w-full h-14 relative",
    wrapperClassName:
      "z-[2] absolute flex justify-between items-center px-4 inset-0",
    headerClassName: "tracking-[0.04em] font-semibold text-xs block",
    title: "RAW INGESTION",
    badgeClassName:
      "border-solid border-ploy-neutral-primary-500 text-ploy-text-secondary font-medium text-[0.625rem] block px-1.5 py-0.5 rounded-br-sm rounded-t-sm rounded-bl-sm border-t border-r border-b border-l",
    footerClassName: "",
  },
  {
    containerClassName: "opacity-0 translate-y-10",
    wrapperClassName: "w-full h-14 relative -mt-px",
    headerClassName:
      "z-[2] absolute flex justify-between items-center px-4 inset-0",
    title: "CDASH MAPPING",
    badgeClassName: "tracking-[0.04em] font-semibold text-xs block",
    footerClassName:
      "border-solid border-ploy-neutral-primary-500 text-ploy-text-secondary font-medium text-[0.625rem] block px-1.5 py-0.5 rounded-br-sm rounded-t-sm rounded-bl-sm border-t border-r border-b border-l",
  },
  {
    containerClassName: "opacity-0 translate-y-10",
    wrapperClassName: "w-full h-14 relative -mt-px",
    headerClassName:
      "z-[2] absolute flex justify-between items-center px-4 inset-0",
    title: "SDTM GENERATION",
    badgeClassName: "tracking-[0.04em] font-semibold text-xs block",
    footerClassName:
      "border-solid border-ploy-neutral-primary-500 text-ploy-text-secondary font-medium text-[0.625rem] block px-1.5 py-0.5 rounded-br-sm rounded-t-sm rounded-bl-sm border-t border-r border-b border-l",
  },
  {
    containerClassName: "opacity-0 translate-y-10",
    wrapperClassName: "w-full h-14 relative -mt-px",
    headerClassName:
      "z-[2] absolute flex justify-between items-center px-4 inset-0",
    title: "ADaM TRANSFORMATION",
    badgeClassName: "tracking-[0.04em] font-semibold text-xs block",
    footerClassName:
      "border-solid border-ploy-neutral-primary-500 text-ploy-text-secondary font-medium text-[0.625rem] block px-1.5 py-0.5 rounded-br-sm rounded-t-sm rounded-bl-sm border-t border-r border-b border-l",
  },
  {
    containerClassName: "opacity-0 translate-y-10",
    wrapperClassName: "w-full h-14 relative -mt-px",
    headerClassName:
      "z-[2] absolute flex justify-between items-center px-4 inset-0",
    title: "TLF PRODUCTION",
    badgeClassName: "tracking-[0.04em] font-semibold text-xs block",
    footerClassName:
      "border-solid border-ploy-neutral-primary-500 text-ploy-text-secondary font-medium text-[0.625rem] block px-1.5 py-0.5 rounded-br-sm rounded-t-sm rounded-bl-sm border-t border-r border-b border-l",
  },
];

export default function PipelineFeatureSection() {
  return (
    <section id="pipeline" className="h-[400vh] relative">
      <div className="h-[calc(-60px_+_100vh)] sticky top-[3.75rem]">
        <div className="h-full max-w-[82.5rem] flex items-center mx-auto px-8">
          <div className="w-full grid items-center gap-[3.75rem] grid-cols-1 lg:grid-cols-2 max-lg:grid-cols-[repeat(1,minmax(0px,1fr))] lg:grid-cols-[repeat(2,minmax(0px,1fr))]">
            <div className="min-h-[23.75rem] relative">
              {pipelineSteps.map((item, index) => (
                <PipelineStep key={index} {...item} />
              ))}

              <div className="absolute bottom-0 inset-x-0">
                <ul className="grid gap-[0.5rem_24px] gap-y-2 gap-x-6 grid-cols-[repeat(2,minmax(0px,1fr))] mt-0 mb-6 pl-0 md:grid-cols-2">
                  {processLabels.map((item, index) => (
                    <ProcessLabel key={index} {...item} />
                  ))}
                </ul>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cal.com/team/astraea/product-demo"
                  className="border-solid border-ploy-button-primary-border cursor-pointer bg-ploy-button-primary-background text-ploy-button-primary-text leading-normal h-10 inline-flex justify-center items-center gap-2 px-3 rounded-br-[0.3125rem] rounded-t-[0.3125rem] rounded-bl-[0.3125rem] border-t border-r border-b border-l"
                  data-ploy-component-type="button"
                  data-ploy-component-variant="primary"
                >
                  Request Demo
                  <span className="transition-[transform,translate,scale,rotate] duration-[0.15s] ease-in-out block transition-transform">
                    →
                  </span>
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="w-[17.5rem] flex flex-col-reverse">
                {featureShapes.map((item, index) => (
                  <FeatureShape key={index} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
