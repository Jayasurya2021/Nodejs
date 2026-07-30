import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Trash2, ShoppingBag, Eye } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const WishlistTab = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const config = { withCredentials: true };
      const { data } = await axios.get('/api/users/wishlist', config);
      setWishlist(data.wishlist || []);
    } catch (error) {
      toast.error('Failed to load wishlist');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      const config = { withCredentials: true };
      await axios.delete(`/api/users/wishlist/${productId}`, config);
      setWishlist((prev) => prev.filter(item => item._id !== productId));
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse h-80 bg-gray-100 rounded-xl w-full" />
        ))}
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-24 bg-white border border-gray-100 rounded-xl shadow-sm">
        <Heart size={48} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-bold mb-2 tracking-wide">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-8">Save items you love and they will show up here.</p>
        <Link 
          to="/shop" 
          className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors inline-flex items-center gap-2 rounded-md"
        >
          Explore Products <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {wishlist.map((product, i) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.25 }}
            key={product._id}
            className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Action Buttons Overlay */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={() => removeFromWishlist(product._id)}
                className="bg-white/90 backdrop-blur shadow-sm p-2.5 rounded-full text-red-500 hover:text-red-700 hover:bg-white transition-colors"
                title="Remove from wishlist"
              >
                <Trash2 size={16} />
              </button>
              <Link 
                to={`/product/${product._id}`}
                className="bg-white/90 backdrop-blur shadow-sm p-2.5 rounded-full text-gray-700 hover:text-black hover:bg-white transition-colors"
                title="Quick View"
              >
                <Eye size={16} />
              </Link>
            </div>
            
            <Link to={`/product/${product._id}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-50">
              <img 
                src={product.images?.[0]?.url || 'https://placehold.co/400x400'} 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              {/* Status Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.countInStock > 0 ? (
                  <span className="bg-white/90 backdrop-blur text-black text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
                    In Stock
                  </span>
                ) : (
                  <span className="bg-red-500/90 backdrop-blur text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
                    Out of Stock
                  </span>
                )}
                {product.variants?.[0]?.price < product.variants?.[0]?.compareAtPrice && (
                  <span className="bg-black/90 backdrop-blur text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
                    Sale
                  </span>
                )}
              </div>
            </Link>
            
            <div className="p-5 flex flex-col flex-grow">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">{product.brand || 'LookFashion Brand'}</p>
              <h3 className="font-bold text-sm mb-1 line-clamp-2 min-h-[40px]">{product.title}</h3>
              
              <div className="mt-auto pt-4 flex items-center justify-between">
                <div className="flex flex-col">
                  {product.variants?.[0]?.compareAtPrice > product.variants?.[0]?.price && (
                    <span className="text-xs text-gray-400 line-through">₹{product.variants?.[0]?.compareAtPrice.toFixed(2)}</span>
                  )}
                  <span className="font-bold text-lg">₹{(product.variants?.[0]?.price || 0).toFixed(2)}</span>
                </div>
                
                <button 
                  className={`p-3 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                    product.countInStock > 0 
                      ? 'bg-black text-white hover:bg-gray-800' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={product.countInStock === 0}
                  title="Move to Cart"
                >
                  <ShoppingBag size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WishlistTab;
