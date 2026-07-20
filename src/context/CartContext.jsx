import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useHooks';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('nexus-cart', []);
  const [savedForLater, setSavedForLater] = useLocalStorage('nexus-saved', []);
  const [coupon, setCoupon] = useLocalStorage('nexus-coupon', null);

  const addToCart = useCallback((product, options = {}) => {
    const { quantity = 1, color, size } = options;
    const key = `${product.id}-${color || ''}-${size || ''}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => i.key === key ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...product, key, quantity, selectedColor: color, selectedSize: size }];
    });
  }, [setItems]);

  const removeFromCart = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, [setItems]);

  const updateQuantity = useCallback((key, quantity) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map((i) => i.key === key ? { ...i, quantity } : i));
  }, [setItems]);

  const saveForLater = useCallback((key) => {
    setItems((prev) => {
      const item = prev.find((i) => i.key === key);
      if (item) setSavedForLater((s) => [...s.filter((x) => x.key !== key), item]);
      return prev.filter((i) => i.key !== key);
    });
  }, [setItems, setSavedForLater]);

  const moveToCart = useCallback((key) => {
    setSavedForLater((prev) => {
      const item = prev.find((i) => i.key === key);
      if (item) setItems((c) => [...c, item]);
      return prev.filter((i) => i.key !== key);
    });
  }, [setItems, setSavedForLater]);

  const clearCart = useCallback(() => setItems([]), [setItems]);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 100 ? 0 : subtotal > 0 ? 9.99 : 0;
  const discount = coupon ? (coupon.type === 'percent' ? subtotal * coupon.discount / 100 : coupon.discount) : 0;
  const total = Math.max(0, subtotal + shipping - discount);

  return (
    <CartContext.Provider value={{
      items, savedForLater, coupon, count, subtotal, shipping, discount, total,
      addToCart, removeFromCart, updateQuantity, saveForLater, moveToCart, clearCart, setCoupon,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
