import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

/**
 * Catch-all 404 page for unmatched routes.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center">
      <p className="text-7xl font-bold text-primary-600">404</p>
      <h1 className="text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="max-w-sm text-sm text-slate-500">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-medium text-white hover:bg-primary-700"
      >
        <Home className="h-4 w-4" /> Back to homepage
      </Link>
    </div>
  );
}
