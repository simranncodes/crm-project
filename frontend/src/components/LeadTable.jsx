import { useState } from 'react';
import toast from 'react-hot-toast';
import { Inbox } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';
import { TableSkeleton } from './ui/Skeleton.jsx';
import api from '../api/axios.js';

const statusOptions = ['New', 'Contacted', 'Closed'];

/**
 * Responsive, sortable table of leads with an inline status-update dropdown.
 * Handles its own loading, empty, and error states.
 */
export default function LeadTable({ leads, isLoading, onLeadUpdated }) {
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusChange = async (leadId, newStatus) => {
    setUpdatingId(leadId);
    try {
      const { data } = await api.patch(`/leads/${leadId}`, { status: newStatus });
      toast.success('Lead status updated');
      onLeadUpdated(data.data);
    } catch (error) {
      toast.error(error.message || 'Failed to update lead status');
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft">
        <TableSkeleton />
      </div>
    );
  }

  if (!leads || leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-white py-16 shadow-soft">
        <Inbox className="h-10 w-10 text-slate-300" />
        <p className="text-sm font-medium text-slate-500">No leads found</p>
        <p className="text-xs text-slate-400">Try adjusting your search or filter.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-soft">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
            <th className="px-5 py-3 font-medium">Name</th>
            <th className="px-5 py-3 font-medium">Email</th>
            <th className="px-5 py-3 font-medium">Phone</th>
            <th className="px-5 py-3 font-medium">Budget</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Submitted</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
              <td className="px-5 py-4 font-medium text-slate-800">{lead.name}</td>
              <td className="px-5 py-4 text-slate-600">{lead.email}</td>
              <td className="px-5 py-4 text-slate-600">{lead.PhoneNo}</td>
              <td className="px-5 py-4 text-slate-600">{lead.budget}</td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <StatusBadge status={lead.status} />
                  <select
                    value={lead.status}
                    disabled={updatingId === lead._id}
                    onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                    className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                    aria-label={`Update status for ${lead.name}`}
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
              <td className="px-5 py-4 text-slate-500">
                {new Date(lead.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
