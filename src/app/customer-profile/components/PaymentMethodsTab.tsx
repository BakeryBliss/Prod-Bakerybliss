'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi';
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  upiId?: string;
  isDefault: boolean;
}

interface PaymentMethodsTabProps {
  paymentMethods: PaymentMethod[];
  onAddPayment: () => void;
  onDeletePayment: (paymentId: string) => void;
  onSetDefault: (paymentId: string) => void;
}

const PaymentMethodsTab = ({
  paymentMethods,
  onAddPayment,
  onDeletePayment,
  onSetDefault,
}: PaymentMethodsTabProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const getCardBrand = (cardNumber: string) => {
    const firstDigit = cardNumber.charAt(0);
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'Mastercard';
    if (firstDigit === '3') return 'Amex';
    return 'Card';
  };

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-card rounded-lg shadow-warm-md p-6 animate-pulse">
            <div className="h-6 bg-muted rounded w-48 mb-4" />
            <div className="h-4 bg-muted rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-heading font-semibold text-foreground">Payment Methods</h2>
        <button
          onClick={onAddPayment}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
        >
          <Icon name="PlusIcon" size={16} />
          <span>Add Payment</span>
        </button>
      </div>

      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <Icon name="ShieldCheckIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground mb-1">Secure Payment Storage</p>
            <p className="caption text-muted-foreground">
              Your payment information is encrypted and securely stored. We never store your CVV.
            </p>
          </div>
        </div>
      </div>

      {paymentMethods.length === 0 ? (
        <div className="bg-card rounded-lg shadow-warm-md p-12 text-center">
          <Icon name="CreditCardIcon" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-heading font-semibold text-foreground mb-2">No Payment Methods</h3>
          <p className="text-muted-foreground mb-6">Add a payment method for faster checkout</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="bg-card rounded-lg shadow-warm-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon
                      name={method.type === 'card' ? 'CreditCardIcon' : 'DevicePhoneMobileIcon'}
                      size={24}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground">
                      {method.type === 'card' ? getCardBrand(method.cardNumber || '') : 'UPI'}
                    </p>
                    <p className="caption text-muted-foreground">
                      {method.type === 'card'
                        ? `•••• ${method.cardNumber?.slice(-4)}`
                        : method.upiId}
                    </p>
                  </div>
                </div>
                {method.isDefault && (
                  <span className="caption px-3 py-1 bg-success/10 text-success rounded-full font-medium">
                    Default
                  </span>
                )}
              </div>

              {method.type === 'card' && (
                <div className="space-y-1 text-muted-foreground mb-4">
                  <p className="caption">Cardholder: {method.cardHolder}</p>
                  <p className="caption">Expires: {method.expiryDate}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {!method.isDefault && (
                  <button
                    onClick={() => onSetDefault(method.id)}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-muted text-foreground rounded-md hover:bg-muted/80 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
                  >
                    <Icon name="CheckCircleIcon" size={14} />
                    <span>Set Default</span>
                  </button>
                )}
                <button
                  onClick={() => onDeletePayment(method.id)}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-destructive/10 text-destructive rounded-md hover:bg-destructive/20 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
                >
                  <Icon name="TrashIcon" size={14} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentMethodsTab;