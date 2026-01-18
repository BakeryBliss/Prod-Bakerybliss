import Icon from '@/components/ui/AppIcon';

interface MissionValuesSectionProps {
  className?: string;
}

interface Value {
  icon: string;
  title: string;
  description: string;
}

const MissionValuesSection = ({ className = '' }: MissionValuesSectionProps) => {
  const values: Value[] = [
    {
      icon: 'SparklesIcon',
      title: 'Quality Ingredients',
      description: 'We source only the finest organic flour, farm-fresh eggs, premium chocolate, and locally-sourced dairy to ensure every bite is exceptional.',
    },
    {
      icon: 'HandRaisedIcon',
      title: 'Artisan Craftsmanship',
      description: 'Every product is handcrafted by skilled bakers who pour their expertise and passion into creating edible masterpieces.',
    },
    {
      icon: 'HeartIcon',
      title: 'Community First',
      description: 'We believe in giving back, supporting local farmers, and creating a warm space where neighbors become friends.',
    },
    {
      icon: 'ShieldCheckIcon',
      title: 'Food Safety',
      description: 'Certified kitchen facilities, rigorous hygiene standards, and transparent ingredient sourcing ensure your peace of mind.',
    },
    {
      icon: 'LightBulbIcon',
      title: 'Innovation',
      description: 'While honoring traditional recipes, we constantly experiment with new flavors and techniques to delight your taste buds.',
    },
    {
      icon: 'GlobeAmericasIcon',
      title: 'Sustainability',
      description: 'Eco-friendly packaging, minimal waste practices, and supporting sustainable agriculture for a better tomorrow.',
    },
  ];

  return (
    <section className={`bg-secondary/30 ${className}`}>
      <div className="mx-auto px-5 lg:px-20 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Mission Statement */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl text-foreground mb-6">
              Our Mission
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-foreground leading-relaxed max-w-3xl mx-auto">
              To create moments of joy and connection through exceptional baked goods, crafted with love, quality ingredients, and time-honored techniques that honor our heritage while embracing innovation.
            </p>
          </div>

          {/* Values Grid */}
          <div>
            <h3 className="font-heading text-2xl lg:text-3xl text-foreground text-center mb-12">
              Our Core Values
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-warm-md hover:shadow-warm-lg transition-smooth"
                >
                  <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <Icon name={value.icon as any} size={28} className="text-primary" />
                  </div>
                  <h4 className="font-heading text-xl text-foreground mb-3">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications
          <div className="mt-16 bg-card rounded-xl p-8 shadow-warm-md">
            <h3 className="font-heading text-2xl text-foreground text-center mb-8">
              Certifications & Awards
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'FDA Certified', subtitle: 'Food Safety' },
                { title: 'Organic Certified', subtitle: 'USDA Organic' },
                { title: 'Best Bakery 2023', subtitle: 'City Magazine' },
                { title: 'Excellence Award', subtitle: 'National Baking' },
              ].map((cert, index) => (
                <div
                  key={index}
                  className="text-center p-4 border-2 border-primary/20 rounded-lg hover:border-primary/40 transition-smooth"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="CheckBadgeIcon" size={24} className="text-primary" />
                  </div>
                  <p className="font-heading text-lg text-foreground">{cert.title}</p>
                  <p className="caption text-muted-foreground mt-1">{cert.subtitle}</p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default MissionValuesSection;