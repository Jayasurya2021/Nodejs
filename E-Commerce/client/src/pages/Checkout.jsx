import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { saveShippingAddress, savePaymentMethod } from '../redux/slices/cartSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FiCheck, FiCreditCard, FiSmartphone, FiTruck, FiMapPin, FiArrowRight } from 'react-icons/fi';

// ─── Progress Steps ──────────────────────────────────────────────────────
const STEPS = ['Shipping', 'Payment', 'Review'];

const StepIndicator = ({ currentStep }) => (
  <div className="flex items-center justify-center mb-12">
    {STEPS.map((step, i) => (
      <div key={step} className="flex items-center">
        <div className="flex flex-col items-center">
          <motion.div
            animate={{
              backgroundColor: i <= currentStep ? '#000' : '#f3f4f6',
              color: i <= currentStep ? '#fff' : '#9ca3af',
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all duration-500"
            style={{ borderColor: i <= currentStep ? '#000' : '#e5e7eb' }}
          >
            {i < currentStep ? <FiCheck size={16} strokeWidth={3} /> : i + 1}
          </motion.div>
          <span className={`text-xs mt-2 uppercase tracking-widest font-semibold transition-colors ${i <= currentStep ? 'text-black' : 'text-gray-400'}`}>
            {step}
          </span>
        </div>
        {i < STEPS.length - 1 && (
          <div className={`w-24 md:w-36 h-0.5 mx-2 mb-5 transition-colors duration-500 ${i < currentStep ? 'bg-black' : 'bg-gray-200'}`} />
        )}
      </div>
    ))}
  </div>
);

// ─── Payment Method Options ──────────────────────────────────────────────
const PAYMENT_OPTIONS = [
  {
    id: 'card',
    label: 'Credit / Debit Card',
    icon: FiCreditCard,
    desc: 'Visa, Mastercard, Rupay & more',
    brands: ['VISA', 'MC', 'RUP'],
    color: 'bg-gradient-to-r from-blue-600 to-blue-800'
  },
  {
    id: 'upi',
    label: 'UPI',
    icon: FiSmartphone,
    desc: 'GPay, PhonePe, Paytm & more',
    brands: ['GPay', 'PhPe', 'Paytm'],
    color: 'bg-gradient-to-r from-green-600 to-green-700'
  },
  {
    id: 'razorpay',
    label: 'Razorpay',
    icon: FiCreditCard,
    desc: 'Cards, UPI, NetBanking, Wallets',
    brands: ['R/'],
    color: 'bg-gradient-to-r from-indigo-600 to-indigo-800'
  },
  {
    id: 'cod',
    label: 'Cash on Delivery',
    icon: FiTruck,
    desc: 'Pay when your order arrives',
    brands: ['COD'],
    color: 'bg-gradient-to-r from-gray-700 to-gray-900'
  },
];

const Checkout = () => {
  const { cartItems, shippingAddress, itemsPrice, taxPrice, shippingPrice, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [address, setAddress] = useState({
    street: shippingAddress.street || '',
    city: shippingAddress.city || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || '',
    state: shippingAddress.state || '',
  });
  const [paymentMethod, setPaymentMethodState] = useState('razorpay');
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    if (!user) navigate('/login?redirect=/checkout');
  }, [user, navigate]);

  const handleAddressChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const validateShipping = () => {
    if (!address.street || !address.city || !address.postalCode || !address.country || !address.state) {
      toast.error('Please fill in all shipping fields');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 0 && !validateShipping()) return;
    dispatch(saveShippingAddress(address));
    setStep((prev) => Math.min(2, prev + 1));
  };

  const placeOrderHandler = async () => {
    dispatch(saveShippingAddress(address));
    dispatch(savePaymentMethod(paymentMethod));
    try {
      setIsPlacingOrder(true);
      const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
      const orderData = { orderItems: cartItems, shippingAddress: address, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice };
      const { data } = await axios.post('/api/orders', orderData, config);
      setIsPlacingOrder(false);
      toast.success('Order Placed Successfully! 🎉');
      navigate(`/order/${data._id}`);
    } catch (error) {
      setIsPlacingOrder(false);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24 flex flex-col items-center">
        <p className="text-gray-500 mb-6 uppercase tracking-widest text-sm">Your bag is currently empty.</p>
        <button onClick={() => navigate('/shop')} className="px-10 py-4 bg-black text-white text-sm uppercase tracking-widest font-bold hover:bg-gray-900 transition-colors">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <h1 className="text-3xl font-black tracking-widest uppercase mb-4 text-center">Checkout</h1>
      <StepIndicator currentStep={step} />

      <div className="flex flex-col lg:flex-row gap-12">
        {/* ─── LEFT: Steps ─────────────────────────────────────────────── */}
        <div className="w-full lg:w-2/3 space-y-8">

          {/* STEP 0: Shipping Address */}
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
                  <FiMapPin className="text-gray-400" size={20} />
                  <h2 className="text-lg font-black uppercase tracking-widest">Shipping Address</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Street Address *</label>
                    <input
                      type="text" name="street" value={address.street} onChange={handleAddressChange} required
                      placeholder="123 Main Street, Apt 4B"
                      className="w-full border border-gray-200 px-4 py-3.5 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">City *</label>
                    <input
                      type="text" name="city" value={address.city} onChange={handleAddressChange} required
                      placeholder="Mumbai"
                      className="w-full border border-gray-200 px-4 py-3.5 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">State / Province *</label>
                    <input
                      type="text" name="state" value={address.state} onChange={handleAddressChange} required
                      placeholder="Maharashtra"
                      className="w-full border border-gray-200 px-4 py-3.5 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Postal Code *</label>
                    <input
                      type="text" name="postalCode" value={address.postalCode} onChange={handleAddressChange} required
                      placeholder="400001"
                      className="w-full border border-gray-200 px-4 py-3.5 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Country *</label>
                    <input
                      type="text" name="country" value={address.country} onChange={handleAddressChange} required
                      placeholder="India"
                      className="w-full border border-gray-200 px-4 py-3.5 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  className="mt-8 w-full py-4 bg-black text-white text-sm font-black uppercase tracking-widest hover:bg-gray-900 transition-colors flex items-center justify-center gap-3 group"
                >
                  Continue to Payment
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {/* STEP 1: Payment Method */}
            {step === 1 && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
                  <FiCreditCard className="text-gray-400" size={20} />
                  <h2 className="text-lg font-black uppercase tracking-widest">Payment Method</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PAYMENT_OPTIONS.map((option) => (
                    <motion.label
                      key={option.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`relative cursor-pointer rounded-none border-2 p-5 transition-all duration-300 ${
                        paymentMethod === option.id ? 'border-black shadow-lg' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio" name="payment" value={option.id}
                        checked={paymentMethod === option.id}
                        onChange={(e) => setPaymentMethodState(e.target.value)}
                        className="sr-only"
                      />

                      {/* Selected indicator */}
                      {paymentMethod === option.id && (
                        <div className="absolute top-3 right-3 w-5 h-5 bg-black rounded-full flex items-center justify-center">
                          <FiCheck size={10} className="text-white" strokeWidth={3} />
                        </div>
                      )}

                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 ${option.color} rounded flex items-center justify-center flex-shrink-0`}>
                          <option.icon className="text-white" size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-sm mb-0.5">{option.label}</p>
                          <p className="text-xs text-gray-500">{option.desc}</p>
                          <div className="flex gap-1 mt-2">
                            {option.brands.map((b) => (
                              <span key={b} className="text-[9px] font-black bg-gray-100 px-1.5 py-0.5 tracking-widest">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.label>
                  ))}
                </div>

                {/* Card Details Form */}
                <AnimatePresence>
                  {paymentMethod === 'card' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 bg-gray-50 p-6 space-y-4 overflow-hidden"
                    >
                      <h3 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                        <FiCreditCard size={14} /> Card Details
                      </h3>
                      <div>
                        <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1.5 block">Card Number</label>
                        <input
                          type="text" maxLength={19}
                          value={cardDetails.number}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
                            setCardDetails((p) => ({ ...p, number: v }));
                          }}
                          placeholder="1234 5678 9012 3456"
                          className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black bg-white transition-colors font-mono tracking-widest"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1.5 block">Cardholder Name</label>
                        <input
                          type="text"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails((p) => ({ ...p, name: e.target.value }))}
                          placeholder="JOHN DOE"
                          className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black bg-white transition-colors uppercase tracking-widest"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1.5 block">Expiry</label>
                          <input
                            type="text" maxLength={5}
                            value={cardDetails.expiry}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
                              setCardDetails((p) => ({ ...p, expiry: v }));
                            }}
                            placeholder="MM/YY"
                            className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black bg-white transition-colors font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1.5 block">CVV</label>
                          <input
                            type="password" maxLength={4}
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, '') }))}
                            placeholder="•••"
                            className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black bg-white transition-colors font-mono"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === 'upi' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 bg-gray-50 p-6 overflow-hidden"
                    >
                      <h3 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                        <FiSmartphone size={14} /> UPI Details
                      </h3>
                      <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1.5 block">UPI ID</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black bg-white transition-colors"
                      />
                      <p className="text-xs text-gray-400 mt-2">Supports: Google Pay, PhonePe, Paytm, BHIM & all UPI apps</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(0)}
                    className="flex-1 py-4 border-2 border-gray-200 text-black text-sm font-black uppercase tracking-widest hover:border-black transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="flex-2 flex-1 py-4 bg-black text-white text-sm font-black uppercase tracking-widest hover:bg-gray-900 transition-colors flex items-center justify-center gap-3 group"
                  >
                    Review Order
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Review Order */}
            {step === 2 && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-lg font-black uppercase tracking-widest mb-6 pb-3 border-b border-gray-100">Review Your Order</h2>

                {/* Shipping Summary */}
                <div className="bg-gray-50 p-5 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-black uppercase tracking-widest">Shipping To</p>
                    <button onClick={() => setStep(0)} className="text-xs text-gray-500 hover:text-black transition-colors underline underline-offset-2">Edit</button>
                  </div>
                  <p className="text-sm text-gray-600">
                    {address.street}, {address.city}, {address.state} {address.postalCode}, {address.country}
                  </p>
                </div>

                {/* Payment Summary */}
                <div className="bg-gray-50 p-5 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-black uppercase tracking-widest">Payment Method</p>
                    <button onClick={() => setStep(1)} className="text-xs text-gray-500 hover:text-black transition-colors underline underline-offset-2">Edit</button>
                  </div>
                  <p className="text-sm text-gray-600 capitalize">
                    {PAYMENT_OPTIONS.find((p) => p.id === paymentMethod)?.label}
                    {paymentMethod === 'card' && cardDetails.number && ` ••••${cardDetails.number.replace(/\s/g, '').slice(-4)}`}
                    {paymentMethod === 'upi' && upiId && ` — ${upiId}`}
                  </p>
                </div>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <img
                        src={item.images?.[0]?.url || item.image || 'https://via.placeholder.com/80'}
                        alt={item.name}
                        className="w-16 h-20 object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.qty} {item.size ? `| Size: ${item.size}` : ''}</p>
                      </div>
                      <p className="font-bold text-sm">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 py-4 border-2 border-gray-200 text-black text-sm font-black uppercase tracking-widest hover:border-black transition-colors">
                    Back
                  </button>
                  <button
                    onClick={placeOrderHandler}
                    disabled={isPlacingOrder}
                    className="flex-1 py-4 bg-black text-white text-sm font-black uppercase tracking-widest hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isPlacingOrder ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Processing...
                      </span>
                    ) : 'Place Order'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── RIGHT: Order Summary ────────────────────────────────────── */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 p-8 sticky top-24">
            <h2 className="text-base font-black tracking-widest uppercase mb-6 border-b border-gray-200 pb-4">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto no-scrollbar pr-2">
              {cartItems.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="relative flex-shrink-0">
                    <img src={item.images?.[0]?.url || item.image || 'https://via.placeholder.com/60'} alt={item.name} className="w-14 h-18 object-cover" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-xs font-bold truncate">{item.name}</span>
                    {item.size && <span className="text-[10px] text-gray-500 uppercase">Size: {item.size}</span>}
                    <span className="text-xs font-semibold mt-0.5">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm mb-4 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">${itemsPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className={`font-semibold ${shippingPrice === 0 ? 'text-green-600' : ''}`}>
                  {shippingPrice === 0 ? 'FREE' : `$${shippingPrice}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">GST / Tax</span>
                <span className="font-semibold">${taxPrice}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-black tracking-widest uppercase">Total</span>
                <span className="text-2xl font-black">${totalPrice}</span>
              </div>
            </div>

            {/* Security badges */}
            <div className="space-y-2">
              {[
                { icon: FiCheck, text: "256-bit SSL encrypted" },
                { icon: FiCheck, text: "PCI-DSS Compliant" },
                { icon: FiCheck, text: "30-day money-back guarantee" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                  <item.icon size={11} className="text-green-500 flex-shrink-0" strokeWidth={3} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
