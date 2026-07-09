import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  product: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isFetchingNextPage: false, // For infinite scroll loading state
  message: '',
  pages: 1,
  page: 1,
  total: 0
};

// Get all products (for category, brand, shop views)
export const getProducts = createAsyncThunk(
  'products/getAll',
  async (queryArgs, thunkAPI) => {
    try {
      let queryStr = '?';
      if (queryArgs) {
        Object.keys(queryArgs).forEach(key => {
          if (queryArgs[key] !== undefined && queryArgs[key] !== '' && key !== 'append') {
             queryStr += `${key}=${queryArgs[key]}&`;
          }
        });
      }
      const response = await axios.get('/api/products' + queryStr);
      return { ...response.data, append: queryArgs?.append || false };
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Search products using text index
export const searchProducts = createAsyncThunk(
  'products/search',
  async (queryArgs, thunkAPI) => {
    try {
      let queryStr = '?';
      if (queryArgs) {
        Object.keys(queryArgs).forEach(key => {
          if (queryArgs[key] !== undefined && queryArgs[key] !== '' && key !== 'append') {
             queryStr += `${key}=${queryArgs[key]}&`;
          }
        });
      }
      const response = await axios.get('/api/search' + queryStr);
      return { ...response.data, append: queryArgs?.append || false };
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single product
export const getProductById = createAsyncThunk(
  'products/getSingle',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get('/api/products/' + id);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isFetchingNextPage = false;
      state.message = '';
    },
    clearProduct: (state) => {
      state.product = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // getProducts
      .addCase(getProducts.pending, (state, action) => {
        if (action.meta.arg?.append) {
          state.isFetchingNextPage = true;
        } else {
          state.isLoading = true;
          state.products = []; // clear old on new non-append query
        }
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFetchingNextPage = false;
        state.isSuccess = true;
        if (action.payload.append) {
          state.products = [...state.products, ...action.payload.products];
        } else {
          state.products = action.payload.products;
        }
        state.pages = action.payload.pages;
        state.page = action.payload.page;
        state.total = action.payload.count || action.payload.total;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isFetchingNextPage = false;
        state.isError = true;
        state.message = action.payload;
      })
      // searchProducts
      .addCase(searchProducts.pending, (state, action) => {
        if (action.meta.arg?.append) {
          state.isFetchingNextPage = true;
        } else {
          state.isLoading = true;
          state.products = [];
        }
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFetchingNextPage = false;
        state.isSuccess = true;
        if (action.payload.append) {
          state.products = [...state.products, ...action.payload.products];
        } else {
          state.products = action.payload.products;
        }
        state.pages = action.payload.pages;
        state.page = action.payload.page;
        state.total = action.payload.total;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isFetchingNextPage = false;
        state.isError = true;
        state.message = action.payload;
      })
      // getProductById
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, clearProduct } = productSlice.actions;
export default productSlice.reducer;
