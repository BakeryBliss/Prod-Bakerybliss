'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const AccountPromptSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const authToken = localStorage.getItem('authToken');
    setIsLoggedIn(!!authToken);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card border border-border rounded-md p-6 lg:p-8">
        <div className="h-32 bg-muted animate-pulse rounded-md"></div>
      </div>
    );
  }

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-md p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="UserPlusIcon" size={32} className="text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
            Create an Account
          </h2>
          <p className="text-muted-foreground mb-4">
            Save your order history, track deliveries, and enjoy faster checkouts on future orders.
          </p>
          <Link
            href="/customer-profile"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
          >
            <span>Create Account</span>
            <Icon name="ArrowRightIcon" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountPromptSection;