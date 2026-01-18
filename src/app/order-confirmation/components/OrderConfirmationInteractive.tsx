'use client';

import OrderSuccessHeader from './OrderSuccessHeader';
import OrderDetailsSection from './OrderDetailsSection';
import OrderTrackingSection from './OrderTrackingSection';
import ContactSection from './ContactSection';
import AccountPromptSection from './AccountPromptSection';
import SocialShareSection from './SocialShareSection';
import NotificationPreferences from './NotificationPreferences';
import NextStepsSection from './NextStepsSection';
import PrintReceiptButton from './PrintReceiptButton';

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

interface DeliveryAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

interface OrderConfirmationInteractiveProps {
  orderNumber: string;
  estimatedDelivery: string;
  orderDate: string;
  currentStatus: string;
  items: OrderItem[];
  deliveryAddress: DeliveryAddress;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  contactPhone: string;
  contactEmail: string;
}

const OrderConfirmationInteractive = ({
  orderNumber,
  estimatedDelivery,
  orderDate,
  currentStatus,
  items,
  deliveryAddress,
  paymentMethod,
  subtotal,
  deliveryFee,
  discount,
  total,
  contactPhone,
  contactEmail,
}: OrderConfirmationInteractiveProps) => {
  return (
    <div className="space-y-8">
      <OrderSuccessHeader orderNumber={orderNumber} estimatedDelivery={estimatedDelivery} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <OrderDetailsSection
            items={items}
            deliveryAddress={deliveryAddress}
            paymentMethod={paymentMethod}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            discount={discount}
            total={total}
          />

          <OrderTrackingSection currentStatus={currentStatus} orderDate={orderDate} />

          <NextStepsSection />
        </div>

        <div className="space-y-8">
          <ContactSection phone={contactPhone} email={contactEmail} />

          <AccountPromptSection />

          <SocialShareSection orderNumber={orderNumber} />

          <NotificationPreferences />
        </div>
      </div>

      <PrintReceiptButton orderNumber={orderNumber} />
    </div>
  );
};

export default OrderConfirmationInteractive;