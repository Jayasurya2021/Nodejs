import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

// Setup global axios defaults
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Setup global interceptors
axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      // Network Error
      window.dispatchEvent(new CustomEvent('app-navigate', { detail: '/network-error' }));
      return Promise.reject(error);
    }

    const status = error.response.status;

    if (status === 401) {
      // Unauthorized
      localStorage.removeItem('user'); // Clear user if session expired
      window.dispatchEvent(new CustomEvent('app-logout'));
      window.dispatchEvent(new CustomEvent('app-navigate', { detail: '/login' }));
    } else if (status === 403) {
      // Forbidden
      window.dispatchEvent(new CustomEvent('app-navigate', { detail: '/forbidden' }));
    } else if (status >= 500) {
      // Server Error
      window.dispatchEvent(new CustomEvent('app-navigate', { detail: '/server-error' }));
    }

    return Promise.reject(error);
  }
);
