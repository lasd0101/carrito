import type { ProductsResponse, User } from './types';

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

export async function fetchUser(): Promise<User> {
  const res = await fetch('/api/users/me');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const body = await res.json();
  return body.data;
}

export async function postReward(action: 'ADD_TO_CART' | 'FAVORITE', productId: string): Promise<{
  pointsAwarded: number;
  user: User;
}> {
  const res = await fetch('/api/rewards', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, productId }),
  });

  if (res.status === 409) {
    const user = await fetchUser();
    return { pointsAwarded: 0, user };
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message ?? `HTTP ${res.status}`);
  }

  const body = await res.json();
  return body.data;
}