import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import PageHeroSection from "@/components/sections/page-hero-section";
import AnimatedDashboardSection from "@/components/sections/animated-dashboard-section";
import StatsSection from "@/components/sections/stats-section";
import PlatformModulesSection from "@/components/sections/platform-modules-section";
import DisciplinesScrollSection from "@/components/sections/disciplines-scroll-section";
import CapabilitiesGridSection from "@/components/sections/capabilities-grid-section";
import WhyChooseSection from "@/components/sections/why-choose-section";
import TestimonialSection from "@/components/sections/testimonial-section";
import FinalCtaSection from "@/components/sections/final-cta-section";

export function PlatformPage() {
  return (
    <div className="page relative flex flex-col min-h-screen">
      <Navbar />
      <main className="page__main grow">
        <PageHeroSection
          eyebrow="The Astraea Platform"
          title={
            <>
              A standards-native execution layer for modern clinical development.
            </>
          }
          subtitle="Astraea is our proprietary agentic AI platform, purpose-built to orchestrate biometrics, compliance, and submission workflows across the full clinical trial lifecycle."
          primaryCta={{ label: "Partner With Us", href: "https://cal.com/team/astraea/product-demo" }}
          secondaryCta={{ label: "Contact Sales", href: "/contact" }}
        />

        <AnimatedDashboardSection
          eyebrow="Unified Control Plane"
          title="Automated data orchestration."
          description="Track every stage of your clinical data workflow from a single interface, from protocol and SAP through SDTM, ADaM, TLFs, Define-XML, and CSR drafts. Everything stays visible, versioned, and reviewable."
        />

        <StatsSection
          eyebrow="Why It Matters"
          title="Compliant acceleration, not just speed."
          subtitle="Astraea is aligned with FDA's human-centric, risk-based, standards-based AI posture, so every efficiency lands with audit-ready traceability intact."
          stats={[
            { value: "30–50%", label: "Faster biometrics cycles", description: "Compress the biometrics-to-reporting window in the workflows Astraea automates." },
            { value: "99%+", label: "Validation precision", description: "Outputs checked against CDISC conventions and statistical standards." },
            { value: "100%", label: "CDISC-aligned", description: "SDTM, ADaM, Define-XML, and aCRF artifacts that meet FDA submission requirements." },
            { value: "~260d", label: "Amendment blast radius", description: "Tufts reports mean amendment implementation at 260 days, Astraea's structured metadata helps avoid the rework." },
          ]}
        />

        <PlatformModulesSection
          eyebrow="Four Engines"
          title="Four core engines. One controlled system."
          subtitle="Modular agents coordinate across standards mapping, compliance, evidence synthesis, and statistical execution, with human approval baked into every step."
          cta={undefined}
        />

        <DisciplinesScrollSection
          eyebrow="The Platform in Action"
          title="Built for speed, designed for compliance."
          background="secondary"
        />

        <CapabilitiesGridSection
          eyebrow="Core Capabilities"
          title="What Astraea's agents actually do."
          subtitle="Each capability is controlled, reviewed, and wired into a standards-native workflow."
          capabilities={[
            { title: "SDTM & ADaM Mapping", description: "Standards-native transformations from raw study data to submission-ready datasets, with full lineage." },
            { title: "aCRF Annotation", description: "CDISC-compliant annotated CRFs generated from protocol artifacts and metadata." },
            { title: "Define-XML & eCRT", description: "Structured metadata and electronic case report tabulation packages for FDA submission." },
            { title: "TLF Generation from SAP", description: "Tables, listings, and figures programmed directly against the Statistical Analysis Plan." },
            { title: "Pinnacle 21 Validation", description: "Automatic conformance checks against CDISC rules, issues flagged for human review." },
            { title: "Data Desensitization", description: "HIPAA- and GDPR-aligned anonymization that preserves analytical utility." },
            { title: "Evidence Synthesis", description: "Protocol-aware extraction from SAPs, CSRs, literature, and regulatory filings." },
            { title: "Governed Orchestration", description: "Controlled AI workflows with role-based access, versioning, and approval gates." },
            { title: "Audit-Ready Logs", description: "Full action history, who ran what, when, and on which dataset, 21 CFR Part 11 aligned." },
          ]}
        />

        <WhyChooseSection
          eyebrow="Why Astraea"
          title="Not a writer. Not a dashboard. Not a CDMS."
          subtitle="Astraea is the bridge between protocol intent and regulator-ready evidence, the layer most of the clinical AI market leaves out."
          reasons={[
            {
              title: "Standards-Native Architecture",
              description: "Built around CDISC SDTM, ADaM, and Define-XML from day one, not bolted on afterward. Matches FDA's stated preferences for study data submissions.",
            },
            {
              title: "Human-in-the-Loop by Design",
              description: "Every workflow exposes checkpoints for biostatisticians, programmers, and medical writers. Astraea augments experts; it does not replace them.",
            },
            {
              title: "Executable, Not Just Advisory",
              description: "Astraea doesn't only generate text. It runs statistical programming, produces validated TLFs, and emits regulator-ready submission artifacts.",
            },
            {
              title: "Auditable at Every Step",
              description: "21 CFR Part 11-aligned audit trails, versioning, and traceability, so compliance is a property of the system, not an afterthought.",
            },
          ]}
        />

        <TestimonialSection
          quote="Astraea makes agentic AI practical inside regulated biometrics, accelerating cycle times without compromising traceability or compliance."
          author="A Top-10 Pharma Partner"
          role="Clinical Data Operations"
        />

        <FinalCtaSection
          title="See Astraea in action."
          subtitle="Book a working session with our team, we'll walk through how Astraea fits your SAP, standards, and submission workflow."
          primaryCta={{ label: "Request a Demo", href: "https://cal.com/team/astraea/product-demo" }}
          secondaryCta={{ label: "Contact Sales", href: "/contact" }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default PlatformPage;
