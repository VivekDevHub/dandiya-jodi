import { create } from 'zustand';
import { authService, registrationService } from '../services/api.js';

export const useAuthStore = create((set, get) => ({
  user: null,
  registration: null,
  token: localStorage.getItem('dandiya_token') || null,
  isAuthenticated: Boolean(localStorage.getItem('dandiya_token')),
  isLoading: true,

  setAuth: (user, token, registration = null) => {
    if (token) {
      localStorage.setItem('dandiya_token', token);
    }
    set({
      user,
      token,
      registration,
      isAuthenticated: Boolean(user),
      isLoading: false,
    });
  },

  setRegistration: (registration) => {
    set({ registration });
  },

  logout: () => {
    localStorage.removeItem('dandiya_token');
    authService.logout().catch(() => {});
    set({
      user: null,
      token: null,
      registration: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  fetchUser: async () => {
    const token = localStorage.getItem('dandiya_token');
    if (!token) {
      set({ isLoading: false, isAuthenticated: false, user: null, registration: null });
      return;
    }

    try {
      set({ isLoading: true });
      const res = await authService.getMe();
      if (res.data?.success) {
        set({
          user: res.data.data.user,
          registration: res.data.data.registration,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        get().logout();
      }
    } catch (err) {
      get().logout();
    }
  },

  refreshRegistration: async () => {
    try {
      const res = await registrationService.getMyRegistration();
      if (res.data?.success) {
        set({ registration: res.data.data });
      }
    } catch (err) {
      // Ignore if user has no registration yet
    }
  },
}));
