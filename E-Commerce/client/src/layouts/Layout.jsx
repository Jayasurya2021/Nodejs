import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

// Pages where footer should NOT be shown
const NO_FOOTER_PAGES = ['/cart', '/login', '/signup', '/checkout'];

const Layout = () => {
  const { pathname } = useLocation();
  const showFooter = pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main 
          key={pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex-grow pt-20 pb-10"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
