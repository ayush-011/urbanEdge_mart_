import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiTrash, HiMinus, HiPlus, HiBookmark, HiArrowRight } from 'react-icons/hi2';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { formatPrice, getEstimatedDelivery } from '../utils/helpers';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { COUPONS } from '../data/products';

export default function Cart() {
  const { items, savedForLater, subtotal, shipping, discount, total, coupon, updateQuantity, removeFromCart, saveForLater, moveToCart, setCoupon } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const { addToast } = useToast();
  const navigate = useNavigate();

  const applyCoupon = () => {
    const c = COUPONS[couponCode.toUpperCase()];
    if (!c) { addToast('Invalid coupon code', 'error'); return; }
    if (subtotal < c.minOrder) { addToast(`Minimum order of ${formatPrice(c.minOrder)} required`, 'error'); return; }
    setCoupon(c);
    addToast(`Coupon ${c.code} applied!`, 'success');
  };

  if (items.length === 0 && savedForLater.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-28 pb-12 text-center">
        <Breadcrumbs items={[{ label: 'Cart' }]} />
        <h1 className="font-serif text-3xl font-bold mt-8 text-gray-900 dark:text-white">Your cart is empty</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Looks like you haven&apos;t added anything yet.</p>
        <Link to="/shop"><Button className="mt-6">Start Shopping</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-12 md:pb-16">
      <Breadcrumbs items={[{ label: 'Cart' }]} />
      <h1 className="font-serif text-3xl font-bold mb-8">Shopping Cart ({items.length} items)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.key} className="flex gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
              <Link to={`/product/${item.slug}`} className="w-24 h-28 rounded-xl overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.slug}`} className="font-medium hover:text-indigo-600 truncate block">{item.name}</Link>
                <p className="text-sm text-gray-500 mt-0.5">{item.brand}</p>
                {(item.selectedColor || item.selectedSize) && (
                  <p className="text-xs text-gray-400 mt-1">{[item.selectedColor, item.selectedSize].filter(Boolean).join(' · ')}</p>
                )}
                <p className="font-semibold mt-2">{formatPrice(item.price)}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                    <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="p-1.5"><HiMinus size={14} /></button>
                    <span className="px-3 text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="p-1.5"><HiPlus size={14} /></button>
                  </div>
                  <button onClick={() => saveForLater(item.key)} className="text-xs text-gray-500 hover:text-indigo-600 flex items-center gap-1"><HiBookmark size={14} /> Save</button>
                  <button onClick={() => removeFromCart(item.key)} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 ml-auto"><HiTrash size={14} /> Remove</button>
                </div>
              </div>
              <p className="font-semibold shrink-0">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}

          {savedForLater.length > 0 && (
            <div className="mt-8">
              <h3 className="font-semibold mb-4">Saved for Later ({savedForLater.length})</h3>
              {savedForLater.map((item) => (
                <div key={item.key} className="flex gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 mb-3 opacity-75">
                  <img src={item.image} alt={item.name} className="w-16 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => moveToCart(item.key)}>Move to Cart</Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 space-y-4">
            <h3 className="font-semibold text-lg">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-700"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
            <p className="text-xs text-gray-500">Estimated delivery: {getEstimatedDelivery()}</p>
            {subtotal < 100 && subtotal > 0 && <p className="text-xs text-indigo-600">Add {formatPrice(100 - subtotal)} more for free shipping!</p>}

            <div className="flex gap-2">
              <Input placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="!py-2" />
              <Button variant="secondary" size="sm" onClick={applyCoupon}>Apply</Button>
            </div>
            {coupon && <p className="text-xs text-green-600">Coupon {coupon.code} applied</p>}

            <Button onClick={() => navigate('/checkout')} className="w-full" disabled={items.length === 0}>
              Checkout <HiArrowRight size={18} />
            </Button>
            <Link to="/shop" className="block text-center text-sm text-indigo-600 hover:underline">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
