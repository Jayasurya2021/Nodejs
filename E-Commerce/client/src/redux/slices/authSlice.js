import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get user from localStorage
let user = JSON.parse(localStorage.getItem('user'));

// Fix for corrupted localStorage from previous bug
if (user) {
  if (user.user && user.success !== undefined) {
    user = user.user;
    localStorage.setItem('user', JSON.stringify(user));
  }
  // If it's an empty object, treat it as null
  if (Object.keys(user).length === 0) {
    user = null;
    localStorage.removeItem('user');
  }
}

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const API_URL = '/api/auth/';

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL + 'register', userData);
      if (response.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data.user || response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + 'login', user);
    if (response.data?.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data.user || response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await axios.post(API_URL + 'logout');
  localStorage.removeItem('user');
});

// Google Sign-In
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async ({ token, role }, thunkAPI) => {
    try {
      const response = await axios.post(API_URL + 'google', { token, role });

      // If user requires role selection, we still save the pending user so they are authenticated
      // for the /complete-profile page
      if (response.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return {
        user: response.data.user,
        requireRole: response.data.requireRole || false
      };
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Select Role for new Google Users
export const selectRole = createAsyncThunk(
  'auth/selectRole',
  async ({ role }, thunkAPI) => {
    try {
      const response = await axios.patch(API_URL + 'select-role', { role });
      if (response.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data.user;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    forceLogout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      // Google login
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        // If the backend says requireRole, we can optionally use it in the component, 
        // but typically checking user.role === 'pending' is sufficient.
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // Select Role
      .addCase(selectRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(selectRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(selectRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, forceLogout } = authSlice.actions;
export default authSlice.reducer;
