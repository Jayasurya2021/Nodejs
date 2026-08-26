import axios from 'axios';

// Base API Configuration
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for Error Handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError =
      error.response?.data?.message ||
      error.message ||
      'An unexpected network error occurred';
    return Promise.reject(new Error(customError));
  }
);

// Application API Endpoints
export const applicationAPI = {
  // Get dashboard statistics
  getStats: async () => {
    const response = await API.get('/applications/stats');
    return response.data;
  },

  // Get applications with optional query params (search, status, workType, sort, dateFilter, customDate)
  getApplications: async (params = {}) => {
    const response = await API.get('/applications', { params });
    return response.data;
  },

  // Get single application details
  getApplicationById: async (id) => {
    const response = await API.get(`/applications/${id}`);
    return response.data;
  },

  // Create new application
  createApplication: async (data) => {
    const response = await API.post('/applications', data);
    return response.data;
  },

  // Full update application
  updateApplication: async (id, data) => {
    const response = await API.put(`/applications/${id}`, data);
    return response.data;
  },

  // Quick patch status
  updateStatus: async (id, status, interviewDate = null) => {
    const response = await API.patch(`/applications/${id}/status`, { status, interviewDate });
    return response.data;
  },

  // Delete application
  deleteApplication: async (id) => {
    const response = await API.delete(`/applications/${id}`);
    return response.data;
  },
};

export default API;
