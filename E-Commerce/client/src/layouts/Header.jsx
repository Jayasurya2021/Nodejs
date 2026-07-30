import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiUser, FiMenu, FiX, FiHeart } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import SearchInput from '../components/Search/SearchInput';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Role-based navigation
  const getNavLinks = () => {
    if (!user || Object.keys(user).length === 0) {
      return [
        { title: 'Home', path: '/' },
        { title: 'Products', path: '/shop' },
        { title: 'Categories', path: '/categories' },
      ];
    }
    
    switch(user.role) {
      case 'seller':
        return [
          { title: 'Dashboard', path: '/seller/dashboard' },
          { title: 'Products', path: '/seller/products' },
          { title: 'Orders', path: '/seller/orders' },
        ];
      case 'admin':
        return [
          { title: 'Dashboard', path: '/admin/dashboard' },
          { title: 'Products', path: '/admin/products' },
          { title: 'Orders', path: '/admin/orders' },
        ];
      case 'pending':
        return [];
      case 'buyer':
      default:
        return [
          { title: 'Home', path: '/' },
          { title: 'Shop', path: '/shop' },
          { title: 'Orders', path: '/profile?tab=orders' },
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed w-full z-50 transition-colors duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 gap-4 lg:gap-8">
            {/* Left Section: Logo & Nav */}
            <div className="flex items-center gap-8 xl:gap-12 flex-shrink-0">
              {/* Logo */}
              <Link to={user?.role === 'seller' ? '/seller/dashboard' : user?.role === 'admin' ? '/admin/dashboard' : '/'} className="flex items-center">
                <span className="font-black text-2xl tracking-[0.2em] uppercase">LookFashion.</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.path}
                    className="text-sm font-semibold tracking-widest uppercase text-gray-700 hover:text-black transition-colors relative group"
                  >
                    {link.title}
                    <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-black transition-all group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Centered Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl relative">
              <SearchInput isMobile={false} />
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-5 lg:space-x-6 flex-shrink-0">
              <Link to={(user && Object.keys(user).length > 0) ? (user.role === 'pending' ? '/complete-profile' : '/profile') : '/login'} className="text-gray-700 hover:text-black hover:scale-110 transition-all">
                <FiUser className="w-5 h-5" />
              </Link>
              
              {(!user || Object.keys(user).length === 0 || user.role === 'buyer') && (
                <>
                  <button 
                    onClick={() => {
                      if (!user || Object.keys(user).length === 0) {
                        dispatch({ type: 'ui/openLoginModal' });
                      } else {
                        window.dispatchEvent(new CustomEvent('app-navigate', { detail: '/profile?tab=wishlist' }));
                      }
                    }}
                    className="relative text-gray-700 hover:text-black hover:scale-110 transition-all"
                  >
                    <FiHeart className="w-5 h-5" />
                  </button>

                  <button 
                    onClick={() => {
                      if (!user || Object.keys(user).length === 0) {
                        dispatch({ type: 'ui/openLoginModal' });
                      } else {
                        window.dispatchEvent(new CustomEvent('app-navigate', { detail: '/cart' }));
                      }
                    }}
                    className="relative text-gray-700 hover:text-black hover:scale-110 transition-all"
                  >
                    <FiShoppingBag className="w-5 h-5" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                        {cartItems.length}
                      </span>
                    )}
                  </button>
                </>
              )}

              {/* Mobile menu button */}
              <button
                className="md:hidden text-gray-700 hover:text-black transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <FiMenu className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Mobile Search Bar (Only visible on mobile) */}
          <div className="md:hidden pb-4">
            <SearchInput isMobile={true} />
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white z-50 p-6 md:hidden shadow-2xl flex flex-col overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="font-black text-2xl tracking-[0.2em] uppercase">LookFashion.</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-gray-500 hover:text-black transition-colors">
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex flex-col space-y-6 flex-grow">
                {navLinks.map((link, i) => (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    key={link.title}
                  >
                    <Link
                      to={link.path}
                      className="text-lg font-bold tracking-widest uppercase flex items-center justify-between group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.title}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-12 pt-6 border-t border-gray-100">
                {user && Object.keys(user).length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold uppercase tracking-widest">
                        {user.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold truncate">{user.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest truncate">{user.email}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        dispatch(logout());
                      }}
                      className="w-full py-3 bg-white border-2 border-black text-black font-bold tracking-widest uppercase rounded-lg hover:bg-black hover:text-white transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full py-3 bg-black text-white font-bold tracking-widest uppercase rounded-lg hover:bg-gray-800 transition-colors flex justify-center"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full py-3 bg-white border-2 border-black text-black font-bold tracking-widest uppercase rounded-lg hover:bg-gray-50 transition-colors flex justify-center"
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
