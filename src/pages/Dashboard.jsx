import React, { useState } from 'react';
import { FiUser, FiPackage, FiBarChart2, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const isAdmin = user?.email === 'alex@example.com';

  const handleLogout = () => {
    logout();
    addToast('Logged out', 'info');
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <h2 className="font-serif text-3xl mb-6">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium uppercase tracking-widest text-gray-500">First Name</label>
                <input type="text" defaultValue="John" className="border-b border-gray-300 dark:border-gray-700 bg-transparent p-2 outline-none focus:border-black dark:focus:border-white" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium uppercase tracking-widest text-gray-500">Last Name</label>
                <input type="text" defaultValue="Doe" className="border-b border-gray-300 dark:border-gray-700 bg-transparent p-2 outline-none focus:border-black dark:focus:border-white" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-medium uppercase tracking-widest text-gray-500">Email</label>
                <input type="email" defaultValue="john.doe@example.com" className="border-b border-gray-300 dark:border-gray-700 bg-transparent p-2 outline-none focus:border-black dark:focus:border-white" />
              </div>
            </div>
            <button className="mt-8 bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-sm uppercase tracking-widest font-medium">Update Profile</button>
          </div>
        );
      case 'orders':
        return (
          <div>
            <h2 className="font-serif text-3xl mb-6">Order History</h2>
            <div className="border border-gray-200 dark:border-gray-800 rounded-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="p-4 font-medium text-sm text-gray-500 uppercase tracking-widest">Order #</th>
                    <th className="p-4 font-medium text-sm text-gray-500 uppercase tracking-widest">Date</th>
                    <th className="p-4 font-medium text-sm text-gray-500 uppercase tracking-widest">Status</th>
                    <th className="p-4 font-medium text-sm text-gray-500 uppercase tracking-widest">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  <tr>
                    <td className="p-4 text-sm">#ORD-1029</td>
                    <td className="p-4 text-sm text-gray-500">Oct 24, 2026</td>
                    <td className="p-4 text-sm"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Delivered</span></td>
                    <td className="p-4 text-sm font-medium">$349.00</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-sm">#ORD-1015</td>
                    <td className="p-4 text-sm text-gray-500">Sep 12, 2026</td>
                    <td className="p-4 text-sm"><span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Processing</span></td>
                    <td className="p-4 text-sm font-medium">$129.50</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'admin':
        return (
          <div>
            <h2 className="font-serif text-3xl mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 border border-gray-200 dark:border-gray-800 flex flex-col gap-2">
                <span className="text-gray-500 text-sm uppercase tracking-widest">Total Revenue</span>
                <span className="text-3xl font-serif">$24,592</span>
              </div>
              <div className="p-6 border border-gray-200 dark:border-gray-800 flex flex-col gap-2">
                <span className="text-gray-500 text-sm uppercase tracking-widest">Orders</span>
                <span className="text-3xl font-serif">142</span>
              </div>
              <div className="p-6 border border-gray-200 dark:border-gray-800 flex flex-col gap-2">
                <span className="text-gray-500 text-sm uppercase tracking-widest">Customers</span>
                <span className="text-3xl font-serif">89</span>
              </div>
            </div>
            <p className="text-gray-500">Full admin controls for products and inventory would go here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-32 container mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row gap-12">
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="flex flex-col gap-2">
          <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-3 p-4 text-left text-sm uppercase tracking-widest transition-colors ${activeTab === 'profile' ? 'bg-gray-100 dark:bg-gray-800 font-medium' : 'hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-500'}`}>
            <FiUser size={18} /> Profile
          </button>
          <button onClick={() => setActiveTab('orders')} className={`flex items-center gap-3 p-4 text-left text-sm uppercase tracking-widest transition-colors ${activeTab === 'orders' ? 'bg-gray-100 dark:bg-gray-800 font-medium' : 'hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-500'}`}>
            <FiPackage size={18} /> Orders
          </button>
          {isAdmin && (
            <button onClick={() => setActiveTab('admin')} className={`flex items-center gap-3 p-4 text-left text-sm uppercase tracking-widest transition-colors ${activeTab === 'admin' ? 'bg-gray-100 dark:bg-gray-800 font-medium' : 'hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-500'}`}>
              <FiBarChart2 size={18} /> Admin Panel
            </button>
          )}
          <button onClick={handleLogout} className="flex items-center gap-3 p-4 text-left text-sm uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-900 text-red-500 mt-8 border-t border-gray-200 dark:border-gray-800">
            <FiLogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
}