import { FAQSection } from "@/components/FAQSection";
import { CredibilityStrip } from "@/components/CredibilityStrip";
import { EventumCredibilitySection } from "@/components/EventumCredibilitySection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { InteractiveRewardsSection } from "@/components/InteractiveRewardsSection";
import { InteractiveUidGuideSection } from "@/components/InteractiveUidGuideSection";
import { MiniRewardsStrip } from "@/components/MiniRewardsStrip";
import { ProblemSection } from "@/components/ProblemSection";
import { PremiumAccessSection } from "@/components/PremiumAccessSection";
import { ProgramSection } from "@/components/ProgramSection";
import { PromiseSection } from "@/components/PromiseSection";
import { ScrollJourneySection } from "@/components/ScrollJourneySection";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { WhoIsItForSection } from "@/components/WhoIsItForSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CredibilityStrip />
        <MiniRewardsStrip />
        <InteractiveRewardsSection />
        <ProblemSection />
        <PromiseSection />
        <ProgramSection />
        <WhoIsItForSection />
        <InteractiveUidGuideSection />
        <ScrollJourneySection />
        <PremiumAccessSection />
        <EventumCredibilitySection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
