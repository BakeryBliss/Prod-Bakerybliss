'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Ingredient {
  name: string;
  allergen: boolean;
}

interface NutritionInfo {
  servingSize: string;
  calories: number;
  fat: string;
  carbs: string;
  protein: string;
  sugar: string;
}

interface ProductTabsProps {
  description: string;
  ingredients: Ingredient[];
  nutrition: NutritionInfo;
}

const ProductTabs = ({ description, ingredients, nutrition }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'nutrition'>(
    'description'
  );

  const tabs = [
    { id: 'description' as const, label: 'Description', icon: 'DocumentTextIcon' },
    { id: 'ingredients' as const, label: 'Ingredients', icon: 'ListBulletIcon' },
    { id: 'nutrition' as const, label: 'Nutrition', icon: 'ChartBarIcon' },
  ];

  return (
    <div className="bg-card rounded-lg shadow-warm overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-border overflow-x-auto scrollbar-warm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-6 py-4 font-medium transition-smooth focus:outline-none ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={tab.icon as any} size={20} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 lg:p-8">
        {activeTab === 'description' && (
          <div className="space-y-4">
            <h3 className="font-heading text-xl text-foreground">Product Description</h3>
            <p className="text-foreground leading-relaxed">{description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-background rounded-md">
                <Icon name="CheckCircleIcon" size={24} className="text-success flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Premium Quality</p>
                  <p className="caption text-muted-foreground mt-1">
                    Made with finest ingredients
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background rounded-md">
                <Icon name="SparklesIcon" size={24} className="text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Freshly Baked</p>
                  <p className="caption text-muted-foreground mt-1">
                    Prepared daily in our kitchen
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div className="space-y-4">
            <h3 className="font-heading text-xl text-foreground">Ingredients List</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-background rounded-md"
                >
                  <Icon
                    name={ingredient.allergen ? 'ExclamationTriangleIcon' : 'CheckIcon'}
                    size={20}
                    className={ingredient.allergen ? 'text-warning' : 'text-success'}
                  />
                  <span className="text-foreground">{ingredient.name}</span>
                  {ingredient.allergen && (
                    <span className="ml-auto px-2 py-1 bg-warning/10 text-warning rounded caption font-medium">
                      Allergen
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-md">
              <div className="flex items-start gap-3">
                <Icon name="InformationCircleIcon" size={24} className="text-warning flex-shrink-0" />
                <div>
                  <p className="font-medium text-warning">Allergen Information</p>
                  <p className="caption text-foreground mt-1">
                    This product may contain traces of nuts, dairy, eggs, and gluten. Please
                    contact us if you have specific dietary requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div className="space-y-4">
            <h3 className="font-heading text-xl text-foreground">Nutritional Information</h3>
            <p className="caption text-muted-foreground">
              Per serving ({nutrition.servingSize})
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-background rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">Calories</span>
                  <span className="text-2xl font-bold text-primary">{nutrition.calories}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${(nutrition.calories / 2000) * 100}%` }}
                  />
                </div>
                <p className="caption text-muted-foreground mt-1">
                  {((nutrition.calories / 2000) * 100).toFixed(0)}% of daily value
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background rounded-md">
                  <span className="text-foreground">Total Fat</span>
                  <span className="font-bold text-foreground">{nutrition.fat}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background rounded-md">
                  <span className="text-foreground">Carbohydrates</span>
                  <span className="font-bold text-foreground">{nutrition.carbs}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background rounded-md">
                  <span className="text-foreground">Protein</span>
                  <span className="font-bold text-foreground">{nutrition.protein}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background rounded-md">
                  <span className="text-foreground">Sugar</span>
                  <span className="font-bold text-foreground">{nutrition.sugar}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;