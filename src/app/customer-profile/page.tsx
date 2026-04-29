import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import CustomerProfileInteractive from './components/CustomerProfileInteractive';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'My Account - BakeryBliss',
  description: 'Manage your BakeryBliss account, view order history, update delivery addresses, payment methods, and notification preferences in one centralized profile dashboard.'
};

export default function CustomerProfilePage() {
  // Removed mock data - will be loaded client-side from Supabase
  const emptyUserData = {
    name: "",
    email: "",
    phone: "",
    memberSince: "",
    loyaltyPoints: 0,
    image: "",
    alt: ""
  };

  const emptyOrders: any[] = [];
  const emptyAddresses: any[] = [];
  const emptyPaymentMethods: any[] = [];
  const emptyNotificationPreferences: any[] = [];

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

          <Suspense fallback={
            <div className="space-y-6 animate-pulse">
              <div className="h-32 bg-card rounded-lg" />
              <div className="h-16 bg-card rounded-lg" />
              <div className="h-96 bg-card rounded-lg" />
            </div>
          }>
            <CustomerProfileInteractive
              initialUserData={emptyUserData}
              initialOrders={emptyOrders}
              initialAddresses={emptyAddresses}
              initialPaymentMethods={emptyPaymentMethods}
              initialNotificationPreferences={emptyNotificationPreferences} />
          </Suspense>

        </div>
      </main>

      <Footer />
    </>);

}