import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import ProductCard from '../product/ProductCard';

export default function ProductSection({ title, subtitle, products, link, onAddToCart }) {
  if (!products?.length) return null;
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <h2 className="font-serif text-2xl md:text-4xl font-bold">{title}</h2>
            {subtitle && <p className="mt-2 text-gray-600 dark:text-gray-400">{subtitle}</p>}
          </div>
          {link && (
            <Link to={link} className="hidden sm:flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:gap-2 transition-all">
              View All <HiArrowRight size={16} />
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
        {link && (
          <Link to={link} className="sm:hidden flex items-center justify-center gap-1 mt-8 text-sm font-medium text-indigo-600">
            View All <HiArrowRight size={16} />
          </Link>
        )}
      </div>
    </section>
  );
}
