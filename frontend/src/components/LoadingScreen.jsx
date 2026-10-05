import { Loader2 } from 'lucide-react';

/**
 * Full-page loading screen, shown while initial auth check is in progress.
 */
export default function LoadingScreen() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 bg-white">
      <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      <p className="text-sm text-slate-500">Loading LeadDesk Mini…</p>
    </div>
  );
}
