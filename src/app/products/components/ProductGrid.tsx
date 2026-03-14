'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import type { Product } from './ProductsPageInteractive';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export default function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-card rounded-lg overflow-hidden shadow-warm-sm animate-pulse-blur"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="aspect-square bg-muted" />
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-3 w-16 bg-muted rounded" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-3.5 h-3.5 bg-muted rounded-full" />
                  ))}
                </div>
              </div>
              <div className="h-4 w-3/4 bg-muted rounded" />
              <div className="h-3 w-full bg-muted rounded" />
              <div className="h-3 w-2/3 bg-muted rounded" />
              <div className="flex gap-1">
                <div className="h-5 w-14 bg-muted rounded-full" />
                <div className="h-5 w-14 bg-muted rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <Icon name="ExclamationTriangleIcon" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your filters or browse all products.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          View All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      alt: product.alt,
      price: product.price,
      quantity: 1,
      size: 'Regular',
      flavor: 'Original'
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists in cart
    const existingIndex = existingCart.findIndex((item: any) => item.id === product.id);
    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('cartUpdated'));

    // Show feedback
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // const renderStars = (rating: number) => {
  //   const stars = [];
  //   const fullStars = Math.floor(rating);
  //   const hasHalfStar = rating % 1 !== 0;

  //   for (let i = 0; i < fullStars; i++) {
  //     stars.push(
  //       <Icon key={i} name="StarIcon" size={16} className="text-yellow-500 fill-current" />
  //     );
  //   }

  //   if (hasHalfStar) {
  //     stars.push(
  //       <Icon key="half" name="StarIcon" size={16} className="text-yellow-500 fill-current opacity-50" />
  //     );
  //   }

  //   const emptyStars = 5 - Math.ceil(rating);
  //   for (let i = 0; i < emptyStars; i++) {
  //     stars.push(
  //       <Icon key={`empty-${i}`} name="StarIcon" size={16} className="text-gray-300" />
  //     );
  //   }

  //   return stars;
  // };

  return (
    <div
    // <Link
    //   href={`/product-details?id=${product.id}`}
    //   target="_blank"
    //   rel="noopener noreferrer"
      className="group bg-card rounded-lg shadow-warm-sm hover:shadow-warm-md transition-all duration-300 overflow-hidden hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
              New
            </span>
          )}
          {product.isPopular && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
              Popular
            </span>
          )}
          {product.isVegan && (
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
              Vegan
            </span>
          )}
        </div>

        {/* Quick Actions */}
        {/* <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
            aria-label="Add to favorites"
          >
            <Icon name="HeartIcon" size={16} className="text-gray-600" />
          </button>
        </div> */}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            {Array.isArray(product.category) ? product.category.join(', ') : product.category}
          </span>
          {/* Rating */}
          {/* <div className="flex items-center gap-1">
            <div className="flex">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div> */}
        </div>

        {/* Product Name */}
        <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full"
            >
              {tag}
            </span>
          ))}
          {product.tags.length > 2 && (
            <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
              +{product.tags.length - 2}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          {/* <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground">
              ₹{product.price.toFixed(0)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toFixed(0)}
              </span>
            )}
          </div> */}

          {/* Add to Cart Button */}
          {/* <button
            onClick={handleAddToCart}
            className={`p-2 rounded-full transition-all ${
              addedToCart 
                ? 'bg-green-500 text-white opacity-100' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90 opacity-0 group-hover:opacity-100'
            }`}
            aria-label={addedToCart ? 'Added to cart' : 'Add to cart'}
          >
            <Icon name={addedToCart ? 'CheckIcon' : 'ShoppingBagIcon'} size={16} />
          </button> */}
        </div>
      </div>
    </div>
  );
}