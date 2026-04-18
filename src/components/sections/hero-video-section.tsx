interface Props {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  videoSrc?: string;
  background?: "primary" | "secondary";
}

export default function HeroVideoSection({
  eyebrow = "See Astraea in motion",
  title = "Automation you can watch work.",
  subtitle = "Astraea orchestrates specialized AI agents across the biometrics workflow, with every step logged, reviewable, and aligned to CDISC standards.",
  videoSrc = "https://www.tryastraea.com/demo-1.mp4",
  background = "primary",
}: Props) {
  const bg = background === "secondary" ? "bg-ploy-neutral-primary-s2" : "bg-ploy-background-primary";
  return (
    <section className={`hero-video border-b border-ploy-border-primary py-24 lg:py-32 ${bg}`}>
      <div className="hero-video__container max-w-6xl mx-auto px-6 lg:px-8">
        <div className="hero-video__header text-center max-w-2xl mx-auto mb-12">
          {eyebrow && (
            <p className="hero-video__eyebrow uppercase tracking-[0.14em] text-xs text-ploy-text-secondary font-medium mb-4">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="hero-video__title font-heading font-semibold text-ploy-text-primary tracking-tight leading-[1.1] text-3xl md:text-4xl lg:text-5xl text-balance">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="hero-video__subtitle text-ploy-text-secondary text-base lg:text-lg leading-relaxed mt-4">
              {subtitle}
            </p>
          )}
        </div>
        <div className="hero-video__frame border border-ploy-border-primary overflow-hidden rounded-[var(--radius-card)] shadow-2xl shadow-black/10 bg-ploy-neutral-primary-s2">
          <div className="hero-video__bar border-b border-ploy-border-primary bg-ploy-background-primary flex items-center gap-2 px-4 py-3">
            <span className="flex gap-1.5">
              <span className="bg-red-400/80 w-2.5 h-2.5 block rounded-full" />
              <span className="bg-amber-400/80 w-2.5 h-2.5 block rounded-full" />
              <span className="bg-green-400/80 w-2.5 h-2.5 block rounded-full" />
            </span>
            <span className="text-xs text-ploy-text-secondary ml-3">astraea.app</span>
            <span className="ml-auto flex items-center gap-1.5">
              <span className="bg-green-500 w-1.5 h-1.5 block rounded-full" />
              <span className="text-xs text-ploy-text-secondary">Live</span>
            </span>
          </div>
          <div className="hero-video__content aspect-video relative overflow-hidden">
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full max-w-full absolute block object-cover inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
