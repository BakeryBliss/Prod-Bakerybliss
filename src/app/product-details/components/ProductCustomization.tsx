'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CustomizationOption {
  id: string;
  label: string;
  priceModifier: number;
}

interface ProductCustomizationProps {
  sizes: CustomizationOption[];
  flavors: CustomizationOption[];
  basePrice: number;
  inStock: boolean;
  onAddToCart: (customization: {
    size: string;
    flavor: string;
    quantity: number;
    specialInstructions: string;
    totalPrice: number;
  }) => void;
}

const ProductCustomization = ({
  sizes,
  flavors,
  basePrice,
  inStock,
  onAddToCart,
}: ProductCustomizationProps) => {
  const [selectedSize, setSelectedSize] = useState(sizes[0]?.id || '');
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const calculateTotalPrice = () => {
    const sizeModifier = sizes.find((s) => s.id === selectedSize)?.priceModifier || 0;
    const flavorModifier = flavors.find((f) => f.id === selectedFlavor)?.priceModifier || 0;
    return (basePrice + sizeModifier + flavorModifier) * quantity;
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedFlavor) {
      alert('Please select size and flavor');
      return;
    }

    onAddToCart({
      size: selectedSize,
      flavor: selectedFlavor,
      quantity,
      specialInstructions,
      totalPrice: calculateTotalPrice(),
    });
  };

  return (
    <div className="space-y-6 p-6 bg-card rounded-lg shadow-warm">
      {/* Size Selection */}
      <div>
        <label className="block font-medium text-foreground mb-3">
          Select Size <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setSelectedSize(size.id)}
              className={`p-4 rounded-md border-2 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring ${
                selectedSize === size.id
                  ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-foreground'
              }`}
            >
              <p className="font-medium">{size.label}</p>
              {size.priceModifier !== 0 && (
                <p className="caption text-muted-foreground mt-1">
                  {size.priceModifier > 0 ? '+' : ''}₹{size.priceModifier.toFixed(2)}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Flavor Selection */}
      <div>
        <label className="block font-medium text-foreground mb-3">
          Select Flavor <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {flavors.map((flavor) => (
            <button
              key={flavor.id}
              onClick={() => setSelectedFlavor(flavor.id)}
              className={`p-4 rounded-md border-2 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring ${
                selectedFlavor === flavor.id
                  ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-foreground'
              }`}
            >
              <p className="font-medium">{flavor.label}</p>
              {flavor.priceModifier !== 0 && (
                <p className="caption text-muted-foreground mt-1">
                  {flavor.priceModifier > 0 ? '+' : ''}₹{flavor.priceModifier.toFixed(2)}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div>
        <label className="block font-medium text-foreground mb-3">Quantity</label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-12 h-12 flex items-center justify-center bg-input border border-border rounded-md hover:bg-primary/10 hover:border-primary transition-smooth disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-3 focus:ring-ring"
            aria-label="Decrease quantity"
          >
            <Icon name="MinusIcon" size={20} />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val >= 1 && val <= 99) setQuantity(val);
            }}
            className="w-20 h-12 text-center text-lg font-bold bg-input border border-border rounded-md focus:outline-none focus:ring-3 focus:ring-ring"
            min="1"
            max="99"
            aria-label="Quantity input"
          />
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= 99}
            className="w-12 h-12 flex items-center justify-center bg-input border border-border rounded-md hover:bg-primary/10 hover:border-primary transition-smooth disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-3 focus:ring-ring"
            aria-label="Increase quantity"
          >
            <Icon name="PlusIcon" size={20} />
          </button>
        </div>
      </div>

      {/* Special Instructions */}
      <div>
        <label className="block font-medium text-foreground mb-3">
          Special Instructions (Optional)
        </label>
        <textarea
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          placeholder="Add any special requests or customization notes..."
          rows={4}
          maxLength={200}
          className="w-full p-4 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring resize-none"
        />
        <p className="caption text-muted-foreground mt-2">
          {specialInstructions.length}/200 characters
        </p>
      </div>

      {/* Price Summary */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-medium text-foreground">Total Price:</span>
          <span className="text-2xl font-bold text-primary">
          ₹{calculateTotalPrice().toFixed(2)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="w-full py-4 bg-primary text-primary-foreground rounded-md font-medium text-lg hover:bg-primary/90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 flex items-center justify-center gap-2"
        >
          <Icon name="ShoppingCartIcon" size={24} />
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCustomization;