'use client';

import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface SuggestedProduct {
  id: string;
  name: string;
  image: string;
  alt: string;
  price: number;
  category: string;
}

interface EmptyCartProps {
  suggestedProducts: SuggestedProduct[];
}

const EmptyCart = ({ suggestedProducts }: EmptyCartProps) => {
  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      {/* Empty State Icon */}
      <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
        <Icon name="ShoppingCartIcon" size={64} className="text-muted-foreground" />
      </div>

      <h2 className="font-heading font-semibold text-3xl text-foreground mb-3">
        Your Cart is Empty
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Looks like you haven't added any delicious treats yet. Explore our bakery and discover your favorites!
      </p>

      <Link
        href="/products"
        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-md font-heading font-semibold text-lg hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
      >
        <Icon name="ShoppingBagIcon" size={20} />
        Start Shopping
      </Link>

      {/* Suggested Products */}
      {suggestedProducts.length > 0 && (
        <div className="mt-16">
          <h3 className="font-heading font-semibold text-2xl text-foreground mb-8">
            You Might Like These
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product-details?id=${product.id}`}
                target="_blank"
                className="bg-card rounded-md border border-border overflow-hidden transition-smooth hover:shadow-warm-lg focus:outline-none focus:ring-2 focus:ring-ring group"
              >
                <div className="relative w-full h-48 bg-muted overflow-hidden">
                  <AppImage
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                </div>

                <div className="p-4">
                  <p className="caption text-muted-foreground mb-1">{product.category}</p>
                  <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {product.name}
                  </h4>
                  {/* <p className="font-heading font-semibold text-lg text-primary">
                    ₹{product.price.toFixed(2)}
                  </p> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyCart;