import type { Product } from '../types';

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover bg-slate-100"
        loading="lazy"
      />
      <div className="p-4 flex flex-col gap-1 flex-1">
        <span className="text-xs uppercase tracking-wide text-slate-500">
          {product.category}
        </span>
        <h3 className="font-semibold text-slate-800 line-clamp-2">{product.name}</h3>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">
            ${parseInt(product.price)}
          </span>
          <span className="text-xs text-slate-500">stock: {product.stock}</span>
        </div>
      </div>
    </div>
  );
}