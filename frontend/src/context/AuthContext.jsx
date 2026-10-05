import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api from '../api/axios.js';

const AuthContext = createContext(null);

/**
 * Provides authentication state (current admin, auth status, loading state)
 * to the entire app via Context API, avoiding prop drilling.
 */
export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/me');
      setAdmin(data.data);
      setIsAuthenticated(true);
    } catch {
      setAdmin(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setAdmin(data.data);
    setIsAuthenticated(true);
    return data;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore: even if the server call fails we still end the local session
    } finally {
      setAdmin(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
