'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TrackingStatus {
  id: string;
  label: string;
  icon: string;
  completed: boolean;
  current: boolean;
  estimatedTime: string;
}

interface OrderTrackingSectionProps {
  currentStatus: string;
  orderDate: string;
}

const OrderTrackingSection = ({ currentStatus, orderDate }: OrderTrackingSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const trackingStatuses: TrackingStatus[] = [
    {
      id: 'received',
      label: 'Order Received',
      icon: 'CheckCircleIcon',
      completed: true,
      current: currentStatus === 'received',
      estimatedTime: orderDate,
    },
    {
      id: 'baking',
      label: 'Baking',
      icon: 'FireIcon',
      completed: currentStatus === 'baking' || currentStatus === 'out-for-delivery' || currentStatus === 'delivered',
      current: currentStatus === 'baking',
      estimatedTime: 'In 2-3 hours',
    },
    {
      id: 'out-for-delivery',
      label: 'Out for Delivery',
      icon: 'TruckIcon',
      completed: currentStatus === 'out-for-delivery' || currentStatus === 'delivered',
      current: currentStatus === 'out-for-delivery',
      estimatedTime: 'In 4-5 hours',
    },
    {
      id: 'delivered',
      label: 'Delivered',
      icon: 'HomeIcon',
      completed: currentStatus === 'delivered',
      current: currentStatus === 'delivered',
      estimatedTime: 'Today by 6:00 PM',
    },
  ];

  if (!isHydrated) {
    return (
      <div className="bg-card border border-border rounded-md p-6 lg:p-8">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Order Tracking</h2>
        <div className="h-40 bg-muted animate-pulse rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-md p-6 lg:p-8">
      <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Order Tracking</h2>

      {/* Desktop Timeline */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-muted">
            <div
              className="h-full bg-primary transition-smooth"
              style={{
                width: `${
                  (trackingStatuses.filter((s) => s.completed).length / trackingStatuses.length) * 100
                }%`,
              }}
            ></div>
          </div>

          {/* Status Points */}
          <div className="relative flex justify-between">
            {trackingStatuses.map((status) => (
              <div key={status.id} className="flex flex-col items-center" style={{ width: '25%' }}>
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-smooth ${
                    status.completed
                      ? 'bg-primary text-primary-foreground'
                      : status.current
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon name={status.icon as any} size={28} variant={status.completed ? 'solid' : 'outline'} />
                </div>
                <p
                  className={`font-medium text-center mb-2 ${
                    status.current ? 'text-primary' : status.completed ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {status.label}
                </p>
                <p className="caption text-muted-foreground text-center">{status.estimatedTime}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="lg:hidden space-y-4">
        {trackingStatuses.map((status, index) => (
          <div key={status.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-smooth ${
                  status.completed
                    ? 'bg-primary text-primary-foreground'
                    : status.current
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <Icon name={status.icon as any} size={24} variant={status.completed ? 'solid' : 'outline'} />
              </div>
              {index < trackingStatuses.length - 1 && (
                <div
                  className={`w-1 flex-1 mt-2 ${
                    status.completed ? 'bg-primary' : 'bg-muted'
                  } transition-smooth`}
                  style={{ minHeight: '40px' }}
                ></div>
              )}
            </div>
            <div className="flex-1 pb-6">
              <p
                className={`font-medium mb-1 ${
                  status.current ? 'text-primary' : status.completed ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {status.label}
              </p>
              <p className="caption text-muted-foreground">{status.estimatedTime}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Current Status Message */}
      <div className="mt-8 bg-primary/10 border border-primary/20 rounded-md p-4">
        <div className="flex items-start gap-3">
          <Icon name="InformationCircleIcon" size={24} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground mb-1">
              {currentStatus === 'received' && 'Your order has been received and is being prepared.'}
              {currentStatus === 'baking' && 'Our bakers are crafting your treats with love!'}
              {currentStatus === 'out-for-delivery' && 'Your order is on its way to you!'}
              {currentStatus === 'delivered' && 'Your order has been delivered. Enjoy!'}
            </p>
            <p className="caption text-muted-foreground">
              You will receive SMS and email notifications for each status update.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingSection;