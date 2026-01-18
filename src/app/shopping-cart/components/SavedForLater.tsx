'use client';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface SavedItem {
  id: string;
  name: string;
  image: string;
  alt: string;
  price: number;
}

interface SavedForLaterProps {
  items: SavedItem[];
  onMoveToCart: (id: string) => void;
  onRemove: (id: string) => void;
}

const SavedForLater = ({ items, onMoveToCart, onRemove }: SavedForLaterProps) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-md border border-border p-6">
      <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
        Saved for Later ({items.length})
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-background rounded-md border border-border p-4 transition-smooth hover:shadow-warm-md"
          >
            <div className="relative w-full h-40 rounded-md overflow-hidden bg-muted mb-3">
              <AppImage
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
              {item.name}
            </h3>

            <p className="font-heading font-semibold text-lg text-primary mb-3">
              ${item.price.toFixed(2)}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => onMoveToCart(item.id)}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              >
                Move to Cart
              </button>
              <button
                onClick={() => onRemove(item.id)}
                className="p-2 text-muted-foreground hover:text-destructive transition-smooth focus:outline-none focus:ring-2 focus:ring-destructive rounded-md"
                aria-label={`Remove ${item.name}`}
              >
                <Icon name="TrashIcon" size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedForLater;