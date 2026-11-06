type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      <span className="text-sm text-slate-600">
        Página {page} de {totalPages}
      </span>
      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Siguiente
      </button>
    </div>
  );
}