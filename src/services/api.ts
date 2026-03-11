import type { ProductsResponse } from '../types/product';

const API_URL = '/api/v1/products';

export async function fetchProducts(): Promise<ProductsResponse> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return res.json();
}
