import { useMemo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import ProductCard from '../components/product/ProductCard';
import { getCachedProducts, fetchAllProducts, filterProducts } from '../data/products';
import { getCategoryById } from '../data/categories';
import { useCart } from '../context/CartContext';

export default function CategoryDetail() {
  const { categoryId } = useParams();
  const category = getCategoryById(categoryId);
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cached = getCachedProducts();
    if (cached.length > 0) {
      setProducts(cached);
    } else {
      fetchAllProducts().then(setProducts);
    }
  }, []);

  const filtered = useMemo(() => filterProducts(products, { category: categoryId, sort: 'popularity' }), [products, categoryId]);

  if (!category) {
    return <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-28 pb-12 text-center"><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Category not found</h1></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-12 md:pb-16">
      <Breadcrumbs items={[{ label: 'Categories', href: '/categories' }, { label: category.name }]} />
      <div className="relative rounded-2xl overflow-hidden h-48 md:h-64 mb-10">
        <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
          <div className="p-8 text-white">
            <span className="text-4xl">{category.icon}</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mt-2">{category.name}</h1>
            <p className="text-white/70 mt-1">{filtered.length} products</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filtered.map((p) => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
      </div>
    </div>
  );
}