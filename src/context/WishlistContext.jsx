import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useHooks';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useLocalStorage('nexus-wishlist', []);

  const addToWishlist = useCallback((product) => {
    setItems((prev) => prev.some((p) => p.id === product.id) ? prev : [...prev, product]);
  }, [setItems]);

  const removeFromWishlist = useCallback((id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, [setItems]);

  const isInWishlist = useCallback((id) => items.some((p) => p.id === id), [items]);

  const toggleWishlist = useCallback((product) => {
    setItems((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  }, [setItems]);

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
