import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiStar, FiMinus, FiPlus, FiHeart, FiShare2 } from 'react-icons/fi';
import { addToCart } from '../store/cartSlice';
import { getProductById, getCachedProducts, fetchAllProducts } from '../data/products';
import Button from '../components/ui/Button';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const cached = getCachedProducts();
    if (cached.length > 0) {
      setProduct(getProductById(id));
    } else {
      fetchAllProducts().then(() => setProduct(getProductById(id)));
    }
  }, [id]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <div className="min-h-screen pt-24 pb-32 container mx-auto px-4 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-24">
        <div className="flex flex-col gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 aspect-[3/4] overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover cursor-zoom-in hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(0, 4).map((img, i) => (
              <div key={i} className="aspect-square bg-gray-100 dark:bg-gray-800 cursor-pointer border border-transparent hover:border-black dark:hover:border-white transition-colors">
                <img src={img} alt="thumbnail" className="w-full h-full object-cover opacity-70 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-start pt-8">
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">{product.brand}</p>
          <h1 className="font-serif text-4xl lg:text-5xl mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
            <p className="text-2xl font-medium">${product.price}</p>
            <div className="flex items-center gap-1 text-yellow-500">
              <FiStar className="fill-current" />
              <span className="text-gray-900 dark:text-white text-sm ml-1 font-medium">{product.rating}</span>
              <span className="text-gray-500 text-sm ml-2">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <p className="text-gray-500 leading-relaxed mb-8">{product.description}</p>

          <div className="flex flex-col gap-6 mb-12">
            <div className="flex items-center gap-6">
              <div className="flex items-center border border-gray-200 dark:border-gray-800">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800"><FiMinus /></button>
                <span className="w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800"><FiPlus /></button>
              </div>
              <Button className="flex-1 py-4" onClick={handleAddToCart}>Add to Cart</Button>
            </div>
            
            <div className="flex items-center gap-4 text-sm font-medium uppercase tracking-widest">
              <button className="flex items-center gap-2 hover:text-gray-500 transition-colors"><FiHeart /> Add to Wishlist</button>
              <button className="flex items-center gap-2 hover:text-gray-500 transition-colors"><FiShare2 /> Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}