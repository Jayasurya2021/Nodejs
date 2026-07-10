import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiArrowRight } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { closeLoginModal } from '../redux/slices/uiSlice';
import { useNavigate } from 'react-router-dom';

const LoginModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoginModalOpen } = useSelector((state) => state.ui);

  if (!isLoginModalOpen) return null;

  const handleClose = () => {
    dispatch(closeLoginModal());
  };

  const navigateTo = (path) => {
    dispatch(closeLoginModal());
    navigate(path);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-md p-8 relative shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX size={20} className="text-gray-500" />
          </button>

          <div className="flex flex-col items-center text-center mb-8 mt-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-black">
              <FiUser size={32} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-widest text-black mb-2">
              Login Required
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Please login or create an account to continue with this action and enjoy personalized features.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigateTo('/login')}
              className="w-full py-4 bg-black text-white text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors group"
            >
              Sign In
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigateTo('/signup')}
              className="w-full py-4 bg-white text-black border border-gray-200 text-sm font-bold uppercase tracking-widest hover:border-black hover:bg-gray-50 transition-colors"
            >
              Create Account
            </button>
            <button
              onClick={handleClose}
              className="w-full py-3 text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-black transition-colors mt-2"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;
