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
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
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
                <div key={order._id} className="border border-border p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 pb-4 border-b border-border gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Order Number</p>
                      <p className="font-semibold">{order._id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Date</p>
                      <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total</p>
                      <p className="font-semibold">${order.totalPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Status</p>
                      <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full ${
                        order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex-shrink-0 w-20 relative">
                        <img src={item.image} alt={item.name} className="w-full h-24 object-cover" />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
                          {item.qty}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button onClick={() => navigate(`/order/${order._id}`)} className="text-xs border-b border-black pb-1 uppercase tracking-widest font-bold">View Details</button>
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
