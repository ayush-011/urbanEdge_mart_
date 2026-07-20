import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { HiEye, HiEyeSlash, HiCheckCircle } from 'react-icons/hi2';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/profile" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please enter your name';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Enter a valid email address';
    if (form.password.length < 6) errs.password = 'Min 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = register(form);
    setLoading(false);
    if (result.success) {
      addToast('Account created! Welcome to UrbanEdge Mart.', 'success');
      navigate('/profile');
    } else {
      addToast(result.error, 'error');
    }
  };

  const passwordChecks = [
    { ok: form.password.length >= 6, label: '6+ characters' },
    { ok: /[A-Z]/.test(form.password), label: '1 uppercase' },
    { ok: /\d/.test(form.password), label: '1 number' },
  ];

  const passwordStrength = form.password.length === 0
    ? { label: '', color: 'bg-gray-200 dark:bg-gray-700' }
    : form.password.length < 6
      ? { label: 'Too short', color: 'bg-red-500' }
      : form.password.length < 10
        ? { label: 'Okay', color: 'bg-amber-500' }
        : { label: 'Strong', color: 'bg-emerald-500' };

  return (
    <AuthLayout
      heading="Create your account"
      subtitle="It takes less than a minute"
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-teal-600 dark:text-teal-400 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Input
          label="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
          placeholder="Alex Johnson"
          autoComplete="name"
          required
          focusColor="teal"
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
          required
          focusColor="teal"
        />
        <div>
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
              placeholder="Min 6 characters"
              autoComplete="new-password"
              required
              focusColor="teal"
              className="pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className={`absolute right-3.5 top-[2.35rem] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors ${errors.password ? '-translate-y-4' : ''}`}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <HiEyeSlash size={18} /> : <HiEye size={18} />}
            </button>
          </div>
          {form.password.length > 0 && (
            <div className="mt-3">
              <div className="flex items-center gap-2">
                <span className={`h-1.5 flex-1 rounded-full transition-colors ${passwordStrength.color}`} />
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{passwordStrength.label}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                {passwordChecks.map((c) => (
                  <span
                    key={c.label}
                    className={`inline-flex items-center gap-1 text-[11px] font-medium transition-colors ${c.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}`}
                  >
                    <HiCheckCircle size={12} className={c.ok ? '' : 'opacity-30'} /> {c.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <Input
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          required
          focusColor="teal"
        />
        <Button type="submit" variant="accent" loading={loading} className="w-full py-3">Create Account</Button>
        <p className="text-[11px] leading-relaxed text-center text-gray-400 dark:text-gray-500">
          By creating an account you agree to our{' '}
          <Link to="/terms" className="underline underline-offset-2 hover:text-teal-600 dark:hover:text-teal-400">Terms</Link>{' '}
          and{' '}
          <Link to="/privacy" className="underline underline-offset-2 hover:text-teal-600 dark:hover:text-teal-400">Privacy Policy</Link>
        </p>
      </form>
    </AuthLayout>
  );
}