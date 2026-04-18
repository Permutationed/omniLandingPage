import PlatformOverviewSectionMockup from "../mockups/platform-overview-section-mockup";

export default function PlatformOverviewSection() {
  return (
    <section
      id="platform"
      className="platform bg-ploy-neutral-primary-s0 py-20 lg:py-32"
    >
      <div className="platform__container max-w-7xl mx-auto px-6 lg:px-8">
        <div className="platform__grid grid items-center gap-12 lg:gap-16 grid-cols-1 lg:grid-cols-2">
          <div className="platform__content">
            <p className="platform__eyebrow tracking-[0.1em] uppercase text-ploy-text-secondary font-medium text-xs mb-4">
              Platform
            </p>
            <h2 className="platform__title font-heading tracking-tight leading-[1.1] font-semibold text-3xl lg:text-[2.75rem] text-balance">
              Automated data orchestration.
            </h2>
            <p className="platform__description text-ploy-text-secondary leading-relaxed text-base lg:text-lg mt-5 max-w-lg">
              Track every stage of clinical data analysis from a single
              interface. From raw and cleaned datasets to SDTM, ADaM, TFL,
              DSUR, IB and final outputs, everything stays visible.
            </p>
          </div>
          <div className="platform__mockup">
            <PlatformOverviewSectionMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
