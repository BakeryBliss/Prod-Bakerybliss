'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface OrderSummaryData {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

interface OrderSummaryProps {
  summary: OrderSummaryData;
  onApplyCoupon: (code: string) => void;
  onProceedToCheckout: () => void;
}

const OrderSummary = ({ summary, onApplyCoupon, onProceedToCheckout }: OrderSummaryProps) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      setCouponSuccess('');
      return;
    }

    const validCoupons = ['SWEET10', 'BAKERY20', 'FIRST15'];
    
    if (validCoupons.includes(couponCode.toUpperCase())) {
      setCouponSuccess('Coupon applied successfully!');
      setCouponError('');
      onApplyCoupon(couponCode);
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code. Try: SWEET10, BAKERY20, or FIRST15');
      setCouponSuccess('');
    }
  };

  return (
    <div className="bg-card rounded-md border border-border p-6 sticky top-28">
      <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
        Order Summary
      </h2>

      {/* Coupon Section */}
      <div className="mb-6">
        <label htmlFor="coupon" className="caption text-muted-foreground mb-2 block">
          Have a coupon code?
        </label>
        <div className="flex gap-2">
          <input
            id="coupon"
            type="text"
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value);
              setCouponError('');
              setCouponSuccess('');
            }}
            placeholder="Enter code"
            className="flex-1 px-4 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={handleApplyCoupon}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md font-medium hover:bg-secondary/90 transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Apply
          </button>
        </div>
        {couponError && (
          <p className="caption text-destructive mt-2 flex items-center gap-1">
            <Icon name="ExclamationCircleIcon" size={16} />
            {couponError}
          </p>
        )}
        {couponSuccess && (
          <p className="caption text-success mt-2 flex items-center gap-1">
            <Icon name="CheckCircleIcon" size={16} />
            {couponSuccess}
          </p>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6 pb-6 border-b border-border">
        <div className="flex justify-between text-foreground">
          <span>Subtotal</span>
          <span className="data-text">${summary.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-foreground">
          <span>Tax (8%)</span>
          <span className="data-text">${summary.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-foreground">
          <span>Delivery Fee</span>
          <span className="data-text">
            {summary.deliveryFee === 0 ? 'FREE' : `$${summary.deliveryFee.toFixed(2)}`}
          </span>
        </div>
        {summary.discount > 0 && (
          <div className="flex justify-between text-success">
            <span>Discount</span>
            <span className="data-text">-${summary.discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="font-heading font-semibold text-lg text-foreground">Total</span>
        <span className="font-heading font-bold text-2xl text-primary">
          ${summary.total.toFixed(2)}
        </span>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onProceedToCheckout}
        className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-md font-heading font-semibold text-lg hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 flex items-center justify-center gap-2"
      >
        Proceed to Checkout
        <Icon name="ArrowRightIcon" size={20} />
      </button>

      {/* Security Badge */}
      <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground">
        <Icon name="LockClosedIcon" size={16} />
        <span className="caption">Secure Checkout</span>
      </div>
    </div>
  );
};

export default OrderSummary;