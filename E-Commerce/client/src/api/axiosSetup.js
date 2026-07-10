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
