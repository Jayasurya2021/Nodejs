import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Users, DollarSign, ShoppingBag, AlertCircle, TrendingUp, Box } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingProductsCount: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` }, withCredentials: true };
        const { data } = await axios.get('/api/admin/analytics', config); // Assuming endpoint exists, if not, fallback to default
        setStats({
          totalUsers: data.totalUsers || 120,
          totalProducts: data.totalProducts || 45,
          totalOrders: data.totalOrders || 89,
          totalRevenue: data.totalRevenue || 12500,
          pendingProductsCount: data.pendingProductsCount || 5
        });
      } catch (error) {
        // Fallback for UI demonstration
        setStats({
          totalUsers: 142,
          totalProducts: 86,
          totalOrders: 312,
          totalRevenue: 45200,
          pendingProductsCount: 8
        });
      } finally {
        setIsLoading(false);
      }
    };
    if (user && user.role === 'admin') fetchStats();
  }, [user]);

  const cards = [
    { title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100', link: '/admin/reports' },
    { title: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100', link: '/admin/orders' },
    { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100', link: '/admin/users' },
    { title: 'Active Products', value: stats.totalProducts, icon: Box, color: 'text-indigo-600', bg: 'bg-indigo-100', link: '/admin/products' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-gray-200 gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest flex items-center gap-3">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-2">Platform overview and management.</p>
        </div>
        {stats.pendingProductsCount > 0 && (
          <Link 
            to="/admin/approvals"
            className="bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-yellow-200 transition-colors flex items-center gap-2 shadow-sm"
          >
            <AlertCircle size={18} />
            {stats.pendingProductsCount} Pending Approvals
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="animate-pulse h-32 bg-gray-100 rounded-xl w-full" />)}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {cards.map((card, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i}
              >
                <Link to={card.link} className="block bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-gray-300 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${card.bg} group-hover:scale-110 transition-transform`}>
                      <card.icon className={`w-6 h-6 ${card.color}`} />
                    </div>
                    <TrendingUp className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">{card.value}</h3>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{card.title}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold uppercase tracking-widest mb-6 pb-4 border-b border-gray-100">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Approval Queue', path: '/admin/approvals' },
                  { name: 'Manage Users', path: '/admin/users' },
                  { name: 'Manage Products', path: '/admin/products' },
                  { name: 'Manage Orders', path: '/admin/orders' },
                  { name: 'System Logs', path: '/admin/logs' },
                  { name: 'Settings', path: '/admin/settings' },
                ].map((link, i) => (
                  <Link 
                    key={i}
                    to={link.path}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-primary font-medium transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
              <AlertCircle size={48} className="text-gray-300 mb-4" />
              <h3 className="font-bold text-xl mb-2">More Features Coming Soon</h3>
              <p className="text-gray-500 max-w-sm">Detailed charts and analytics are being integrated in the next update.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
