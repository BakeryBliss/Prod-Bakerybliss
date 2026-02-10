'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
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

interface CartItemProps {
  item: CartItemData;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onSaveForLater: (id: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove, onSaveForLater }: CartItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [customization, setCustomization] = useState(item.customization || '');

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const handleSaveCustomization = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-md border border-border p-4 lg:p-6 transition-smooth hover:shadow-warm-md">
      <div className="flex gap-4 lg:gap-6">
        {/* Product Image */}
        <div className="relative w-24 h-24 lg:w-32 lg:h-32 flex-shrink-0 rounded-md overflow-hidden bg-muted">
          <AppImage
            src={item.image}
            alt={item.alt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-4 mb-2">
            <h3 className="font-heading font-semibold text-lg lg:text-xl text-foreground">
              {item.name}
            </h3>
            <button
              onClick={() => onRemove(item.id)}
              className="p-2 text-muted-foreground hover:text-destructive transition-smooth focus:outline-none focus:ring-2 focus:ring-destructive rounded-md flex-shrink-0"
              aria-label={`Remove ${item.name} from cart`}
            >
              <Icon name="TrashIcon" size={20} />
            </button>
          </div>

          {/* Variations */}
          <div className="space-y-1 mb-3">
            {item.size && (
              <p className="caption text-muted-foreground">
                <span className="font-medium">Size:</span> {item.size}
              </p>
            )}
            {item.flavor && (
              <p className="caption text-muted-foreground">
                <span className="font-medium">Flavor:</span> {item.flavor}
              </p>
            )}
          </div>

          {/* Customization */}
          {isEditing ? (
            <div className="mb-3">
              <textarea
                value={customization}
                onChange={(e) => setCustomization(e.target.value)}
                placeholder="Add special instructions..."
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={2}
              />
              <button
                onClick={handleSaveCustomization}
                className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
              >
                Save Instructions
              </button>
            </div>
          ) : (
            <>
              {customization && (
                <p className="caption text-muted-foreground mb-2 italic">
                  "{customization}"
                </p>
              )}
              <button
                onClick={() => setIsEditing(true)}
                className="caption text-primary hover:text-primary/80 transition-smooth focus:outline-none focus:underline"
              >
                {customization ? 'Edit Instructions' : 'Add Special Instructions'}
              </button>
            </>
          )}

          {/* Price and Quantity */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="w-8 h-8 flex items-center justify-center bg-input border border-border rounded-md text-foreground hover:bg-primary/10 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Decrease quantity"
              >
                <Icon name="MinusIcon" size={16} />
              </button>
              <span className="data-text font-medium text-foreground min-w-[2rem] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={item.quantity >= 99}
                className="w-8 h-8 flex items-center justify-center bg-input border border-border rounded-md text-foreground hover:bg-primary/10 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Increase quantity"
              >
                <Icon name="PlusIcon" size={16} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* <p className="font-heading font-semibold text-xl text-primary">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p> */}
              {/* <button
                onClick={() => onSaveForLater(item.id)}
                className="caption text-muted-foreground hover:text-primary transition-smooth focus:outline-none focus:underline"
              >
                Save for Later
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;