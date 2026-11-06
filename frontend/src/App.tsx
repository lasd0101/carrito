import { useEffect, useState } from 'react';
import { fetchCategories, fetchProducts, fetchUser, postReward } from './api';
import type { Product, Pagination as Pag, User, CartItem } from './types';
import { Filters } from './components/Filters';
import { ProductGrid } from './components/ProductGrid';
import { Pagination } from './components/Pagination';
import { PointsBadge } from './components/PointsBadge';
import { CartButton } from './components/CartButton';
import { CartDrawer } from './components/CartDrawer';

const LIMIT = 8;

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pag | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
    fetchUser().then(setUser).catch(() => {});
  }, []);

  useEffect(() => {
    setStatus('loading');
    const controller = new AbortController();
    fetchProducts({ page, limit: LIMIT, category: category || undefined, q: q || undefined })
      .then((res) => {
        setProducts(res.data);
        setPagination(res.pagination);
        setStatus('ready');
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setErrorMsg(err.message);
        setStatus('error');
      });
    return () => controller.abort();
  }, [page, category, q]);

  const handleCategory = (c: string) => { setCategory(c); setPage(1); };
  const handleQuery = (v: string) => { setQ(v); setPage(1); };

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    postReward('ADD_TO_CART', product.id)
      .then(({ user }) => setUser(user))
      .catch(() => {});
  }

  function removeFromCart(productId: string) {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  }

  function setQuantity(productId: string, quantity: number) {
    if (quantity <= 0) return removeFromCart(productId);
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    );
  }

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-slate-800">Mi Carrito</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">
              {user?.name ?? '—'}
            </span>
            <PointsBadge points={user?.points ?? null} />
            <CartButton count={cartCount} onClick={() => setCartOpen(true)} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Filters
          categories={categories}
          category={category}
          q={q}
          onCategoryChange={handleCategory}
          onQueryChange={handleQuery}
        />

        {status === 'loading' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <div key={i} className="h-64 bg-slate-200 rounded-lg animate-pulse" />
            ))}
          </div>
        )}

        {status === 'error' && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-3">Error al cargar productos: {errorMsg}</p>
            <button
              onClick={() => setPage((p) => p)}
              className="px-4 py-2 bg-slate-800 text-white rounded-lg"
            >
              Reintentar
            </button>
          </div>
        )}

        {status === 'ready' && products.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No hay productos que coincidan con los filtros.
          </div>
        )}

        {status === 'ready' && products.length > 0 && (
          <>
            <ProductGrid products={products} onAdd={addToCart} />
            {pagination && (
              <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onChange={setPage}
              />
            )}
          </>
        )}
      </main>

      <CartDrawer
        open={cartOpen}
        items={cart}
        total={cartTotal}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onQuantity={setQuantity}
      />
    </div>
  );
}