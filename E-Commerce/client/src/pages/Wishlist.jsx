import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Heart, ArrowRight, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const fetchWishlist = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` }, withCredentials: true };
      const { data } = await axios.get('/api/users/wishlist', config); // Assuming this endpoint exists, or fallback
      setWishlist(data.wishlist || []);
    } catch (error) {
      toast.error('Failed to load wishlist');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const removeFromWishlist = async (productId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` }, withCredentials: true };
      await axios.delete(`/api/users/wishlist/${productId}`, config); // Ensure backend supports this
      setWishlist((prev) => prev.filter(item => item._id !== productId));
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-black uppercase tracking-widest flex items-center gap-3">
          <Heart /> My Wishlist
        </h1>
        <p className="text-gray-500 mt-2">Saved items you want to buy later.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse h-64 bg-gray-100 rounded-lg w-full" />
          ))}
        </div>
      ) : wishlist.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 border border-gray-100 rounded-lg">
          <Heart size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Save items you love and they will show up here.</p>
          <Link 
            to="/shop" 
            className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            Explore Products <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={product._id}
              className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <button 
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur p-2 rounded-full text-red-500 hover:text-red-700 hover:bg-white transition-colors"
                title="Remove from wishlist"
              >
                <Trash2 size={16} />
              </button>
              
              <Link to={`/product/${product._id}`} className="block relative aspect-square overflow-hidden bg-gray-50">
                <img 
                  src={product.images?.[0]?.url || 'https://via.placeholder.com/400'} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </Link>
              
              <div className="p-4">
                <h3 className="font-bold text-sm truncate mb-1">{product.title}</h3>
                <p className="text-gray-500 text-xs mb-3">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">${product.price?.toFixed(2)}</span>
                  <Link 
                    to={`/product/${product._id}`}
                    className="text-xs font-bold uppercase tracking-widest hover:text-gray-500 transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
