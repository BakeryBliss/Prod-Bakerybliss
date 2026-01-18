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

interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface CustomizationOption {
  id: string;
  label: string;
  priceModifier: number;
}

interface Ingredient {
  name: string;
  allergen: boolean;
}

interface NutritionInfo {
  servingSize: string;
  calories: number;
  fat: string;
  carbs: string;
  protein: string;
  sugar: string;
}

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

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  category: string;
  inStock: boolean;
  images: ProductImage[];
  sizes: CustomizationOption[];
  flavors: CustomizationOption[];
  ingredients: Ingredient[];
  nutrition: NutritionInfo;
  detailedDescription: string;
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

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Chocolate Croissant',
    price: 4.99,
    originalPrice: 6.99,
    rating: 4.8,
    reviewCount: 127,
    description:
    'Indulge in our buttery, flaky croissant filled with rich Belgian chocolate. Baked fresh every morning using traditional French techniques and premium ingredients.',
    category: 'Pastries',
    inStock: true,
    images: [
    {
      id: 'img1',
      url: "https://images.unsplash.com/photo-1600930496627-33491158a923",
      alt: 'Golden brown chocolate croissant with visible flaky layers on white ceramic plate'
    },
    {
      id: 'img2',
      url: "https://images.unsplash.com/photo-1688978503769-2e6875d29dfc",
      alt: 'Close-up of chocolate croissant cross-section showing chocolate filling'
    },
    {
      id: 'img3',
      url: "https://images.unsplash.com/photo-1626079451079-3e59d75aebbc",
      alt: 'Multiple chocolate croissants arranged on wooden serving board'
    }],

    sizes: [
    { id: 'regular', label: 'Regular', priceModifier: 0 },
    { id: 'large', label: 'Large', priceModifier: 2.0 }],

    flavors: [
    { id: 'dark', label: 'Dark Chocolate', priceModifier: 0 },
    { id: 'milk', label: 'Milk Chocolate', priceModifier: 0 },
    { id: 'white', label: 'White Chocolate', priceModifier: 0.5 }],

    ingredients: [
    { name: 'Wheat Flour', allergen: true },
    { name: 'Butter', allergen: true },
    { name: 'Belgian Chocolate', allergen: false },
    { name: 'Eggs', allergen: true },
    { name: 'Sugar', allergen: false },
    { name: 'Yeast', allergen: false },
    { name: 'Salt', allergen: false },
    { name: 'Milk', allergen: true }],

    nutrition: {
      servingSize: '1 croissant (85g)',
      calories: 320,
      fat: '18g',
      carbs: '35g',
      protein: '6g',
      sugar: '12g'
    },
    detailedDescription:
    'Our Classic Chocolate Croissant is a testament to traditional French baking artistry. Each croissant begins with carefully laminated dough, folded multiple times to create those signature flaky layers. We use only premium European butter for richness and Belgian chocolate for an indulgent filling. The croissants are proofed overnight and baked fresh each morning at precisely 375°F to achieve the perfect golden-brown exterior while maintaining a soft, buttery interior. The chocolate filling melts slightly during baking, creating pockets of rich, velvety chocolate throughout. Best enjoyed warm with your morning coffee or as an afternoon treat.'
  }];


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


  const mockRelatedProducts: RelatedProduct[] = [
  {
    id: '2',
    name: 'Almond Croissant',
    price: 5.49,
    originalPrice: 7.49,
    image: "https://images.unsplash.com/photo-1616784947569-5e692df96144",
    imageAlt: 'Golden almond croissant topped with sliced almonds and powdered sugar',
    rating: 4.7,
    category: 'Pastries'
  },
  {
    id: '3',
    name: 'Blueberry Muffin',
    price: 3.99,
    image: "https://images.unsplash.com/photo-1593395676686-10a61bbc004b",
    imageAlt: 'Fresh blueberry muffin with visible blueberries on top in paper liner',
    rating: 4.6,
    category: 'Muffins'
  },
  {
    id: '4',
    name: 'Cinnamon Roll',
    price: 4.49,
    originalPrice: 5.99,
    image: "https://images.unsplash.com/photo-1673117269657-6ce2137d94f2",
    imageAlt: 'Large cinnamon roll with cream cheese frosting drizzled on top',
    rating: 4.9,
    category: 'Pastries'
  },
  {
    id: '5',
    name: 'Pain au Chocolat',
    price: 4.29,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ea00606a-1765220911509.png",
    imageAlt: 'Traditional French pain au chocolat with chocolate batons visible',
    rating: 4.8,
    category: 'Pastries'
  }];


  const ratingDistribution = [
  { stars: 5, count: 89, percentage: 70 },
  { stars: 4, count: 28, percentage: 22 },
  { stars: 3, count: 7, percentage: 6 },
  { stars: 2, count: 2, percentage: 1 },
  { stars: 1, count: 1, percentage: 1 }];


  const productId = isHydrated ? searchParams.get('id') || '1' : '1';
  const currentProduct = mockProducts.find((p) => p.id === productId) || mockProducts[0];
  const currentUrl = isHydrated ?
  `${window.location.origin}/product-details?id=${productId}` :
  '';

  const handleAddToCart = (customization: any) => {
    const cartItem = {
      id: currentProduct.id,
      name: currentProduct.name,
      image: currentProduct.images[0].url,
      imageAlt: currentProduct.images[0].alt,
      ...customization
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));

    window.dispatchEvent(new Event('cartUpdated'));

    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon name="ArrowPathIcon" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading product details...</p>
        </div>
      </div>);

  }

  return (
    <>
      <div className="space-y-8 lg:space-y-12">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductImageGallery images={currentProduct.images} productName={currentProduct.name} />
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

            <SocialShare productName={currentProduct.name} productUrl={currentUrl} />
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