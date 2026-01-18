'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

interface PersonalInfoTabProps {
  initialData: PersonalInfo;
  onSave: (data: PersonalInfo) => void;
}

const PersonalInfoTab = ({ initialData, onSave }: PersonalInfoTabProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PersonalInfo>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalInfo, string>>>({});

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PersonalInfo, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.phone.trim() || !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Valid phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialData);
    setErrors({});
    setIsEditing(false);
  };

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg shadow-warm-md p-6 lg:p-8">
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-muted rounded w-24 animate-pulse" />
              <div className="h-10 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-warm-md p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">Personal Information</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/10 rounded-md transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
          >
            <Icon name="PencilIcon" size={16} />
            <span>Edit</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block caption font-medium text-foreground mb-2">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            disabled={!isEditing}
            className={`w-full px-4 py-3 bg-input border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring transition-smooth ${
              errors.firstName ? 'border-destructive' : 'border-border'
            } ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
          />
          {errors.firstName && (
            <p className="caption text-destructive mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block caption font-medium text-foreground mb-2">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            disabled={!isEditing}
            className={`w-full px-4 py-3 bg-input border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring transition-smooth ${
              errors.lastName ? 'border-destructive' : 'border-border'
            } ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
          />
          {errors.lastName && (
            <p className="caption text-destructive mt-1">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block caption font-medium text-foreground mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={!isEditing}
            className={`w-full px-4 py-3 bg-input border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring transition-smooth ${
              errors.email ? 'border-destructive' : 'border-border'
            } ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
          />
          {errors.email && (
            <p className="caption text-destructive mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block caption font-medium text-foreground mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={!isEditing}
            className={`w-full px-4 py-3 bg-input border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring transition-smooth ${
              errors.phone ? 'border-destructive' : 'border-border'
            } ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
          />
          {errors.phone && (
            <p className="caption text-destructive mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block caption font-medium text-foreground mb-2">
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            disabled={!isEditing}
            className={`w-full px-4 py-3 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-3 focus:ring-ring transition-smooth ${
              !isEditing ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          />
        </div>
      </div>

      {isEditing && (
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 sm:flex-none px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 sm:flex-none px-6 py-3 bg-muted text-foreground rounded-md font-medium hover:bg-muted/80 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoTab;