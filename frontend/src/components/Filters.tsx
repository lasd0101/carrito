type Props = {
  categories: string[];
  category: string;
  q: string;
  onCategoryChange: (c: string) => void;
  onQueryChange: (q: string) => void;
};

export function Filters({ categories, category, q, onCategoryChange, onQueryChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700"
      >
        <option value="">Todas las categorías</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <input
        type="text"
        value={q}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Buscar por nombre…"
        className="flex-1 border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700"
      />
    </div>
  );
}