import { Link } from 'react-router-dom';
import { HiShoppingBag, HiTruck, HiCalendarDays } from 'react-icons/hi2';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Button from '../components/ui/Button';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import { formatPrice } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';

const statusStyles = {
  delivered: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  shipped: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
  processing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

function OrdersContent() {
  const { orders } = useAuth();

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-12">
      <Breadcrumbs items={[{ label: 'Profile', href: '/profile' }, { label: 'Orders' }]} />

      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 md:mt-10 mb-10">
        <div className="flex items-center gap-4">
          <span className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
            <HiShoppingBag size={22} />
          </span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Order History</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Track and review all your UrbanEdge Mart orders</p>
          </div>
        </div>
        {orders.length > 0 && (
          <span className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold border border-teal-100 dark:border-teal-800/50">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'}
          </span>
        )}
      </header>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900/60 rounded-3xl border border-gray-100 dark:border-gray-800">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500">
            <HiShoppingBag size={28} />
          </span>
          <p className="mt-4 text-gray-900 dark:text-white font-semibold">No orders yet</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">When you place an order, it will show up here.</p>
          <Link to="/shop">
            <Button variant="accent" className="mt-6">Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => {
            const itemCount = order.items?.length || 0;
            const status = order.status || 'processing';
            const maxThumbs = 6;
            return (
              <article
                key={order.id}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 md:p-6 hover:shadow-md hover:shadow-gray-900/5 dark:hover:shadow-black/30 transition-all"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                      <HiCalendarDays size={14} /> Order placed
                    </p>
                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">{formatDate(order.date)}</p>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                      <HiTruck size={15} className="text-teal-600 dark:text-teal-400" />
                      Est. delivery: <span className="font-medium text-gray-700 dark:text-gray-300">{order.estimatedDelivery}</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[status] || statusStyles.processing}`}>
                      {status}
                    </span>
                    <span className="text-xl md:text-2xl font-bold tabular-nums text-gray-900 dark:text-white">{formatPrice(order.total)}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-3">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </p>
                  <ul className="flex items-center gap-3 overflow-x-auto pb-1">
                    {order.items?.slice(0, maxThumbs).map((item) => (
                      <li key={item.key} className="flex items-center gap-3 shrink-0 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-xl pl-2.5 pr-3.5 py-2">
                        <img src={item.image} alt="" className="w-11 h-11 rounded-lg object-cover bg-white dark:bg-gray-900" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white max-w-[140px] truncate">{item.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Qty {item.quantity} · {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </li>
                    ))}
                    {itemCount > maxThumbs && (
                      <li className="flex items-center justify-center w-11 h-11 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-500 dark:text-gray-400">
                        +{itemCount - maxThumbs}
                      </li>
                    )}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Orders() {
  return <ProtectedRoute><OrdersContent /></ProtectedRoute>;
}