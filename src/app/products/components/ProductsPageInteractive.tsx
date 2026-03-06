'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import CategorySidebar from './CategorySidebar';
import ProductFilters from './ProductFilters';
import ProductGrid from './ProductGrid';
import Icon from '@/components/ui/AppIcon';
import { useProducts } from '@/hooks/useProducts';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  category: string | string[];
  subcategory?: string;
  rating: number;
  reviewCount: number;
  description: string;
  tags: string[];
  isNew?: boolean;
  isPopular?: boolean;
  isVegan?: boolean;
  allergens: string[];
}

// Helper function to check if product belongs to category
const belongsToCategory = (product: Product, categoryId: string): boolean => {
  const categories = Array.isArray(product.category) ? product.category : [product.category];
  return categories.some(cat => cat.toLowerCase() === categoryId);
};

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
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4200]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products from database
  const { products: fetchedProducts, isLoading } = useProducts();

  // Convert detailed products to the format expected by products page
  const products: Product[] = useMemo(() => {
    return fetchedProducts.map(product => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0]?.url || '',
        alt: product.name,
        category: product.category,
        subcategory: product.subcategory || (Array.isArray(product.category) ? product.category[0] : product.category),
        rating: product.rating,
        reviewCount: product.reviewCount,
        description: product.description,
        tags: product.tags || ['Vegetarian'],
        isNew: product.isNew || false,
        isPopular: product.isPopular || false,
        isVegan: product.isVegan || false,
        allergens: product.allergens || []
      };
    });
  }, [fetchedProducts]);

  // Dynamic categories based on loaded products
  const categories = useMemo(() => [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'cup cakes', name: 'Cup Cakes', count: products.filter(p => belongsToCategory(p, 'cup cakes')).length },
    { id: 'jar cakes', name: 'Jar Cakes', count: products.filter(p => belongsToCategory(p, 'jar cakes')).length },
    { id: 'pastries', name: 'Pastries', count: products.filter(p => belongsToCategory(p, 'pastries')).length },
    { id: 'cakes', name: 'Cakes', count: products.filter(p => belongsToCategory(p, 'cakes')).length },
    { id: 'cheesecakes', name: 'Cheesecakes', count: products.filter(p => belongsToCategory(p, 'cheesecakes')).length },
    { id: 'brownie', name: 'Brownie', count: products.filter(p => belongsToCategory(p, 'brownie')).length },
    { id: 'cookies', name: 'Cookies', count: products.filter(p => belongsToCategory(p, 'cookies')).length }
  ], [products]);

  // Update selectedCategory when URL parameter changes
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    setSelectedCategory(categoryParam || 'all');
  }, [searchParams]);

  useEffect(() => {
    const searchParam = searchParams.get('search') || '';
    setSearchTerm(searchParam);
  }, [searchParams]);

  // Get all unique tags for filtering
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    products.forEach(product => {
      product.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (normalizedSearch) {
      filtered = filtered.filter(product => {
        const inName = product.name.toLowerCase().includes(normalizedSearch);
        const categories = Array.isArray(product.category) ? product.category : [product.category];
        const inCategory = categories.some(cat => cat.toLowerCase().includes(normalizedSearch));
        const inSubcategory = product.subcategory?.toLowerCase().includes(normalizedSearch);
        const inTags = product.tags.some(tag => tag.toLowerCase().includes(normalizedSearch));
        return inName || inCategory || inSubcategory || inTags;
      });
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        belongsToCategory(product, selectedCategory)
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
  }, [products, selectedCategory, sortBy, priceRange, selectedTags, searchTerm]);

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
          onCategoryChange={(category) => {
            setSelectedCategory(category);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
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
        <ProductGrid products={filteredAndSortedProducts} isLoading={isLoading} />
      </div>
    </div>
  );
}