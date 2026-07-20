import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiEnvelope } from 'react-icons/hi2';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
    addToast('Reset link sent!', 'success');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md text-center">
        <HiEnvelope className="mx-auto text-indigo-600" size={48} />
        <h1 className="text-2xl font-bold mt-6">Forgot Password?</h1>
        <p className="text-gray-500 mt-2">{sent ? 'Check your email for a reset link.' : 'Enter your email and we\'ll send you a reset link.'}</p>
        {!sent ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            <Button type="submit" loading={loading} className="w-full">Send Reset Link</Button>
          </form>
        ) : (
          <Link to="/login"><Button className="mt-8">Back to Login</Button></Link>
        )}
        <Link to="/login" className="block mt-4 text-sm text-indigo-600 hover:underline">Back to Sign In</Link>
      </motion.div>
    </div>
  );
}