import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import PageHeroSection from "@/components/sections/page-hero-section";
import WhyChooseSection from "@/components/sections/why-choose-section";
import FinalCtaSection from "@/components/sections/final-cta-section";

export function AboutPage() {
  return (
    <div className="page relative flex flex-col min-h-screen">
      <Navbar />
      <main className="page__main grow">
        <PageHeroSection
          eyebrow="About Astraea"
          title={
            <>
              Transforming clinical research with standards-aware AI.
            </>
          }
          subtitle="Astraea is an AI-native clinical trial platform built by scientists, engineers, and industry veterans, redefining how modern biometrics, compliance, and submissions work together."
        />

        {/* Dream / Build / Grow */}
        <section className="journey border-b border-ploy-border-primary py-24 lg:py-32 bg-ploy-background-primary">
          <div className="journey__container max-w-6xl mx-auto px-6 lg:px-8">
            <div className="journey__grid grid grid-cols-1 md:grid-cols-3 gap-px bg-ploy-border-primary border border-ploy-border-primary">
              {[
                {
                  step: "01",
                  heading: "Dream it",
                  title: "Reimagine how clinical trials can work.",
                  body: "We envision a world where life-saving treatments reach patients faster, powered by intelligent automation, scientific precision, and FDA-aligned governance. Astraea began as that vision: a standards-aware AI layer between protocol intent and regulator-ready evidence.",
                },
                {
                  step: "02",
                  heading: "Build it",
                  title: "Turn AI into your clinical co-pilot.",
                  body: "We built Astraea to execute critical trial tasks with full human supervision, 99%+ precision on validated outputs, and FDA-aligned compliance by design. Our multi-agent architecture is redefining the clinical trial lifecycle step by step.",
                },
                {
                  step: "03",
                  heading: "Grow it",
                  title: "Scale innovation with every study.",
                  body: "From biotech startups entering first-in-human trials to top-10 global pharma, Astraea empowers teams to grow without compromise, faster submissions, higher success rates, and sustainable growth across portfolios.",
                },
              ].map((item) => (
                <div key={item.step} className="journey__item bg-ploy-background-primary p-8 lg:p-10">
                  <p className="journey__step font-heading text-ploy-accent-primary font-semibold text-sm tracking-widest uppercase mb-3">
                    {item.step} · {item.heading}
                  </p>
                  <h3 className="journey__title font-heading font-semibold text-xl text-ploy-text-primary leading-snug">
                    {item.title}
                  </h3>
                  <p className="journey__body text-ploy-text-secondary text-sm leading-relaxed mt-3">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who we are */}
        <section className="identity border-b border-ploy-border-primary py-24 lg:py-32 bg-ploy-neutral-primary-s2">
          <div className="identity__container max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">
            <div>
              <p className="identity__eyebrow uppercase tracking-[0.14em] text-xs text-ploy-text-secondary font-medium mb-4">
                Who We Are
              </p>
              <h2 className="identity__title font-heading font-semibold text-3xl md:text-4xl text-ploy-text-primary tracking-tight leading-[1.1] text-balance">
                An AI-native clinical trial company, built by people who've lived the workflow.
              </h2>
            </div>
            <div className="identity__body text-ploy-text-secondary text-base leading-relaxed space-y-5">
              <p>
                Astraea is a Y Combinator-backed clinical trial automation platform accelerating the full trial lifecycle, from protocol design to FDA submission, using compliant, enterprise-grade AI designed for modern healthcare.
              </p>
              <p>
                We're founded and staffed by biostatisticians, clinical programmers, AI engineers, and former sponsor-side leaders. We've spent careers inside SDTM, ADaM, SAPs, and CSRs, and we built Astraea to fix the handoffs, not to replace the experts.
              </p>
              <p>
                Our platform partners with pharmaceutical sponsors, biotech innovators, and research institutions to streamline operations and deliver FDA-ready results with precision and speed.
              </p>
            </div>
          </div>
        </section>

        {/* Mission + Vision */}
        <section className="vision border-b border-ploy-border-primary py-24 lg:py-32 bg-ploy-background-primary">
          <div className="vision__container max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-ploy-border-primary border border-ploy-border-primary">
            <div className="vision__block bg-ploy-background-primary p-10 lg:p-12">
              <p className="vision__label uppercase tracking-[0.14em] text-xs text-ploy-accent-primary font-semibold mb-4">
                Our Mission
              </p>
              <h3 className="vision__heading font-heading font-semibold text-2xl md:text-3xl text-ploy-text-primary leading-[1.15] text-balance">
                Empower clinical innovators with intelligent, compliant, and scalable AI that accelerates the journey from discovery to regulatory success.
              </h3>
            </div>
            <div className="vision__block bg-ploy-background-primary p-10 lg:p-12">
              <p className="vision__label uppercase tracking-[0.14em] text-xs text-ploy-accent-primary font-semibold mb-4">
                Our Vision
              </p>
              <h3 className="vision__heading font-heading font-semibold text-2xl md:text-3xl text-ploy-text-primary leading-[1.15] text-balance">
                Become the trusted AI engine behind every successful clinical trial, where automation enhances accuracy, compliance strengthens confidence, and science moves faster than ever.
              </h3>
            </div>
          </div>
        </section>

        <WhyChooseSection
          eyebrow="Our Technology"
          title="Built for the regulated workflows that matter."
          subtitle="At Astraea's core is a multi-agent AI architecture purpose-built for the clinical ecosystem."
          reasons={[
            {
              title: "Trust Through Transparency",
              description: "Every action Astraea takes is logged, versioned, and reviewable. Audit readiness is a property of the system, not a retrofit.",
            },
            {
              title: "Speed Through Intelligence",
              description: "Modular agents for annotation, standards mapping, compliance, evidence synthesis, and statistical execution, all coordinated.",
            },
            {
              title: "Safety Through Compliance",
              description: "Built around CDISC, 21 CFR Part 11, HIPAA, GDPR, and FDA guidance, not retrofitted. Compliance is a design constraint.",
            },
            {
              title: "Precision Through Expertise",
              description: "Built with biostatisticians and clinical programmers in the room, not just AI researchers. Models are grounded in real biometrics work.",
            },
          ]}
          background="secondary"
        />

        <FinalCtaSection
          title="Join us in reshaping clinical development."
          subtitle="Whether you're a sponsor, a CRO, or a scientist who believes AI can move clinical science faster, we'd love to talk."
          primaryCta={{ label: "Request a Demo", href: "https://cal.com/team/astraea/product-demo" }}
          secondaryCta={{ label: "Contact Us", href: "/contact" }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;
