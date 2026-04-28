'use client';

import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProductFiltersProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  allTags: string[];
  totalProducts: number;
}

export default function ProductFilters({
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  selectedTags,
  onTagToggle,
  allTags,
  totalProducts
}: ProductFiltersProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [minPriceInput, setMinPriceInput] = useState(priceRange[0].toString());
  const [maxPriceInput, setMaxPriceInput] = useState(priceRange[1].toString());
  const resetMinTimeout = useRef<NodeJS.Timeout>();
  const resetMaxTimeout = useRef<NodeJS.Timeout>();

  // Sync input values when priceRange changes externally
  useEffect(() => {
    setMinPriceInput(priceRange[0].toString());
  }, [priceRange[0]]);

  useEffect(() => {
    setMaxPriceInput(priceRange[1].toString());
  }, [priceRange[1]]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (resetMinTimeout.current) clearTimeout(resetMinTimeout.current);
      if (resetMaxTimeout.current) clearTimeout(resetMaxTimeout.current);
    };
  }, []);

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price-low', label: 'Price (Low to High)' },
    { value: 'price-high', label: 'Price (High to Low)' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...priceRange];
    newRange[index] = value;

    // Ensure min doesn't exceed max
    if (index === 0 && value > newRange[1]) {
      newRange[1] = value;
    } else if (index === 1 && value < newRange[0]) {
      newRange[0] = value;
    }

    onPriceRangeChange(newRange);
  };

  return (
    <div className="bg-card rounded-lg shadow-warm-sm p-6 mb-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-foreground">
            Our Products
          </h2>
          <p className="text-muted-foreground mt-1">
            Showing {totalProducts} product{totalProducts !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium text-foreground">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 border border-border rounded-md bg-card text-foreground shadow-warm-sm hover:shadow-warm-md transition-all focus:outline-none focus:ring-3 focus:ring-ring focus:border-primary cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-foreground">
            Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
          </label>
          <button
            onClick={() => onPriceRangeChange([0, 4200])}
            className="text-xs text-primary hover:text-primary/80 transition-colors"
          >
            Reset
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="min-price" className="block text-xs text-muted-foreground mb-1">
              Min Price (₹)
            </label>
            <input
              id="min-price"
              type="number"
              min="0"
              max="4200"
              value={minPriceInput}
              onChange={(e) => {
                const value = e.target.value;
                setMinPriceInput(value);

                // Clear any existing timeout
                if (resetMinTimeout.current) clearTimeout(resetMinTimeout.current);

                if (value !== '') {
                  const parsed = parseInt(value);
                  if (!isNaN(parsed)) {
                    handlePriceChange(0, parsed);
                  } else if (value === '0') {
                    // Allow 0 temporarily, reset after 3 seconds if not changed
                    resetMinTimeout.current = setTimeout(() => {
                      setMinPriceInput(priceRange[0].toString());
                    }, 3000);
                  }
                }
              }}
              className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground shadow-warm-sm focus:outline-none focus:ring-3 focus:ring-ring focus:border-primary transition-all"
            />
          </div>
          <div>
            <label htmlFor="max-price" className="block text-xs text-muted-foreground mb-1">
              Max Price (₹)
            </label>
            <input
              id="max-price"
              type="number"
              min="0"
              max="4200"
              value={maxPriceInput}
              onChange={(e) => {
                const value = e.target.value;
                setMaxPriceInput(value);

                // Clear any existing timeout
                if (resetMaxTimeout.current) clearTimeout(resetMaxTimeout.current);

                if (value !== '') {
                  const parsed = parseInt(value);
                  if (!isNaN(parsed)) {
                    handlePriceChange(1, parsed);
                  } else if (value === '0') {
                    // Allow 0 temporarily, reset after 3 seconds if not changed
                    resetMaxTimeout.current = setTimeout(() => {
                      setMaxPriceInput(priceRange[1].toString());
                    }, 3000);
                  }
                }
              }}
              className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground shadow-warm-sm focus:outline-none focus:ring-3 focus:ring-ring focus:border-primary transition-all"
            />
          </div>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="mb-4">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          <Icon
            name={showAdvancedFilters ? 'ChevronUpIcon' : 'ChevronDownIcon'}
            size={16}
          />
          Advanced Filters
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Dietary Preferences</h4>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-border hover:border-primary'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {selectedTags.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {selectedTags.length} filter{selectedTags.length !== 1 ? 's' : ''} applied
              </span>
              <button
                onClick={() => selectedTags.forEach(tag => onTagToggle(tag))}
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}

      {/* Active Filters Summary */}
      {(selectedTags.length > 0 || priceRange[0] > 0 || priceRange[1] < 50) && (
        <div className="mt-4 p-3 bg-muted/50 rounded-md">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="FunnelIcon" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Active Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {priceRange[0] > 0 && (
              <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                Min: ₹{priceRange[0]}
              </span>
            )}
            {priceRange[1] < 4200 && (
              <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                Max: ₹{priceRange[1]}
              </span>
            )}
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full flex items-center gap-1"
              >
                {tag}
                <button
                  onClick={() => onTagToggle(tag)}
                  className="hover:text-primary/80"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}