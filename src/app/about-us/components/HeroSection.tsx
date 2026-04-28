import AppImage from '@/components/ui/AppImage';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  return (
    <section className={`relative bg-gradient-to-br from-primary/10 via-secondary to-accent/10 ${className}`}>
      <div className="mx-auto px-5 lg:px-20 py-16 lg:py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-primary/20 rounded-full">
              <span className="caption text-primary font-semibold">Est. 2025</span>
            </div>
            <h1 className="font-heading text-4xl lg:text-5xl text-foreground">
              Crafting Sweet Memories Since 2025
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              What started as a small family kitchen has blossomed into BakeryBliss, where traditional baking techniques meet modern flavors. Every creation tells a story of passion, dedication, and the pure joy of bringing smiles through artisan baked goods.
            </p>
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <p className="text-3xl font-heading text-primary font-semibold">10,000+</p>
                <p className="caption text-muted-foreground mt-1">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-heading text-primary font-semibold">500+</p>
                <p className="caption text-muted-foreground mt-1">Custom Creations</p>
              </div>
              <div>
                <p className="text-3xl font-heading text-primary font-semibold">15+</p>
                <p className="caption text-muted-foreground mt-1">Awards Won</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-warm-xl">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_198aca950-1768146898155.png"
                alt="Professional baker in white apron carefully decorating multi-tiered wedding cake with fresh flowers in bright modern bakery kitchen"
                className="w-full h-[400px] lg:h-[500px] object-cover" />

            </div>
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-warm-lg p-6 max-w-xs">
              <p className="font-heading text-xl text-foreground mb-2">
                "Baking is love made edible"
              </p>
              <p className="caption text-muted-foreground">- Saksham Bharti, Founder</p>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;