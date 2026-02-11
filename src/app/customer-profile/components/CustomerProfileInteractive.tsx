'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTabs';
import PersonalInfoTab from './PersonalInfoTab';
import OrderHistoryTab from './OrderHistoryTab';
import AddressBookTab from './AddressBookTab';
import PaymentMethodsTab from './PaymentMethodsTab';
import NotificationPreferencesTab from './NotificationPreferencesTab';
import SecurityTab from './SecurityTab';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

interface CustomerProfileInteractiveProps {
  initialUserData: any;
  initialOrders: any[];
  initialAddresses: any[];
  initialPaymentMethods: any[];
  initialNotificationPreferences: any[];
}

const CustomerProfileInteractive = ({
  initialUserData,
  initialOrders,
  initialAddresses,
  initialPaymentMethods,
  initialNotificationPreferences,
}: CustomerProfileInteractiveProps) => {
  const router = useRouter();
  const { isLoggedIn, isLoading, user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [userData, setUserData] = useState(initialUserData);
  const [orders, setOrders] = useState(initialOrders);
  const [addresses, setAddresses] = useState(initialAddresses);
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods);
  const [notificationPreferences, setNotificationPreferences] = useState(initialNotificationPreferences);

  useEffect(() => {
    if (!isLoading && isLoggedIn && user) {
      // Fetch user profile from Supabase
      const fetchUserProfile = async () => {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') {
            // PGRST116 = no rows returned, which is fine for new users
            console.error('Error fetching profile:', error);
            return;
          }

          if (profile) {
            setUserData({
              name: profile.full_name || '',
              email: user.email || '',
              phone: profile.phone_number || '',
              memberSince: new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
              loyaltyPoints: 0,
              image: profile.avatar_url || '',
              alt: 'User profile picture'
            });
          } else {
            // New user - set basic info from auth user
            setUserData({
              name: user.user_metadata?.full_name || '',
              email: user.email || '',
              phone: '',
              memberSince: new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
              loyaltyPoints: 0,
              image: user.user_metadata?.avatar_url || '',
              alt: 'User profile picture'
            });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      fetchUserProfile();
    }
  }, [isLoggedIn, isLoading, user]);

  // const tabs = [
  //   { id: 'personal', label: 'Personal Info', icon: 'UserIcon' },
  //   { id: 'orders', label: 'Order History', icon: 'ClipboardDocumentListIcon' },
  //   { id: 'addresses', label: 'Addresses', icon: 'MapPinIcon' },
  //   { id: 'payments', label: 'Payments', icon: 'CreditCardIcon' },
  //   { id: 'notifications', label: 'Notifications', icon: 'BellIcon' },
  //   { id: 'security', label: 'Security', icon: 'ShieldCheckIcon' },
  // ];

  // const handleSavePersonalInfo = (data: any) => {
  //   console.log('Saving personal info:', data);
  //   alert('Personal information updated successfully!');
  // };

  const handleReorder = (orderId: string) => {
    console.log('Reordering:', orderId);
    alert(`Reordering items from order #${orderId}`);
  };

  const handleViewOrderDetails = (orderId: string) => {
    console.log('Viewing order details:', orderId);
    alert(`Viewing details for order #${orderId}`);
  };

  const handleDownloadReceipt = (orderId: string) => {
    console.log('Downloading receipt:', orderId);
    alert(`Downloading receipt for order #${orderId}`);
  };

  const handleAddAddress = () => {
    console.log('Adding new address');
    alert('Add address functionality would open a modal here');
  };

  const handleEditAddress = (addressId: string) => {
    console.log('Editing address:', addressId);
    alert(`Edit address ${addressId} functionality would open a modal here`);
  };

  const handleDeleteAddress = (addressId: string) => {
    console.log('Deleting address:', addressId);
    if (confirm('Are you sure you want to delete this address?')) {
      alert(`Address ${addressId} deleted successfully`);
    }
  };

  const handleSetDefaultAddress = (addressId: string) => {
    console.log('Setting default address:', addressId);
    alert(`Address ${addressId} set as default`);
  };

  const handleAddPayment = () => {
    console.log('Adding payment method');
    alert('Add payment method functionality would open a modal here');
  };

  const handleDeletePayment = (paymentId: string) => {
    console.log('Deleting payment:', paymentId);
    if (confirm('Are you sure you want to remove this payment method?')) {
      alert(`Payment method ${paymentId} removed successfully`);
    }
  };

  const handleSetDefaultPayment = (paymentId: string) => {
    console.log('Setting default payment:', paymentId);
    alert(`Payment method ${paymentId} set as default`);
  };

  const handleSaveNotificationPreferences = (preferences: any[]) => {
    console.log('Saving notification preferences:', preferences);
    alert('Notification preferences updated successfully!');
  };

  const handleChangePassword = (currentPassword: string, newPassword: string) => {
    console.log('Changing password');
    if (currentPassword === 'customer123' && newPassword.length >= 8) {
      alert('Password changed successfully!');
    } else {
      alert('Current password is incorrect or new password is too weak');
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account');
      alert('Account deletion initiated. You will receive a confirmation email.');
    }
  };

  const handleExportData = () => {
    console.log('Exporting user data');
    alert('Your data export has been initiated. You will receive a download link via email.');
  };

  const handleImageChange = () => {
    console.log('Changing profile image');
    alert('Profile image change functionality would open a file picker here');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-card rounded-lg" />
          <div className="h-16 bg-card rounded-lg" />
          <div className="h-96 bg-card rounded-lg" />
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-12 h-12 text-primary"
          >
            <path
              d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-heading font-semibold text-foreground mb-4">
          Sign In Required
        </h1>
        <p className="text-muted-foreground mb-8">
          Please sign in to access your profile and manage your account
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/home"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileHeader userData={userData} onImageChange={handleImageChange} />
      {/* <ProfileTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} /> */}

      <div className="min-h-[400px]">
        {/* {activeTab === 'personal' && (
          <PersonalInfoTab
            initialData={{
              firstName: userData.name.split(' ')[0] || '',
              lastName: userData.name.split(' ')[1] || '',
              email: userData.email,
              phone: userData.phone,
              dateOfBirth: '1990-05-15',
            }}
            onSave={handleSavePersonalInfo}
          />
        )} */}

        {activeTab === 'orders' && (
          <OrderHistoryTab
            orders={orders}
            onReorder={handleReorder}
            onViewDetails={handleViewOrderDetails}
            onDownloadReceipt={handleDownloadReceipt}
          />
        )}

        {activeTab === 'addresses' && (
          <AddressBookTab
            addresses={addresses}
            onAddAddress={handleAddAddress}
            onEditAddress={handleEditAddress}
            onDeleteAddress={handleDeleteAddress}
            onSetDefault={handleSetDefaultAddress}
          />
        )}

        {activeTab === 'payments' && (
          <PaymentMethodsTab
            paymentMethods={paymentMethods}
            onAddPayment={handleAddPayment}
            onDeletePayment={handleDeletePayment}
            onSetDefault={handleSetDefaultPayment}
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationPreferencesTab
            preferences={notificationPreferences}
            onSave={handleSaveNotificationPreferences}
          />
        )}

        {activeTab === 'security' && (
          <SecurityTab
            onChangePassword={handleChangePassword}
            onDeleteAccount={handleDeleteAccount}
            onExportData={handleExportData}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerProfileInteractive;