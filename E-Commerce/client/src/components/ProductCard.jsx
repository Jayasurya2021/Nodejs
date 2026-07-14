import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiEye } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import toast from 'react-hot-toast';
import axios from 'axios';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Use the first two images for hover effect if available
  const mainImage = product.images[0]?.url || 'https://via.placeholder.com/600x800';
  const hoverImage = product.images[1]?.url || mainImage;

  const handleAction = (e, action) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user || Object.keys(user).length === 0) {
      dispatch({ type: 'ui/openLoginModal' });
      return;
    }
    
    if (action === 'wishlist') {
      axios.post(`/api/users/wishlist/${product._id}`, {}, { withCredentials: true })
        .then(() => toast.success('Added to wishlist! ❤️'))
        .catch((err) => toast.error(err.response?.data?.message || 'Failed to add to wishlist'));
    } else if (action === 'cart') {
      dispatch(addToCart({ ...product, qty: 1 }));
      toast.success('Added to bag! 🛍️');
    }
  };

  return (
    <motion.div 
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <Link to={`/product/${product._id}`}>
          <img
            src={isHovered ? hoverImage : mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="bg-white text-black text-[10px] uppercase font-bold tracking-widest px-3 py-1">New</span>
          )}
          {product.discount > 0 && (
            <span className="bg-red-500 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1">-{product.discount}%</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => handleAction(e, 'wishlist')}
          className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 hover:text-red-500"
        >
          <FiHeart size={16} />
        </button>

        {/* Quick Actions (Desktop Hover) */}
        <div className="absolute bottom-4 left-0 w-full px-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <button 
            onClick={(e) => handleAction(e, 'cart')}
            className="flex-1 bg-white text-black text-xs font-bold uppercase tracking-widest py-3 flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors border border-transparent hover:border-white"
          >
            <FiShoppingBag size={14} /> Add to Bag
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-semibold tracking-wide truncate pr-4">
            <Link to={`/product/${product._id}`} className="hover:text-gray-500 transition-colors">
              {product.name}
            </Link>
          </h3>
        </div>
        
        <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">{product.brand}</p>
        
        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium ${product.discount > 0 ? 'text-red-600' : 'text-black'}`}>
            ₹{((product.variants?.[0]?.price || 0) * (1 - product.discount / 100)).toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ₹{(product.variants?.[0]?.price || 0).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
