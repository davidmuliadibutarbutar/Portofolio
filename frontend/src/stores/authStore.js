import { defineStore } from 'pinia';
import { api } from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('portfolio_token') || '',
    user: JSON.parse(localStorage.getItem('portfolio_user') || 'null')
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token)
  },
  actions: {
    async login(credentials) {
      const { data } = await api.post('/auth/login', credentials);
      this.token = data.token;
      this.user = data.user;
      localStorage.setItem('portfolio_token', data.token);
      localStorage.setItem('portfolio_user', JSON.stringify(data.user));
    },
    logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('portfolio_token');
      localStorage.removeItem('portfolio_user');
    }
  }
});
