'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  alt: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Delivered' | 'Out for Delivery' | 'Baking' | 'Received' | 'Cancelled';
  items: OrderItem[];
  total: number;
}

interface OrderHistoryTabProps {
  orders: Order[];
  onReorder: (orderId: string) => void;
  onViewDetails: (orderId: string) => void;
  onDownloadReceipt: (orderId: string) => void;
}

const OrderHistoryTab = ({ orders, onReorder, onViewDetails, onDownloadReceipt }: OrderHistoryTabProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return 'bg-success/10 text-success';
      case 'Out for Delivery':
        return 'bg-primary/10 text-primary';
      case 'Baking':
        return 'bg-warning/10 text-warning';
      case 'Received':
        return 'bg-accent/10 text-accent';
      case 'Cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-lg shadow-warm-md p-6 animate-pulse">
            <div className="h-6 bg-muted rounded w-48 mb-4" />
            <div className="h-4 bg-muted rounded w-full mb-2" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-card rounded-lg shadow-warm-md p-12 text-center">
        <Icon name="ShoppingBagIcon" size={64} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">No Orders Yet</h3>
        <p className="text-muted-foreground mb-6">Start shopping to see your order history here</p>
        <a
          href="/product-details"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
        >
          <Icon name="ShoppingBagIcon" size={20} />
          <span>Browse Products</span>
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-card rounded-lg shadow-warm-md overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-heading font-semibold text-foreground">
                    Order #{order.orderNumber}
                  </h3>
                  <span className={`caption px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <p className="caption text-muted-foreground">
                  Placed on {order.date} • {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              <div className="text-left lg:text-right">
                <p className="caption text-muted-foreground mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-primary">₹{order.total.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
              >
                <Icon name={expandedOrder === order.id ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={16} />
                <span>{expandedOrder === order.id ? 'Hide' : 'View'} Items</span>
              </button>
              <button
                onClick={() => onReorder(order.id)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
              >
                <Icon name="ArrowPathIcon" size={16} />
                <span>Reorder</span>
              </button>
              <button
                onClick={() => onDownloadReceipt(order.id)}
                className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
              >
                <Icon name="ArrowDownTrayIcon" size={16} />
                <span>Receipt</span>
              </button>
              <button
                onClick={() => onViewDetails(order.id)}
                className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
              >
                <Icon name="EyeIcon" size={16} />
                <span>Details</span>
              </button>
            </div>

            {expandedOrder === order.id && (
              <div className="border-t border-border pt-4 space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <AppImage
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{item.name}</p>
                      <p className="caption text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-foreground">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryTab;