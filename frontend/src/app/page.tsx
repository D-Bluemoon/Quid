import {
  HeroSection,
  FeatureHighlights,
  MoreFeatures,
  OpportunitiesSection,
  HowItWorksSection,
  FAQSection,
  BusinessCTASection,
  Footer,
} from "@/features/landing";

export default function Home() {
  return (
    <div className="min-h-screen text-foreground brutal-grid-bg">
      <main>
        <HeroSection />
        <FeatureHighlights />
        <MoreFeatures />
        <OpportunitiesSection />
        <HowItWorksSection />
        <FAQSection />
        <BusinessCTASection />
        <Footer />
      </main>
    </div>
  );
}
