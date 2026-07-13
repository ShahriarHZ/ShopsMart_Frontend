import { AnnouncementBanner } from '@/components/home/AnnouncementBanner';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Testimonials } from '@/components/home/Testimonials';
import { FinalCTA } from '@/components/home/FinalCTA';

export const HomePage = () => {
  return (
    <div>
      <AnnouncementBanner />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CategoryShowcase />
      <FeaturedProducts />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
    </div>
  );
};
