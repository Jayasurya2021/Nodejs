import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { saveShippingAddress, savePaymentMethod } from '../redux/slices/cartSlice';
import toast from 'react-hot-toast';
import axios from 'axios';

const Checkout = () => {
  const { cartItems, shippingAddress, itemsPrice, taxPrice, shippingPrice, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: shippingAddress.street || '',
    city: shippingAddress.city || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || '',
    state: shippingAddress.state || ''
  });

  const [paymentMethod, setPaymentMethodState] = useState('Razorpay');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    }
  }, [user, navigate]);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const placeOrderHandler = async () => {
    if (!address.street || !address.city || !address.postalCode || !address.country || !address.state) {
      toast.error('Please fill in all shipping fields');
      return;
    }

    dispatch(saveShippingAddress(address));
    dispatch(savePaymentMethod(paymentMethod));

    try {
      setIsPlacingOrder(true);
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      };

      const orderData = {
        orderItems: cartItems,
        shippingAddress: address,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
      };

      const { data } = await axios.post('/api/orders', orderData, config);
      
      setIsPlacingOrder(false);
      toast.success('Order Placed Successfully!');
      
      // In a real Razorpay integration, we would initialize Razorpay here using data._id
      // For now, we will redirect to the order details page
      navigate(`/order/${data._id}`);
      
    } catch (error) {
      setIsPlacingOrder(false);
      const message = error.response?.data?.message || error.message;
      toast.error(message);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 flex flex-col items-center">
        <p className="text-gray-500 mb-6 uppercase tracking-widest text-sm">Your bag is currently empty.</p>
        <button onClick={() => navigate('/shop')} className="px-10 py-4 bg-black text-white text-sm uppercase tracking-widest font-semibold hover:bg-gray-800 transition-colors">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial="page-enter"
      animate="page-enter-active"
      exit="page-exit-active"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <h1 className="text-3xl font-bold tracking-widest uppercase mb-10 text-center">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Form */}
        <div className="w-full lg:w-2/3 space-y-10">
          
          {/* Shipping Address */}
          <div>
            <h2 className="text-xl font-bold tracking-widest uppercase mb-6 border-b border-border pb-2">1. Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-gray-500 mb-2 block">Street Address</label>
                <input type="text" name="street" value={address.street} onChange={handleAddressChange} className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors" />
              </div>
              <div className="col-span-1">
                <label className="text-xs uppercase tracking-widest font-semibold text-gray-500 mb-2 block">City</label>
                <input type="text" name="city" value={address.city} onChange={handleAddressChange} className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors" />
              </div>
              <div className="col-span-1">
                <label className="text-xs uppercase tracking-widest font-semibold text-gray-500 mb-2 block">State / Province</label>
                <input type="text" name="state" value={address.state} onChange={handleAddressChange} className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors" />
              </div>
              <div className="col-span-1">
                <label className="text-xs uppercase tracking-widest font-semibold text-gray-500 mb-2 block">Postal Code</label>
                <input type="text" name="postalCode" value={address.postalCode} onChange={handleAddressChange} className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors" />
              </div>
              <div className="col-span-1">
                <label className="text-xs uppercase tracking-widest font-semibold text-gray-500 mb-2 block">Country</label>
                <input type="text" name="country" value={address.country} onChange={handleAddressChange} className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors" />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-xl font-bold tracking-widest uppercase mb-6 border-b border-border pb-2">2. Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer p-4 border border-border hover:border-black transition-colors">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="Razorpay" 
                  checked={paymentMethod === 'Razorpay'} 
                  onChange={(e) => setPaymentMethodState(e.target.value)}
                  className="accent-black w-4 h-4"
                />
                <span className="font-semibold tracking-wider">Razorpay (Cards, UPI, NetBanking)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-4 border border-border hover:border-black transition-colors">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="COD" 
                  checked={paymentMethod === 'COD'} 
                  onChange={(e) => setPaymentMethodState(e.target.value)}
                  className="accent-black w-4 h-4"
                />
                <span className="font-semibold tracking-wider">Cash on Delivery</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 p-8 sticky top-24">
            <h2 className="text-lg font-bold tracking-widest uppercase mb-6 border-b border-gray-200 pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 no-scrollbar">
              {cartItems.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <img src={item.images?.[0]?.url || item.image || 'https://via.placeholder.com/150'} alt={item.name} className="w-16 h-20 object-cover" />
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-xs font-semibold truncate">{item.name}</span>
                    <span className="text-xs text-gray-500 uppercase">Qty: {item.qty}</span>
                    <span className="text-xs font-medium">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-sm mb-6 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">${itemsPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">{shippingPrice === 0 ? 'Free' : `$${shippingPrice}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">GST / Tax</span>
                <span className="font-medium">${taxPrice}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-bold tracking-widest uppercase text-base">Total</span>
                <span className="text-2xl font-bold">${totalPrice}</span>
              </div>
            </div>

            <button 
              onClick={placeOrderHandler}
              disabled={isPlacingOrder}
              className="w-full py-4 bg-black text-white text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors flex justify-center items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isPlacingOrder ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
