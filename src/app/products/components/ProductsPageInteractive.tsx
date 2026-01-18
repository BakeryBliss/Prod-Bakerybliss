'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import CategorySidebar from './CategorySidebar';
import ProductFilters from './ProductFilters';
import ProductGrid from './ProductGrid';
import Icon from '@/components/ui/AppIcon';
import { sampleProducts, type Product } from '@/data/products';


const categories = [
  { id: 'all', name: 'All Products', count: sampleProducts.length },
  { id: 'jar cake', name: 'Jar Cake', count: sampleProducts.filter(p => p.category === 'Jar Cake').length },
  { id: 'pastries', name: 'Pastries', count: sampleProducts.filter(p => p.category === 'Pastries').length },
  { id: 'cakes', name: 'Cakes', count: sampleProducts.filter(p => p.category === 'Cakes').length },
  { id: 'cookies', name: 'Cookies', count: sampleProducts.filter(p => p.category === 'Cookies').length }
];

const sortOptions = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'price-low', label: 'Price (Low to High)' },
  { value: 'price-high', label: 'Price (High to Low)' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' }
];

export default function ProductsPageInteractive() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4200]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique tags for filtering
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    sampleProducts.forEach(product => {
      product.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = sampleProducts;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(product =>
        selectedTags.some(tag => product.tags.includes(tag))
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          // For demo, sort by ID (assuming higher ID = newer)
          return parseInt(b.id) - parseInt(a.id);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [selectedCategory, sortBy, priceRange, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <Icon name="FunnelIcon" size={20} />
          Filters
        </button>
      </div>

      {/* Sidebar */}
      <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Filters */}
        <ProductFilters
          sortBy={sortBy}
          onSortChange={setSortBy}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          allTags={allTags}
          totalProducts={filteredAndSortedProducts.length}
        />

        {/* Product Grid */}
        <ProductGrid products={filteredAndSortedProducts} />
      </div>
    </div>
  );
}