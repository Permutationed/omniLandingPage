type FeatureProps = {
  eyebrow: string;
  title: string;
  description: string;
  videoSrc: string;
  reverse?: boolean;
};

function FeatureRow({ eyebrow, title, description, videoSrc, reverse }: FeatureProps) {
  return (
    <div className={`technology__feature grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reverse ? "" : ""}`}>
      <div className={`technology__feature-content ${reverse ? "lg:order-2" : ""}`}>
        <p className="technology__feature-eyebrow text-ploy-accent-primary font-semibold text-sm uppercase tracking-wider mb-3">
          {eyebrow}
        </p>
        <h3 className="technology__feature-title font-heading font-semibold text-2xl md:text-3xl tracking-tight leading-[1.15] text-ploy-text-primary text-balance mb-4">
          {title}
        </h3>
        <p className="technology__feature-description text-ploy-text-secondary text-base leading-relaxed">
          {description}
        </p>
      </div>
      <div className={`technology__feature-visual ${reverse ? "lg:order-1" : ""}`}>
        <div className="technology__feature-mockup border border-ploy-border-primary overflow-hidden rounded-sm">
          <div className="technology__feature-toolbar flex items-center gap-1.5 px-4 py-3 border-b border-ploy-border-primary bg-ploy-background-secondary">
            <span className="w-2.5 h-2.5 rounded-full bg-ploy-accent-primary-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-ploy-accent-tertiary" />
            <span className="w-2.5 h-2.5 rounded-full bg-ploy-neutral-primary-400" />
          </div>
          <div className="technology__feature-video bg-ploy-background-primary aspect-video relative overflow-hidden">
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const features: FeatureProps[] = [
  {
    eyebrow: "Protocol Design",
    title: "Human oversight for data analysis at AI speed.",
    description:
      "Reduce data analysis and QC time by up to 90% while keeping experts in control of every critical decision.",
    videoSrc: "/demo-1.mp4",
  },
  {
    eyebrow: "Data Management",
    title: "Unified visibility across the clinical data stack.",
    description:
      "View, organize, and manage data across multiple sources, formats, and study assets in one workspace.",
    videoSrc: "/demo-2.mp4",
    reverse: true,
  },
  {
    eyebrow: "Analysis & Reporting",
    title: "Automated SDTM and ADaM analysis with expert review built in.",
    description:
      "Move faster on clinical analysis and downstream outputs with automation that improves speed, consistency, and traceability.",
    videoSrc: "/demo-3.mp4",
  },
];

export default function TechnologySection() {
  return (
    <section id="technology" className="technology bg-ploy-background-primary py-20 lg:py-28">
      <div className="technology__container max-w-6xl mx-auto px-6">
        <div className="technology__header max-w-2xl mb-16">
          <p className="technology__eyebrow text-ploy-accent-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Technology
          </p>
          <h2 className="technology__title font-heading font-semibold text-3xl md:text-4xl tracking-tight leading-[1.12] text-ploy-text-primary text-balance">
            Built for regulated environments. Designed for speed.
          </h2>
        </div>
        <div className="technology__features flex flex-col gap-20 lg:gap-28">
          {features.map((feature, i) => (
            <FeatureRow key={i} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
