import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HomeHeroSection from "@/components/sections/home-hero-section";
import TrustBarSection from "@/components/sections/trust-bar-section";
import ComplianceBadgesSection from "@/components/sections/compliance-badges-section";
import StatsSection from "@/components/sections/stats-section";
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
        <EmpowerSection />
        <PlatformModulesSection />
        <SolutionsGridSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}
