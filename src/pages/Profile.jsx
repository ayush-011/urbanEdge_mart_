import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiUser, HiShoppingBag, HiBell, HiArrowRightOnRectangle, HiChevronRight } from 'react-icons/hi2';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/helpers';

const tabs = [
  { id: 'profile', label: 'Profile', icon: HiUser },
  { id: 'orders', label: 'Orders', icon: HiShoppingBag },
  { id: 'notifications', label: 'Notifications', icon: HiBell },
];

function ProfileContent() {
  const { user, orders, updateProfile, logout, notifications, markNotificationRead, markAllNotificationsRead } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });

  const unreadCount = notifications.filter(n => !n.read).length;
  const memberYear = user?.createdAt ? new Date(user.createdAt).getFullYear() : '2025';

  const handleSave = () => {
    updateProfile(form);
    addToast('Profile updated!', 'success');
  };

  const handleLogout = () => {
    logout();
    addToast('Logged out', 'info');
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Profile' }]} />

      {/* Header banner */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-7 md:p-10 mt-4 text-gray-900 dark:text-white">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500" />
        <div className="absolute -top-16 -right-16 h-60 w-60 rounded-full bg-teal-100 dark:bg-teal-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-14 h-60 w-60 rounded-full bg-emerald-100 dark:bg-emerald-500/10 blur-3xl" />

        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white flex items-center justify-center text-3xl md:text-4xl font-bold shadow-lg shadow-teal-500/25 ring-2 ring-white/70 dark:ring-white/10">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-teal-600 dark:text-teal-400 text-sm font-semibold">Welcome back,</p>
            <h1 className="text-2xl md:text-3xl font-bold truncate mt-0.5">{user?.name || 'User'}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{user?.email} · Member since {memberYear}</p>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-4 min-w-[240px]">
            <div className="rounded-2xl bg-gray-50/80 dark:bg-gray-800/70 border border-gray-100 dark:border-gray-800 backdrop-blur p-3 md:p-4 text-center">
              <p className="text-xl md:text-2xl font-bold text-teal-600 dark:text-teal-400 tabular-nums">{orders.length}</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Orders</p>
            </div>
            <div className="rounded-2xl bg-gray-50/80 dark:bg-gray-800/70 border border-gray-100 dark:border-gray-800 backdrop-blur p-3 md:p-4 text-center">
              <p className="text-xl md:text-2xl font-bold text-teal-600 dark:text-teal-400 tabular-nums">{wishlistItems.length}</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Wishlist</p>
            </div>
            <div className="rounded-2xl bg-gray-50/80 dark:bg-gray-800/70 border border-gray-100 dark:border-gray-800 backdrop-blur p-3 md:p-4 text-center">
              <p className="text-xl md:text-2xl font-bold text-teal-600 dark:text-teal-400 tabular-nums">{unreadCount}</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Unread</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8 mt-8">
        {/* Sidebar tabs */}
        <aside className="lg:sticky lg:top-28 lg:self-start space-y-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-semibold ring-1 ring-teal-200 dark:ring-teal-800/50'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon size={18} /> {label}
              {id === 'notifications' && unreadCount > 0 && (
                <span className="ml-auto px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">{unreadCount}</span>
              )}
            </button>
          ))}
          <div className="border-t border-gray-200 dark:border-gray-800 my-2" />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
          >
            <HiArrowRightOnRectangle size={18} /> Log out
          </button>
        </aside>

        {/* Content area */}
        <div className="lg:col-span-3 min-w-0">
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-gray-900/80 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 md:p-8">
              <div className="flex items-center gap-5 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-teal-500/25 shrink-0">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">{user?.name || 'User'}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
                <Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
                <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 000-0000" autoComplete="tel" />
              </div>
              <Button onClick={handleSave} className="mt-6">Save Changes</Button>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-900/80 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <HiShoppingBag className="mx-auto text-gray-300 dark:text-gray-600" size={40} />
                  <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">No orders yet.</p>
                  <Link to="/shop"><Button size="sm" className="mt-4">Start Shopping</Button></Link>
                </div>
              ) : (
                <>
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="bg-white dark:bg-gray-900/80 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            Placed{' '}
                            <span className="text-gray-500 dark:text-gray-400 font-normal">
                              {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Est. {order.estimatedDelivery}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 capitalize">{order.status}</span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{formatPrice(order.total)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                        {order.items?.slice(0, 4).map((item) => (
                          <img key={item.key} src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100 dark:bg-gray-800 shrink-0" />
                        ))}
                        {(order.items?.length || 0) > 4 && (
                          <span className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-medium text-gray-500 shrink-0">
                            +{order.items.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {orders.length > 3 && (
                    <Link to="/orders" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                      View all {orders.length} orders <HiChevronRight size={14} />
                    </Link>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white dark:bg-gray-900/80 rounded-2xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
              <div className="flex items-center justify-between px-6 py-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              {notifications.length === 0 ? (
                <div className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">No notifications yet.</div>
              ) : (
                notifications.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`w-full text-left px-6 py-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40 ${
                      !n.read ? 'bg-indigo-50/50 dark:bg-indigo-950/20' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {!n.read && <span className="w-2 h-2 mt-1.5 rounded-full bg-indigo-500 shrink-0" />}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">{n.message}</p>
                        {n.date && <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{new Date(n.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>}
                      </div>
                      {!n.read && (
                        <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">New</span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  return <ProtectedRoute><ProfileContent /></ProtectedRoute>;
}