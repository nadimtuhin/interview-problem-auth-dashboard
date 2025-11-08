import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO: TASK 2 - Add Request Interceptor for JWT Token
//
// You need to add an axios request interceptor that attaches the JWT token
// to every request that requires authentication.
//
// Steps:
// 1. Create a request interceptor using api.interceptors.request.use()
// 2. Get the token from localStorage
// 3. If token exists, add it to the Authorization header as "Bearer TOKEN"
// 4. Return the modified config
//
// Example implementation:
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// TODO: TASK 2 - Add Response Interceptor for Error Handling (Optional Enhancement)
//
// Add a response interceptor to handle 401 errors globally
// and redirect to login if token is invalid/expired
//
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// Authentication API calls
export const authAPI = {
  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise} Response with token and user data
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  /**
   * Signup new user
   * @param {Object} userData - { email, password, name }
   * @returns {Promise} Response with token and user data
   */
  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  /**
   * Get current user profile
   * @returns {Promise} Current user data
   */
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Dashboard API calls
export const dashboardAPI = {
  /**
   * Get user dashboard data
   * @returns {Promise} User dashboard data
   */
  getUserDashboard: async () => {
    const response = await api.get('/dashboard/user');
    return response.data;
  },

  /**
   * Get admin dashboard data
   * @returns {Promise} Admin dashboard data
   */
  getAdminDashboard: async () => {
    const response = await api.get('/dashboard/admin');
    return response.data;
  },
};

export default api;
