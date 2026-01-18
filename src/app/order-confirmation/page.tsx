// import type { Metadata } from 'next';
// import Header from '@/components/common/Header';
// import Breadcrumb from '@/components/common/Breadcrumb';
// import OrderConfirmationInteractive from './components/OrderConfirmationInteractive';
// import PrintStyles from './components/PrintStyles';

// export const metadata: Metadata = {
//   title: 'Order Confirmation - BakeryBliss',
//   description: 'Your order has been confirmed! Track your delicious treats from our bakery to your doorstep with real-time status updates and delivery notifications.'
// };

// export default function OrderConfirmationPage() {
//   const mockOrderData = {
//     orderNumber: 'BB-2026-01-12345',
//     estimatedDelivery: 'Today, 01/12/2026 by 6:00 PM',
//     orderDate: '01/12/2026 at 2:44 PM',
//     currentStatus: 'baking',
//     items: [
//     {
//       id: '1',
//       name: 'Chocolate Truffle Cake',
//       image: "https://images.unsplash.com/photo-1624351773837-115602b18295",
//       alt: 'Rich chocolate truffle cake with dark chocolate ganache frosting and chocolate shavings on white plate',
//       quantity: 1,
//       size: '8 inch',
//       flavor: 'Dark Chocolate',
//       price: 45.99
//     },
//     {
//       id: '2',
//       name: 'Blueberry Muffins',
//       image: "https://images.unsplash.com/photo-1636044990650-37cf6b17e08e",
//       alt: 'Freshly baked blueberry muffins with golden brown tops and visible blueberries in rustic basket',
//       quantity: 6,
//       size: 'Regular',
//       flavor: 'Classic Blueberry',
//       price: 18.99
//     },
//     {
//       id: '3',
//       name: 'Cinnamon Rolls',
//       image: "https://images.unsplash.com/photo-1598990451163-68394f23bdcc",
//       alt: 'Warm cinnamon rolls with cream cheese frosting drizzled on top arranged on wooden board',
//       quantity: 4,
//       size: 'Large',
//       flavor: 'Classic Cinnamon',
//       price: 16.99
//     }],

//     deliveryAddress: {
//       name: 'Sarah Johnson',
//       street: '123 Maple Street, Apt 4B',
//       city: 'Springfield',
//       state: 'IL',
//       zip: '62701',
//       phone: '(555) 123-4567'
//     },
//     paymentMethod: 'Razorpay - UPI (success@razorpay)',
//     subtotal: 81.97,
//     deliveryFee: 5.00,
//     discount: 8.20,
//     total: 78.77,
//     contactPhone: '(555) 987-6543',
//     contactEmail: 'support@bakerybliss.com'
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="pt-24 lg:pt-28 pb-16">
//         <div className="mx-auto px-5 lg:px-20">
//           <div className="mb-6">
//             <Breadcrumb />
//           </div>

//           <OrderConfirmationInteractive
//             orderNumber={mockOrderData.orderNumber}
//             estimatedDelivery={mockOrderData.estimatedDelivery}
//             orderDate={mockOrderData.orderDate}
//             currentStatus={mockOrderData.currentStatus}
//             items={mockOrderData.items}
//             deliveryAddress={mockOrderData.deliveryAddress}
//             paymentMethod={mockOrderData.paymentMethod}
//             subtotal={mockOrderData.subtotal}
//             deliveryFee={mockOrderData.deliveryFee}
//             discount={mockOrderData.discount}
//             total={mockOrderData.total}
//             contactPhone={mockOrderData.contactPhone}
//             contactEmail={mockOrderData.contactEmail} />

//         </div>
//       </main>

//       <PrintStyles />
//     </div>);

// }