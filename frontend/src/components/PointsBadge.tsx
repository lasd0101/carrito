export function PointsBadge({ points }: { points: number | null }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200">
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-wide text-amber-700">Puntos</span>
        <span className="text-sm font-bold text-amber-900 tabular-nums">
          {points === null ? '—' : points}
        </span>
      </div>
    </div>
  );
}