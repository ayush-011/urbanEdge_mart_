import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiX, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { closeCart, updateQuantity, removeFromCart } from '../store/cartSlice';

export default function CartDrawer() {
  const { items, isOpen } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => dispatch(closeCart())} 
      />
      
      <div className={`fixed top-0 right-0 w-full max-w-[400px] h-screen bg-white dark:bg-[#0a0a0a] z-[300] shadow-2xl transition-transform duration-500 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="font-serif text-2xl">Your Cart</h2>
          <button onClick={() => dispatch(closeCart())} className="text-2xl hover:opacity-70 transition-opacity">
            <FiX />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <p className="text-gray-500 mb-6">Your cart is empty.</p>
              <button 
                onClick={() => dispatch(closeCart())}
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-sm uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-24 object-cover bg-gray-100 dark:bg-gray-800" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="font-medium">${item.price}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-gray-200 dark:border-gray-800">
                        <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"><FiMinus size={12} /></button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"><FiPlus size={12} /></button>
                      </div>
                      <button onClick={() => dispatch(removeFromCart(item.id))} className="text-gray-400 hover:text-red-500 transition-colors">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a]">
            <div className="flex justify-between font-medium text-lg mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mb-6">Taxes and shipping calculated at checkout.</p>
            <button 
              onClick={() => { dispatch(closeCart()); navigate('/checkout'); }}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-4 text-sm uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
