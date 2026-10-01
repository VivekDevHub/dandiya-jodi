import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('dandiya_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified error message extraction
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred. Please try again.';
    return Promise.reject(new Error(message));
  }
);

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

export const registrationService = {
  create: (data) => api.post('/registrations', data),
  getMyRegistration: () => api.get('/registrations/me'),
  getById: (id) => api.get(`/registrations/${id}`),
  update: (id, data) => api.put(`/registrations/${id}`, data),
  updateConsent: (consent) => api.patch('/registrations/consent', { consent }),
};

export const uploadService = {
  uploadPhotos: (formData) =>
    api.post('/uploads/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  uploadPaymentScreenshot: (formData) =>
    api.post('/uploads/payment', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export const paymentService = {
  createOrder: (data) => api.post('/payments/create-order', data),
  verify: (data) => api.post('/payments/verify', data),
  submitManual: (data) => api.post('/payments/manual', data),
  getPaymentByRegistration: (id) => api.get(`/payments/${id}`),
};

export const matchService = {
  getMyMatches: () => api.get('/matches'),
  respondConsent: (id, action) => api.post(`/matches/${id}/consent`, { action }),
};

export const reportService = {
  create: (data) => api.post('/reports', data),
};

export const adminService = {
  getDashboard: () => api.get('/admin/dashboard'),
  getRegistrations: (params) => api.get('/admin/registrations', { params }),
  getRegistrationDetails: (id) => api.get(`/admin/registrations/${id}`),
  updateRegistrationStatus: (id, data) => api.patch(`/admin/registrations/${id}/status`, data),
  findMatchesForRegistration: (id) => api.get(`/admin/registrations/${id}/matches`),
  getAllMatches: (params) => api.get('/admin/matches', { params }),
  createMatch: (data) => api.post('/admin/matches', data),
  updateMatch: (id, data) => api.patch(`/admin/matches/${id}`, data),
  getAllPayments: (params) => api.get('/admin/payments', { params }),
  verifyPayment: (id, data) => api.patch(`/admin/payments/${id}`, data),
  getAllReports: () => api.get('/admin/reports'),
  updateReport: (id, data) => api.patch(`/admin/reports/${id}`, data),
  getAllUsers: () => api.get('/admin/users'),
  updateUser: (id, data) => api.patch(`/admin/users/${id}`, data),
  getAuditLogs: () => api.get('/admin/audit-logs'),
};

export default api;
