'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import ProductCustomization from './ProductCustomization';
import ProductTabs from './ProductTabs';
import CustomerReviews from './CustomerReviews';
import RelatedProducts from './RelatedProducts';
import SocialShare from './SocialShare';
import Icon from '@/components/ui/AppIcon';
import { useProducts } from '@/hooks/useProducts';

interface Review {
  id: string;
  customerName: string;
  customerImage: string;
  customerImageAlt: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpful: number;
}

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  imageAlt: string;
  rating: number;
  category: string;
}

const ProductDetailsInteractive = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isHydrated, setIsHydrated] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Fetch products from database
  const { products: fetchedProducts, isLoading } = useProducts();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Use fetched products from database
  const allProducts = fetchedProducts;


  const mockReviews: Review[] = [
  {
    id: 'rev1',
    customerName: 'Sarah Johnson',
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9e8814c-1763296696290.png",
    customerImageAlt: 'Professional woman with brown hair smiling at camera in business attire',
    rating: 5,
    date: '01/08/2026',
    comment:
    'Absolutely divine! The croissant was perfectly flaky and the chocolate filling was rich without being overly sweet. Best croissant I have had outside of Paris!',
    verified: true,
    helpful: 24
  },
  {
    id: 'rev2',
    customerName: 'Michael Chen',
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1cd09ec58-1763296862264.png",
    customerImageAlt: 'Asian man with glasses smiling in casual blue shirt',
    rating: 5,
    date: '01/05/2026',
    comment:
    'I order these every week! The quality is consistently excellent and they are always fresh. The dark chocolate option is my favorite.',
    verified: true,
    helpful: 18
  },
  {
    id: 'rev3',
    customerName: 'Emily Rodriguez',
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_19c3040c9-1763301128250.png",
    customerImageAlt: 'Hispanic woman with long dark hair smiling outdoors',
    rating: 4,
    date: '01/02/2026',
    comment:
    'Really good croissant! The only reason I am not giving 5 stars is because I wish there was a bit more chocolate filling. Otherwise perfect!',
    verified: true,
    helpful: 12
  },
  {
    id: 'rev4',
    customerName: 'David Thompson',
    customerImage: "https://img.rocket.new/generatedImages/rocket_gen_img_10353cce4-1763296509172.png",
    customerImageAlt: 'Caucasian man with beard smiling in casual attire',
    rating: 5,
    date: '12/28/2025',
    comment:
    'These croissants are worth every penny. The buttery layers and quality chocolate make them stand out from any other bakery in town.',
    verified: false,
    helpful: 9
  }];

  const ratingDistribution = [
  { stars: 5, count: 89, percentage: 70 },
  { stars: 4, count: 28, percentage: 22 },
  { stars: 3, count: 7, percentage: 6 },
  { stars: 2, count: 2, percentage: 1 },
  { stars: 1, count: 1, percentage: 1 }];


  const productId = isHydrated ? searchParams.get('id') || '1' : '1';
  const currentProduct = allProducts.find((p) => p.id === productId) || allProducts[0];
  const currentUrl = isHydrated ?
  `${window.location.origin}/product-details?id=${productId}` :
  '';

  // Update page title with product name
  useEffect(() => {
    if (currentProduct?.name) {
      document.title = `${currentProduct.name} - BakeryBliss`;
    }
    return () => {
      document.title = 'BakeryBliss';
    };
  }, [currentProduct?.name]);

  const mockRelatedProducts: RelatedProduct[] = allProducts
    .filter(p => p.id !== productId)
    .slice(0, 4)
    .map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      image: p.images[0].url,
      imageAlt: p.images[0].alt,
      rating: p.rating,
      category: Array.isArray(p.category) ? p.category[0] : p.category
    }));

  const handleAddToCart = (customization: any) => {
    // Get the size and flavor labels from the product
    const sizeOption = currentProduct.sizes.find((s: any) => s.id === customization.size);
    const flavorOption = currentProduct.flavors.find((f: any) => f.id === customization.flavor);

    const cartItem = {
      id: currentProduct.id,
      name: currentProduct.name,
      image: currentProduct.images[0].url,
      alt: currentProduct.images[0].alt,
      price: customization.totalPrice / customization.quantity, // Price per item
      quantity: customization.quantity,
      size: sizeOption?.label || customization.size,
      flavor: flavorOption?.label || customization.flavor,
      customization: customization.specialInstructions || ''
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));

    window.dispatchEvent(new Event('cartUpdated'));

    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };
  
  // Shimmer bar component for loading skeleton
  const ShimmerBar = ({ className = '' }: { className?: string }) => (
    <div
      className={`rounded bg-gradient-to-r from-muted via-muted-foreground/10 to-muted bg-[length:1000px_100%] animate-shimmer ${className}`}
    />
  );

  if (!isHydrated || isLoading || allProducts.length === 0 || !currentProduct) {
    return (
      <div className="space-y-8 lg:space-y-12">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image gallery skeleton */}
          <div className="space-y-4">
            <ShimmerBar className="aspect-square rounded-lg" />
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <ShimmerBar key={i} className="w-20 h-20 rounded-md" />
              ))}
            </div>
          </div>
          {/* Product info skeleton */}
          <div className="space-y-6">
            <div className="space-y-3">
              <ShimmerBar className="h-4 w-24" />
              <ShimmerBar className="h-8 w-3/4" />
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <ShimmerBar key={i} className="w-4 h-4 rounded-full" />
                  ))}
                </div>
                <ShimmerBar className="h-4 w-20" />
              </div>
              <ShimmerBar className="h-7 w-28" />
            </div>
            <div className="space-y-2">
              <ShimmerBar className="h-4 w-full" />
              <ShimmerBar className="h-4 w-full" />
              <ShimmerBar className="h-4 w-2/3" />
            </div>
            <div className="space-y-3 pt-4">
              <ShimmerBar className="h-5 w-16" />
              <div className="flex gap-3">
                {[...Array(3)].map((_, i) => (
                  <ShimmerBar key={i} className="h-10 w-24 rounded-md" />
                ))}
              </div>
              <ShimmerBar className="h-5 w-16 mt-4" />
              <div className="flex gap-3">
                {[...Array(3)].map((_, i) => (
                  <ShimmerBar key={i} className="h-10 w-24 rounded-md" />
                ))}
              </div>
            </div>
            <ShimmerBar className="h-12 w-full rounded-md mt-6" />
          </div>
        </div>
        {/* Tabs skeleton */}
        <div>
          <div className="flex gap-4 border-b border-border pb-3 mb-6">
            {[...Array(3)].map((_, i) => (
              <ShimmerBar key={i} className="h-5 w-24" />
            ))}
          </div>
          <div className="space-y-3">
            <ShimmerBar className="h-4 w-full" />
            <ShimmerBar className="h-4 w-full" />
            <ShimmerBar className="h-4 w-3/4" />
          </div>
        </div>
      </div>);

  }

  return (
    <>
      <div className="space-y-8 lg:space-y-12">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-6 sticky top-20 h-fit">
            <ProductImageGallery images={currentProduct.images} productName={currentProduct.name} />
            <SocialShare productName={currentProduct.name} productUrl={currentUrl} />
          </div>
          <div className="space-y-6">
            <ProductInfo
              name={currentProduct.name}
              price={currentProduct.price}
              originalPrice={currentProduct.originalPrice}
              rating={currentProduct.rating}
              reviewCount={currentProduct.reviewCount}
              description={currentProduct.description}
              category={currentProduct.category}
              inStock={currentProduct.inStock} />

            <ProductCustomization
              sizes={currentProduct.sizes}
              flavors={currentProduct.flavors}
              basePrice={currentProduct.price}
              inStock={currentProduct.inStock}
              onAddToCart={handleAddToCart} />
          </div>
        </div>

        {/* Product Details Tabs */}
        <ProductTabs
          description={currentProduct.detailedDescription}
          ingredients={currentProduct.ingredients}
          nutrition={currentProduct.nutrition} />


        {/* Customer Reviews */}
        <CustomerReviews
          reviews={mockReviews}
          averageRating={currentProduct.rating}
          totalReviews={currentProduct.reviewCount}
          ratingDistribution={ratingDistribution} />


        {/* Related Products */}
        <RelatedProducts products={mockRelatedProducts} />
      </div>

      {/* Success Modal */}
      {showSuccessModal &&
      <div className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-slide-in-from-top">
          <div className="bg-card rounded-lg shadow-warm-xl p-8 max-w-md w-full">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                <Icon name="CheckCircleIcon" size={32} className="text-success" />
              </div>
              <h3 className="font-heading text-2xl text-foreground mb-2">Added to Cart!</h3>
              <p className="text-muted-foreground mb-6">
                Your item has been successfully added to the shopping cart.
              </p>
              <div className="flex gap-3 w-full">
                <button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 px-6 py-3 bg-background border border-border text-foreground rounded-md font-medium hover:bg-muted transition-smooth focus:outline-none focus:ring-3 focus:ring-ring">

                  Continue Shopping
                </button>
                <button
                onClick={() => router.push('/shopping-cart')}
                className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2">

                  View Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </>);

};

export default ProductDetailsInteractive;