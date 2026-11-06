import type { ProductsResponse } from './types';

export async function fetchProducts(params: {
  page: number;
  limit: number;
  category?: string;
  q?: string;
}): Promise<ProductsResponse> {
  const search = new URLSearchParams();
  search.set('page', String(params.page));
  search.set('limit', String(params.limit));
  if (params.category) search.set('category', params.category);
  if (params.q) search.set('q', params.q);

  const res = await fetch(`/api/products?${search}`);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message ?? `HTTP ${res.status}`);
  }
  return res.json();
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch('/api/categories');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const body = await res.json();
  return body.data;
}