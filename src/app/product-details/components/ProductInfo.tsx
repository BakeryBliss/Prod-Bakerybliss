import Icon from '@/components/ui/AppIcon';

interface ProductInfoProps {
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  category: string | string[];
  inStock: boolean;
}

const ProductInfo = ({
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  description,
  category,
  inStock,
}: ProductInfoProps) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Category Badge */}
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full caption font-medium">
          {Array.isArray(category) ? category.join(', ') : category}
        </span>
        {!inStock && (
          <span className="px-3 py-1 bg-destructive/10 text-destructive rounded-full caption font-medium">
            Out of Stock
          </span>
        )}
      </div>

      {/* Product Name */}
      <h1 className="font-heading text-3xl lg:text-4xl text-foreground">{name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Icon
              key={index}
              name="StarIcon"
              size={20}
              variant={index < Math.floor(rating) ? 'solid' : 'outline'}
              className={index < Math.floor(rating) ? 'text-warning' : 'text-muted-foreground'}
            />
          ))}
        </div>
        <span className="text-foreground font-medium">{rating.toFixed(1)}</span>
        <span className="text-muted-foreground">({reviewCount} reviews)</span>
      </div>

      {/* Price */}
      {/* <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-primary">₹{price.toFixed(2)}</span>
        {originalPrice && (
          <>
            <span className="text-xl text-muted-foreground line-through">
            ₹{originalPrice.toFixed(2)}
            </span>
            <span className="px-2 py-1 bg-success/10 text-success rounded caption font-bold">
              {discount}% OFF
            </span>
          </>
        )}
      </div> */}

      {/* Description */}
      <div className="pt-4 border-t border-border">
        <p className="text-foreground leading-relaxed">{description}</p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-4 pt-4">
        <div className="flex items-center gap-3 p-3 bg-card rounded-md">
          <Icon name="TruckIcon" size={24} className="text-primary" />
          <div>
            <p className="font-medium text-foreground">Free Delivery</p>
            <p className="caption text-muted-foreground">On orders over ₹500</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-card rounded-md">
          <Icon name="ClockIcon" size={24} className="text-primary" />
          <div>
            <p className="font-medium text-foreground">Fresh Daily</p>
            <p className="caption text-muted-foreground">Baked every morning</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;