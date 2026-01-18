'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface NotificationPreference {
  id: string;
  title: string;
  description: string;
  email: boolean;
  sms: boolean;
}

interface NotificationPreferencesTabProps {
  preferences: NotificationPreference[];
  onSave: (preferences: NotificationPreference[]) => void;
}

const NotificationPreferencesTab = ({ preferences, onSave }: NotificationPreferencesTabProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [localPreferences, setLocalPreferences] = useState<NotificationPreference[]>(preferences);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const changed = JSON.stringify(localPreferences) !== JSON.stringify(preferences);
    setHasChanges(changed);
  }, [localPreferences, preferences]);

  const handleToggle = (id: string, type: 'email' | 'sms') => {
    setLocalPreferences((prev) =>
      prev.map((pref) =>
        pref.id === id ? { ...pref, [type]: !pref[type] } : pref
      )
    );
  };

  const handleSave = () => {
    onSave(localPreferences);
    setHasChanges(false);
  };

  const handleReset = () => {
    setLocalPreferences(preferences);
    setHasChanges(false);
  };

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg shadow-warm-md p-6 lg:p-8">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-6 bg-muted rounded w-48 mb-2" />
              <div className="h-4 bg-muted rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-warm-md p-6 lg:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
          Notification Preferences
        </h2>
        <p className="text-muted-foreground">
          Choose how you want to receive updates about your orders and promotions
        </p>
      </div>

      <div className="space-y-6">
        {localPreferences.map((pref) => (
          <div key={pref.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
            <div className="mb-4">
              <h3 className="font-medium text-foreground mb-1">{pref.title}</h3>
              <p className="caption text-muted-foreground">{pref.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={pref.email}
                    onChange={() => handleToggle(pref.id, 'email')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted rounded-full peer-checked:bg-primary transition-smooth peer-focus:ring-3 peer-focus:ring-ring peer-focus:ring-offset-2" />
                  <div className="absolute left-1 top-1 w-4 h-4 bg-background rounded-full transition-smooth peer-checked:translate-x-5" />
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="EnvelopeIcon" size={16} className="text-muted-foreground" />
                  <span className="text-foreground">Email</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={pref.sms}
                    onChange={() => handleToggle(pref.id, 'sms')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted rounded-full peer-checked:bg-primary transition-smooth peer-focus:ring-3 peer-focus:ring-ring peer-focus:ring-offset-2" />
                  <div className="absolute left-1 top-1 w-4 h-4 bg-background rounded-full transition-smooth peer-checked:translate-x-5" />
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="DevicePhoneMobileIcon" size={16} className="text-muted-foreground" />
                  <span className="text-foreground">SMS</span>
                </div>
              </label>
            </div>
          </div>
        ))}
      </div>

      {hasChanges && (
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border">
          <button
            onClick={handleSave}
            className="flex-1 sm:flex-none px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
          >
            Save Preferences
          </button>
          <button
            onClick={handleReset}
            className="flex-1 sm:flex-none px-6 py-3 bg-muted text-foreground rounded-md font-medium hover:bg-muted/80 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
          >
            Reset Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationPreferencesTab;