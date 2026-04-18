import TechnologyFeatureSectionMockup from "../mockups/technology-feature-section-mockup";
import TechnologyFeatureSectionMockup2 from "../mockups/technology-feature-section-mockup2";
import TechnologyFeatureSectionMockup3 from "../mockups/technology-feature-section-mockup3";

export default function TechnologyFeatureSection() {
  return (
    <section id="technology" className="py-[3.75rem]">
      <div className="max-w-[82.5rem] mx-auto px-8">
        <div>
          <div className="grid items-center grid-cols-1 lg:grid-cols-2 max-lg:gap-8 max-lg:grid-cols-[repeat(1,minmax(0px,1fr))] max-lg:mb-20 lg:gap-12 lg:grid-cols-[repeat(2,minmax(0px,1fr))] lg:mb-28">
            <div className="opacity-0 translate-x-[-7.5rem] lg:order-1">
              <p className="tracking-[0.08em] uppercase text-ploy-text-secondary font-bold text-xs mt-0 mb-3">
                01 -- Protocol Design
              </p>
              <h3 className="font-heading leading-[1.2] font-semibold mt-0 mb-3 max-lg:text-xl max-lg:leading-[1.2] lg:text-2xl lg:leading-[1.2]">
                Human oversight for data analysis at AI speed.
              </h3>
              <p className="text-ploy-text-secondary leading-relaxed my-0 max-lg:text-sm max-lg:leading-relaxed lg:text-base lg:leading-relaxed">
                Reduce data analysis and QC time by up to 90% while keeping
                experts in control of every critical decision.
              </p>
            </div>
            <TechnologyFeatureSectionMockup />
          </div>
          <div className="grid items-center grid-cols-1 lg:grid-cols-2 max-lg:gap-8 max-lg:grid-cols-[repeat(1,minmax(0px,1fr))] max-lg:mb-20 lg:gap-12 lg:grid-cols-[repeat(2,minmax(0px,1fr))] lg:mb-28">
            <div className="opacity-0 translate-x-[7.5rem] lg:order-2">
              <p className="tracking-[0.08em] uppercase text-ploy-text-secondary font-bold text-xs mt-0 mb-3">
                02 -- Data Management
              </p>
              <h3 className="font-heading leading-[1.2] font-semibold mt-0 mb-3 max-lg:text-xl max-lg:leading-[1.2] lg:text-2xl lg:leading-[1.2]">
                Unified visibility across the clinical data stack.
              </h3>
              <p className="text-ploy-text-secondary leading-relaxed my-0 max-lg:text-sm max-lg:leading-relaxed lg:text-base lg:leading-relaxed">
                View, organize, and manage data across multiple sources,
                formats, and study assets in one workspace.
              </p>
            </div>
            <TechnologyFeatureSectionMockup2 />
          </div>
          <div className="grid items-center grid-cols-1 lg:grid-cols-2 max-lg:gap-8 max-lg:grid-cols-[repeat(1,minmax(0px,1fr))] lg:gap-12 lg:grid-cols-[repeat(2,minmax(0px,1fr))]">
            <div className="opacity-0 translate-x-[-7.5rem] lg:order-1">
              <p className="tracking-[0.08em] uppercase text-ploy-text-secondary font-bold text-xs mt-0 mb-3">
                03 -- Analysis &amp; Reporting
              </p>
              <h3 className="font-heading leading-[1.2] font-semibold mt-0 mb-3 max-lg:text-xl max-lg:leading-[1.2] lg:text-2xl lg:leading-[1.2]">
                Automated SDTM and ADaM analysis with expert review built in.
              </h3>
              <p className="text-ploy-text-secondary leading-relaxed my-0 max-lg:text-sm max-lg:leading-relaxed lg:text-base lg:leading-relaxed">
                Move faster on clinical analysis and downstream outputs with
                automation that improves speed, consistency, and traceability.
              </p>
            </div>
            <TechnologyFeatureSectionMockup3 />
          </div>
        </div>
      </div>
    </section>
  );
}
