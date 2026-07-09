import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

// Pages where footer should NOT be shown
const NO_FOOTER_PAGES = ['/cart', '/login', '/signup', '/checkout'];

const Layout = () => {
  const { pathname } = useLocation();
  const showFooter = !NO_FOOTER_PAGES.includes(pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 pb-10">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
