import type { Product } from '../types';
import { ProductCard } from './PorductCard';

type Props = {
  products: Product[];
  onAdd: (p: Product) => void;
};

export function ProductGrid({ products, onAdd }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
}