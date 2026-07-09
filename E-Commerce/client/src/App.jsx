import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import BuyerRoute from './components/routes/BuyerRoute';
import SellerRoute from './components/routes/SellerRoute';
import AdminRoute from './components/routes/AdminRoute';
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

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetails />} />
          {/* Guest Routes */}
          <Route element={<GuestRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          
          <Route path="forbidden" element={<Forbidden />} />
          <Route path="server-error" element={<ServerError />} />
          <Route path="network-error" element={<NetworkError />} />

          {/* Protected Routes Wrapper */}
          <Route element={<ProtectedRoute />}>
            {/* Buyer Routes */}
            <Route element={<BuyerRoute />}>
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="profile" element={<Profile />} />
              <Route path="orders" element={<Orders />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="addresses" element={<Addresses />} />
              <Route path="order/:id" element={<OrderDetails />} />
            </Route>
            
            {/* Seller Routes */}
            <Route element={<SellerRoute />}>
              <Route path="seller/dashboard" element={<SellerDashboard />} />
              <Route path="seller/products" element={<ManageProducts />} />
              <Route path="seller/product/new" element={<CreateProduct />} />
              <Route path="seller/product/:id/edit" element={<EditProduct />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/approvals" element={<ApprovalQueue />} />
              <Route path="admin/users" element={<UsersList />} />
              <Route path="admin/orders" element={<OrdersList />} />
              <Route path="admin/products" element={<ManageProducts />} /> {/* Can reuse seller ManageProducts for now or create dedicated one */}
              <Route path="admin/product/:id/edit" element={<ProductEdit />} />
            </Route>
          </Route>

          {/* Fallback 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


