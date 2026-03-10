import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HeroSection from './components/HeroSection';
import FeaturedProducts from './components/FeaturedProducts';
// import PromotionalBanners from './components/PromotionalBanners';
import TestimonialsSlider from './components/TestimonialsSlider';
import InstagramFeed from './components/InstagramFeed';
import NewsletterSignup from './components/NewsletterSignup';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'Home - BakeryBliss',
  description: 'Discover artisan baked goods made fresh daily at BakeryBliss. Browse our featured products, custom cakes, seasonal specials, and order online for convenient delivery.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-24">
        <HeroSection />
        <FeaturedProducts />
        {/* <PromotionalBanners /> */}
        {/* <TestimonialsSlider /> */}
        <InstagramFeed />
        {/* <NewsletterSignup /> */}
      </main>

      <Footer />
    </div>
  );
}