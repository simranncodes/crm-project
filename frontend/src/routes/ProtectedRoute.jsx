import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import LoadingScreen from '../components/LoadingScreen.jsx';

/**
 * Guards private routes (e.g. /dashboard). Redirects unauthenticated
 * users to /login, and shows a loading screen while auth status
 * is being determined on initial app load.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
