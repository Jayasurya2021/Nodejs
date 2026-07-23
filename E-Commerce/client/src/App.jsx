import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forceLogout, checkAuth } from './redux/slices/authSlice';
import { Toaster } from 'react-hot-toast';
import Layout from './layouts/Layout';
import GuestRoute from './components/routes/GuestRoute';
import ProtectedRoute from './components/routes/ProtectedRoute';
import LoginModal from './components/LoginModal';
import Loading from './components/Loading';

// Lazy loaded page components
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Profile = lazy(() => import('./pages/Profile'));
const CompleteProfile = lazy(() => import('./pages/CompleteProfile'));
const OrderDetails = lazy(() => import('./pages/OrderDetails'));

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ApprovalQueue = lazy(() => import('./pages/admin/ApprovalQueue'));
const UsersList = lazy(() => import('./pages/admin/UsersList'));
const OrdersList = lazy(() => import('./pages/admin/OrdersList'));
const ProductEdit = lazy(() => import('./pages/admin/ProductEdit'));
const Forbidden = lazy(() => import('./pages/Forbidden'));
const SellerDashboard = lazy(() => import('./pages/seller/SellerDashboard'));
const NotFound = lazy(() => import('./pages/errors/NotFound'));
const ServerError = lazy(() => import('./pages/errors/ServerError'));
const NetworkError = lazy(() => import('./pages/errors/NetworkError'));
const Orders = lazy(() => import('./pages/Orders'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Addresses = lazy(() => import('./pages/Addresses'));
const ManageProducts = lazy(() => import('./pages/seller/ManageProducts'));
const CreateProduct = lazy(() => import('./pages/seller/CreateProduct'));
const EditProduct = lazy(() => import('./pages/seller/EditProduct'));

// Lazy load named exports from StaticPages
const Categories = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.Categories })));
const Brands = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.Brands })));
const Contact = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.Contact })));
const FAQ = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.FAQ })));
const Reviews = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.Reviews })));
const SellerList = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.SellerList })));
const Offers = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.Offers })));
const Blogs = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.Blogs })));
const PrivacyPolicy = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.PrivacyPolicy })));
const Terms = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.Terms })));
const ShippingPolicy = lazy(() => import('./pages/StaticPages').then(m => ({ default: m.ShippingPolicy })));

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

  return null;
};

function App() {
  const dispatch = useDispatch();
  const { isCheckingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isCheckingAuth) {
    return <Loading />;
  }

  return (
    <Router>
      <GlobalEventListener />
      <Toaster position="top-right" reverseOrder={false} />
      <LoginModal />
      <Suspense fallback={<Loading />}>
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

            {/* Pending Profile Route */}
            <Route element={<ProtectedRoute allowedRoles={['pending']} />}>
              <Route path="complete-profile" element={<CompleteProfile />} />
            </Route>

            {/* Shared Authenticated Routes (Accessible to all roles except pending) */}
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Buyer Protected Routes (For logged in buyers, also allowed for other roles depending on logic, but typically buyer/admin) */}
            <Route element={<ProtectedRoute allowedRoles={['buyer', 'admin']} />}>
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
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
      </Suspense>
    </Router>
  );
}

export default App;


