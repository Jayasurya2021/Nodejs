import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiUser, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import SearchInput from '../components/Search/SearchInput';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    if (!user) {
      return [
        { title: 'Home', path: '/' },
        { title: 'Products', path: '/shop' },
        { title: 'Categories', path: '/categories' },
        { title: 'Login', path: '/login' },
        { title: 'Register', path: '/signup' },
      ];
    }
    
    switch(user.role) {
      case 'seller':
        return [
          { title: 'Dashboard', path: '/seller/dashboard' },
          { title: 'Add Product', path: '/seller/product/new' },
          { title: 'My Products', path: '/seller/products' },
          { title: 'Orders', path: '/seller/orders' },
        ];
      case 'admin':
        return [
          { title: 'Dashboard', path: '/admin/dashboard' },
          { title: 'Users', path: '/admin/users' },
          { title: 'Products', path: '/admin/products' },
          { title: 'Orders', path: '/admin/orders' },
        ];
      case 'buyer':
      default:
        return [
          { title: 'Home', path: '/' },
          { title: 'Products', path: '/shop' },
          { title: 'Categories', path: '/categories' },
          { title: 'Wishlist', path: '/wishlist' },
          { title: 'Orders', path: '/orders' },
          { title: 'Profile', path: '/profile' },
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
          isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-2xl tracking-widest uppercase">LUXE.</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.path}
                  className="text-sm font-medium tracking-wide hover:text-gray-500 transition-colors relative group"
                >
                  {link.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:scale-110 transition-transform"
              >
                <FiSearch className="w-5 h-5" />
              </button>
              
              <Link to={user ? (user.role === 'admin' ? '/admin/dashboard' : user.role === 'seller' ? '/seller/dashboard' : '/profile') : '/login'} className="hover:scale-110 transition-transform">
                <FiUser className="w-5 h-5" />
              </Link>
              
              {(!user || user.role === 'buyer') && (
                <button 
                  onClick={() => {
                    if (!user) {
                      dispatch({ type: 'ui/openLoginModal' });
                    } else {
                      window.dispatchEvent(new CustomEvent('app-navigate', { detail: '/cart' }));
                    }
                  }}
                  className="relative hover:scale-110 transition-transform"
                >
                  <FiShoppingBag className="w-5 h-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              )}

              {/* Mobile menu button */}
              <button
                className="md:hidden hover:scale-110 transition-transform"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <FiMenu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Dropdown */}
        <AnimatePresence>
          {isSearchOpen && (
            <SearchInput isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-white z-50 p-6 md:hidden shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="font-bold text-xl tracking-widest uppercase">LUXE.</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex flex-col space-y-6 flex-grow">
                {navLinks.map((link, i) => (
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.title}
                  >
                    <Link
                      to={link.path}
                      className="text-2xl font-medium tracking-wide"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.title}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-6 border-t border-border">
                {user ? (
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      dispatch(logout());
                    }}
                    className="w-full py-3 bg-primary text-white font-medium tracking-wider uppercase rounded hover:bg-black transition-colors"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 bg-primary text-white font-medium tracking-wider uppercase rounded hover:bg-black transition-colors flex justify-center"
                  >
                    Login / Sign Up
                  </Link>
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
