import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HomeHeroSection from "@/components/sections/home-hero-section";
import TrustBarSection from "@/components/sections/trust-bar-section";
import ComplianceBadgesSection from "@/components/sections/compliance-badges-section";
import StatsSection from "@/components/sections/stats-section";
import HeroVideoSection from "@/components/sections/hero-video-section";
import EmpowerSection from "@/components/sections/empower-section";
import PlatformModulesSection from "@/components/sections/platform-modules-section";
import SolutionsGridSection from "@/components/sections/solutions-grid-section";
import FinalCtaSection from "@/components/sections/final-cta-section";

export default function Page() {
  return (
    <div className="page relative flex flex-col min-h-screen">
      <Navbar />
      <main className="page__main grow">
        <HomeHeroSection />
        <TrustBarSection />
        <ComplianceBadgesSection />
        <StatsSection />
        <HeroVideoSection
          eyebrow="See it in motion"
          title="Automation you can watch work."
          subtitle="Astraea orchestrates specialized AI agents across the biometrics workflow, every step logged, reviewable, and aligned to CDISC standards."
          videoSrc="https://www.tryastraea.com/demo-1.mp4"
          background="secondary"
        />
        <EmpowerSection
          imageSrc="https://www.tryastraea.com/pharmaimage2.webp"
          imageAlt="Pharmaceutical lab work, clinical trial data preparation and analysis"
          imageSide="left"
        />
        <PlatformModulesSection />
        <SolutionsGridSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}
