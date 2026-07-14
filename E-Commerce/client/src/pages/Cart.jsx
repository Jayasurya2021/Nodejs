import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight } from 'react-icons/fi';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, itemsPrice, taxPrice, shippingPrice, totalPrice } = useSelector((state) => state.cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (product) => {
    dispatch(removeFromCart(product));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <motion.div
      initial="page-enter"
      animate="page-enter-active"
      exit="page-exit-active"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <h1 className="text-3xl font-bold tracking-widest uppercase mb-10 text-center">Shopping Bag</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center">
          <p className="text-gray-500 mb-6 uppercase tracking-widest text-sm">Your bag is currently empty.</p>
          <Link to="/shop" className="px-10 py-4 bg-black text-white text-sm uppercase tracking-widest font-semibold hover:bg-gray-800 transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="hidden md:grid grid-cols-6 gap-4 border-b border-border pb-4 mb-6 text-xs uppercase tracking-widest text-gray-500 font-semibold">
              <div className="col-span-3">Product</div>
              <div className="col-span-1 text-center">Price</div>
              <div className="col-span-1 text-center">Quantity</div>
              <div className="col-span-1 text-right">Total</div>
            </div>

            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={`${item._id}-${item.size}-${item.color}`} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-border pb-6">
                  {/* Product Details */}
                  <div className="col-span-1 md:col-span-3 flex gap-4">
                    <img src={item.selectedVariant?.images?.[0]?.url || item.selectedVariant?.swatchImage?.url || item.images?.[0]?.url || item.thumbnail?.url || 'https://via.placeholder.com/150'} alt={item.title || 'Product'} className="w-24 h-32 object-cover" />
                    <div className="flex flex-col justify-center">
                      <Link to={`/product/${item._id}`} className="font-semibold hover:text-gray-500 transition-colors mb-1">{item.title}</Link>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{item.brand}</p>
                      {item.selectedSize && <p className="text-xs text-gray-500 uppercase">Size: {item.selectedSize}</p>}
                      {item.selectedVariant?.colorName && <p className="text-xs text-gray-500 uppercase">Color: {item.selectedVariant.colorName}</p>}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-1 text-left md:text-center font-medium mt-2 md:mt-0">
                    ₹{(item.price || 0).toFixed(2)}
                  </div>

                  {/* Quantity */}
                  <div className="col-span-1 flex items-center justify-start md:justify-center mt-2 md:mt-0">
                    <div className="flex items-center border border-border w-24">
                      <button 
                        onClick={() => addToCartHandler(item, Math.max(1, item.qty - 1))}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                      >
                        <FiMinus size={12} />
                      </button>
                      <div className="flex-1 text-center text-sm font-medium">{item.qty}</div>
                      <button 
                        onClick={() => addToCartHandler(item, Math.min(item.selectedVariant?.stock || item.stock || 0, item.qty + 1))}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Total & Remove */}
                  <div className="col-span-1 flex items-center justify-between md:justify-end mt-2 md:mt-0">
                    <div className="font-semibold">₹{((item.price || 0) * item.qty).toFixed(2)}</div>
                  <button 
                      onClick={() => removeFromCartHandler(item)}
                      className="text-gray-400 hover:text-red-500 transition-colors ml-4"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-50 p-8">
              <h2 className="text-lg font-bold tracking-widest uppercase mb-6 border-b border-gray-200 pb-4">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">₹{itemsPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">{shippingPrice === 0 ? 'Free' : `₹${shippingPrice}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span className="font-medium">₹{taxPrice}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="font-bold tracking-widest uppercase text-base">Total</span>
                  <span className="text-2xl font-bold">₹{totalPrice}</span>
                </div>
              </div>

              <button 
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                className="w-full py-4 bg-black text-white text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors flex justify-center items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Checkout <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
