import { defineStore } from 'pinia';
import { api, collections } from '../services/api';

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    loading: false,
    error: '',
    profile: {},
    projects: [],
    experience: [],
    skills: [],
    education: [],
    publications: [],
    certifications: [],
    languages: []
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      this.error = '';
      try {
        const [profile, ...items] = await Promise.all([
          api.get('/profile'),
          ...collections.map((name) => api.get(`/${name}`))
        ]);
        this.profile = profile.data;
        collections.forEach((name, index) => {
          this[name] = items[index].data;
        });
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to load portfolio content';
      } finally {
        this.loading = false;
      }
    }
  }
});
