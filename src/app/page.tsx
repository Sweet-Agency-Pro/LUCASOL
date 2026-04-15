import HeroSection from "@/components/home/HeroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import StatsSection from "@/components/home/StatsSection";
import RealisationsPreview from "@/components/home/RealisationsPreview";
import ReviewsSection from "@/components/home/ReviewsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <StatsSection />
      <RealisationsPreview />
      <ReviewsSection />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
