import { Link } from 'react-router-dom';
import { HiHeart, HiShoppingBag, HiTrash } from 'react-icons/hi2';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Button from '../components/ui/Button';
import { formatPrice } from '../utils/helpers';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    addToast('Moved to cart!', 'success');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-28 pb-12 text-center">
        <Breadcrumbs items={[{ label: 'Wishlist' }]} />
        <HiHeart className="mx-auto text-gray-300 dark:text-gray-600" size={64} />
        <h1 className="font-serif text-3xl font-bold mt-6 text-gray-900 dark:text-white">Your wishlist is empty</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Save items you love for later.</p>
        <Link to="/shop"><Button className="mt-6">Browse Products</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-12 md:pb-16">
      <Breadcrumbs items={[{ label: 'Wishlist' }]} />
      <h1 className="font-serif text-3xl font-bold mb-8">My Wishlist ({items.length})</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
            <Link to={`/product/${item.slug}`} className="w-28 h-32 rounded-xl overflow-hidden shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </Link>
            <div className="flex-1 flex flex-col">
              <Link to={`/product/${item.slug}`} className="font-medium hover:text-indigo-600">{item.name}</Link>
              <p className="text-sm text-gray-500">{item.brand}</p>
              <p className="font-semibold mt-auto">{formatPrice(item.price)}</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" onClick={() => moveToCart(item)} className="flex-1"><HiShoppingBag size={14} /> Add to Cart</Button>
                <button onClick={() => removeFromWishlist(item.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><HiTrash size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
