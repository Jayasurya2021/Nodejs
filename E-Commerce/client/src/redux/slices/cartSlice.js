import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const syncCartToBackend = createAsyncThunk(
  'cart/syncCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth: { user }, cart: { cartItems } } = getState();
      if (!user) return null;
      
      const response = await axios.post('/api/users/cart', { cartItems });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const initializeCartOnLogin = createAsyncThunk(
  'cart/initializeCart',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { auth: { user }, cart: { cartItems: localCartItems } } = getState();
      if (!user) return null;
      
      const response = await axios.get('/api/users/cart');
      const backendCartItems = response.data.cartItems || [];
      
      const mergedCart = [...backendCartItems];
      let hasNewLocalItems = false;
      
      localCartItems.forEach(localItem => {
        const exists = mergedCart.find(
          bItem => bItem._id === localItem._id && 
                   bItem.selectedSize === localItem.selectedSize && 
                   bItem.selectedVariant?.colorName === localItem.selectedVariant?.colorName
        );
        if (!exists) {
          mergedCart.push(localItem);
          hasNewLocalItems = true;
        }
      });
      
      dispatch(cartSlice.actions.setCartItems(mergedCart));
      
      if (hasNewLocalItems) {
        dispatch(syncCartToBackend());
      }
      return mergedCart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addToCartAndSync = (item) => (dispatch, getState) => {
  dispatch(cartSlice.actions.addToCart(item));
  if (getState().auth?.user) {
    dispatch(syncCartToBackend());
  }
};

export const removeFromCartAndSync = (item) => (dispatch, getState) => {
  dispatch(cartSlice.actions.removeFromCart(item));
  if (getState().auth?.user) {
    dispatch(syncCartToBackend());
  }
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
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      return updateCart(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('auth/logout/fulfilled', (state) => {
        state.cartItems = [];
        return updateCart(state);
      })
      .addCase('auth/forceLogout', (state) => {
        state.cartItems = [];
        return updateCart(state);
      });
  }
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  setCartItems
} = cartSlice.actions;

export default cartSlice.reducer;
