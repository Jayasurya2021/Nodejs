import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { selectRole, reset } from '../redux/slices/authSlice';
import { ShoppingBag, Store, ArrowRight } from 'lucide-react';

const CompleteProfile = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // If the user somehow has a valid role already, redirect them away
    if (user && user.role !== 'pending') {
      if (user.role === 'seller') {
        navigate('/seller/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    
    // We don't redirect on isSuccess here, the first useEffect handles redirection based on role change
    
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const handleContinue = () => {
    if (!selectedRole) {
      toast.error('Please select an account type to continue');
      return;
    }
    dispatch(selectRole({ role: selectedRole }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-white shadow-xl rounded-2xl overflow-hidden"
      >
        <div className="p-8 md:p-12 text-center">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-widest mb-2 text-black">
            Complete Your Account
          </h1>
          <p className="text-gray-500 mb-12 text-sm md:text-base">
            Choose how you want to use Boutique.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Buyer Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRole('buyer')}
              className={`cursor-pointer rounded-xl border-2 p-8 text-left transition-all duration-300 ${
                selectedRole === 'buyer' 
                  ? 'border-black bg-black text-white shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300 bg-white text-black'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                selectedRole === 'buyer' ? 'bg-white text-black' : 'bg-gray-100 text-black'
              }`}>
                <ShoppingBag size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Buyer Account</h2>
              <ul className={`space-y-3 text-sm ${selectedRole === 'buyer' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-center gap-2"><span>✔</span> Buy Products</li>
                <li className="flex items-center gap-2"><span>✔</span> Wishlist</li>
                <li className="flex items-center gap-2"><span>✔</span> Orders</li>
                <li className="flex items-center gap-2"><span>✔</span> Checkout</li>
              </ul>
            </motion.div>

            {/* Seller Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRole('seller')}
              className={`cursor-pointer rounded-xl border-2 p-8 text-left transition-all duration-300 ${
                selectedRole === 'seller' 
                  ? 'border-black bg-black text-white shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300 bg-white text-black'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                selectedRole === 'seller' ? 'bg-white text-black' : 'bg-gray-100 text-black'
              }`}>
                <Store size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Seller Account</h2>
              <ul className={`space-y-3 text-sm ${selectedRole === 'seller' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-center gap-2"><span>✔</span> Add Products</li>
                <li className="flex items-center gap-2"><span>✔</span> Manage Inventory</li>
                <li className="flex items-center gap-2"><span>✔</span> Receive Orders</li>
                <li className="flex items-center gap-2"><span>✔</span> Seller Dashboard</li>
              </ul>
            </motion.div>
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedRole || isLoading}
            className={`w-full md:w-auto px-12 py-4 rounded-full font-bold uppercase tracking-widest flex items-center justify-center mx-auto gap-2 transition-all duration-300 ${
              selectedRole 
                ? 'bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-105' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Updating...' : 'Continue'}
            {!isLoading && <ArrowRight size={20} />}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CompleteProfile;
