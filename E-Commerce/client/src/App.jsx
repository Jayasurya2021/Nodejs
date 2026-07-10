import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import OrderDetails from './pages/OrderDetails';

import AdminDashboard from './pages/admin/AdminDashboard';
import ApprovalQueue from './pages/admin/ApprovalQueue';
import UsersList from './pages/admin/UsersList';
import OrdersList from './pages/admin/OrdersList';
import ProductEdit from './pages/admin/ProductEdit';
import Forbidden from './pages/Forbidden';
import GuestRoute from './components/routes/GuestRoute';
import ProtectedRoute from './components/routes/ProtectedRoute';
import SellerDashboard from './pages/seller/SellerDashboard';
import NotFound from './pages/errors/NotFound';
import ServerError from './pages/errors/ServerError';
import NetworkError from './pages/errors/NetworkError';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Addresses from './pages/Addresses';
import ManageProducts from './pages/seller/ManageProducts';
import CreateProduct from './pages/seller/CreateProduct';
import EditProduct from './pages/seller/EditProduct';
import LoginModal from './components/LoginModal';
import { Categories, Brands, Contact, FAQ, Reviews, SellerList, Offers, Blogs, PrivacyPolicy, Terms, ShippingPolicy } from './pages/StaticPages';

const GlobalNavigateListener = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleNavigate = (e) => {
      if (location.pathname !== e.detail) {
        navigate(e.detail);
      }
    };
    window.addEventListener('app-navigate', handleNavigate);
    return () => window.removeEventListener('app-navigate', handleNavigate);
  }, [navigate, location.pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <GlobalNavigateListener />
      <Toaster position="top-center" reverseOrder={false} />
      <LoginModal />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public / Guest Routes (Accessible to everyone) */}
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="categories" element={<Categories />} />
          <Route path="brands" element={<Brands />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="sellers" element={<SellerList />} />
          <Route path="offers" element={<Offers />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="shipping-policy" element={<ShippingPolicy />} />
          
          <Route path="forbidden" element={<Forbidden />} />
          <Route path="server-error" element={<ServerError />} />
          <Route path="network-error" element={<NetworkError />} />

          {/* Guest-only Routes (Redirect logged in users away) */}
          <Route element={<GuestRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* Buyer Protected Routes (For logged in buyers, also allowed for other roles depending on logic, but typically buyer/admin) */}
          <Route element={<ProtectedRoute allowedRoles={['buyer', 'admin']} />}>
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="order/:id" element={<OrderDetails />} />
          </Route>
          
          {/* Seller Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['seller']} />}>
            <Route path="seller/dashboard" element={<SellerDashboard />} />
            <Route path="seller/products" element={<ManageProducts />} />
            <Route path="seller/product/new" element={<CreateProduct />} />
            <Route path="seller/product/:id/edit" element={<EditProduct />} />
            <Route path="seller/orders" element={<OrdersList />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/approvals" element={<ApprovalQueue />} />
            <Route path="admin/users" element={<UsersList />} />
            <Route path="admin/orders" element={<OrdersList />} />
            <Route path="admin/products" element={<ManageProducts />} />
            <Route path="admin/product/:id/edit" element={<ProductEdit />} />
          </Route>

          {/* Fallback 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


