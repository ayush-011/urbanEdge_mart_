import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useHooks';

const RecentlyViewedContext = createContext(null);

export function RecentlyViewedProvider({ children }) {
  const [viewed, setViewed] = useLocalStorage('nexus-recently-viewed', []);

  const addViewed = useCallback((product) => {
    setViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [{ id: product.id, name: product.name, image: product.image, price: product.price, slug: product.slug }, ...filtered].slice(0, 12);
    });
  }, [setViewed]);

  const viewedIds = viewed.map((p) => p.id);

  return (
    <RecentlyViewedContext.Provider value={{ viewed, viewedIds, addViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export const useRecentlyViewed = () => {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
  return ctx;
};
