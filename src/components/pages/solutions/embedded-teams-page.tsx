import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import PageHeroSection from "@/components/sections/page-hero-section";
import EmpowerSection from "@/components/sections/empower-section";
import NumberedListSection from "@/components/sections/numbered-list-section";
import WhyChooseSection from "@/components/sections/why-choose-section";
import FinalCtaSection from "@/components/sections/final-cta-section";

export function EmbeddedTeamsPage() {
  return (
    <div className="page relative flex flex-col min-h-screen">
      <Navbar />
      <main className="page__main grow">
        <PageHeroSection
          eyebrow="Embedded Biostatistics Teams"
          title={
            <>
              AI-enhanced biostatistics talent, embedded in your team.
            </>
          }
          subtitle="Flexible Functional Service Provider resourcing that scales with your pipeline, biostatisticians, programmers, and AI engineers working inside your SOPs, systems, and governance frameworks."
          primaryCta={{ label: "Request a Proposal", href: "https://cal.com/team/astraea/product-demo" }}
          secondaryCta={{ label: "Contact Sales", href: "/contact" }}
        />

        <EmpowerSection
          eyebrow="Flexible Resourcing"
          title={<>Expert capacity when you need it, without the permanent headcount.</>}
          body="Our professionals embed within sponsor teams and operate under your systems, SOPs, and governance. Combined with Astraea's platform, they help you overcome resource bottlenecks, maintain quality, and accelerate timelines without expanding permanent headcount."
        />

        <NumberedListSection
          eyebrow="Our Services"
          title="Resourcing models that fit your study pipeline."
          items={[
            {
              title: "Dedicated & Hybrid Teams",
              description: "Long-term dedicated staff, blended project-based delivery, or mixed models, shaped around your workload and study volume.",
            },
            {
              title: "AI-Enhanced Productivity",
              description: "Embedded engineers work alongside your team with Astraea-powered automation for dataset conversion, TLF generation, and QC.",
            },
            {
              title: "Full Compliance Coverage",
              description: "Adherence to CDISC, 21 CFR Part 11, GDPR, and GxP requirements, inside your existing validated environment.",
            },
            {
              title: "Cross-Functional Expertise",
              description: "Biostatisticians, SAS/R programmers, medical writers, and AI specialists, assembled to match your study needs.",
            },
            {
              title: "Global Scalability",
              description: "Rapid deployment through a global talent network and secure cloud infrastructure, with time-zone coverage that matches your team.",
            },
          ]}
        />

        <WhyChooseSection
          eyebrow="What Makes Our FSP Different"
          title="Not contractors. Embedded partners."
          reasons={[
            {
              title: "AI + Human Collaboration",
              description: "Unlike traditional FSP models, Astraea integrates AI engineers alongside biostatisticians to boost speed, accuracy, and consistency.",
            },
            {
              title: "Embedded Partnership",
              description: "Our experts operate as part of your team, sharing accountability for outcomes, not just billing hours.",
            },
            {
              title: "Tailored Engagements",
              description: "From single specialists to full functional teams, engagements scale with your study pipeline and workload.",
            },
            {
              title: "Regulatory Confidence",
              description: "Every deliverable meets global submission standards and inspection readiness expectations.",
            },
          ]}
          background="secondary"
        />

        <FinalCtaSection
          title="Scale your biometrics capacity, smartly."
          subtitle="Talk to us about your pipeline and we'll propose an embedded team model that fits your study volume and compliance needs."
          primaryCta={{ label: "Request a Proposal", href: "https://cal.com/team/astraea/product-demo" }}
          secondaryCta={{ label: "Contact Sales", href: "/contact" }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default EmbeddedTeamsPage;
