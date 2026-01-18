import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  return (
    <section className={`relative w-full h-[600px] lg:h-[700px] overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        <AppImage
          src="https://images.unsplash.com/photo-1713972327524-b74656c4c2bb"
          alt="Assorted freshly baked artisan breads and pastries displayed on rustic wooden table with flour dusting"
          className="w-full h-full object-cover"
          priority />

        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      </div>

      <div className="relative h-full mx-auto px-5 lg:px-20 flex items-center">
        <div className="max-w-2xl space-y-6">
          <div className="space-y-4">
            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
              Artisan Baked Goods
              <span className="block text-white mt-2">Made Fresh Daily</span>
            </h1>
            <p className="text-lg lg:text-xl text-white max-w-xl drop-shadow-md">
              Experience the perfect blend of traditional recipes and modern flavors. Every bite tells a story of passion and craftsmanship.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/product-details"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-md font-medium text-lg hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 shadow-warm-md">

              <span>Explore Our Menu</span>
              <Icon name="ArrowRightIcon" size={20} />
            </Link>
            <Link
              href="/about-us"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card text-foreground border-2 border-border rounded-md font-medium text-lg hover:bg-primary/10 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2">

              <span>Our Story</span>
            </Link>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="flex items-center gap-2">
              <Icon name="CheckBadgeIcon" size={24} className="text-primary" variant="solid" />
              <span className="text-sm text-white">100% Natural Ingredients</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="ClockIcon" size={24} className="text-primary" />
              <span className="text-sm text-white">Baked Fresh Daily</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;