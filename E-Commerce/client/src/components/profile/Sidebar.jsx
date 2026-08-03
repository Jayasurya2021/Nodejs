import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { 
  Package, Heart, MapPin, User, CreditCard, 
  Bell, Shield, Star, Clock, HelpCircle, LogOut 
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navItems = [
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'reviews', label: 'Reviews & Ratings', icon: Star },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Profile Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm text-center">
        <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-4 font-black tracking-widest uppercase shadow-md">
          {user?.name?.charAt(0)}
        </div>
        <h2 className="text-xl font-bold tracking-widest uppercase mb-1">{user?.name}</h2>
        <p className="text-gray-500 text-sm mb-6">{user?.email}</p>
        
        <button 
          onClick={handleLogout}
          className="w-full py-2.5 flex items-center justify-center gap-2 bg-transparent border border-black text-black text-xs uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all duration-300 rounded-md"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
      
      {/* Navigation Menu */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm flex flex-col">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 text-left py-4 px-6 text-sm font-semibold tracking-wide transition-colors border-l-4 ${
                isActive 
                  ? 'bg-gray-50 text-black border-black' 
                  : 'text-gray-500 border-transparent hover:bg-gray-50 hover:text-black'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-black' : 'text-gray-400'} />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
