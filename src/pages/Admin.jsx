import { useMemo, useEffect, useState } from 'react';
import { HiShoppingBag, HiUsers, HiCurrencyDollar, HiCube, HiChartBar } from 'react-icons/hi2';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import { getCachedProducts, fetchAllProducts } from '../data/products';
import { formatPrice } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';

const stats = [
  { label: 'Total Revenue', icon: HiCurrencyDollar, getValue: (orders) => formatPrice(orders.reduce((s, o) => s + o.total, 0)) },
  { label: 'Total Orders', icon: HiShoppingBag, getValue: (orders) => orders.length },
  { label: 'Products', icon: HiCube, getValue: (products) => products.length },
  { label: 'Customers', icon: HiUsers, getValue: () => '1,247' },
];

function AdminContent() {
  const { orders } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cached = getCachedProducts();
    if (cached.length > 0) {
      setProducts(cached);
    } else {
      fetchAllProducts().then(setProducts);
    }
  }, []);

  const lowStock = useMemo(() => products.filter((p) => p.stock < 15).slice(0, 5), [products]);
  const topProducts = useMemo(() => [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5), [products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Admin Dashboard' }]} />
      <h1 className="font-serif text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, icon: Icon, getValue }) => (
          <div key={label} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold mt-1">{getValue(orders, products)}</p>
              </div>
              <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600"><Icon size={24} /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50">
          <h2 className="font-semibold flex items-center gap-2 mb-4"><HiChartBar size={20} /> Top Products</h2>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-sm text-gray-400 w-4">{i + 1}</span>
                <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{p.name}</p><p className="text-xs text-gray-500">{p.reviewCount} reviews</p></div>
                <span className="text-sm font-medium">{formatPrice(p.price)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50">
          <h2 className="font-semibold flex items-center gap-2 mb-4"><HiCube size={20} /> Low Stock Alert</h2>
          <div className="space-y-3">
            {lowStock.map((p) => (
              <div key={p.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <p className="text-sm font-medium truncate max-w-[200px]">{p.name}</p>
                </div>
                <span className={`text-sm font-medium ${p.stock < 8 ? 'text-red-500' : 'text-amber-500'}`}>{p.stock} left</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50">
        <h2 className="font-semibold mb-4">Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500 text-sm">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-gray-500 border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 pr-4">Order ID</th><th className="pb-3 pr-4">Date</th><th className="pb-3 pr-4">Items</th><th className="pb-3 pr-4">Total</th><th className="pb-3">Status</th>
              </tr></thead>
              <tbody>
                {orders.slice(0, 10).map((o) => (
                  <tr key={o.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 pr-4 font-mono">{o.id}</td>
                    <td className="py-3 pr-4">{new Date(o.date).toLocaleDateString()}</td>
                    <td className="py-3 pr-4">{o.items?.length}</td>
                    <td className="py-3 pr-4 font-medium">{formatPrice(o.total)}</td>
                    <td className="py-3 capitalize text-green-600">{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  return <ProtectedRoute adminOnly><AdminContent /></ProtectedRoute>;
}