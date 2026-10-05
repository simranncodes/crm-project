import { Search } from 'lucide-react';

const statusOptions = ['All', 'New', 'Contacted', 'Closed'];

/**
 * Search bar + status filter dropdown for the leads table.
 * Debouncing of the search input is handled by the parent (Dashboard page).
 */
export default function SearchBar({ search, onSearchChange, status, onStatusChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or email…"
          className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          aria-label="Search leads"
        />
      </div>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        aria-label="Filter by status"
      >
        {statusOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt === 'All' ? 'All Statuses' : opt}
          </option>
        ))}
      </select>
    </div>
  );
}
