'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import ContactUsDialog from '@/components/ui/ContactUsDialog';

interface Category {
  id: string;
  name: string;
  count: number;
}

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategorySidebar({
  categories,
  selectedCategory,
  onCategoryChange
}: CategorySidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  return (
    <div className={`bg-card rounded-lg shadow-warm-sm sticky top-24 z-10 ${
      isCollapsed ? 'w-16 p-3' : 'w-full lg:w-64 p-6'
    } transition-all duration-300`}>
      {/* Header */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center mb-4' : 'justify-between mb-6'}`}>
        {!isCollapsed && (
          <h3 className="font-heading font-semibold text-foreground">
            Categories
          </h3>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`rounded-md hover:bg-muted transition-colors flex-shrink-0 ${
            isCollapsed ? 'p-2 w-full flex justify-center' : 'p-2'
          }`}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon
            name={isCollapsed ? 'ChevronRightIcon' : 'ChevronLeftIcon'}
            size={16}
            className="text-foreground"
          />
        </button>
      </div>

      {/* Categories List */}
      <div className={`space-y-2 ${isCollapsed ? 'hidden' : ''}`}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 flex items-center justify-between group ${
              selectedCategory === category.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'hover:bg-muted text-foreground'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon
                name={
                  category.id === 'all' ? 'Squares2X2Icon' :
                  category.id === 'breads' ? 'CubeIcon' :
                  category.id === 'pastries' ? 'HeartIcon' :
                  category.id === 'cakes' ? 'GiftIcon' :
                  category.id === 'cookies' ? 'RectangleStackIcon' :
                  'TagIcon'
                }
                size={20}
                className={selectedCategory === category.id ? 'text-primary-foreground' : 'text-muted-foreground'}
              />
              <span className="font-medium">{category.name}</span>
            </div>
            <span className={`text-sm px-2 py-1 rounded-full ${
              selectedCategory === category.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Collapsed State Icons */}
      {isCollapsed && (
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={`collapsed-${category.id}`}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full flex justify-center items-center p-3 rounded-md transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-foreground'
              }`}
              title={category.name}
            >
              <Icon
                name={
                  category.id === 'all' ? 'Squares2X2Icon' :
                  category.id === 'breads' ? 'CubeIcon' :
                  category.id === 'pastries' ? 'HeartIcon' :
                  category.id === 'cakes' ? 'GiftIcon' :
                  category.id === 'cookies' ? 'RectangleStackIcon' :
                  'TagIcon'
                }
                size={24}
                className={
                  selectedCategory === category.id
                    ? 'text-primary-foreground'
                    : 'text-foreground opacity-80'
                }
              />
            </button>
          ))}
        </div>
      )}

      {/* Special Tags */}
      <div className={`mt-8 pt-6 border-t border-border ${isCollapsed ? 'hidden' : ''}`}>
        <h4 className="font-medium text-foreground mb-3">Special</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>New Arrivals</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Popular</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Vegan</span>
          </div>
        </div>
      </div>


      {/* Help Section */}
      <div className={`mt-8 pt-6 border-t border-border ${isCollapsed ? 'hidden' : ''}`}>
        <div className="bg-muted/50 p-4 rounded-md">
          <h5 className="font-medium text-foreground mb-2">Need Help?</h5>
          <p className="text-sm text-muted-foreground mb-3">
            Can't find what you're looking for?
          </p>
          <button 
            onClick={() => setIsContactDialogOpen(true)}
            className="w-full px-3 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </button>
        </div>
      </div>

      <ContactUsDialog
        isOpen={isContactDialogOpen}
        onClose={() => setIsContactDialogOpen(false)}
      />
    </div>
  );
}