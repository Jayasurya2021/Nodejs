import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { logout } from '../redux/slices/authSlice';
import axios from 'axios';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      const fetchMyOrders = async () => {
        try {
          const { data } = await axios.get('/api/orders/myorders', {
            withCredentials: true
          });
          setOrders(data);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      };
      fetchMyOrders();
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <motion.div
      initial="page-enter"
      animate="page-enter-active"
      exit="page-exit-active"
      className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-gray-50 p-6 shadow-sm mb-6 text-center">
            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-4 font-bold tracking-widest uppercase">
              {user?.name?.charAt(0)}
            </div>
            <h2 className="text-xl font-bold tracking-widest uppercase">{user?.name}</h2>
            <p className="text-gray-500 text-sm mb-6">{user?.email}</p>
            
            <button 
              onClick={handleLogout}
              className="w-full py-2 bg-transparent border border-black text-black text-xs uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
          
          <div className="flex flex-col space-y-2">
            <button onClick={() => navigate('/profile')} className="text-left py-3 px-4 bg-black text-white text-sm font-semibold tracking-widest uppercase">My Orders</button>
            <button onClick={() => navigate('/wishlist')} className="text-left py-3 px-4 hover:bg-gray-50 text-gray-700 text-sm font-semibold tracking-widest uppercase transition-colors">Wishlist</button>
            <button onClick={() => navigate('/addresses')} className="text-left py-3 px-4 hover:bg-gray-50 text-gray-700 text-sm font-semibold tracking-widest uppercase transition-colors">Addresses</button>
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-bold tracking-widest uppercase mb-8">My Orders</h2>
          
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-gray-100 w-full"></div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 border border-border">
              <p className="text-gray-500 mb-4 uppercase tracking-widest text-sm">You haven't placed any orders yet.</p>
              <button onClick={() => navigate('/shop')} className="border-b border-black text-xs uppercase tracking-widest font-bold pb-1">Start Shopping</button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="flex flex-col xl:flex-row items-center justify-between border border-gray-100 bg-white p-4 hover:border-black hover:shadow-md transition-all duration-300 gap-6">
                  {/* Images on the left */}
                  <div className="flex -space-x-4 overflow-hidden p-2 flex-shrink-0">
                    {order.orderItems.slice(0, 3).map((item, index) => (
                      <div key={index} className="relative z-10 w-14 h-14 rounded-full border-2 border-white shadow-sm bg-gray-50 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {order.orderItems.length > 3 && (
                      <div className="w-14 h-14 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-black z-10">
                        +{order.orderItems.length - 3}
                      </div>
                    )}
                  </div>
                  
                  {/* Order Info */}
                  <div className="flex-1 flex flex-wrap md:flex-nowrap items-center justify-between gap-6 w-full px-4">
                    <div className="text-center md:text-left">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-bold">Order ID</p>
                      <p className="font-bold text-sm uppercase truncate max-w-[120px]">{order._id.substring(0, 8)}...</p>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-bold">Date</p>
                      <p className="font-bold text-sm">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-bold">Total</p>
                      <p className="font-bold text-sm">₹{order.totalPrice.toFixed(2)}</p>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-bold">Status</p>
                      <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${
                        order.isDelivered ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                      }`}>
                        {order.orderStatus || (order.isDelivered ? 'Delivered' : 'Processing')}
                      </span>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="w-full xl:w-auto mt-2 xl:mt-0 flex-shrink-0">
                    <button onClick={() => navigate(`/order/${order._id}`)} className="w-full xl:w-auto px-6 py-3 bg-white border-2 border-black text-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
