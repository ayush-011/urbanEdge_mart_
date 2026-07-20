import { useState } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const { login, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/profile';

  if (isAuthenticated) return <Navigate to={from} replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = 'Enter a valid email address';
    if (!password) errs.password = 'Password is required';
    setFieldErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      addToast('Welcome back!', 'success');
      navigate(from);
    } else {
      addToast(result.error, 'error');
    }
  };

  return (
    <AuthLayout
      heading="Welcome back"
      subtitle="Sign in to continue to UrbanEdge Mart"
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-teal-600 dark:text-teal-400 hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
          placeholder="you@example.com"
          autoComplete="email"
          required
          focusColor="teal"
        />
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            focusColor="teal"
            className="pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className={`absolute right-3.5 top-[2.35rem] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors ${fieldErrors.password ? '-translate-y-4' : ''}`}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <HiEyeSlash size={18} /> : <HiEye size={18} />}
          </button>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-teal-600 focus:ring-teal-500 dark:bg-gray-800 dark:text-teal-500" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-sm text-teal-600 dark:text-teal-400 hover:underline">Forgot password?</Link>
        </div>

        <Button type="submit" variant="accent" loading={loading} className="w-full py-3">Sign In</Button>

        <p className="text-center text-[11px] text-gray-400 dark:text-gray-500">
          Demo build — any email with a 6+ character password works
        </p>
      </form>
    </AuthLayout>
  );
}