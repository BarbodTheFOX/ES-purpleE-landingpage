import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { InteractiveRewardsSection } from "@/components/InteractiveRewardsSection";
import { InteractiveUidGuideSection } from "@/components/InteractiveUidGuideSection";
import { MiniRewardsStrip } from "@/components/MiniRewardsStrip";
import { ProblemSection } from "@/components/ProblemSection";
import { PremiumAccessSection } from "@/components/PremiumAccessSection";
import { ProgramSection } from "@/components/ProgramSection";
import { ScrollJourneySection } from "@/components/ScrollJourneySection";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MiniRewardsStrip />
        <InteractiveRewardsSection />
        <InteractiveUidGuideSection />
        <PremiumAccessSection />
        <ScrollJourneySection />
        <ProgramSection />
        <ProblemSection />
        <FAQSection />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
