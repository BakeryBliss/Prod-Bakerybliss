import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface CTASectionProps {
  className?: string;
}

const CTASection = ({ className = '' }: CTASectionProps) => {
  return (
    <section className={`bg-gradient-to-br from-primary via-accent to-primary/80 ${className}`}>
      <div className="mx-auto px-5 lg:px-20 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl lg:text-4xl text-primary-foreground mb-6">
            Ready to Experience BakeryBliss?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Visit us in-store or order online to taste the difference that passion, quality ingredients, and artisan craftsmanship make.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground rounded-lg font-heading font-semibold text-lg hover:bg-background/90 transition-smooth shadow-warm-md hover:shadow-warm-lg focus:outline-none focus:ring-3 focus:ring-background focus:ring-offset-2 focus:ring-offset-primary"
            >
              <Icon name="ShoppingBagIcon" size={24} />
              <span>Shop Now</span>
            </Link>

            {/* <Link
              href="/home"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-primary-foreground text-primary-foreground rounded-lg font-heading font-semibold text-lg hover:bg-primary-foreground/10 transition-smooth focus:outline-none focus:ring-3 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary"
            >
              <Icon name="MapPinIcon" size={24} />
              <span>Visit Us</span>
            </Link> */}
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="ClockIcon" size={24} className="text-primary-foreground" />
              </div>
              <p className="font-heading text-primary-foreground mb-1">Open Daily</p>
              <p className="caption text-primary-foreground/80">11:00 AM - 11:00 PM</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="PhoneIcon" size={24} className="text-primary-foreground" />
              </div>
              <p className="font-heading text-primary-foreground mb-1">Call Us</p>
              <p className="caption text-primary-foreground/80">+91 92118 18676</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="EnvelopeIcon" size={24} className="text-primary-foreground" />
              </div>
              <p className="font-heading text-primary-foreground mb-1">Email Us</p>
              <p className="caption text-primary-foreground/80">bakeryblissindia@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;