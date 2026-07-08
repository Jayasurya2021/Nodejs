import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const OrderDetails = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${id}`, {
          withCredentials: true
        });
        setOrder(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (isLoading) return <div className="text-center py-20 animate-pulse">Loading order details...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!order) return null;

  return (
    <motion.div
      initial="page-enter"
      animate="page-enter-active"
      exit="page-exit-active"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-widest uppercase mb-2">Order Details</h1>
          <p className="text-gray-500 text-sm tracking-widest uppercase">Order # {order._id}</p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-sm font-semibold mb-1">{new Date(order.createdAt).toLocaleDateString()}</p>
          <span className={`px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full ${
            order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {order.orderStatus}
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Info */}
        <div className="w-full lg:w-2/3 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shipping Info */}
            <div className="bg-gray-50 p-6 border border-border">
              <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Shipping Information</h3>
              <p className="font-semibold mb-1">{order.user.name}</p>
              <p className="text-sm text-gray-600 mb-1">{order.shippingAddress.street}</p>
              <p className="text-sm text-gray-600 mb-1">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              </p>
              <p className="text-sm text-gray-600">{order.shippingAddress.country}</p>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold">Delivery Status:</p>
                {order.isDelivered ? (
                  <p className="text-sm text-green-600 mt-1">Delivered on {new Date(order.deliveredAt).toLocaleDateString()}</p>
                ) : (
                  <p className="text-sm text-yellow-600 mt-1">Not Delivered</p>
                )}
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-gray-50 p-6 border border-border">
              <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Payment Information</h3>
              <p className="text-sm text-gray-600 mb-4">Method: <span className="font-semibold text-black">{order.paymentMethod}</span></p>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold">Payment Status:</p>
                {order.isPaid ? (
                  <p className="text-sm text-green-600 mt-1">Paid on {new Date(order.paidAt).toLocaleDateString()}</p>
                ) : (
                  <p className="text-sm text-red-600 mt-1">Not Paid</p>
                )}
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-lg font-bold tracking-widest uppercase mb-6 border-b border-border pb-2">Order Items</h3>
            <div className="space-y-6">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex gap-4 border-b border-gray-100 pb-4">
                  <img src={item.image} alt={item.name} className="w-20 h-24 object-cover" />
                  <div className="flex-1 flex flex-col justify-center">
                    <Link to={`/product/${item.product}`} className="font-semibold text-sm hover:text-gray-500 transition-colors mb-1">{item.name}</Link>
                    <div className="flex items-center gap-4 text-xs text-gray-500 uppercase tracking-widest">
                      {item.size && <span>Size: {item.size}</span>}
                      {item.color && <span>Color: {item.color}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-end">
                    <span className="text-sm font-medium mb-1">${item.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-500 uppercase">Qty: {item.qty}</span>
                    <span className="text-sm font-bold mt-2">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 p-8 border border-border">
            <h2 className="text-lg font-bold tracking-widest uppercase mb-6 border-b border-gray-200 pb-4">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">${order.shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span className="font-medium">${order.taxPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-bold tracking-widest uppercase text-base">Total</span>
                <span className="text-2xl font-bold">${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {!order.isPaid && order.paymentMethod !== 'COD' && (
              <button 
                className="w-full py-4 bg-black text-white text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors"
                onClick={() => toast.success('Razorpay flow would initiate here')}
              >
                Pay Now
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderDetails;
