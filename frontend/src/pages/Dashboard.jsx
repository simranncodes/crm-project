import { useState, useEffect, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { AlertTriangle } from 'lucide-react';
import Sidebar from '../components/Sidebar.jsx';
import StatsCards from '../components/StatsCards.jsx';
import SearchBar from '../components/SearchBar.jsx';
import LeadTable from '../components/LeadTable.jsx';
import Pagination from '../components/ui/Pagination.jsx';
import api from '../api/axios.js';

/**
 * Admin dashboard: statistics, searchable/filterable lead table, and pagination.
 * Debounces the search input to avoid firing a request on every keystroke.
 */
export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [leadsError, setLeadsError] = useState(null);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const leadsRequestId = useRef(0);
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ totalPages: 1 });

  // Debounce search input by 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const { data } = await api.get('/dashboard/stats');
      setStats(data.data);
    } catch (error) {
      toast.error(error.message || 'Failed to load statistics');
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    const requestId = ++leadsRequestId.current;
    setLeadsLoading(true);
    setLeadsError(null);
    try {
      const { data } = await api.get('/leads', {
        params: {
          page,
          limit: 10,
          search: debouncedSearch || undefined,
          status: status !== 'All' ? status : undefined,
        },
      });
      if (requestId !== leadsRequestId.current) return; // stale response
      setLeads(data.data);
      setPagination(data.pagination);
      // If the current page no longer exists (e.g. after filtering), go to the last one
      if (data.pagination.totalPages > 0 && page > data.pagination.totalPages) {
        setPage(data.pagination.totalPages);
      }
    } catch (error) {
      if (requestId !== leadsRequestId.current) return;
      setLeadsError(error.message || 'Failed to load leads');
    } finally {
      if (requestId === leadsRequestId.current) setLeadsLoading(false);
    }
  }, [page, debouncedSearch, status]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleLeadUpdated = (updatedLead) => {
    setLeads((prev) => prev.map((l) => (l._id === updatedLead._id ? updatedLead : l)));
    fetchStats(); // refresh counts since status changed
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-y-auto px-6 py-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Overview of all submitted leads</p>

          <div className="mt-8">
            <StatsCards stats={stats} isLoading={statsLoading} />
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <h2 className="text-lg font-semibold text-slate-900">Leads</h2>
              <div className="w-full sm:w-auto">
                <SearchBar
                  search={search}
                  onSearchChange={setSearch}
                  status={status}
                  onStatusChange={handleStatusChange}
                />
              </div>
            </div>

            {leadsError ? (
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-red-100 bg-red-50 py-12 text-center">
                <AlertTriangle className="h-8 w-8 text-red-400" />
                <p className="text-sm font-medium text-red-600">{leadsError}</p>
              </div>
            ) : (
              <>
                <LeadTable leads={leads} isLoading={leadsLoading} onLeadUpdated={handleLeadUpdated} />
                <Pagination page={page} totalPages={pagination.totalPages} onPageChange={setPage} />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
