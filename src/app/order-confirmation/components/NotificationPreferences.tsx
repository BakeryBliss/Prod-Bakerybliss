'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

const NotificationPreferences = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);

  useEffect(() => {
    setIsHydrated(true);
    const savedEmailPref = localStorage.getItem('emailNotifications');
    const savedSmsPref = localStorage.getItem('smsNotifications');
    
    if (savedEmailPref !== null) setEmailNotifications(savedEmailPref === 'true');
    if (savedSmsPref !== null) setSmsNotifications(savedSmsPref === 'true');
  }, []);

  const handleEmailToggle = () => {
    const newValue = !emailNotifications;
    setEmailNotifications(newValue);
    if (isHydrated) {
      localStorage.setItem('emailNotifications', String(newValue));
    }
  };

  const handleSmsToggle = () => {
    const newValue = !smsNotifications;
    setSmsNotifications(newValue);
    if (isHydrated) {
      localStorage.setItem('smsNotifications', String(newValue));
    }
  };

  if (!isHydrated) {
    return (
      <div className="bg-card border border-border rounded-md p-6 lg:p-8">
        <div className="h-32 bg-muted animate-pulse rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-md p-6 lg:p-8">
      <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">
        Notification Preferences
      </h2>
      <p className="text-muted-foreground mb-6">
        Choose how you want to receive order updates
      </p>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted rounded-md">
          <div className="flex items-center gap-3">
            <Icon name="EnvelopeIcon" size={24} className="text-primary" />
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="caption text-muted-foreground">Receive updates via email</p>
            </div>
          </div>
          <button
            onClick={handleEmailToggle}
            className={`relative w-14 h-8 rounded-full transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 ${
              emailNotifications ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
            aria-label="Toggle email notifications"
            aria-checked={emailNotifications}
            role="switch"
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-spring ${
                emailNotifications ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></span>
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted rounded-md">
          <div className="flex items-center gap-3">
            <Icon name="DevicePhoneMobileIcon" size={24} className="text-primary" />
            <div>
              <p className="font-medium text-foreground">SMS Notifications</p>
              <p className="caption text-muted-foreground">Receive updates via text message</p>
            </div>
          </div>
          <button
            onClick={handleSmsToggle}
            className={`relative w-14 h-8 rounded-full transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 ${
              smsNotifications ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
            aria-label="Toggle SMS notifications"
            aria-checked={smsNotifications}
            role="switch"
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-spring ${
                smsNotifications ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;