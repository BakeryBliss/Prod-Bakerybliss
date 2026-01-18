import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  alt: string;
  quantity: number;
  size: string;
  flavor: string;
  price: number;
}

interface OrderDetailsSectionProps {
  items: OrderItem[];
  deliveryAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

const OrderDetailsSection = ({
  items,
  deliveryAddress,
  paymentMethod,
  subtotal,
  deliveryFee,
  discount,
  total,
}: OrderDetailsSectionProps) => {
  return (
    <div className="bg-card border border-border rounded-md p-6 lg:p-8">
      <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">Order Details</h2>

      {/* Order Items */}
      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-medium text-foreground mb-4">Items Ordered</h3>
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0">
            <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-muted">
              <AppImage
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground mb-1">{item.name}</h4>
              <div className="flex flex-wrap gap-x-4 gap-y-1 caption text-muted-foreground">
                <span>Size: {item.size}</span>
                <span>Flavor: {item.flavor}</span>
                <span>Qty: {item.quantity}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-semibold text-foreground">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery Address */}
      <div className="mb-8 pb-8 border-b border-border">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="MapPinIcon" size={20} />
          Delivery Address
        </h3>
        <div className="bg-muted rounded-md p-4">
          <p className="font-medium text-foreground mb-2">{deliveryAddress.name}</p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {deliveryAddress.street}
            <br />
            {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zip}
            <br />
            Phone: {deliveryAddress.phone}
          </p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-8 pb-8 border-b border-border">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="CreditCardIcon" size={20} />
          Payment Method
        </h3>
        <div className="bg-muted rounded-md p-4">
          <p className="text-foreground">{paymentMethod}</p>
        </div>
      </div>

      {/* Price Summary */}
      <div className="space-y-3">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-success">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-xl font-bold text-foreground pt-3 border-t border-border">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSection;