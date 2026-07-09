import axios from 'axios';
import toast from 'react-hot-toast';

// Setup global axios defaults
axios.defaults.withCredentials = true;

// Setup global interceptors
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      // Network Error
      if (window.location.pathname !== '/network-error') {
        window.location.href = '/network-error';
      }
      return Promise.reject(error);
    }

    const status = error.response.status;

    if (status === 401) {
      // Unauthorized
      localStorage.removeItem('user'); // Clear user if session expired
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    } else if (status === 403) {
      // Forbidden
      if (window.location.pathname !== '/forbidden') {
        window.location.href = '/forbidden';
      }
    } else if (status >= 500) {
      // Server Error
      if (window.location.pathname !== '/server-error') {
        window.location.href = '/server-error';
      }
    }

    return Promise.reject(error);
  }
);
