import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useHooks';
import { generateOrderId } from '../utils/helpers';

const AuthContext = createContext(null);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('urbanedge-user', null);
  const [orders, setOrders] = useLocalStorage('urbanedge-orders', []);
  const [notifications, setNotifications] = useLocalStorage('urbanedge-notifications', [
    { id: 1, message: 'Welcome to UrbanEdge Mart! Use code WELCOME10 for 10% off.', read: false, date: new Date().toISOString() },
  ]);

  const login = useCallback((email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = password || '';

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (cleanPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    setUser({ id: Date.now(), name: cleanEmail.split('@')[0], email: cleanEmail, phone: '', createdAt: new Date().toISOString() });
    return { success: true };
  }, [setUser]);

  const register = useCallback((data) => {
    const name = (data.name || '').trim();
    const cleanEmail = (data.email || '').trim().toLowerCase();
    const cleanPassword = data.password || '';

    if (!name) return { success: false, error: 'Please enter your name.' };
    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (cleanPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    setUser({ id: Date.now(), name, email: cleanEmail, phone: '', createdAt: new Date().toISOString() });
    return { success: true };
  }, [setUser]);

  const logout = useCallback(() => setUser(null), [setUser]);

  const updateProfile = useCallback((updates) => {
    setUser((prev) => prev ? { ...prev, ...updates } : null);
  }, [setUser]);

  const addOrder = useCallback((orderData) => {
    const order = { ...orderData, id: generateOrderId(), date: new Date().toISOString(), status: 'processing' };
    setOrders((prev) => [order, ...prev]);
    return order;
  }, [setOrders]);

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  }, [setNotifications]);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, [setNotifications]);

  return (
    <AuthContext.Provider value={{
      user, orders, notifications, isAuthenticated: !!user,
      login, register, logout, updateProfile, addOrder, markNotificationRead, markAllNotificationsRead,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};