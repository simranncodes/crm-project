import axios from 'axios';

/**
 * Centralized Axios instance.
 * - baseURL comes from VITE_API_URL so it works across environments.
 * - withCredentials ensures the httpOnly JWT cookie is sent on every request.
 * - Response interceptor normalizes errors so components can rely on
 *   `error.message` without repeating axios-specific unwrapping logic.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';

    error.message = message;
    return Promise.reject(error);
  }
);

export default api;
