'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  imageAlt: string;
  rating: number;
  category: string;
}

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const maxIndex = Math.max(0, products.length - itemsPerPage);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="bg-card rounded-lg shadow-warm p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl text-foreground">You May Also Like</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="w-10 h-10 flex items-center justify-center bg-background border border-border rounded-md hover:bg-primary/10 hover:border-primary transition-smooth disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Previous products"
          >
            <Icon name="ChevronLeftIcon" size={20} />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="w-10 h-10 flex items-center justify-center bg-background border border-border rounded-md hover:bg-primary/10 hover:border-primary transition-smooth disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Next products"
          >
            <Icon name="ChevronRightIcon" size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => {
          const discount = product.originalPrice
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 0;

          return (
            <Link
              key={product.id}
              href={`/product-details?id=${product.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-background rounded-lg overflow-hidden shadow-warm-sm hover:shadow-warm-md transition-smooth focus:outline-none focus:ring-3 focus:ring-ring"
            >
              <div className="relative aspect-square overflow-hidden">
                <AppImage
                  src={product.image}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                {discount > 0 && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-success text-success-foreground rounded caption font-bold">
                    {discount}% OFF
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="caption text-primary font-medium mb-1">{product.category}</p>
                <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-smooth">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, index) => (
                    <Icon
                      key={index}
                      name="StarIcon"
                      size={14}
                      variant={index < Math.floor(product.rating) ? 'solid' : 'outline'}
                      className={
                        index < Math.floor(product.rating)
                          ? 'text-warning' :'text-muted-foreground'
                      }
                    />
                  ))}
                  <span className="caption text-muted-foreground ml-1">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                {/* <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-primary">
                  ₹{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="caption text-muted-foreground line-through">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div> */}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;