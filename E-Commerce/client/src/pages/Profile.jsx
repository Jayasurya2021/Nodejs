import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

// Import Components
import Sidebar from '../components/profile/Sidebar';
import OrdersTab from '../components/profile/OrdersTab';
import WishlistTab from '../components/profile/WishlistTab';
import AddressTab from '../components/profile/AddressTab';
import ProfileInfoTab from '../components/profile/ProfileInfoTab';
import PaymentTab from '../components/profile/PaymentTab';
import NotificationTab from '../components/profile/NotificationTab';
import SecurityTab from '../components/profile/SecurityTab';
import ReviewsTab from '../components/profile/ReviewsTab';
import SupportTab from '../components/profile/SupportTab';

const ProfileDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // Read tab from query params, default to 'profile'
  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get('tab') || 'profile';
  
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Update URL without full page reload
    navigate(`/profile?tab=${tabId}`, { replace: true });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <OrdersTab />;
      case 'wishlist':
        return <WishlistTab />;
      case 'addresses':
        return <AddressTab />;
      case 'profile':
        return <ProfileInfoTab />;
      case 'payment':
        return <PaymentTab />;
      case 'notifications':
        return <NotificationTab />;
      case 'security':
        return <SecurityTab />;
      case 'reviews':
        return <ReviewsTab />;
      case 'support':
        return <SupportTab />;
      default:
        return <ProfileInfoTab />;
    }
  };

  if (!user) return null;

  return (
    <motion.div
      initial="page-enter"
      animate="page-enter-active"
      exit="page-exit-active"
      className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl min-h-screen bg-gray-50/50"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar area */}
        <div className="w-full lg:w-1/4 flex-shrink-0">
          <div className="sticky top-28">
            <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
          </div>
        </div>

        {/* Content area */}
        <div className="w-full lg:w-3/4 flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileDashboard;
