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
import { getCustomerById } from '@/services/customers';
import { addAddress, getAddressesByCustomer, updateAddress } from '@/services/addresses';
import { getOrdersByCustomer } from '@/services/orders';
import type { CustomerAddress, Order } from '@/types/database';

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
  const [saveNotice, setSaveNotice] = useState('');
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState({
    label: '',
    street_address: '',
    city: '',
    postal_code: '',
    phone_number: '',
    is_default: false,
  });

  const refreshAddressList = async (profileId: string, fallbackName?: string, fallbackPhone?: string) => {
    const refreshedAddresses = await getAddressesByCustomer(profileId);
    setAddresses(
      refreshedAddresses.map((address: CustomerAddress) => ({
        id: address.id,
        label: address.label || 'Address',
        name: fallbackName || userData.name || user.user_metadata?.full_name || 'Customer',
        street: address.street_address,
        city: address.city,
        state: '',
        zipCode: address.postal_code,
        phone: address.phone_number || fallbackPhone || userData.phone || user.user_metadata?.phone_number || '',
        isDefault: !!address.is_default,
        lat: 0,
        lng: 0,
      }))
    );
  };

  useEffect(() => {
    if (!isLoading && isLoggedIn && user) {
      const fetchUserProfile = async () => {
        try {
          const [profile, profileAddresses, profileOrders] = await Promise.all([
            getCustomerById(user.id),
            getAddressesByCustomer(user.id),
            getOrdersByCustomer(user.id),
          ]);

          if (profile) {
            setUserData({
              name: profile.full_name || user.user_metadata?.full_name || '',
              email: user.email || '',
              phone: profile.phone_number || '',
              memberSince: new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
              loyaltyPoints: 0,
              image: profile.avatar_url || user.user_metadata?.avatar_url || '',
              alt: 'User profile picture'
            });
          } else {
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

          setAddresses(
            profileAddresses.map((address: CustomerAddress) => ({
              id: address.id,
              label: address.label || 'Address',
              name: profile?.full_name || user.user_metadata?.full_name || 'Customer',
              street: address.street_address,
              city: address.city,
              state: '',
              zipCode: address.postal_code,
              phone: address.phone_number || profile?.phone_number || user.user_metadata?.phone_number || '',
              isDefault: !!address.is_default,
              lat: 0,
              lng: 0,
            }))
          );

          setOrders(
            profileOrders.map((order: Order) => ({
              id: order.id,
              orderNumber: order.id.slice(0, 8).toUpperCase(),
              date: order.created_at ? new Date(order.created_at).toLocaleDateString('en-US') : '',
              status: order.status === 'delivered' ? 'Delivered' : order.status === 'cancelled' ? 'Cancelled' : order.status === 'out_for_delivery' ? 'Out for Delivery' : 'Received',
              items: [],
              total: Number(order.total_amount || 0),
            }))
          );
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      fetchUserProfile();
    }
  }, [isLoggedIn, isLoading, user]);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'UserIcon' },
    { id: 'orders', label: 'Order History', icon: 'ClipboardDocumentListIcon' },
    { id: 'addresses', label: 'Addresses', icon: 'MapPinIcon' },
    // { id: 'payments', label: 'Payments', icon: 'CreditCardIcon' },
    // { id: 'notifications', label: 'Notifications', icon: 'BellIcon' },
    // { id: 'security', label: 'Security', icon: 'ShieldCheckIcon' },
  ];

  const handleSavePersonalInfo = (data: any) => {
    console.log('Saving personal info:', data);
    alert('Personal information updated successfully!');
  };

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

  const handleSaveAddress = async () => {
    if (!user) {
      return;
    }

    if (!addressForm.street_address.trim() || !addressForm.city.trim() || !addressForm.postal_code.trim() || !addressForm.phone_number.trim()) {
      setSaveNotice('Street, city, postal code, and phone number are required to save an address.');
      window.setTimeout(() => setSaveNotice(''), 3500);
      return;
    }

    const addressPayload = {
      label: addressForm.label.trim() || 'Address',
      street_address: addressForm.street_address.trim(),
      city: addressForm.city.trim(),
      postal_code: addressForm.postal_code.trim(),
      phone_number: addressForm.phone_number.trim(),
      is_default: addressForm.is_default,
    };

    const savedAddress = editingAddressId
      ? await updateAddress(editingAddressId, addressPayload)
      : await addAddress({
          profile_id: user.id,
          ...addressPayload,
        });

    if (savedAddress) {
      await refreshAddressList(user.id, userData.name || user.user_metadata?.full_name || 'Customer', userData.phone || user.user_metadata?.phone_number || '');

      setIsAddAddressOpen(false);
      setIsEditAddressOpen(false);
      setEditingAddressId(null);
      setAddressForm({ label: '', street_address: '', city: '', postal_code: '', phone_number: '', is_default: false });
      setSaveNotice(editingAddressId ? 'Address updated successfully.' : 'Address added successfully.');
      window.setTimeout(() => setSaveNotice(''), 3500);
    } else {
      setSaveNotice(editingAddressId ? 'Could not update the address. Please try again.' : 'Could not add the address. Please try again.');
      window.setTimeout(() => setSaveNotice(''), 3500);
    }
  };

  const handleEditAddress = (addressId: string) => {
    const selectedAddress = addresses.find((address) => address.id === addressId);

    if (!selectedAddress) {
      setSaveNotice('Could not load the selected address.');
      window.setTimeout(() => setSaveNotice(''), 3500);
      return;
    }

    setEditingAddressId(addressId);
    setAddressForm({
      label: selectedAddress.label || '',
      street_address: selectedAddress.street || '',
      city: selectedAddress.city || '',
      postal_code: selectedAddress.zipCode || '',
      phone_number: selectedAddress.phone || '',
      is_default: selectedAddress.isDefault,
    });
    setIsEditAddressOpen(true);
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
    <>
      <div className="space-y-6">
        {saveNotice && (
          <div className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-success shadow-sm">
            {saveNotice}
          </div>
        )}

        <ProfileHeader userData={userData} />
        <ProfileTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="min-h-[400px]">
          {activeTab === 'personal' && (
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
          )}

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
              onAddAddress={() => {
                setEditingAddressId(null);
                setAddressForm({
                  label: '',
                  street_address: '',
                  city: '',
                  postal_code: '',
                  phone_number: userData.phone || user.user_metadata?.phone_number || '',
                  is_default: false,
                });
                setIsAddAddressOpen(true);
              }}
              onEditAddress={handleEditAddress}
              onDeleteAddress={handleDeleteAddress}
              onSetDefault={handleSetDefaultAddress}
            />
          )}

          {/* {activeTab === 'payments' && (
            <PaymentMethodsTab
              paymentMethods={paymentMethods}
              onAddPayment={handleAddPayment}
              onDeletePayment={handleDeletePayment}
              onSetDefault={handleSetDefaultPayment}
            />
          )} */}

          {/* {activeTab === 'notifications' && (
            <NotificationPreferencesTab
              preferences={notificationPreferences}
              onSave={handleSaveNotificationPreferences}
            />
          )} */}

          {/* {activeTab === 'security' && (
            <SecurityTab
              onChangePassword={handleChangePassword}
              onDeleteAccount={handleDeleteAccount}
              onExportData={handleExportData}
            />
          )} */}
        </div>
      </div>

      {(isAddAddressOpen || isEditAddressOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close add address dialog"
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setIsAddAddressOpen(false);
              setIsEditAddressOpen(false);
              setEditingAddressId(null);
            }}
          />
          <div className="relative z-10 w-full max-w-lg rounded-lg bg-card p-6 shadow-warm-xl border border-border">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="font-heading text-2xl text-foreground">{isEditAddressOpen ? 'Edit Address' : 'Add Address'}</h3>
                <p className="caption text-muted-foreground mt-1">
                  {isEditAddressOpen ? 'Update the selected delivery address.' : 'Save a new delivery address to your profile.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAddAddressOpen(false);
                  setIsEditAddressOpen(false);
                  setEditingAddressId(null);
                }}
                className="px-3 py-2 rounded-md hover:bg-muted transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block caption font-medium text-foreground mb-2" htmlFor="addressLabel">
                  Label
                </label>
                <input
                  id="addressLabel"
                  type="text"
                  value={addressForm.label}
                  onChange={(e) => setAddressForm((current) => ({ ...current, label: e.target.value }))}
                  placeholder="Home, Office, etc."
                  className="w-full px-4 py-3 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring transition-smooth"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block caption font-medium text-foreground mb-2" htmlFor="streetAddress">
                  Street Address
                </label>
                <input
                  id="streetAddress"
                  type="text"
                  value={addressForm.street_address}
                  onChange={(e) => setAddressForm((current) => ({ ...current, street_address: e.target.value }))}
                  placeholder="123 Baker Street"
                  className="w-full px-4 py-3 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring transition-smooth"
                />
              </div>

              <div>
                <label className="block caption font-medium text-foreground mb-2" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  value={addressForm.city}
                  onChange={(e) => setAddressForm((current) => ({ ...current, city: e.target.value }))}
                  placeholder="Mumbai"
                  className="w-full px-4 py-3 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring transition-smooth"
                />
              </div>

              <div>
                <label className="block caption font-medium text-foreground mb-2" htmlFor="postalCode">
                  Postal Code
                </label>
                <input
                  id="postalCode"
                  type="text"
                  value={addressForm.postal_code}
                  onChange={(e) => setAddressForm((current) => ({ ...current, postal_code: e.target.value }))}
                  placeholder="400001"
                  className="w-full px-4 py-3 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring transition-smooth"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block caption font-medium text-foreground mb-2" htmlFor="addressPhoneNumber">
                  Phone Number
                </label>
                <input
                  id="addressPhoneNumber"
                  type="tel"
                  value={addressForm.phone_number}
                  onChange={(e) => setAddressForm((current) => ({ ...current, phone_number: e.target.value }))}
                  className="w-full px-4 py-3 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring transition-smooth"
                />
              </div>

              <label className="sm:col-span-2 flex items-center gap-3 text-foreground">
                <input
                  type="checkbox"
                  checked={addressForm.is_default}
                  onChange={(e) => setAddressForm((current) => ({ ...current, is_default: e.target.checked }))}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
                />
                Set as default address
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsAddAddressOpen(false)}
                className="flex-1 sm:flex-none px-6 py-3 bg-muted text-foreground rounded-md font-medium hover:bg-muted/80 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAddress}
                className="flex-1 sm:flex-none px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
              >
                {isEditAddressOpen ? 'Update Address' : 'Save Address'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerProfileInteractive;