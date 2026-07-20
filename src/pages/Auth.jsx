import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, register, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/profile" replace />;

  const handleToggle = () => {
    setIsLogin((v) => !v);
    setErrors({});
    setForm({ name: '', email: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    const cleanEmail = form.email.trim();
    if (!form.name.trim() && !isLogin) errs.name = 'Required';
    if (!cleanEmail) errs.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Required';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const result = isLogin ? login(form.email, form.password) : register(form);
    setLoading(false);

    if (result.success) {
      addToast(isLogin ? 'Welcome back!' : 'Account created! Welcome to UrbanEdge Mart.', 'success');
      navigate('/profile');
    } else {
      addToast(result.error, 'error');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-32 flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="w-full max-w-md bg-white dark:bg-black p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-900 rounded-2xl">
          <Link to="/" className="font-serif text-3xl text-center block mb-2">UrbanEdge Mart</Link>
          <h1 className="font-serif text-3xl mb-2 text-center">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-center text-gray-500 mb-8">{isLogin ? 'Enter your details to access your account.' : 'Join UrbanEdge Mart for an exclusive experience.'}</p>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
            {!isLogin && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium uppercase tracking-widest text-gray-500">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border-b border-gray-300 dark:border-gray-700 bg-transparent p-2 outline-none focus:border-black dark:focus:border-white transition-colors"
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium uppercase tracking-widest text-gray-500">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border-b border-gray-300 dark:border-gray-700 bg-transparent p-2 outline-none focus:border-black dark:focus:border-white transition-colors"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium uppercase tracking-widest text-gray-500">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="border-b border-gray-300 dark:border-gray-700 bg-transparent p-2 outline-none focus:border-black dark:focus:border-white transition-colors"
              />
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-xs text-gray-500 hover:text-black dark:hover:text-white cursor-pointer uppercase tracking-widest transition-colors">Forgot Password?</Link>
              </div>
            )}

            <Button type="submit" loading={loading} className="w-full mt-4">{isLogin ? 'Sign In' : 'Sign Up'}</Button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={handleToggle} className="text-black dark:text-white font-medium uppercase tracking-widest hover:underline ml-2">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}