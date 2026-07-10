import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Package, ArrowRight, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = { withCredentials: true };
        const { data } = await axios.get('/api/orders/myorders', config);
        setOrders(data);
      } catch (error) {
        toast.error('Failed to load orders');
      } finally {
        setIsLoading(false);
      }
    };
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-black uppercase tracking-widest flex items-center gap-3">
          <Package /> My Orders
        </h1>
        <p className="text-gray-500 mt-2">Track and manage your recent purchases.</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-32 bg-gray-100 rounded-lg w-full" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 border border-gray-100 rounded-lg">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold mb-2">No Orders Yet</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't made your first purchase.</p>
          <Link 
            to="/shop" 
            className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            Start Shopping <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={order._id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Order Number</p>
                  <p className="font-mono text-sm font-bold">{order._id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Date Placed</p>
                  <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Total Amount</p>
                  <p className="text-sm font-bold">${order.totalPrice.toFixed(2)}</p>
                </div>
                <div>
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                    order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                    order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-[-10px] overflow-hidden w-full max-w-md">
                  {order.orderItems.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-gray-100 -ml-2 first:ml-0 relative z-10">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {order.orderItems.length > 3 && (
                    <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 -ml-2 z-0">
                      +{order.orderItems.length - 3}
                    </div>
                  )}
                  <span className="ml-4 text-sm font-medium text-gray-600">
                    {order.orderItems.length} item{order.orderItems.length !== 1 && 's'}
                  </span>
                </div>
                <Link 
                  to={`/order/${order._id}`} 
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-gray-500 transition-colors flex-shrink-0"
                >
                  View Details <ExternalLink size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
