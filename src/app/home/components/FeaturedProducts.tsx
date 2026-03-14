'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import { useProducts } from '@/hooks/useProducts';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  alt: string;
  rating: number;
  reviews: number;
}

interface FeaturedProductsProps {
  className?: string;
}

const FeaturedProducts = ({ className = '' }: FeaturedProductsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const { products: fetchedProducts, isLoading } = useProducts({ limit: 6 });

  // Transform fetched products to the display format
  const products: Product[] = fetchedProducts.map(product => ({
    id: product.id,
    name: product.name,
    category: Array.isArray(product.category) ? product.category[0] : product.category,
    price: product.price,
    image: product.images[0]?.url || '',
    alt: product.name,
    rating: product.rating,
    reviews: product.reviewCount
  }));

  const itemsPerPage = 3;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        image: product.image,
        alt: product.alt,
        price: product.price,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show feedback
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 60000);
  };

  const visibleProducts = products.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section className={`py-16 lg:py-24 bg-background ${className}`}>
      <div className="mx-auto px-5 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular baked goods, crafted with love and the finest ingredients
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-card rounded-lg overflow-hidden shadow-warm border border-border animate-pulse-blur"
                  style={{ animationDelay: `${i * 0.25}s` }}
                >
                  <div className="relative h-64 bg-muted" />
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="h-3 w-16 bg-muted rounded mb-2" />
                      <div className="h-5 w-3/4 bg-muted rounded" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <div key={j} className="w-4 h-4 bg-muted rounded-full" />
                        ))}
                      </div>
                      <div className="h-3 w-12 bg-muted rounded" />
                    </div>
                    <div className="pt-2">
                      <div className="h-6 w-20 bg-muted rounded" />
                    </div>
                  </div>
                </div>
              ))
            ) : visibleProducts.map((product) =>
            <div
              key={product.id}
              // href={`/product-details?id=${product.id}`}
              // target="_blank"
              // rel = "noopener noreferrer"
              className="group bg-card rounded-lg overflow-hidden shadow-warm hover:shadow-warm-lg transition-smooth border border-border block">

                <div className="relative h-64 overflow-hidden">
                  <AppImage
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth" />

                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                      Popular
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <p className="caption text-muted-foreground mb-1">{product.category}</p>
                    <h3 className="font-heading text-xl font-semibold text-foreground">
                      {product.name}
                    </h3>
                  </div>

                  {/* <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) =>
                    <Icon
                      key={i}
                      name="StarIcon"
                      size={16}
                      variant={i < Math.floor(product.rating) ? 'solid' : 'outline'}
                      className={
                      i < Math.floor(product.rating) ? 'text-accent' : 'text-muted-foreground'
                      } />

                    )}
                    </div>
                    <span className="caption text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div> */}

                  <div className="flex items-center justify-between pt-2">
                    {/* <span className="data-text text-2xl font-bold text-primary">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 ${
                      addedToCart === product.id
                        ? 'bg-success text-white'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}>

                      <Icon name={addedToCart === product.id ? 'CheckIcon' : 'ShoppingCartIcon'} size={18} />
                      <span>{addedToCart === product.id ? 'Added!' : 'Add'}</span>
                    </button> */}
                  </div>
                </div>
              </div>
            )}
          </div>

          {totalPages > 1 &&
          <>
              <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-12 h-12 flex items-center justify-center bg-card border-2 border-border rounded-full shadow-warm hover:bg-primary hover:border-primary hover:text-primary-foreground transition-smooth focus:outline-none focus:ring-3 focus:ring-ring"
              aria-label="Previous products">

                <Icon name="ChevronLeftIcon" size={24} />
              </button>
              <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-12 h-12 flex items-center justify-center bg-card border-2 border-border rounded-full shadow-warm hover:bg-primary hover:border-primary hover:text-primary-foreground transition-smooth focus:outline-none focus:ring-3 focus:ring-ring"
              aria-label="Next products">

                <Icon name="ChevronRightIcon" size={24} />
              </button>
            </>
          }
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, index) =>
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-smooth ${
            index === currentIndex ? 'bg-primary w-8' : 'bg-border hover:bg-primary/50'}`
            }
            aria-label={`Go to page ${index + 1}`} />

          )}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-card text-foreground border-2 border-border rounded-md font-medium text-lg hover:bg-primary/10 hover:border-primary transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2">

            <span>View All Products</span>
            <Icon name="ArrowRightIcon" size={20} />
          </Link>
        </div>
      </div>
    </section>);

};

export default FeaturedProducts;