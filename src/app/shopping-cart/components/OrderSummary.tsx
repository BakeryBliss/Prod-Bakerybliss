'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/AppIcon';

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

interface OrderSummaryData {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

interface OrderSummaryProps {
  summary: OrderSummaryData;
  cartItems: CartItemData[];
  onApplyCoupon: (code: string) => void;
  onProceedToCheckout: () => void;
}

const OrderSummary = ({ summary, cartItems, onApplyCoupon, onProceedToCheckout }: OrderSummaryProps) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  
  // Order form state
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderFormData, setOrderFormData] = useState({
    customerName: '',
    phoneNumber: '',
    email: '',
    address: '',
    deliveryDate: '',
    additionalNotes: ''
  });
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const razorpayLoaded = useRef(false);

  // Load Razorpay checkout script
  useEffect(() => {
    if (razorpayLoaded.current) return;
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => { razorpayLoaded.current = true; };
    document.body.appendChild(script);
    return () => {
      // Don't remove — Razorpay may still be needed
    };
  }, []);

  // Close dialog on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showOrderForm) {
        setShowOrderForm(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showOrderForm]);

  // Close dialog when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      setShowOrderForm(false);
    }
  };

  const handleOrderInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderFormData(prev => ({ ...prev, [name]: value }));
    setOrderError('');
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitting(true);
    setOrderError('');

    try {
      // Validate form fields
      if (!orderFormData.customerName.trim()) throw new Error('Name is required');
      if (!orderFormData.phoneNumber.trim()) throw new Error('Phone number is required');
      if (!orderFormData.address.trim()) throw new Error('Delivery address is required');

      // Step 1: Create a Razorpay order on the server
      const orderRes = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: summary.total,
          receipt: `bb_${Date.now()}`,
          notes: {
            customerName: orderFormData.customerName,
            phone: orderFormData.phoneNumber,
          },
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || 'Could not create payment order');

      // Step 2: Open Razorpay checkout popup
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'BakeryBliss',
        description: `Order — ${cartItems.length} item${cartItems.length > 1 ? 's' : ''}`,
        order_id: orderData.orderId,
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            // Step 3: Verify payment on the server
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderDetails: {
                  ...orderFormData,
                  cartItems,
                  summary,
                },
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.error || 'Payment verification failed');

            // Success!
            setOrderNumber(verifyData.orderNumber);
            setPaymentId(verifyData.paymentId);
            setOrderSuccess(true);
            localStorage.removeItem('cart');
            window.dispatchEvent(new Event('cartUpdated'));
          } catch (err) {
            setOrderError(err instanceof Error ? err.message : 'Payment verification failed');
          }
        },
        prefill: {
          name: orderFormData.customerName,
          email: orderFormData.email || undefined,
          contact: orderFormData.phoneNumber,
        },
        theme: {
          color: '#8B4513',
        },
        modal: {
          ondismiss: () => {
            setOrderSubmitting(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', (response: any) => {
        setOrderError(
          response.error?.description || 'Payment failed. Please try again.'
        );
        setOrderSubmitting(false);
      });
      rzp.open();

      // Don't setOrderSubmitting(false) here — the popup is still open.
      // It's set in ondismiss and payment.failed callbacks.
      return;
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setOrderSubmitting(false);
    }
  };

  const closeOrderForm = () => {
    setShowOrderForm(false);
    if (orderSuccess) {
      // Reload page to refresh cart
      window.location.reload();
    }
  };

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
          <span className="data-text">₹{summary.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-foreground">
          <span>Tax (8%)</span>
          <span className="data-text">₹{summary.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-foreground">
          <span>Delivery Fee</span>
          <span className="data-text">
            {summary.deliveryFee === 0 ? 'FREE' : `₹${summary.deliveryFee.toFixed(2)}`}
          </span>
        </div>
        {summary.discount > 0 && (
          <div className="flex justify-between text-success">
            <span>Discount</span>
            <span className="data-text">-₹{summary.discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="font-heading font-semibold text-lg text-foreground">Total</span>
        <span className="font-heading font-bold text-2xl text-primary">
          ₹{summary.total.toFixed(2)}
        </span>
      </div>

      {/* Checkout Button */}
      {/* <button
        onClick={onProceedToCheckout}
        className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-md font-heading font-semibold text-lg hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 flex items-center justify-center gap-2"
      >
        Proceed to Checkout
        <Icon name="ArrowRightIcon" size={20} />
      </button> */}

      {/* Pay & Place Order Button */}
      <button
        onClick={() => setShowOrderForm(true)}
        className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-md font-heading font-semibold text-lg hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 flex items-center justify-center gap-2"
      >
        <Icon name="CreditCardIcon" size={20} />
        Pay & Place Order
      </button>
      <p className="text-center text-muted-foreground text-sm mt-2">
        Secure payment via Razorpay (UPI, Cards, Net Banking)
      </p>

      {/* Security Badge */}
      <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground">
        <Icon name="LockClosedIcon" size={16} />
        <span className="caption">Secure Order</span>
      </div>

      {/* Order Form Dialog */}
      {showOrderForm && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 pt-24 overflow-y-auto"
          onClick={handleBackdropClick}
        >
          <div 
            ref={dialogRef}
            className="bg-card rounded-lg shadow-warm-lg w-full max-w-md mb-8"
          >
            {/* Dialog Header */}
            <div className="sticky top-0 bg-card border-b border-border px-5 py-4 flex items-center justify-between">
              <h3 className="font-heading font-semibold text-xl text-foreground">
                {orderSuccess ? 'Order Confirmed' : 'Place Your Order'}
              </h3>
              <button
                onClick={closeOrderForm}
                aria-label="Close order form"
                className="p-2 -mr-2 hover:bg-muted rounded-md transition-smooth"
              >
                <Icon name="XMarkIcon" size={20} className="text-muted-foreground" />
              </button>
            </div>

            {/* Dialog Content */}
            <div className="p-5">
              {orderSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
                    <Icon name="CheckCircleIcon" size={36} className="text-success" />
                  </div>
                  <h4 className="font-heading font-semibold text-xl text-foreground mb-2">
                    Payment Successful!
                  </h4>
                  {orderNumber && (
                    <p className="text-foreground font-medium text-sm mb-1">
                      Order #{orderNumber}
                    </p>
                  )}
                  {paymentId && (
                    <p className="text-muted-foreground text-xs mb-4">
                      Payment ID: {paymentId}
                    </p>
                  )}
                  <p className="text-muted-foreground text-sm mb-6">
                    Your payment has been received and your order is confirmed. We'll contact you with delivery details.
                  </p>
                  <button
                    onClick={closeOrderForm}
                    className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  {/* Order Summary Card */}
                  <div className="bg-muted/50 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Your Order</p>
                      <p className="font-medium text-foreground">
                        {cartItems.length} item{cartItems.length > 1 ? 's' : ''}
                      </p>
                    </div>
                    <p className="font-heading font-bold text-xl text-primary">₹{summary.total.toFixed(2)}</p>
                  </div>

                  {/* Contact Details Section */}
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Contact Details</p>
                    
                    {/* Name */}
                    <div>
                      <label htmlFor="customerName" className="sr-only">Full Name</label>
                      <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        value={orderFormData.customerName}
                        onChange={handleOrderInputChange}
                        required
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-colors"
                        placeholder="Full Name *"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phoneNumber" className="sr-only">Phone Number</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={orderFormData.phoneNumber}
                        onChange={handleOrderInputChange}
                        required
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-colors"
                        placeholder="Phone Number *"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="sr-only">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={orderFormData.email}
                        onChange={handleOrderInputChange}
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-colors"
                        placeholder="Email (optional)"
                      />
                    </div>
                  </div>

                  {/* Delivery Section */}
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Delivery Information</p>
                    
                    {/* Address */}
                    <div>
                      <label htmlFor="address" className="sr-only">Delivery Address</label>
                      <textarea
                        id="address"
                        name="address"
                        value={orderFormData.address}
                        onChange={handleOrderInputChange}
                        required
                        rows={2}
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-colors resize-none"
                        placeholder="Delivery Address *"
                      />
                    </div>

                    {/* Delivery Date */}
                    <div>
                      <label htmlFor="deliveryDate" className="sr-only">Preferred Delivery Date/Time</label>
                      <input
                        type="text"
                        id="deliveryDate"
                        name="deliveryDate"
                        value={orderFormData.deliveryDate}
                        onChange={handleOrderInputChange}
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-colors"
                        placeholder="Preferred date/time (optional)"
                      />
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label htmlFor="additionalNotes" className="sr-only">Additional Notes</label>
                    <textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      value={orderFormData.additionalNotes}
                      onChange={handleOrderInputChange}
                      rows={2}
                      className="w-full px-3 py-2.5 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-colors resize-none"
                      placeholder="Special instructions (optional)"
                    />
                  </div>

                  {/* Error Message */}
                  {orderError && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-start gap-2">
                      <Icon name="ExclamationCircleIcon" size={18} className="text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{orderError}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeOrderForm}
                      className="flex-1 px-4 py-2.5 border border-border rounded-md text-foreground font-medium hover:bg-muted transition-smooth"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={orderSubmitting}
                      className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {orderSubmitting ? (
                        <>
                          <Icon name="ArrowPathIcon" size={18} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Icon name="CreditCardIcon" size={18} />
                          Pay ₹{summary.total.toFixed(2)}
                        </>
                      )}
                    </button>
                  </div>

                  {/* Footer Note */}
                  <p className="text-center text-muted-foreground text-xs pt-1">
                    Razorpay secure checkout — UPI, Cards, NetBanking & Wallets
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;