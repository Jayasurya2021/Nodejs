import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCartFromBackend = createAsyncThunk(
  'cart/fetchCartFromBackend',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/users/cart', { withCredentials: true });
      return data.cartItems;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

export const syncCartToBackend = createAsyncThunk(
  'cart/syncCartToBackend',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { cartItems } = getState().cart;
      const { data } = await axios.post('/api/users/cart', { cartItems }, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to sync cart');
    }
  }
);

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
    addToCartLocal: (state, action) => {
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
    removeFromCartLocal: (state, action) => {
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
    clearCartItemsLocal: (state, action) => {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartFromBackend.fulfilled, (state, action) => {
      const dbCart = action.payload;
      const localCart = [...state.cartItems];

      dbCart.forEach(dbItem => {
        const existItem = localCart.find(
          (x) => x._id === dbItem._id && x.selectedSize === dbItem.selectedSize && (x.selectedVariant?.colorName === dbItem.selectedVariant?.colorName || x.color === dbItem.color)
        );
        if (!existItem) {
          localCart.push(dbItem);
        }
      });

      state.cartItems = localCart;
      updateCart(state);
    });
  }
});

export const {
  addToCartLocal,
  removeFromCartLocal,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItemsLocal,
} = cartSlice.actions;

export const addToCart = (item) => (dispatch, getState) => {
  dispatch(addToCartLocal(item));
  if (getState().auth.user) {
    dispatch(syncCartToBackend());
  }
};

export const removeFromCart = (item) => (dispatch, getState) => {
  dispatch(removeFromCartLocal(item));
  if (getState().auth.user) {
    dispatch(syncCartToBackend());
  }
};

export const clearCartItems = () => (dispatch, getState) => {
  dispatch(clearCartItemsLocal());
  if (getState().auth.user) {
    dispatch(syncCartToBackend());
  }
};

export default cartSlice.reducer;
