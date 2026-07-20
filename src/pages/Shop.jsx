import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  HiAdjustmentsHorizontal,
  HiXMark,
  HiChevronDown,
  HiMagnifyingGlass,
  HiSparkles,
  HiTruck,
  HiArrowRight,
  HiArrowPath,
  HiFunnel,
} from 'react-icons/hi2';
import ProductCard from '../components/product/ProductCard';
import { getCachedProducts, fetchAllProducts, filterProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductGridSkeleton } from '../components/ui/Skeleton';

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured', hint: 'Curated picks' },
  { id: 'newest', label: 'Newest', hint: 'Latest arrival' },
  { id: 'price-low', label: 'Price: Low → High', hint: 'Budget first' },
  { id: 'price-high', label: 'Price: High → Low', hint: 'Premium first' },
  { id: 'rating', label: 'Top Rated', hint: 'Best reviews' },
  { id: 'popularity', label: 'Most Loved', hint: 'Fan favorites' },
];

const PRICE_PRESETS = [
  { value: 50, label: '$50' },
  { value: 200, label: '$200' },
  { value: 500, label: '$500' },
  { value: 1000, label: '$1,000' },
  { value: 2000, label: 'Any' },
];

const MAX_PRICE = 2000;

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(MAX_PRICE);
  const [categoryQuery, setCategoryQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const filterParam = searchParams.get('filter');
  const sortParam = searchParams.get('sort');

  useEffect(() => {
    const cached = getCachedProducts();
    if (cached.length > 0) {
      setProducts(cached);
      setLoading(false);
    } else {
      fetchAllProducts().then(data => {
        setProducts(data);
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    if (sortParam) setSortBy(sortParam);
  }, [sortParam]);

  const counts = useMemo(() => {
    const cat = { All: products.length };
    products.forEach(p => {
      cat[p.category] = (cat[p.category] || 0) + 1;
    });
    return { cat };
  }, [products]);

  const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category))], [products]);

  const visibleCategories = useMemo(() => {
    const q = categoryQuery.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(c => (c === 'All' ? 'all products' : c.replace(/-/g, ' ')).includes(q));
  }, [categories, categoryQuery]);

  const filteredProducts = useMemo(() => {
    let filtered = filterProducts(products, {
      category: selectedCategory,
      sort: sortBy,
      maxPrice: priceRange,
    });
    if (filterParam === 'flash-sale') filtered = filtered.filter(p => p.flashSale);
    return filtered;
  }, [products, selectedCategory, priceRange, sortBy, filterParam]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setPriceRange(MAX_PRICE);
    setSortBy('featured');
    setCategoryQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'All' || priceRange < MAX_PRICE;

  const chips = [];
  if (filterParam === 'flash-sale') chips.push({ label: 'Flash Sale', onClear: null });
  if (selectedCategory !== 'All') chips.push({ label: `Category: ${selectedCategory.replace(/-/g, ' ')}`, onClear: () => setSelectedCategory('All') });
  if (priceRange < MAX_PRICE) chips.push({ label: `Max $${priceRange.toLocaleString()}`, onClear: () => setPriceRange(MAX_PRICE) });

  const ResultsPill = ({ className = '' }) => (
    <div className={`inline-flex items-center gap-2 rounded-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-3.5 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 ${className}`}>
      <span className="font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">{filteredProducts.length}</span>
      {filteredProducts.length === 1 ? 'result' : 'results'}
    </div>
  );

  const FilterSidebar = ({ compact = false, closeMobile }) => (
    <div className={compact ? '' : 'divide-y divide-gray-100 dark:divide-gray-800'}>
      {/* Header */}
      <div className={`flex items-center justify-between gap-3 ${compact ? 'pb-4' : 'px-5 pt-5 pb-4'}`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="p-2 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 shrink-0">
            <HiFunnel size={16} />
          </span>
          <div className="min-w-0">
            <h2 className="text-base font-bold text-gray-900 dark:text-white leading-tight">Filters</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              Showing {filteredProducts.length} of {products.length}
            </p>
          </div>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <HiArrowPath size={13} /> Clear
          </button>
        )}
      </div>

      {/* Categories */}
      <section className={`min-w-0 ${compact ? 'py-4' : 'px-5 py-5'}`} aria-labelledby="category-heading" aria-label="Filter by category">
        <div className="flex items-center justify-between gap-2">
          <h3 id="category-heading" className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
            Category
          </h3>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Show all
            </button>
          )}
        </div>

        {categories.length > 8 && (
          <div className="relative mt-3">
            <HiMagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="search"
              value={categoryQuery}
              onChange={(e) => setCategoryQuery(e.target.value)}
              placeholder="Search categories"
              aria-label="Search categories"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
            />
          </div>
        )}

        <div
          role="radiogroup"
          aria-label="Product category"
          className={`mt-3 space-y-1 pr-1 scrollbar-thin ${categories.length > 6 ? 'max-h-56 overflow-y-auto' : ''}`}
        >
          {visibleCategories.length > 0 ? visibleCategories.map(cat => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                role="radio"
                aria-checked={active}
                onClick={() => { setSelectedCategory(cat); closeMobile?.(); }}
                className={`w-full group flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                  active
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold ring-1 ring-indigo-200 dark:ring-indigo-800/60'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-4 h-4 shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${
                      active
                        ? 'border-indigo-600'
                        : 'border-gray-300 dark:border-gray-600 group-hover:border-indigo-400 dark:group-hover:border-indigo-500'
                    }`}
                  >
                    {active && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                  </span>
                  <span className="truncate capitalize">{cat === 'All' ? 'All Products' : cat.replace(/-/g, ' ')}</span>
                </span>
                <span
                  className={`text-xs font-semibold shrink-0 tabular-nums ${
                    active ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {counts.cat[cat] || 0}
                </span>
              </button>
            );
          }) : (
            <p className="px-3.5 py-2 text-sm text-gray-400">No categories found.</p>
          )}
        </div>
      </section>

      {/* Price */}
      <section className={`min-w-0 ${compact ? 'pt-4' : 'px-5 py-5'}`} aria-labelledby="price-heading" aria-label="Filter by price">
        <div className="flex items-center justify-between gap-2">
          <h3 id="price-heading" className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
            Price
          </h3>
          <span
            className={`text-xs font-bold tabular-nums px-2 py-0.5 rounded-full transition-colors ${
              priceRange < MAX_PRICE
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
            }`}
          >
            {priceRange >= MAX_PRICE ? 'Any price' : `Up to $${priceRange.toLocaleString()}`}
          </span>
        </div>

        <div className="mt-4">
          <input
            type="range"
            min="10"
            max={MAX_PRICE}
            step="10"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            aria-label="Maximum price"
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${((priceRange - 10) / (MAX_PRICE - 10)) * 100}%, #e5e7eb ${((priceRange - 10) / (MAX_PRICE - 10)) * 100}%, #e5e7eb 100%)`,
            }}
          />
          <div className="mt-1.5 flex justify-between text-[10px] font-medium text-gray-400 dark:text-gray-500 tabular-nums">
            <span>$10</span>
            <span>$250</span>
            <span>$500</span>
            <span>$1,000</span>
            <span>$2,000</span>
          </div>
        </div>

        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {PRICE_PRESETS.map(p => {
            const active = priceRange === p.value;
            return (
              <button
                key={p.value}
                onClick={() => setPriceRange(p.value)}
                aria-pressed={active}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  active
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {priceRange < MAX_PRICE && products.length > 0 && (
          <p className="mt-3.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            Covers {Math.round((filteredProducts.length / products.length) * 100)}% of the collection
          </p>
        )}
      </section>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-32 container mx-auto px-4 md:px-8 lg:px-16">
        <ProductGridSkeleton count={12} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero / Header */}
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wide">
            <HiSparkles size={13} /> Full Collection
          </span>
          <h1 className="mt-4 font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            All Products
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Explore every one of our {products.length} curated essentials. Narrow it down, find the perfect piece.
          </p>
        </div>

        {/* Active Filter Chips (above grid) */}
        {chips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 shrink-0">Now showing:</span>
            <div className="flex flex-wrap gap-2">
              {chips.map((c, i) => (
                c.onClear ? (
                  <button
                    key={i}
                    onClick={c.onClear}
                    className="inline-flex items-center gap-1 pl-3 pr-1.5 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
                  >
                    {c.label}
                    <HiXMark size={12} className="opacity-70 group-hover:opacity-100 group-hover:text-red-500" />
                  </button>
                ) : (
                  <span key={i} className="inline-flex items-center gap-1 pl-2 pr-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold shadow-sm shadow-orange-500/20">
                    <HiSparkles size={12} /> {c.label}
                  </span>
                )
              ))}
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors shrink-0"
              >
                Reset all
              </button>
            )}
          </div>
        )}

        {/* Toolbar (Sort + Count + Mobile Filter Button) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-bold text-gray-900 dark:text-white text-lg tabular-nums">{filteredProducts.length}</span>
            <span className="text-gray-500 dark:text-gray-400">
              {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
            {chips.length > 0 && (
              <>
                <span className="text-gray-300 dark:text-gray-700">|</span>
                <span className="text-indigo-500 dark:text-indigo-400 text-xs font-semibold inline-flex items-center gap-1">
                  <HiFunnel size={12} />
                  {chips.length} filter{chips.length !== 1 && 's'} active
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative flex-1 md:flex-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-auto appearance-none pl-4 pr-10 py-2.5 md:py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-medium cursor-pointer focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all hover:border-gray-300 dark:hover:border-gray-700"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <HiChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>

            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 md:py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-semibold text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-700 transition-all relative"
            >
              <HiAdjustmentsHorizontal size={18} className="text-indigo-500" />
              Filters
              {chips.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md shadow-indigo-600/40">
                  {chips.length}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* === Desktop Sidebar === */}
          <aside className="hidden lg:block w-72 flex-shrink-0" aria-label="Product filters">
            <div className="sticky top-28 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
              <FilterSidebar />
            </div>
          </aside>

          {/* === Mobile Drawer === */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Product filters">
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-gray-950 shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-300">
                <div className="sticky top-0 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 px-6 pt-5 pb-4 flex items-center justify-between z-10">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    Filters
                    <ResultsPill />
                  </h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 -mr-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
                    aria-label="Close filters"
                  >
                    <HiXMark size={22} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-5 scrollbar-thin">
                  <FilterSidebar compact closeMobile={() => setMobileFiltersOpen(false)} />
                </div>
                <div className="sticky bottom-0 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 p-4 flex gap-3">
                  <button
                    onClick={clearFilters}
                    className="flex-1 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="flex-[2] py-3 rounded-2xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25"
                  >
                    Show {filteredProducts.length} {filteredProducts.length === 1 ? 'Result' : 'Results'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* === Product Grid === */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} onAddToCart={addToCart} compact />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 rounded-3xl bg-gray-50 dark:bg-gray-900/40 border-2 border-dashed border-gray-200 dark:border-gray-800">
                <div className="w-20 h-20 rounded-full bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center mb-6">
                  <HiMagnifyingGlass size={32} className="text-indigo-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white font-serif">
                  No matches yet
                </h3>
                <p className="mt-2 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-md">
                  Your current filters don&apos;t match any products. Try loosening the price range, picking a different category, or clearing filters.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-2.5">
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25"
                    >
                      Clear all filters
                    </button>
                  )}
                  <button
                    onClick={() => { setSelectedCategory('All'); setCategoryQuery(''); setPriceRange(MAX_PRICE); }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <HiArrowPath size={16} />
                    Broaden my search
                  </button>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  <span>Try:</span>
                  {[
                    { label: 'All Categories', fn: () => setSelectedCategory('All') },
                    { label: 'Max price $2,000', fn: () => setPriceRange(MAX_PRICE) },
                  ].map(tip => (
                    <button
                      key={tip.label}
                      onClick={tip.fn}
                      className="px-2.5 py-1 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {tip.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom CTA after grid */}
            {filteredProducts.length > 0 && filteredProducts.length < products.length && (
              <div className="mt-12 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <HiTruck size={16} className="text-indigo-500" />
                Free shipping over $100 ·&nbsp;
                <button
                  onClick={clearFilters}
                  className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-0.5 hover:underline underline-offset-4 transition-colors"
                >
                  See all {products.length} products <HiArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}