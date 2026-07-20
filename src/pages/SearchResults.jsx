import { useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import ProductCard from '../components/product/ProductCard';
import { getCachedProducts, fetchAllProducts, filterProducts } from '../data/products';
import { useCart } from '../context/CartContext';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
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

  const results = useMemo(() => filterProducts(products, { search: query, sort: 'popularity' }), [products, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-12 md:pb-16">
      <Breadcrumbs items={[{ label: 'Search' }, { label: query || 'All' }]} />
      <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
        {query ? `Results for "${query}"` : 'Search Products'}
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{results.length} products found</p>

      {results.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-gray-500 dark:text-gray-400">No products found for &ldquo;{query}&rdquo;</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Try different keywords or browse our categories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
          {results.map((p) => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
        </div>
      )}
    </div>
  );
}