import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ApprovalQueue = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const fetchPendingProducts = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` }, withCredentials: true };
      const { data } = await axios.get('/api/admin/products?status=pending', config); // Assuming backend can filter by status
      // If backend doesn't filter, we just filter here
      const pending = data.products ? data.products.filter(p => p.status === 'pending') : data.filter(p => p.status === 'pending');
      setProducts(pending);
    } catch (error) {
      toast.error('Failed to load pending products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') fetchPendingProducts();
  }, [user]);

  const updateStatusHandler = async (id, status) => {
    if (window.confirm(`Are you sure you want to mark this product as ${status}?`)) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` }, withCredentials: true };
        await axios.put(`/api/admin/products/${id}/status`, { status }, config);
        toast.success(`Product ${status}`);
        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to update product status');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-10 pb-6 border-b border-gray-200">
        <h1 className="text-3xl font-black uppercase tracking-widest flex items-center gap-3">
          <Clock /> Approval Queue
        </h1>
        <p className="text-gray-500 mt-2">Review and approve products submitted by sellers.</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-24 bg-gray-100 rounded-lg w-full" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 border border-gray-100 rounded-lg">
          <CheckCircle size={48} className="mx-auto text-green-300 mb-4" />
          <h2 className="text-xl font-bold mb-2">All caught up!</h2>
          <p className="text-gray-500">There are no pending products in the queue.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {products.map((product, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={product._id}
              className="bg-white border border-yellow-200 rounded-lg p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="flex items-center gap-6">
                <img 
                  src={product.images?.[0]?.url || product.thumbnail?.url || 'https://via.placeholder.com/100'} 
                  alt={product.title} 
                  className="w-24 h-24 object-cover rounded bg-gray-100" 
                />
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg">{product.title}</h3>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                      <AlertCircle size={12} /> Pending
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-2">{product.category} • {product.brand}</p>
                  <p className="font-bold">${product.price?.toFixed(2)} <span className="text-gray-400 font-normal text-xs ml-2">Stock: {product.stock}</span></p>
                  <p className="text-xs text-gray-400 mt-2">Seller ID: {product.seller}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Link
                  to={`/product/${product._id}`}
                  className="px-6 py-2 border border-gray-300 rounded text-sm font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors text-center"
                  target="_blank"
                >
                  Preview
                </Link>
                <button
                  onClick={() => updateStatusHandler(product._id, 'rejected')}
                  className="px-6 py-2 bg-red-50 text-red-600 rounded text-sm font-bold uppercase tracking-widest hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle size={16} /> Reject
                </button>
                <button
                  onClick={() => updateStatusHandler(product._id, 'approved')}
                  className="px-6 py-2 bg-green-500 text-white rounded text-sm font-bold uppercase tracking-widest hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle size={16} /> Approve
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovalQueue;
