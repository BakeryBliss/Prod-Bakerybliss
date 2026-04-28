'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Address {
  id: string;
  label: string;
  name: string;
  street: string;
  city: string;
  state?: string;
  zipCode: string;
  phone?: string;
  isDefault: boolean;
  lat?: number;
  lng?: number;
}

interface AddressBookTabProps {
  addresses: Address[];
  onAddAddress: () => void;
  onEditAddress: (addressId: string) => void;
  onDeleteAddress: (addressId: string) => void;
  onSetDefault: (addressId: string) => void;
}

const AddressBookTab = ({
  addresses,
  onAddAddress,
  onEditAddress,
  onDeleteAddress,
  onSetDefault,
}: AddressBookTabProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [expandedAddress, setExpandedAddress] = useState<string | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-card rounded-lg shadow-warm-md p-6 animate-pulse">
            <div className="h-6 bg-muted rounded w-32 mb-4" />
            <div className="h-4 bg-muted rounded w-full mb-2" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-heading font-semibold text-foreground">Delivery Addresses</h2>
        <button
          onClick={onAddAddress}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
        >
          <Icon name="PlusIcon" size={16} />
          <span>Add Address</span>
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-card rounded-lg shadow-warm-md p-12 text-center">
          <Icon name="MapPinIcon" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-heading font-semibold text-foreground mb-2">No Addresses Saved</h3>
          <p className="text-muted-foreground mb-6">Add a delivery address to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div key={address.id} className="bg-card rounded-lg shadow-warm-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon name="MapPinIcon" size={20} className="text-primary" />
                    <h3 className="font-heading font-semibold text-foreground">{address.label}</h3>
                  </div>
                  {address.isDefault && (
                    <span className="caption px-3 py-1 bg-success/10 text-success rounded-full font-medium">
                      Default
                    </span>
                  )}
                </div>

                <div className="space-y-1 text-muted-foreground mb-4">
                  <p className="font-medium text-foreground">{address.name}</p>
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p className="flex items-center gap-2">
                    <Icon name="PhoneIcon" size={14} />
                    <span>{address.phone}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {!address.isDefault && (
                    <button
                      onClick={() => onSetDefault(address.id)}
                      className="flex items-center gap-2 px-3 py-2 text-sm bg-muted text-foreground rounded-md hover:bg-muted/80 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
                    >
                      <Icon name="CheckCircleIcon" size={14} />
                      <span>Set Default</span>
                    </button>
                  )}
                  {typeof address.lat === 'number' && typeof address.lng === 'number' && (
                    <button
                      onClick={() => setExpandedAddress(expandedAddress === address.id ? null : address.id)}
                      className="flex items-center gap-2 px-3 py-2 text-sm bg-muted text-foreground rounded-md hover:bg-muted/80 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
                    >
                      <Icon name="MapIcon" size={14} />
                      <span>View Map</span>
                    </button>
                  )}
                  <button
                    onClick={() => onEditAddress(address.id)}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-muted text-foreground rounded-md hover:bg-muted/80 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
                  >
                    <Icon name="PencilIcon" size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => onDeleteAddress(address.id)}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-destructive/10 text-destructive rounded-md hover:bg-destructive/20 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
                  >
                    <Icon name="TrashIcon" size={14} />
                    <span>Delete</span>
                  </button>
                </div>

                {expandedAddress === address.id && typeof address.lat === 'number' && typeof address.lng === 'number' && (
                  <div className="mt-4 border-t border-border pt-4">
                    <div className="w-full h-48 rounded-md overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        loading="lazy"
                        title={address.label}
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps?q=${address.lat},${address.lng}&z=14&output=embed`}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressBookTab;