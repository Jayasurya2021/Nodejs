import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const RecentTab = () => {
  // Mock data
  const recentProducts = [
    { id: '1', name: 'Silk Blend Midi Dress', brand: 'LUXE', price: 120, oldPrice: 150, image: 'https://placehold.co/300x300', inStock: true },
    { id: '2', name: 'Cashmere V-Neck Sweater', brand: 'LUXE', price: 85, image: 'https://placehold.co/300x300', inStock: true },
    { id: '3', name: 'Leather Chelsea Boots', brand: 'LUXE', price: 195, oldPrice: 220, image: 'https://placehold.co/300x300', inStock: false },
    { id: '4', name: 'Tailored Wool Trousers', brand: 'LUXE', price: 110, image: 'https://placehold.co/300x300', inStock: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold tracking-wide">Recently Viewed</h2>
          <p className="text-sm text-gray-500 mt-1">Products you've browsed recently</p>
        </div>
        <button className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors flex items-center gap-1">
          <Trash2 size={14} /> Clear History
        </button>
      </div>

      {recentProducts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
          <Eye size={40} className="mx-auto text-gray-200 mb-4" />
          <h3 className="text-lg font-bold mb-2">No Browsing History</h3>
          <p className="text-gray-500">You haven't viewed any products recently.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentProducts.map((product, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={product.id}
              className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-50">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-black text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-sm">
                      Out of Stock
                    </span>
                  </div>
                )}
              </Link>
              
              <div className="p-4 flex flex-col flex-grow">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">{product.brand}</p>
                <h3 className="font-bold text-sm mb-1 truncate">{product.name}</h3>
                
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <span className="font-bold text-sm">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="text-[10px] text-gray-400 line-through">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <button 
                    className={`p-2 rounded-full transition-colors ${
                      product.inStock 
                        ? 'bg-gray-100 hover:bg-black hover:text-white text-gray-700' 
                        : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                    }`}
                    disabled={!product.inStock}
                    title="Add to Cart"
                  >
                    <ShoppingBag size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTab;
