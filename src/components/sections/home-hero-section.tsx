import HeroSectionIcon1 from "@/components/svgs/hero-section-icon-1";

interface Props {
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
}

export default function HomeHeroSection({
  eyebrow = "Standards-Aware Clinical AI",
  title = (
    <>
      Smarter, faster, safer clinical trials with{" "}
      <span className="text-ploy-accent-primary">agentic AI</span>.
    </>
  ),
  subtitle = "From protocol design to FDA submission, Astraea transforms clinical data workflows with multi-agent AI and automation, cutting cycle times, reducing costs, and ensuring compliance at every step.",
  primaryCta = { label: "Request a Demo", href: "https://cal.com/team/astraea/product-demo" },
  secondaryCta = { label: "Explore the Platform", href: "/platform" },
  imageSrc = "/medicine1.avif",
  imageAlt = "Colorful pharmaceutical capsules arranged on a peach background, Astraea clinical trial automation",
}: Props) {
  return (
    <section className="hero relative overflow-hidden border-b border-ploy-border-primary">
      {/* Decorative background */}
      <div className="hero__backdrop absolute inset-0 pointer-events-none">
        <div className="hero__glow absolute -top-32 -left-40 w-[40rem] h-[40rem] rounded-full bg-ploy-accent-primary/10 blur-[120px]" />
        <div className="hero__glow-2 absolute -bottom-40 right-0 w-[36rem] h-[36rem] rounded-full bg-ploy-accent-primary/5 blur-[100px]" />
      </div>

      <div className="hero__container relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="hero__grid grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="hero__content text-left">
            <p className="hero__eyebrow uppercase tracking-[0.14em] text-xs text-ploy-text-secondary font-medium mb-6">
              {eyebrow}
            </p>
            <h1 className="hero__title font-heading font-semibold text-ploy-text-primary tracking-tight leading-[1.05] text-4xl md:text-5xl lg:text-[3.75rem] text-balance">
              {title}
            </h1>
            <p className="hero__subtitle text-ploy-text-secondary text-lg lg:text-xl leading-relaxed mt-6 max-w-xl">
              {subtitle}
            </p>
            <div className="hero__actions flex flex-wrap items-center gap-3 mt-8">
              <a
                href={primaryCta.href}
                target={primaryCta.href.startsWith("http") ? "_blank" : undefined}
                rel={primaryCta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="hero__cta hero__cta--primary bg-ploy-button-primary-background text-ploy-button-primary-text border border-ploy-button-primary-border px-6 py-3 rounded-[var(--radius-button)] font-medium text-sm inline-flex items-center gap-2 transition-opacity duration-200 hover:opacity-90"
              >
                {primaryCta.label} <span>→</span>
              </a>
              <a
                href={secondaryCta.href}
                className="hero__cta hero__cta--secondary bg-transparent text-ploy-text-primary border border-ploy-border-primary hover:border-ploy-text-primary px-6 py-3 rounded-[var(--radius-button)] font-medium text-sm inline-flex items-center gap-2 transition-colors duration-200"
              >
                {secondaryCta.label}
              </a>
            </div>

            <div className="hero__trust mt-8">
              <a
                href="https://www.ycombinator.com/companies/astraea"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__badge inline-flex items-center gap-2 border border-ploy-border-primary bg-ploy-background-primary/70 backdrop-blur-sm px-4 py-2.5 rounded-[var(--radius-button)] transition-all duration-300 hover:-translate-y-0.5 hover:border-ploy-accent-primary hover:shadow-[0_8px_24px_-4px_rgba(242,101,34,0.18)]"
              >
                <HeroSectionIcon1 />
                <span className="hero__badge-text text-ploy-text-secondary text-xs font-medium">
                  Backed by Y Combinator
                </span>
              </a>
            </div>
          </div>

          {/* Right: pills image */}
          <div className="hero__image-wrapper relative">
            <div className="hero__image-frame relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden rounded-[var(--radius-card)] border border-ploy-border-primary shadow-2xl shadow-black/10">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="hero__image absolute inset-0 w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            {/* Floating accent stat card */}
            <div className="hero__stat absolute -bottom-4 -left-4 lg:-left-8 bg-ploy-background-primary border border-ploy-border-primary px-5 py-3 rounded-[var(--radius-card)] shadow-lg">
              <p className="hero__stat-value font-heading font-semibold text-ploy-accent-primary text-lg leading-none">
                30–50%
              </p>
              <p className="hero__stat-label text-[10px] uppercase tracking-wider text-ploy-text-secondary font-medium mt-1">
                Faster biometrics cycles
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
