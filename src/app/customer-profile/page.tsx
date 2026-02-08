import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import CustomerProfileInteractive from './components/CustomerProfileInteractive';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'My Account - BakeryBliss',
  description: 'Manage your BakeryBliss account, view order history, update delivery addresses, payment methods, and notification preferences in one centralized profile dashboard.'
};

export default function CustomerProfilePage() {
  const mockUserData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    memberSince: "January 2024",
    loyaltyPoints: 450,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1328db6c3-1763296012066.png",
    alt: "Professional headshot of smiling woman with brown hair in casual blue sweater against neutral background"
  };

  const mockOrders = [
  {
    id: "1",
    orderNumber: "BB2024-001",
    date: "01/08/2026",
    status: "Delivered" as const,
    total: 45.99,
    items: [
    {
      id: "1",
      name: "Chocolate Croissant",
      quantity: 3,
      price: 4.99,
      image: "https://images.unsplash.com/photo-1600930496627-33491158a923",
      alt: "Golden flaky chocolate croissant with visible chocolate layers on white plate"
    },
    {
      id: "2",
      name: "Sourdough Bread",
      quantity: 1,
      price: 8.99,
      image: "https://images.unsplash.com/photo-1589569444349-4dbaca268a47",
      alt: "Rustic artisan sourdough bread loaf with crispy golden crust on wooden cutting board"
    },
    {
      id: "3",
      name: "Blueberry Muffin",
      quantity: 6,
      price: 3.99,
      image: "https://images.unsplash.com/photo-1496466360365-2eceae5d6d71",
      alt: "Fresh blueberry muffins with golden tops and visible blueberries in paper liners"
    }]

  },
  {
    id: "2",
    orderNumber: "BB2024-002",
    date: "01/10/2026",
    status: "Out for Delivery" as const,
    total: 32.50,
    items: [
    {
      id: "4",
      name: "Red Velvet Cake",
      quantity: 1,
      price: 32.50,
      image: "https://images.unsplash.com/photo-1508258040961-db03b65a51f0",
      alt: "Elegant red velvet layer cake with white cream cheese frosting on decorative cake stand"
    }]

  },
  {
    id: "3",
    orderNumber: "BB2024-003",
    date: "01/11/2026",
    status: "Baking" as const,
    total: 28.75,
    items: [
    {
      id: "5",
      name: "Cinnamon Roll",
      quantity: 4,
      price: 5.99,
      image: "https://images.unsplash.com/photo-1620442178931-c132f0c59423",
      alt: "Freshly baked cinnamon rolls with white icing drizzle on baking tray"
    },
    {
      id: "6",
      name: "Baguette",
      quantity: 2,
      price: 3.49,
      image: "https://images.unsplash.com/photo-1623252077629-f8e0aabbb4ea",
      alt: "Traditional French baguettes with crispy golden crust in woven basket"
    }]

  }];


  const mockAddresses = [
  {
    id: "1",
    label: "Home",
    name: "Sarah Johnson",
    street: "123 Maple Street",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    phone: "+1 (555) 123-4567",
    isDefault: true,
    lat: 39.7817,
    lng: -89.6501
  },
  {
    id: "2",
    label: "Office",
    name: "Sarah Johnson",
    street: "456 Business Park Drive",
    city: "Springfield",
    state: "IL",
    zipCode: "62702",
    phone: "+1 (555) 987-6543",
    isDefault: false,
    lat: 39.7990,
    lng: -89.6440
  }];


  const mockPaymentMethods = [
  {
    id: "1",
    type: "card" as const,
    cardNumber: "4532123456789012",
    cardHolder: "Sarah Johnson",
    expiryDate: "12/26",
    isDefault: true
  },
  {
    id: "2",
    type: "upi" as const,
    upiId: "sarah.johnson@bank",
    isDefault: false
  }];


  const mockNotificationPreferences = [
  {
    id: "1",
    title: "Order Updates",
    description: "Receive notifications about your order status and delivery updates",
    email: true,
    sms: true
  },
  {
    id: "2",
    title: "Promotional Offers",
    description: "Get notified about special deals, discounts, and new product launches",
    email: true,
    sms: false
  },
  {
    id: "3",
    title: "Newsletter",
    description: "Receive our weekly newsletter with baking tips, recipes, and bakery news",
    email: true,
    sms: false
  },
  {
    id: "4",
    title: "Loyalty Rewards",
    description: "Get updates about your loyalty points, rewards, and exclusive member benefits",
    email: true,
    sms: true
  }];


  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 lg:pt-28 pb-16">
        <div className="mx-auto px-5 lg:px-20">
          <Breadcrumb className="mb-6" />
          
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
              My Account
            </h1>
            <p className="text-muted-foreground">
              Manage your profile, orders, and preferences
            </p>
          </div>

          <CustomerProfileInteractive
            initialUserData={mockUserData}
            initialOrders={mockOrders}
            initialAddresses={mockAddresses}
            initialPaymentMethods={mockPaymentMethods}
            initialNotificationPreferences={mockNotificationPreferences} />

        </div>
      </main>

      <Footer />
    </>);

}