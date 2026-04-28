'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface ProfileHeaderProps {
  userData: {
    name: string;
    email: string;
    phone: string;
    memberSince: string;
    loyaltyPoints: number;
    image: string;
    alt: string;
  };
}

const ProfileHeader = ({ userData }: ProfileHeaderProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg shadow-warm-md p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-muted animate-pulse" />
          </div>
          <div className="flex-1 text-center lg:text-left space-y-2">
            <div className="h-8 bg-muted rounded w-48 mx-auto lg:mx-0 animate-pulse" />
            <div className="h-4 bg-muted rounded w-64 mx-auto lg:mx-0 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-warm-md p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-primary/20">
            <AppImage
              src={userData.image}
              alt={userData.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2">
            {userData.name}
          </h1>
          <div className="space-y-1 text-muted-foreground">
            <p className="flex items-center justify-center lg:justify-start gap-2">
              <Icon name="EnvelopeIcon" size={16} />
              <span>{userData.email}</span>
            </p>
            <p className="flex items-center justify-center lg:justify-start gap-2">
              <Icon name="PhoneIcon" size={16} />
              <span>{userData.phone}</span>
            </p>
            <p className="flex items-center justify-center lg:justify-start gap-2 caption">
              <Icon name="CalendarIcon" size={16} />
              <span>Member since {userData.memberSince}</span>
            </p>
          </div>
        </div>

        <div className="bg-primary/10 rounded-lg p-4 text-center min-w-[140px]">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Icon name="StarIcon" size={20} className="text-primary" variant="solid" />
            <span className="text-2xl font-bold text-primary">{userData.loyaltyPoints}</span>
          </div>
          <p className="caption text-muted-foreground">Loyalty Points</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;