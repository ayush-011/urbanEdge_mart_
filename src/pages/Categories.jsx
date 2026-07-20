import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { categories } from '../data/categories';

export default function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-12 md:pb-16">
      <Breadcrumbs items={[{ label: 'Categories' }]} />
      <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">All Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat, i) => (
          <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link to={`/categories/${cat.id}`} className="group block relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="font-serif text-xl font-bold mt-2">{cat.name}</h3>
                <p className="text-sm text-white/70">{cat.count} products</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
