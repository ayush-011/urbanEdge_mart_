import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHeart, HiShare, HiMinus, HiPlus, HiCheck, HiArrowsRightLeft } from 'react-icons/hi2';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Button from '../components/ui/Button';
import Rating from '../components/ui/Rating';
import Badge from '../components/ui/Badge';
import ProductCard from '../components/product/ProductCard';
import { getProductBySlug, getRelatedProducts, getRecommendations, getCachedProducts, fetchAllProducts } from '../data/products';
import { getCategoryById, updateCategoryCounts } from '../data/categories';
import { formatPrice, calculateDiscount } from '../utils/helpers';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();
  const { addViewed, viewedIds } = useRecentlyViewed();

  useEffect(() => {
    const cached = getCachedProducts();
    if (cached.length > 0) {
      const found = getProductBySlug(slug);
      if (found) {
        setProduct(found);
        addViewed(found);
        setLoading(false);
      }
    } else {
      fetchAllProducts().then(() => {
        const found = getProductBySlug(slug);
        if (found) {
          setProduct(found);
          addViewed(found);
        }
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-28 pb-12 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-28 pb-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product not found</h1>
        <Link to="/shop"><Button className="mt-4">Back to Shop</Button></Link>
      </div>
    );
  }

  const category = getCategoryById(product.category);
  const discount = calculateDiscount(product.price, product.originalPrice);
  const related = getRelatedProducts(product);
  const recommendations = getRecommendations(viewedIds);

  const handleAddToCart = () => {
    addToCart(product, { quantity });
    addToast('Added to cart!', 'success');
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link copied to clipboard!', 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-12 md:pb-16">
      <Breadcrumbs items={[
        { label: 'Shop', href: '/shop' },
        { label: category?.name || product.category, href: `/categories/${product.category}` },
        { label: product.name },
      ]} />

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <div className={`relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-zoom-in ${zoomed ? 'cursor-zoom-out' : ''}`} onClick={() => setZoomed(!zoomed)}>
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: zoomed ? 2 : 1 }}
              transition={{ duration: 0.3 }}
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover origin-center"
            />
          </div>
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)} className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-colors ${selectedImage === i ? 'border-indigo-600' : 'border-transparent'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-500 uppercase tracking-wider">{product.brand}</span>
            {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
            {product.stock <= 5 && product.stock > 0 && <Badge variant="brand">Only {product.stock} left</Badge>}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold">{product.name}</h1>
          <Rating value={product.rating} count={product.reviewCount} size="md" />
          <div className="flex items-center gap-3 mt-4">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && <span className="text-xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>}
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>
          <p className={`mt-3 text-sm font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-amber-600' : 'text-red-600'}`}>
            {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
          </p>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-xl"><HiMinus size={16} /></button>
              <span className="px-4 font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-xl"><HiPlus size={16} /></button>
            </div>
            <Button onClick={handleAddToCart} disabled={product.stock === 0} className="flex-1">Add to Cart</Button>
          </div>

          <div className="flex gap-3 mt-4">
            <Button variant="secondary" onClick={() => { toggleWishlist(product); addToast(isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist'); }} className="flex-1">
              <HiHeart className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''} /> Wishlist
            </Button>
            <Button variant="ghost" onClick={handleShare}><HiShare size={18} /></Button>
          </div>

          <div className="mt-6 flex gap-2">
            <span className="text-sm text-gray-500">Share:</span>
            {[FaFacebook, FaTwitter, FaWhatsapp].map((Icon, i) => (
              <button key={i} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><Icon size={16} /></button>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50">
            <h3 className="font-semibold mb-4">Specifications</h3>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key}>
                  <dt className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</dt>
                  <dd className="font-medium">{val}</dd>
                </div>
              ))}
              {product.tags?.length > 0 && (
                <div className="col-span-2">
                  <dt className="text-gray-500 text-sm mb-1">Tags</dt>
                  <dd className="flex flex-wrap gap-1">
                    {product.tags.map(tag => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-16">
        <h2 className="font-serif text-2xl font-bold mb-6">Customer Reviews</h2>
        {product.reviews.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {product.reviews.map((review) => (
              <div key={review.id} className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50">
                <Rating value={review.rating} showCount={false} />
                <p className="mt-2 text-gray-600 dark:text-gray-400">{review.comment}</p>
                <p className="mt-3 text-sm font-medium">{review.author} · {review.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet for this product.</p>
        )}
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
          </div>
        </section>
      )}

      {recommendations.length > 0 && (
        <section className="mt-16 mb-8">
          <h2 className="font-serif text-2xl font-bold mb-6">Recommended For You</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {recommendations.map((p) => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
          </div>
        </section>
      )}
    </div>
  );
}