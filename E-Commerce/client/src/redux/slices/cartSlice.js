import { createSlice } from '@reduxjs/toolkit';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const calculatePrices = (cartItems) => {
  const itemsPrice = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);
  return { itemsPrice: itemsPrice.toFixed(2), shippingPrice, taxPrice: taxPrice.toFixed(2), totalPrice };
};

const initialPrices = calculatePrices(cartItemsFromStorage);

const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: 'Razorpay',
  ...initialPrices
};

const updateCart = (state) => {
  const prices = calculatePrices(state.cartItems);
  state.itemsPrice = prices.itemsPrice;
  state.shippingPrice = prices.shippingPrice;
  state.taxPrice = prices.taxPrice;
  state.totalPrice = prices.totalPrice;

  localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find(
        (x) => x._id === item._id && x.selectedSize === item.selectedSize && x.selectedVariant?.colorName === item.selectedVariant?.colorName
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id && x.selectedSize === existItem.selectedSize && x.selectedVariant?.colorName === existItem.selectedVariant?.colorName ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => !(x._id === action.payload._id && x.size === action.payload.size && x.color === action.payload.color)
      );
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
