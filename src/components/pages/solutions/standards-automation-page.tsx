import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import PageHeroSection from "@/components/sections/page-hero-section";
import EmpowerSection from "@/components/sections/empower-section";
import PipelineScrollSection from "@/components/sections/pipeline-scroll-section";
import NumberedListSection from "@/components/sections/numbered-list-section";
import WhyChooseSection from "@/components/sections/why-choose-section";
import StatsSection from "@/components/sections/stats-section";
import FinalCtaSection from "@/components/sections/final-cta-section";

export function StandardsAutomationPage() {
  return (
    <div className="page relative flex flex-col min-h-screen">
      <Navbar />
      <main className="page__main grow">
        <PageHeroSection
          eyebrow="Standards & Submission Automation"
          title={
            <>
              Standards-aware biometrics, powered by Astraea.
            </>
          }
          subtitle="From CRF annotation to SDTM, ADaM, Define-XML, and TLF generation, three clicks from raw study data to submission-ready package."
          primaryCta={{ label: "Request a Demo", href: "https://cal.com/team/astraea/product-demo" }}
          secondaryCta={{ label: "Contact Sales", href: "/contact" }}
        />

        <EmpowerSection
          eyebrow="The Astraea Advantage"
          title={<>Automation that regulators can inspect.</>}
          body="Astraea orchestrates specialized AI agents across the biometrics lifecycle, executing complex tasks in minutes rather than weeks, with 100% CDISC-aligned outputs and full audit-ready traceability. Outputs are reviewed by humans; the system records every step."
          cta={{ label: "Explore the platform", href: "/platform" }}
        />

        <PipelineScrollSection eyebrow="The Pipeline" />

        <NumberedListSection
          eyebrow="Key Capabilities"
          title="What we automate across your study."
          background="secondary"
          items={[
            {
              title: "aCRF Annotation",
              description: "CDISC-compliant annotated CRF preparation aligned with your protocol and downstream SDTM targets, generated from metadata, reviewed by your team.",
            },
            {
              title: "SDTM Mapping",
              description: "Raw study data transformed into SDTM domains with full variable-level lineage. Astraea handles the mechanical mapping so your programmers focus on the edge cases.",
            },
            {
              title: "ADaM Dataset Generation",
              description: "Analysis datasets built to match the SAP, with ADaM-compliant structure, traceability metadata, and reviewer-ready derivations.",
            },
            {
              title: "Define-XML & eCRT",
              description: "Submission metadata and electronic case report tabulation packages generated automatically, aligned with current FDA submission requirements.",
            },
            {
              title: "Statistical Programming",
              description: "One-click TLF generation from the SAP, integrating SDTM/ADaM datasets with validated output packages ready for QC.",
            },
            {
              title: "Pinnacle 21 Validation",
              description: "Automated conformance checks against CDISC rules. Issues flagged inline, routed to the right reviewer, tracked to resolution.",
            },
          ]}
        />

        <WhyChooseSection
          eyebrow="Why Sponsors Choose Astraea"
          title="Built for the workflow regulators inspect."
          reasons={[
            {
              title: "Standards-Native Execution",
              description: "CDISC SDTM, ADaM, and Define-XML are not bolt-ons. They are the substrate of the platform, aligned with FDA's position on study data standards.",
            },
            {
              title: "Faster Without Shortcuts",
              description: "30–50% productivity lift in the workflows Astraea automates, based on external benchmarks for biometrics and CSR drafting.",
            },
            {
              title: "Human Approval, Always",
              description: "Statisticians, programmers, and medical writers stay in the loop. Every material step is checkpointed for review.",
            },
            {
              title: "Reduced Amendment Risk",
              description: "Structured metadata and simulation help prevent late-stage rework, avoiding median amendment costs of $141K (Phase II) and $535K (Phase III).",
            },
          ]}
        />

        <StatsSection
          eyebrow="Impact That Matters"
          title="The numbers behind standards automation."
          subtitle="Benchmark-grounded estimates based on published industry data, actual results depend on data readiness and review behavior."
          stats={[
            { value: "30–50%", label: "Reporting cycle reduction", description: "McKinsey: agentic AI could raise clinical-development productivity by 35–45% over the next five years." },
            { value: "12–30d", label: "Off post-lock reporting", description: "Applied to a 40–60 business-day CSR cycle (AMWA / PharPoint benchmarks)." },
            { value: "$103–133K", label: "Annual capacity freed", description: "Per lean three-role biometrics/writing pod, at BLS 2024 wage floor." },
            { value: "100%", label: "CDISC-aligned outputs", description: "SDTM, ADaM, Define-XML, and aCRF artifacts that meet submission requirements." },
          ]}
        />

        <FinalCtaSection
          title="Ready to automate your standards workflow?"
          subtitle="Book a working session and we'll walk through Astraea on your actual SAP, protocol, and data."
          primaryCta={{ label: "Request a Demo", href: "https://cal.com/team/astraea/product-demo" }}
          secondaryCta={{ label: "Contact Sales", href: "/contact" }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default StandardsAutomationPage;
