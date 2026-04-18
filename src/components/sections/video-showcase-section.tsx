interface VideoFeature {
  eyebrow: string;
  title: string;
  description: string;
  videoSrc: string;
}

interface Props {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  features: VideoFeature[];
  background?: "primary" | "secondary";
}

function MockupFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="video-frame border border-ploy-border-primary overflow-hidden rounded-[var(--radius-card)] shadow-xl shadow-black/5">
      <div className="video-frame__bar border-b border-ploy-border-primary bg-ploy-neutral-primary-s2 flex items-center gap-2 px-4 py-3">
        <span className="flex gap-1.5">
          <span className="bg-red-400/80 w-2.5 h-2.5 block rounded-full" />
          <span className="bg-amber-400/80 w-2.5 h-2.5 block rounded-full" />
          <span className="bg-green-400/80 w-2.5 h-2.5 block rounded-full" />
        </span>
      </div>
      <div className="video-frame__content bg-ploy-neutral-primary-s2 aspect-video relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function FeatureVideo({ src }: { src: string }) {
  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className="w-full h-full max-w-full absolute block object-cover inset-0"
    />
  );
}

export default function VideoShowcaseSection({
  eyebrow,
  title,
  subtitle,
  features,
  background = "primary",
}: Props) {
  const bg = background === "secondary" ? "bg-ploy-neutral-primary-s2" : "bg-ploy-background-primary";
  return (
    <section className={`video-showcase border-b border-ploy-border-primary py-24 lg:py-32 ${bg}`}>
      <div className="video-showcase__container max-w-7xl mx-auto px-6 lg:px-8">
        {(eyebrow || title || subtitle) && (
          <div className="video-showcase__header max-w-2xl mb-16 lg:mb-20">
            {eyebrow && (
              <p className="video-showcase__eyebrow uppercase tracking-[0.14em] text-xs text-ploy-text-secondary font-medium mb-4">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="video-showcase__title font-heading font-semibold text-ploy-text-primary tracking-tight leading-[1.1] text-3xl md:text-4xl lg:text-5xl text-balance">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="video-showcase__subtitle text-ploy-text-secondary text-base lg:text-lg leading-relaxed mt-4 max-w-xl">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className="video-showcase__features space-y-20 lg:space-y-28">
          {features.map((feature, i) => {
            const imageFirst = i % 2 === 1;
            return (
              <div
                key={feature.title}
                className="video-showcase__feature grid items-center gap-10 lg:gap-14 grid-cols-1 lg:grid-cols-2"
              >
                <div
                  className={`video-showcase__content ${imageFirst ? "lg:order-2" : "lg:order-1"}`}
                >
                  <p className="video-showcase__feature-eyebrow uppercase tracking-[0.14em] text-xs text-ploy-accent-primary font-semibold mb-4">
                    {feature.eyebrow}
                  </p>
                  <h3 className="video-showcase__feature-title font-heading font-semibold text-ploy-text-primary leading-[1.15] text-2xl md:text-3xl tracking-tight text-balance">
                    {feature.title}
                  </h3>
                  <p className="video-showcase__feature-description text-ploy-text-secondary leading-relaxed text-base lg:text-lg mt-4">
                    {feature.description}
                  </p>
                </div>
                <div
                  className={`video-showcase__mockup ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
                >
                  <MockupFrame>
                    <FeatureVideo src={feature.videoSrc} />
                  </MockupFrame>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
