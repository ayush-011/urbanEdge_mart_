import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi2';
import Button from '../components/ui/Button';
import { formatPrice } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const { orders } = useAuth();
  const order = orders.find((o) => o.id === orderId);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10 }}>
        <HiCheckCircle className="mx-auto text-green-500" size={80} />
      </motion.div>
      <h1 className="font-serif text-3xl md:text-4xl font-bold mt-6">Order Confirmed!</h1>
      <p className="mt-3 text-gray-600 dark:text-gray-400">Thank you for your purchase. Your order has been received.</p>
      <div className="mt-8 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 text-left space-y-3">
        {order && (
          <>
            <div className="flex justify-between"><span className="text-gray-500">Total</span><span className="font-bold">{formatPrice(order.total)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Est. Delivery</span><span>{order.estimatedDelivery}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="text-green-600 capitalize">{order.status}</span></div>
          </>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
        <Link to="/orders"><Button variant="secondary">View Orders</Button></Link>
        <Link to="/shop"><Button>Continue Shopping</Button></Link>
      </div>
    </div>
  );
}
