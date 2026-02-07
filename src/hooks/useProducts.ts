'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Product } from '@/data/products';

interface UseProductsOptions {
  category?: string;
  onlyPopular?: boolean;
  productId?: string;
  limit?: number;
}

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

interface UseSingleProductResult {
  product: Product | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Fetch products from the API
async function fetchProductsFromAPI(): Promise<Product[]> {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

// Custom hook for fetching products
export function useProducts(options: UseProductsOptions = {}): UseProductsResult {
  const { category, onlyPopular, limit } = options;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let fetchedProducts = await fetchProductsFromAPI();

      // Apply filters
      if (category && category !== 'all') {
        fetchedProducts = fetchedProducts.filter((p) => {
          const categories = Array.isArray(p.category) ? p.category : [p.category];
          return categories.some(
            (c) => c.toLowerCase() === category.toLowerCase()
          );
        });
      }

      if (onlyPopular) {
        fetchedProducts = fetchedProducts.filter((p) => p.isPopular);
      }

      if (limit) {
        fetchedProducts = fetchedProducts.slice(0, limit);
      }

      setProducts(fetchedProducts);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [category, onlyPopular, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, isLoading, error, refetch: fetchProducts };
}

// Custom hook for fetching a single product by ID
export function useProduct(productId: string | null): UseSingleProductResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!productId) {
      setProduct(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const fetchedProduct = await response.json();
      setProduct(fetchedProduct);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, isLoading, error, refetch: fetchProduct };
}

// Search products
export function useSearchProducts(query: string): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchProducts = useCallback(async () => {
    if (!query.trim()) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search products');
      }
      const results = await response.json();
      setProducts(results);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    searchProducts();
  }, [searchProducts]);

  return { products, isLoading, error, refetch: searchProducts };
}
