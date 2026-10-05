import { useForm } from 'react-hook-form';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LayoutDashboard } from 'lucide-react';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Admin login page. Redirects to /dashboard on successful authentication.
 */
export default function Login() {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  if (!loading && isAuthenticated) return <Navigate to="/dashboard" replace />;

  const onSubmit = async ({ email, password }) => {
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      toast.error(error.message || 'Invalid email or password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-soft">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white">
            <LayoutDashboard className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Admin Login</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to manage your leads</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="admin@leaddesk.com"
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/,
                message: 'Please provide a valid email address',
              },
            })}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          <Link to="/" className="font-medium text-primary-600 hover:underline">
            ← Back to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
