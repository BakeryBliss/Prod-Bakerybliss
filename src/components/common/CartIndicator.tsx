'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface CartIndicatorProps {
  className?: string;
}

const CartIndicator = ({ className = '' }: CartIndicatorProps) => {
  const [cartCount, setCartCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const totalItems = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
      
      if (totalItems !== cartCount) {
        setIsAnimating(true);
        setCartCount(totalItems);
        setTimeout(() => setIsAnimating(false), 300);
      }
    };

    updateCartCount();

    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);

    const interval = setInterval(updateCartCount, 1000);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
      clearInterval(interval);
    };
  }, [cartCount]);

  return (
    <Link
      href="/shopping-cart"
      className={`relative p-2 rounded-md text-foreground hover:bg-primary/10 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 ${className}`}
      aria-label={`Shopping cart with ${cartCount} items`}
    >
      <Icon name="ShoppingCartIcon" size={24} />
      {cartCount > 0 && (
        <span
          className={`absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-accent text-accent-foreground text-xs font-bold rounded-full transition-spring ${
            isAnimating ? 'scale-110' : 'scale-100'
          }`}
        >
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartIndicator;