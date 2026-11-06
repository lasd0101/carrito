import type { CartItem } from '../types';

type Props = {
  open: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onRemove: (id: string) => void;
  onQuantity: (id: string, qty: number) => void;
};

export function CartDrawer({ open, items, total, onClose, onRemove, onQuantity }: Props) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} aria-hidden />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="p-4 border-b flex items-center justify-between">
          <h2 className="font-bold text-lg">Carrito ({items.length})</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 text-2xl leading-none">
            &times;
          </button>
        </header>

        {items.length === 0 ? (
          <p className="p-6 text-center text-slate-500">El carrito está vacío</p>
        ) : (
          <div className="flex flex-col" style={{ height: 'calc(100% - 3.75rem)' }}>
            <ul className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3 items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded object-cover bg-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-slate-500">${parseInt(product.price)}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onQuantity(product.id, quantity - 1)}
                      className="w-7 h-7 rounded border border-slate-300 text-sm"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm">{quantity}</span>
                    <button
                      onClick={() => onQuantity(product.id, quantity + 1)}
                      className="w-7 h-7 rounded border border-slate-300 text-sm"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => onRemove(product.id)}
                    className="text-red-600 text-sm px-1"
                    aria-label="Quitar"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <footer className="p-4 border-t bg-slate-50">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </footer>
          </div>
        )}
      </aside>
    </>
  );
}