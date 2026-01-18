'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface ProfileTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const ProfileTabs = ({ tabs, activeTab, onTabChange }: ProfileTabsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg shadow-warm-md p-2">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className="h-12 bg-muted rounded-md flex-1 min-w-[120px] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-warm-md p-2">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-smooth flex-1 min-w-[120px] focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2 ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground shadow-warm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Icon name={tab.icon as any} size={20} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;