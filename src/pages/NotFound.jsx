import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-8xl font-serif font-bold text-gradient">404</p>
        <h1 className="text-2xl font-bold mt-4">Page Not Found</h1>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="flex gap-3 justify-center mt-8">
          <Link to="/"><Button>Go Home</Button></Link>
          <Link to="/shop"><Button variant="secondary">Browse Shop</Button></Link>
        </div>
      </motion.div>
    </div>
  );
}
