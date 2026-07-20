import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <Link to={`/product/${product.id}`} className="group flex flex-col gap-4 cursor-pointer block">
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-100 dark:bg-gray-800">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          loading="lazy" 
        />
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex justify-center">
          <button 
            className="w-full bg-white text-black px-6 py-3 text-xs uppercase tracking-widest font-medium hover:bg-gray-100 transition-colors"
            onClick={(e) => { e.preventDefault(); dispatch(addToCart(product)); }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="flex justify-between items-start pt-2">
        <h3 className="font-sans text-sm text-gray-900 dark:text-white">{product.name}</h3>
        <p className="font-medium text-sm text-gray-500">${product.price}</p>
      </div>
    </Link>
  );
}
