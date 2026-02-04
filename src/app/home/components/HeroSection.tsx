import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  return (
    <section className={`relative w-full h-[600px] lg:h-[700px] overflow-hidden group ${className}`}>
      <div className="absolute inset-0">
        <AppImage
          src="/assets/images/pages/homePage.jpeg"
          alt="Assorted freshly baked artisan breads and pastries displayed on rustic wooden table with flour dusting"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 animate-[zoom-in_1.2s_ease-out]"
          priority />

        <div className="absolute inset-0 bg-gradient-to-r from-background/98 via-background/75 to-background/30 group-hover:via-background/70 transition-all duration-700" />
        
        {/* Animated accent overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
      </div>

      <div className="relative h-full mx-auto px-5 lg:px-20 flex items-center">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          <div className="space-y-4">
            <h1 className="font-heading text-4xl lg:text-6xl font-bold leading-tight drop-shadow-xl text-white">
              <span className="bg-gradient-to-r from-white via-white to-accent/80 bg-clip-text text-transparent">
                Artisan Baked Goods
              </span>
              <span className="block mt-2 text-white drop-shadow-lg">Made Fresh Daily</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/95 max-w-xl drop-shadow-md leading-relaxed font-light">
              Experience the perfect blend of traditional recipes and modern flavors. Every bite tells a story of passion and craftsmanship.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/product-details"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg font-bold text-lg hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 shadow-warm-md hover:from-primary/90">

              <span>Explore Our Menu</span>
              <Icon name="ArrowRightIcon" size={20} />
            </Link>
            <Link
              href="/about-us"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/90 backdrop-blur-sm text-foreground border-2 border-white/30 rounded-lg font-bold text-lg hover:bg-white hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 hover:shadow-warm-lg">

              <span>Our Story</span>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 pt-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 animate-[slide-in-from-left_0.6s_ease-out_0.2s_backwards]">
              <Icon name="CheckBadgeIcon" size={24} className="text-primary" variant="solid" />
              <span className="text-sm text-white font-medium">100% Natural Ingredients</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 animate-[slide-in-from-left_0.6s_ease-out_0.4s_backwards]">
              <Icon name="ClockIcon" size={24} className="text-primary" />
              <span className="text-sm text-white font-medium">Baked Fresh Daily</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;