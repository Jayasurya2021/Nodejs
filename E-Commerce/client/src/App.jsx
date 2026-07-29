import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forceLogout, checkAuth } from './redux/slices/authSlice';
import { Toaster } from 'react-hot-toast';
import Layout from './layouts/Layout';
import GuestRoute from './components/routes/GuestRoute';
import ProtectedRoute from './components/routes/ProtectedRoute';
import LoginModal from './components/LoginModal';
import Loading from './components/Loading';

// Helper for default exports
const lazyImport = (path) => async () => {
  const module = await path();
  return { Component: module.default || module.Component || Object.values(module)[0] };
};

const GlobalEventListener = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNavigate = (e) => {
      if (location.pathname !== e.detail) {
        navigate(e.detail);
      }
    };
    const handleLogout = () => {
      dispatch(forceLogout());
    };

    window.addEventListener('app-navigate', handleNavigate);
    window.addEventListener('app-logout', handleLogout);

    return () => {
      window.removeEventListener('app-navigate', handleNavigate);
      window.removeEventListener('app-logout', handleLogout);
    };
  }, [navigate, location.pathname, dispatch]);

  return (
    <>
      <LoginModal />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<GlobalEventListener />}>
      <Route path="/" element={<Layout />}>
        {/* Public / Guest Routes */}
        <Route index lazy={lazyImport(() => import('./pages/Home'))} />
        <Route path="shop" lazy={lazyImport(() => import('./pages/Shop'))} />
        <Route path="product/:id" lazy={lazyImport(() => import('./pages/ProductDetails'))} />
        <Route path="categories" lazy={lazyImport(() => import('./pages/StaticPages').then(m => ({ default: m.Categories })))} />
        <Route path="brands" lazy={lazyImport(() => import('./pages/StaticPages').then(m => ({ default: m.Brands })))} />
        <Route path="contact" lazy={lazyImport(() => import('./pages/StaticPages').then(m => ({ default: m.Contact })))} />
        <Route path="faq" lazy={lazyImport(() => import('./pages/StaticPages').then(m => ({ default: m.FAQ })))} />
        <Route path="reviews" lazy={lazyImport(() => import('./pages/StaticPages').then(m => ({ default: m.Reviews })))} />
        <Route path="sellers" lazy={lazyImport(() => import('./pages/StaticPages').then(m => ({ default: m.SellerList })))} />
        <Route path="offers" lazy={lazyImport(() => import('./pages/StaticPages').then(m => ({ default: m.Offers })))} />
        <Route path="blogs" lazy={lazyImport(() => import('./pages/StaticPages').then(m => ({ default: m.Blogs })))} />
        <Route path="privacy-policy" lazy={lazyImport(() => import('./pages/StaticPages').then(m => ({ default: m.PrivacyPolicy })))} />
        <Route path="terms" lazy={lazyImport(() => import('./pages/StaticPages').then(m => ({ default: m.Terms })))} />
        <Route path="shipping-policy" lazy={lazyImport(() => import('./pages/StaticPages').then(m => ({ default: m.ShippingPolicy })))} />

        <Route path="forbidden" lazy={lazyImport(() => import('./pages/Forbidden'))} />
        <Route path="server-error" lazy={lazyImport(() => import('./pages/errors/ServerError'))} />
        <Route path="network-error" lazy={lazyImport(() => import('./pages/errors/NetworkError'))} />

        {/* Guest-only Routes */}
        <Route element={<GuestRoute />}>
          <Route path="login" lazy={lazyImport(() => import('./pages/Login'))} />
          <Route path="signup" lazy={lazyImport(() => import('./pages/Signup'))} />
        </Route>

        {/* Pending Profile Route */}
        <Route element={<ProtectedRoute allowedRoles={['pending']} />}>
          <Route path="complete-profile" lazy={lazyImport(() => import('./pages/CompleteProfile'))} />
        </Route>

        {/* Shared Authenticated Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="profile" lazy={lazyImport(() => import('./pages/Profile'))} />
        </Route>

        {/* Buyer Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['buyer', 'admin']} />}>
          <Route path="cart" lazy={lazyImport(() => import('./pages/Cart'))} />
          <Route path="checkout" lazy={lazyImport(() => import('./pages/Checkout'))} />
          <Route path="orders" lazy={lazyImport(() => import('./pages/Orders'))} />
          <Route path="wishlist" lazy={lazyImport(() => import('./pages/Wishlist'))} />
          <Route path="addresses" lazy={lazyImport(() => import('./pages/Addresses'))} />
          <Route path="order/:id" lazy={lazyImport(() => import('./pages/OrderDetails'))} />
        </Route>

        {/* Seller Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['seller']} />}>
          <Route path="seller/dashboard" lazy={lazyImport(() => import('./pages/seller/SellerDashboard'))} />
          <Route path="seller/products" lazy={lazyImport(() => import('./pages/seller/ManageProducts'))} />
          <Route path="seller/product/new" lazy={lazyImport(() => import('./pages/seller/CreateProduct'))} />
          <Route path="seller/product/:id/edit" lazy={lazyImport(() => import('./pages/seller/EditProduct'))} />
          <Route path="seller/orders" lazy={lazyImport(() => import('./pages/admin/OrdersList'))} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="admin/dashboard" lazy={lazyImport(() => import('./pages/admin/AdminDashboard'))} />
          <Route path="admin/approvals" lazy={lazyImport(() => import('./pages/admin/ApprovalQueue'))} />
          <Route path="admin/users" lazy={lazyImport(() => import('./pages/admin/UsersList'))} />
          <Route path="admin/orders" lazy={lazyImport(() => import('./pages/admin/OrdersList'))} />
          <Route path="admin/products" lazy={lazyImport(() => import('./pages/seller/ManageProducts'))} />
          <Route path="admin/product/:id/edit" lazy={lazyImport(() => import('./pages/admin/ProductEdit'))} />
        </Route>

        {/* Fallback 404 Route */}
        <Route path="*" lazy={lazyImport(() => import('./pages/errors/NotFound'))} />
      </Route>
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();
  const { isCheckingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Removed isCheckingAuth blocking render to allow instant initial paint

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;


