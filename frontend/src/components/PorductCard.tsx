import type { Product } from '../types';

type Props = {
  product: Product;
  onAdd: (p: Product) => void;
};

export function ProductCard({ product, onAdd }: Props) {
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
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-slate-900">
            ${parseInt(product.price)}
          </span>
          <span className="text-xs text-slate-500">stock: {product.stock}</span>
        </div>
        <button
          onClick={() => onAdd(product)}
          disabled={product.stock === 0}
          className="mt-2 w-full py-2 rounded-lg bg-slate-800 text-white text-sm hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}