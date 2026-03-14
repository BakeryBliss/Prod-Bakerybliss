import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface PromotionalBannersProps {
  className?: string;
}

const PromotionalBanners = ({ className = '' }: PromotionalBannersProps) => {
  return (
    <section className={`py-16 lg:py-24 bg-muted ${className}`}>
      <div className="mx-auto px-5 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-warm-md group">
            <AppImage
              src="https://images.unsplash.com/photo-1503525642560-ecca5e2e49e9"
              alt="Elegant custom wedding cake with white fondant and pink sugar flowers"
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />

            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium">
                <Icon name="SparklesIcon" size={16} />
                <span>Special Orders</span>
              </div>
              <h3 className="font-heading text-3xl lg:text-4xl font-bold text-foreground">
                Custom Cakes for Every Occasion
              </h3>
              <p className="text-muted-foreground max-w-md">
                Make your celebrations unforgettable with our personalized cake designs. From weddings to birthdays, we bring your vision to life.
              </p>
              <Link
                href="/products?category=custom"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2">

                <span>Order Custom Cake</span>
                <Icon name="ArrowRightIcon" size={18} />
              </Link>
            </div>
          </div>

          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-warm-md group">
            <AppImage
              src="https://images.unsplash.com/photo-1696721497063-2afe5a3bcc2f"
              alt="Assorted seasonal pastries and cookies with autumn decorations"
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />

            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-success text-success-foreground rounded-full text-sm font-medium">
                <Icon name="GiftIcon" size={16} />
                <span>Limited Time</span>
              </div>
              <h3 className="font-heading text-3xl lg:text-4xl font-bold text-foreground">
                Seasonal Specials
              </h3>
              <p className="text-muted-foreground max-w-md">
                Discover our rotating selection of seasonal treats made with fresh, locally-sourced ingredients. Available for a limited time only.
              </p>
              <Link
                href="/products?category=seasonal"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2">

                <span>Explore Seasonal Items</span>
                <Icon name="ArrowRightIcon" size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 relative h-[300px] rounded-lg overflow-hidden shadow-warm-md group">
          <AppImage
            src="https://images.unsplash.com/photo-1697524924083-bc9988a49bfb"
            alt="Beautifully decorated cupcakes with colorful frosting on bakery display"
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />

          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 lg:px-16 space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-warning text-warning-foreground rounded-full text-sm font-medium">
                <Icon name="BellAlertIcon" size={16} />
                <span>New Arrival</span>
              </div>
              <h3 className="font-heading text-3xl lg:text-5xl font-bold text-foreground">
                Fresh Cup Cakes Daily
              </h3>
              <p className="text-lg text-muted-foreground">
                Indulge in our delightful cupcakes, freshly baked every morning with premium ingredients and creative designs.
              </p>
              <Link
                href="/products?category=cup cakes"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2">

                <span>Shop Cup Cakes</span>
                <Icon name="ArrowRightIcon" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default PromotionalBanners;