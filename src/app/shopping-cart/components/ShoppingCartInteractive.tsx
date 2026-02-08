'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import DeliveryOptions from './DeliveryOptions';
import SavedForLater from './SavedForLater';
import EmptyCart from './EmptyCart';
import { useProducts } from '@/hooks/useProducts';

interface CartItemData {
  id: string;
  name: string;
  image: string;
  alt: string;
  price: number;
  quantity: number;
  size?: string;
  flavor?: string;
  customization?: string;
}

interface SavedItem {
  id: string;
  name: string;
  image: string;
  alt: string;
  price: number;
}

interface SuggestedProduct {
  id: string;
  name: string;
  image: string;
  alt: string;
  price: number;
  category: string;
}

interface DeliveryOption {
  id: string;
  type: 'pickup' | 'delivery';
  label: string;
  description: string;
  fee: number;
  icon: string;
}

const ShoppingCartInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<DeliveryOption | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Fetch popular products from database
  const { products: fetchedProducts } = useProducts({ onlyPopular: true, limit: 4 });

  // Transform popular products to suggested products format
  const suggestedProducts: SuggestedProduct[] = useMemo(() => {
    return fetchedProducts.map(product => ({
      id: product.id,
      name: product.name,
      image: product.images[0]?.url || '',
      alt: product.images[0]?.alt || product.name,
      price: product.price,
      category: Array.isArray(product.category) ? product.category[0] : product.category
    }));
  }, [fetchedProducts]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const loadCartData = () => {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      } else {
        setCartItems(mockCartItems);
      }

      const storedSaved = localStorage.getItem('savedForLater');
      if (storedSaved) {
        setSavedItems(JSON.parse(storedSaved));
      }
    };

    loadCartData();
  }, [isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem('cart', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cartItems, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem('savedForLater', JSON.stringify(savedItems));
  }, [savedItems, isHydrated]);

  const mockCartItems: CartItemData[] = [
  {
    id: '1',
    name: 'Chocolate Croissant',
    image: "https://images.unsplash.com/photo-1600930496627-33491158a923",
    alt: 'Golden flaky chocolate croissant with visible chocolate layers on white plate',
    price: 4.99,
    quantity: 2,
    size: 'Regular',
    flavor: 'Dark Chocolate',
    customization: 'Extra chocolate filling please'
  },
  {
    id: '2',
    name: 'Red Velvet Cake',
    image: "https://images.unsplash.com/photo-1459878646907-22e397da1ae4",
    alt: 'Layered red velvet cake with white cream cheese frosting and red crumbs on top',
    price: 45.99,
    quantity: 1,
    size: '8 inch',
    flavor: 'Classic Red Velvet'
  },
  {
    id: '3',
    name: 'Blueberry Muffin',
    image: "https://images.unsplash.com/photo-1593395676686-10a61bbc004b",
    alt: 'Fresh baked blueberry muffin with golden top and visible blueberries',
    price: 3.49,
    quantity: 4
  }];


  const mockSavedItems: SavedItem[] = [
  {
    id: '4',
    name: 'Cinnamon Roll',
    image: "https://images.unsplash.com/photo-1603339343179-23b7bbc17731",
    alt: 'Glazed cinnamon roll with white icing drizzle and visible cinnamon swirls',
    price: 5.99
  }];


  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
    prev.map((item) => item.id === id ? { ...item, quantity } : item)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveForLater = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      setSavedItems((prev) => [
      ...prev,
      {
        id: item.id,
        name: item.name,
        image: item.image,
        alt: item.alt,
        price: item.price
      }]
      );
      handleRemoveItem(id);
    }
  };

  const handleMoveToCart = (id: string) => {
    const item = savedItems.find((item) => item.id === id);
    if (item) {
      setCartItems((prev) => [
      ...prev,
      {
        ...item,
        quantity: 1
      }]
      );
      setSavedItems((prev) => prev.filter((saved) => saved.id !== id));
    }
  };

  const handleRemoveSaved = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApplyCoupon = (code: string) => {
    const discountMap: Record<string, number> = {
      SWEET10: 0.1,
      BAKERY20: 0.2,
      FIRST15: 0.15
    };

    const discountPercent = discountMap[code.toUpperCase()] || 0;
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setAppliedDiscount(subtotal * discountPercent);
  };

  const handleSelectDeliveryOption = (option: DeliveryOption) => {
    setSelectedDeliveryOption(option);
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return;
    router.push('/order-confirmation');
  };

  const calculateSummary = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const deliveryFee = selectedDeliveryOption?.fee || 5.99;
    const total = subtotal + tax + deliveryFee - appliedDiscount;

    return {
      subtotal,
      tax,
      deliveryFee,
      discount: appliedDiscount,
      total
    };
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-28 pb-16">
        <div className="mx-auto px-5 lg:px-20">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-48"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2, 3].map((i) =>
                <div key={i} className="h-40 bg-muted rounded"></div>
                )}
              </div>
              <div className="h-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>);

  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-28 pb-16">
        <div className="mx-auto px-5 lg:px-20">
          <EmptyCart suggestedProducts={suggestedProducts} />
        </div>
      </div>);

  }

  const summary = calculateSummary();

  return (
    <div className="space-y-8">
      {/* Cart Items and Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-2xl text-foreground">
              Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
            </h2>
          </div>

          {cartItems.map((item) =>
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveItem}
            onSaveForLater={handleSaveForLater} />

          )}
        </div>

        {/* Order Summary */}
        <div>
          <OrderSummary
            summary={summary}
            onApplyCoupon={handleApplyCoupon}
            onProceedToCheckout={handleProceedToCheckout} />

        </div>
      </div>

      {/* Delivery Options */}
      {/* <DeliveryOptions onSelectOption={handleSelectDeliveryOption} /> */}

      {/* Saved for Later */}
      <SavedForLater
        items={savedItems}
        onMoveToCart={handleMoveToCart}
        onRemove={handleRemoveSaved} />

    </div>);

};

export default ShoppingCartInteractive;