import AppImage from '@/components/ui/AppImage';

interface StorySectionProps {
  className?: string;
}

const StorySection = ({ className = '' }: StorySectionProps) => {
  return (
    <section className={`bg-background ${className}`}>
      <div className="mx-auto px-5 lg:px-20 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl text-foreground mb-4">
              Our Story
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="space-y-12">
            {/* Founder Story */}
            <div className="grid lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-2">
                <div className="relative rounded-xl overflow-hidden shadow-warm-md">
                  <AppImage
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_1da9d8e50-1765541423457.png"
                    alt="Smiling woman with brown hair in casual white shirt standing in cozy home kitchen with wooden countertops and hanging plants"
                    className="w-full h-[300px] object-cover" />

                </div>
              </div>
              <div className="lg:col-span-3 space-y-4">
                <h3 className="font-heading text-2xl text-foreground">
                  From Grandma's Kitchen to Your Table
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  BakeryBliss was born from Sarah Mitchell's childhood memories of baking with her grandmother. Those precious moments spent measuring flour, kneading dough, and watching magic happen in the oven sparked a lifelong passion.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  In 2025, Sarah transformed her grandmother's cherished recipes into a thriving bakery. What began as weekend farmers market sales quickly grew into a beloved community destination, where traditional techniques meet innovative flavors.
                </p>
              </div>
            </div>

            {/* Behind the Scenes Video */}
            <div className="bg-card rounded-xl p-8 shadow-warm-md">
              <h3 className="font-heading text-2xl text-foreground mb-6 text-center">
                Behind the Scenes: A Day at BakeryBliss
              </h3>
              <div className="relative rounded-lg overflow-hidden shadow-warm-lg">
                <div className="relative w-full h-0 pb-[56.25%]">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Behind the Scenes at BakeryBliss Bakery"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                  </iframe>
                </div>
              </div>
              <p className="caption text-muted-foreground text-center mt-4">
                Watch how we craft each creation with love and precision
              </p>
            </div>

            {/* Milestone Timeline */}
            <div className="space-y-6">
              <h3 className="font-heading text-2xl text-foreground text-center mb-8">
                Our Journey
              </h3>
              <div className="space-y-6">
                {[
                { year: '2025', title: 'The Beginning', description: 'Opened our first small bakery with just 3 team members' },
                { year: '2017', title: 'Community Love', description: 'Won "Best Local Bakery" award from City Magazine' },
                { year: '2019', title: 'Expansion', description: 'Moved to larger location and introduced custom cake services' },
                { year: '2021', title: 'Going Digital', description: 'Launched online ordering and delivery services' },
                { year: '2023', title: 'Recognition', description: 'Featured in National Baking Excellence Awards' },
                { year: '2026', title: 'Today', description: 'Serving 10,000+ happy customers with 20+ team members' }].
                map((milestone, index) =>
                <div key={index} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-20 text-right">
                      <span className="font-heading text-xl text-primary font-semibold">
                        {milestone.year}
                      </span>
                    </div>
                    <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full mt-1.5 relative">
                      {index !== 5 &&
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-primary/30"></div>
                    }
                    </div>
                    <div className="flex-1 pb-8">
                      <h4 className="font-heading text-lg text-foreground mb-1">
                        {milestone.title}
                      </h4>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default StorySection;