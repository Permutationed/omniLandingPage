import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import PageHeroSection from "@/components/sections/page-hero-section";
import EmpowerSection from "@/components/sections/empower-section";
import NumberedListSection from "@/components/sections/numbered-list-section";
import WhyChooseSection from "@/components/sections/why-choose-section";
import FinalCtaSection from "@/components/sections/final-cta-section";

export function EndToEndBiometricsPage() {
  return (
    <div className="page relative flex flex-col min-h-screen">
      <Navbar />
      <main className="page__main grow">
        <PageHeroSection
          eyebrow="End-to-End Biometrics"
          title={
            <>
              Full-service biostatistics, from protocol to submission.
            </>
          }
          subtitle="Astraea pairs cross-functional biostatistics and programming teams with our AI-native platform to deliver inspection-ready outputs, from protocol design through NDA, BLA, and IND submissions."
          primaryCta={{ label: "Request a Proposal", href: "https://cal.com/team/astraea/product-demo" }}
          secondaryCta={{ label: "Contact Sales", href: "/contact" }}
        />

        <EmpowerSection
          eyebrow="Next-Level Biostatistics"
          title={<>Experts with a standards-native platform underneath them.</>}
          body="Our biostatisticians, programmers, and medical writers deliver everything you expect from a premium biometrics provider, protocol, SAP, SDTM/ADaM, TLFs, CSR support, accelerated by Astraea's controlled AI workflows. Every deliverable meets FDA and EMA expectations and is BIMO inspection-ready."
        />

        <NumberedListSection
          eyebrow="What We Deliver"
          title="Deliverables across every study phase."
          items={[
            {
              title: "Trial Design & Planning",
              description: "Protocol development, randomization schedules, sample size determination, and adaptive design support, with simulation built in.",
            },
            {
              title: "Statistical Analysis Plans",
              description: "Comprehensive SAP design and implementation aligned with clinical objectives, regulatory conventions, and downstream programming.",
            },
            {
              title: "CDISC-Compliant Programming",
              description: "SDTM and ADaM dataset generation, Define-XML, aCRF, and eCRT packages, validated end to end with Pinnacle 21.",
            },
            {
              title: "Interim & Final Analyses",
              description: "Support for DMC and DSMB activities, safety summaries, efficacy evaluations, and integrated summary packages.",
            },
            {
              title: "Medical Writing",
              description: "Integrated collaboration across biostatistics and scientific communications, CSRs, integrated summaries, and publication support.",
            },
            {
              title: "Regulatory Submission Support",
              description: "NDA, BLA, IND, and supplemental submissions to FDA and EMA, inspection-ready with full traceability.",
            },
          ]}
        />

        <WhyChooseSection
          eyebrow="Why Sponsors Choose Astraea"
          title="Regulatory precision, at AI-native speed."
          reasons={[
            {
              title: "Regulatory Precision",
              description: "Deliverables meet FDA and EMA expectations and are BIMO inspection-ready. Independent QC on every dataset.",
            },
            {
              title: "Unmatched Data Integrity",
              description: "Pinnacle 21 validation, full traceability, and reviewer-ready documentation across SDTM and ADaM.",
            },
            {
              title: "Collaborative Delivery",
              description: "Seamless coordination among statisticians, programmers, and medical writers, backed by one shared platform.",
            },
            {
              title: "Proven Track Record",
              description: "Trusted by leading sponsors to ensure compliant, high-quality submissions under tight timelines.",
            },
          ]}
          background="secondary"
        />

        <FinalCtaSection
          title="Move from data to decision with confidence."
          subtitle="Tell us about your program, we'll scope a project-based engagement that fits your timeline, standards, and submission targets."
          primaryCta={{ label: "Request a Proposal", href: "https://cal.com/team/astraea/product-demo" }}
          secondaryCta={{ label: "Contact Sales", href: "/contact" }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default EndToEndBiometricsPage;
