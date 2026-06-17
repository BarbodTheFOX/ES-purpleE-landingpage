import { FAQSection } from "@/components/FAQSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { InlineRegistrationSection } from "@/components/InlineRegistrationSection";
import { InteractiveRewardsSection } from "@/components/InteractiveRewardsSection";
import { InteractiveUidGuideSection } from "@/components/InteractiveUidGuideSection";
import { PdfGiftsSection } from "@/components/PdfGiftsSection";
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
        <InteractiveRewardsSection />
        <PremiumAccessSection />
        <InteractiveUidGuideSection />
        <PdfGiftsSection />
        <ProgramSection />
        <ProblemSection />
        <ScrollJourneySection />
        <InlineRegistrationSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
