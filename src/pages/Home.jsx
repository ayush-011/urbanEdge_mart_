import React, { useState, useEffect } from 'react';
import { getCachedProducts, fetchAllProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import HeroBanner from '../components/home/HeroBanner';
import CategoryGrid from '../components/home/CategoryGrid';
import ProductSection from '../components/home/ProductSection';
import BrandLogos from '../components/home/BrandLogos';
import CustomerReviews from '../components/home/CustomerReviews';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const cached = getCachedProducts();
    if (cached.length > 0) {
      setProducts(cached);
    } else {
      fetchAllProducts().then(setProducts);
    }
  }, []);

  const featuredProducts = products.filter(p => p.featured).slice(0, 8);
  const newProducts = products.filter(p => p.isNew).slice(0, 8);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 8);

  return (
    <div>
      <HeroBanner />
      <BrandLogos />
      <ProductSection 
        title="Featured Products" 
        subtitle="Handpicked favorites for you"
        products={featuredProducts}
        link="/shop"
        onAddToCart={addToCart}
      />
      <CategoryGrid />
      <ProductSection 
        title="New Arrivals" 
        subtitle="Fresh from the collection"
        products={newProducts}
        link="/shop?sort=newest"
        onAddToCart={addToCart}
      />
      <ProductSection 
        title="Best Sellers" 
        subtitle="Most popular products"
        products={bestSellers}
        link="/shop?sort=popularity"
        onAddToCart={addToCart}
      />
      <CustomerReviews />
    </div>
  );
}