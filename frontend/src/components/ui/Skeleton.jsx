/**
 * Generic skeleton loader block. Used to build skeleton rows for the leads table
 * and skeleton placeholders for the stats cards while data is fetching.
 */
export default function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-slate-200 ${className}`} />;
}

export function TableSkeleton({ rows = 5, cols = 6 }) {
  return (
    <div className="w-full">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4 border-b border-slate-100 px-4 py-4">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
