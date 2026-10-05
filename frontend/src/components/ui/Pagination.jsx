import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Reusable pagination control used by the leads table.
 */
export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-between gap-4 px-2 py-4" aria-label="Pagination">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-4 w-4" /> Previous
      </button>
      <span className="text-sm text-slate-500">
        Page <span className="font-medium text-slate-800">{page}</span> of{' '}
        <span className="font-medium text-slate-800">{totalPages}</span>
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
