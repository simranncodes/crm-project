import { Users, Sparkles, PhoneCall, CheckCircle2 } from 'lucide-react';
import Skeleton from './ui/Skeleton.jsx';

const cardConfig = [
  { key: 'total', label: 'Total Leads', icon: Users, color: 'bg-primary-50 text-primary-600' },
  { key: 'new', label: 'New Leads', icon: Sparkles, color: 'bg-blue-50 text-blue-600' },
  { key: 'contacted', label: 'Contacted', icon: PhoneCall, color: 'bg-amber-50 text-amber-600' },
  { key: 'closed', label: 'Closed', icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
];

/**
 * Statistic cards shown at the top of the admin dashboard.
 */
export default function StatsCards({ stats, isLoading }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cardConfig.map(({ key, label, icon: Icon, color }) => (
        <div key={key} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{label}</p>
              {isLoading ? (
                <Skeleton className="mt-2 h-7 w-14" />
              ) : (
                <p className="mt-1 text-2xl font-bold text-slate-900">{stats?.[key] ?? 0}</p>
              )}
            </div>
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
