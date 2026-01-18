'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface OrderSuccessHeaderProps {
  orderNumber: string;
  estimatedDelivery: string;
}

const OrderSuccessHeader = ({ orderNumber, estimatedDelivery }: OrderSuccessHeaderProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  return (
    <div className="text-center py-8 lg:py-12">
      <div
        className={`inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 bg-success/20 rounded-full mb-6 transition-spring ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <Icon name="CheckCircleIcon" size={48} className="text-success" variant="solid" />
      </div>
      <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
        Order Confirmed!
      </h1>
      <p className="text-lg text-muted-foreground mb-2">
        Thank you for your order. Your delicious treats are on their way!
      </p>
      <div className="inline-flex flex-col gap-2 bg-card border border-border rounded-md px-6 py-4 mt-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="ReceiptPercentIcon" size={20} />
          <span>Order Number:</span>
        </div>
        <p className="data-text text-xl font-bold text-primary">{orderNumber}</p>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground">
        <Icon name="ClockIcon" size={20} />
        <span className="text-sm">Estimated Delivery: {estimatedDelivery}</span>
      </div>
    </div>
  );
};

export default OrderSuccessHeader;