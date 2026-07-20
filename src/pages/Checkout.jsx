import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import { formatPrice, getEstimatedDelivery } from '../utils/helpers';

export default function Checkout() {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const { addOrder } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handleComplete = async (e) => {
    e.preventDefault();
    setProcessing(true);
    await new Promise(r => setTimeout(r, 1500));
    
    const order = addOrder({
      items,
      subtotal,
      shipping,
      total,
      estimatedDelivery: getEstimatedDelivery(),
    });
    
    clearCart();
    addToast('Order placed successfully!', 'success');
    navigate(`/order-confirmation/${order.id}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center container mx-auto px-4 pt-24 md:pt-28 pb-12 text-center">
        <h1 className="font-serif text-4xl mb-6 text-gray-900 dark:text-white">Your cart is empty</h1>
        <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-12 md:pb-16">
      <h1 className="font-serif text-4xl mb-12 text-center">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1">
          <form className="flex flex-col gap-12" onSubmit={handleComplete}>
            <section>
              <h2 className="font-serif text-2xl mb-6 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-sm">1</span> 
                Shipping Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="First Name" required className="border-b border-gray-300 dark:border-gray-700 bg-transparent p-2 outline-none focus:border-black dark:focus:border-white" />
                <input type="text" placeholder="Last Name" required className="border-b border-gray-300 dark:border-gray-700 bg-transparent p-2 outline-none focus:border-black dark:focus:border-white" />
                <input type="text" placeholder="Address" required className="border-b border-gray-300 dark:border-gray-700 bg-transparent p-2 outline-none focus:border-black dark:focus:border-white md:col-span-2" />
                <input type="text" placeholder="City" required className="border-b border-gray-300 dark:border-gray-700 bg-transparent p-2 outline-none focus:border-black dark:focus:border-white" />
                <input type="text" placeholder="ZIP Code" required className="border-b border-gray-300 dark:border-gray-700 bg-transparent p-2 outline-none focus:border-black dark:focus:border-white" />
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl mb-6 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-sm">2</span> 
                Payment Method
              </h2>
              <div className="border border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-6">
                <input type="text" placeholder="Card Number" required className="border-b border-gray-300 dark:border-gray-700 bg-transparent p-2 outline-none focus:border-black dark:focus:border-white" />
                <div className="grid grid-cols-2 gap-6">
                  <input type="text" placeholder="MM/YY" required className="border-b border-gray-300 dark:border-gray-700 bg-transparent p-2 outline-none focus:border-black dark:focus:border-white" />
                  <input type="text" placeholder="CVC" required className="border-b border-gray-300 dark:border-gray-700 bg-transparent p-2 outline-none focus:border-black dark:focus:border-white" />
                </div>
              </div>
            </section>
            
            <Button type="submit" loading={processing} className="w-full py-4 text-lg">Complete Order</Button>
          </form>
        </div>

        {/* Order Summary */}
        <aside className="w-full lg:w-96 flex-shrink-0">
          <div className="border border-gray-200 dark:border-gray-800 p-8 sticky top-24">
            <h2 className="font-serif text-2xl mb-8">Order Summary</h2>
            <div className="flex flex-col gap-6 mb-8">
              {items.map(item => (
                <div key={item.key} className="flex gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-20 object-cover bg-gray-100 dark:bg-gray-800" />
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="font-medium">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col gap-4">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between text-sm"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
              <div className="flex justify-between text-lg font-medium pt-4 border-t border-gray-200 dark:border-gray-800"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}