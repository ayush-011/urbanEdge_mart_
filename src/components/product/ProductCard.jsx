import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHeart, HiEye, HiArrowsRightLeft } from 'react-icons/hi2';
import { formatPrice, calculateDiscount } from '../../utils/helpers';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import Rating from '../ui/Rating';
import Badge from '../ui/Badge';

export default function ProductCard({ product, onAddToCart, onQuickView, compact = false }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();
  const discount = calculateDiscount(product.price, product.originalPrice);
  const inWishlist = isInWishlist(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    addToast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist', 'success');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    onAddToCart?.(product);
    addToast('Added to cart!', 'success');
  };

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="group relative">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
            {product.isNew && <Badge variant="new">New</Badge>}
            {product.flashSale && <Badge variant="brand">Flash Sale</Badge>}
          </div>
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
              inWishlist ? 'bg-red-500 text-white' : 'bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100'
            }`}
            aria-label="Toggle wishlist"
          >
            <HiHeart size={18} className={inWishlist ? 'fill-current' : ''} />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-xl hover:opacity-90 transition-opacity"
            >
              Add to Cart
            </button>
            {onQuickView && (
              <button
                onClick={(e) => { e.preventDefault(); onQuickView(product); }}
                className="p-2.5 bg-white/90 dark:bg-gray-900/90 rounded-xl"
                aria-label="Quick view"
              >
                <HiEye size={18} />
              </button>
            )}
          </div>
        </div>
        <div className={`mt-3 ${compact ? 'space-y-1.5' : 'space-y-1.5'}`}>
          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500 truncate">{product.brand}</p>
          <h3 className="text-sm md:text-[15px] leading-snug font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[2.5rem] md:min-h-[2.75rem] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {product.name}
          </h3>
          <Rating value={product.rating} count={product.reviewCount} />
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="font-bold text-gray-900 dark:text-white tabular-nums">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through tabular-nums">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProductCardCompare({ product, isComparing, onToggleCompare }) {
  return (
    <button
      onClick={() => onToggleCompare(product)}
      className={`absolute top-3 right-12 p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 ${
        isComparing ? 'bg-indigo-500 text-white' : 'bg-white/80 dark:bg-gray-900/80'
      }`}
      aria-label="Compare"
    >
      <HiArrowsRightLeft size={16} />
    </button>
  );
}
