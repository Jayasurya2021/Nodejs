import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiBox, FiDollarSign, FiTrendingUp, FiShoppingBag, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const SellerDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/seller/analytics', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setStats(data);
      } catch (error) {
        toast.error('Failed to load seller analytics');
      } finally {
        setIsLoading(false);
      }
    };
    if (user && user.token) {
      fetchStats();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Revenue', value: `$${stats?.totalRevenue?.toFixed(2) || '0.00'}`, icon: FiDollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Products Listed', value: stats?.totalProducts || 0, icon: FiBox, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Items Sold', value: stats?.totalSales || 0, icon: FiTrendingUp, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { title: 'Orders Received', value: stats?.totalOrders || 0, icon: FiShoppingBag, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Seller Dashboard</h1>
            <p className="text-gray-500 mt-2">Welcome back, {user?.name}. Here's what's happening with your store today.</p>
          </div>
          <Link
            to="/seller/product/new"
            className="flex items-center gap-2 bg-black text-white px-6 py-3 font-semibold rounded hover:bg-gray-800 transition-colors"
          >
            <FiPlus /> Add New Product
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4"
            >
              <div className={`p-4 rounded-full ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional features (like charts or recent orders) would go here */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
          <p>More features coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
