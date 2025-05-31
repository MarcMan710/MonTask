import axios from 'axios';
import { API_ENDPOINTS, getAuthHeader } from '../config/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: (data) => api.post(API_ENDPOINTS.AUTH.REGISTER, data),
  login: (data) => api.post(API_ENDPOINTS.AUTH.LOGIN, data),
  getMe: () => api.get(API_ENDPOINTS.AUTH.ME),
};

// User services
export const userService = {
  getProfile: () => api.get(API_ENDPOINTS.USERS.BASE),
  updateProfile: (data) => api.put(API_ENDPOINTS.USERS.BASE, data),
};

// Project services
export const projectService = {
  getAll: () => api.get(API_ENDPOINTS.PROJECTS.BASE),
  getById: (id) => api.get(`${API_ENDPOINTS.PROJECTS.BASE}/${id}`),
  create: (data) => api.post(API_ENDPOINTS.PROJECTS.BASE, data),
  update: (id, data) => api.put(`${API_ENDPOINTS.PROJECTS.BASE}/${id}`, data),
  delete: (id) => api.delete(`${API_ENDPOINTS.PROJECTS.BASE}/${id}`),
};

// Task services
export const taskService = {
  getAll: (projectId) => api.get(`${API_ENDPOINTS.TASKS.BASE}?projectId=${projectId}`),
  getById: (id) => api.get(`${API_ENDPOINTS.TASKS.BASE}/${id}`),
  create: (data) => api.post(API_ENDPOINTS.TASKS.BASE, data),
  update: (id, data) => api.put(`${API_ENDPOINTS.TASKS.BASE}/${id}`, data),
  delete: (id) => api.delete(`${API_ENDPOINTS.TASKS.BASE}/${id}`),
  updateStatus: (id, status) => api.patch(`${API_ENDPOINTS.TASKS.BASE}/${id}/status`, { status }),
};

export default api; 