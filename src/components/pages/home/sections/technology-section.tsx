import TechnologySectionMockup from "../mockups/technology-section-mockup";
import TechnologySectionMockup2 from "../mockups/technology-section-mockup2";
import TechnologySectionMockup3 from "../mockups/technology-section-mockup3";

const features = [
  {
    eyebrow: "Protocol Design",
    title: "Human oversight for data analysis at AI speed.",
    description:
      "Reduce data analysis and QC time by up to 90% while keeping experts in control of every critical decision.",
    Mockup: TechnologySectionMockup,
    imageFirst: false,
  },
  {
    eyebrow: "Data Management",
    title: "Unified visibility across the clinical data stack.",
    description:
      "View, organize, and manage data across multiple sources, formats, and study assets in one workspace.",
    Mockup: TechnologySectionMockup2,
    imageFirst: true,
  },
  {
    eyebrow: "Analysis & Reporting",
    title: "Automated SDTM and ADaM analysis with expert review built in.",
    description:
      "Move faster on clinical analysis and downstream outputs with automation that improves speed, consistency, and traceability.",
    Mockup: TechnologySectionMockup3,
    imageFirst: false,
  },
];

function MockupFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="technology__frame border border-ploy-neutral-inverse-s1 overflow-hidden">
      <div className="technology__frame-bar border-b border-ploy-text-primary/10 bg-ploy-background-secondary flex items-center gap-2 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="bg-red-500 w-2.5 h-2.5 block rounded-full" />
          <span className="bg-amber-500 w-2.5 h-2.5 block rounded-full" />
          <span className="bg-green-500 w-2.5 h-2.5 block rounded-full" />
        </div>
      </div>
      <div className="technology__frame-content bg-ploy-background-accent-tertiary aspect-video relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default function TechnologySection() {
  return (
    <section id="technology" className="technology bg-ploy-neutral-primary-s0 py-20 lg:py-32">
      <div className="technology__container max-w-7xl mx-auto px-6 lg:px-8">
        <div className="technology__header mb-16">
          <p className="technology__eyebrow tracking-[0.1em] uppercase text-ploy-text-secondary font-medium text-xs mb-4">
            Technology
          </p>
          <h2 className="technology__section-title font-heading tracking-tight leading-[1.1] font-semibold text-3xl lg:text-[2.75rem] max-w-xl text-balance">
            Built for speed, designed for compliance.
          </h2>
        </div>

        <div className="technology__features space-y-20 lg:space-y-28">
          {features.map((feature) => (
            <div
              key={feature.eyebrow}
              className="technology__feature grid items-center gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-2"
            >
              <div
                className={`technology__feature-content ${feature.imageFirst ? "lg:order-2" : "lg:order-1"}`}
              >
                <p className="technology__feature-eyebrow tracking-[0.1em] uppercase text-ploy-text-secondary font-medium text-xs mb-3">
                  {feature.eyebrow}
                </p>
                <h3 className="technology__feature-title font-heading leading-[1.15] font-semibold text-xl lg:text-2xl mb-3 text-balance">
                  {feature.title}
                </h3>
                <p className="technology__feature-description text-ploy-text-secondary leading-relaxed text-sm lg:text-base">
                  {feature.description}
                </p>
              </div>
              <div
                className={`technology__feature-mockup ${feature.imageFirst ? "lg:order-1" : "lg:order-2"}`}
              >
                <MockupFrame>
                  <feature.Mockup />
                </MockupFrame>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
