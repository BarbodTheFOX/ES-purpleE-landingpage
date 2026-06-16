import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { JourneySection } from "@/components/JourneySection";
import { ProblemSection } from "@/components/ProblemSection";
import { PremiumAccessSection } from "@/components/PremiumAccessSection";
import { ProgramSection } from "@/components/ProgramSection";
import { RegistrationForm } from "@/components/RegistrationForm";
import { RewardsSection } from "@/components/RewardsSection";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <ProgramSection />
        <JourneySection />
        <PremiumAccessSection />
        <RewardsSection />
        <HowItWorksSection />
        <RegistrationForm />
        <FAQSection />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
