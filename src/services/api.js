import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://fakestoreapi.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
  getByCategory: (category) => api.get(`/products/category/${category}`),
};

export default api;
