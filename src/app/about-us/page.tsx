import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import HeroSection from './components/HeroSection';
// import StorySection from './components/StorySection';
import MissionValuesSection from './components/MissionValuesSection';
// import TeamSection from './components/TeamSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'About Us - BakeryBliss',
  description: 'Discover the story behind BakeryBliss, our mission to craft exceptional baked goods, meet our talented team, and explore our journey from a small family kitchen to a beloved community bakery since 2025.',
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-24">
        {/* Breadcrumb Navigation */}
        <div className="bg-secondary/30 py-4">
          <div className="mx-auto px-5 lg:px-20">
            <Breadcrumb />
          </div>
        </div>

        {/* Hero Section */}
        <HeroSection />

        {/* Story Section */}
        {/* <StorySection /> */}

        {/* Mission & Values Section */}
        <MissionValuesSection />

        {/* Team Section */}
        {/* <TeamSection /> */}

        {/* Gallery Section */}
        <GallerySection />

        {/* Testimonials Section */}
        {/* <TestimonialsSection /> */}

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}