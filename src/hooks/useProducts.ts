import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Product, SortOption } from '../types/product';
import { fetchProducts } from '../services/api';

const ITEMS_PER_PAGE = 12;

interface UseProductsReturn {
  products: Product[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  query: string;
  sort: SortOption;
  page: number;
  totalPages: number;
  setQuery: (q: string) => void;
  setSort: (s: SortOption) => void;
  setPage: (p: number) => void;
}

function sortProducts(items: Product[], sort: SortOption): Product[] {
  const sorted = [...items];

  switch (sort) {
    case 'popularity':
      return sorted.sort((a, b) => b.reviews_count - a.reviews_count);
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

export function useProducts(): UseProductsReturn {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortOption>('popularity');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    fetchProducts()
      .then((res) => {
        if (!cancelled) {
          setAllProducts(res.data.products);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return allProducts;
    const q = query.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [allProducts, query]);

  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));

  const currentPage = Math.min(page, totalPages);

  const products = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sorted.slice(start, start + ITEMS_PER_PAGE);
  }, [sorted, currentPage]);

  const handleSetQuery = useCallback((q: string) => {
    setQuery(q);
    setPage(1);
  }, []);

  const handleSetSort = useCallback((s: SortOption) => {
    setSort(s);
    setPage(1);
  }, []);

  return {
    products,
    totalCount: sorted.length,
    loading,
    error,
    query,
    sort,
    page: currentPage,
    totalPages,
    setQuery: handleSetQuery,
    setSort: handleSetSort,
    setPage,
  };
}
