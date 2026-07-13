import { defineStore } from 'pinia';
import { collections } from '../services/api';

async function fetchCollection(name) {
  const response = await fetch(`/data/${name}.json`, {
    signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) throw new Error(`Failed to load ${name}`);
  return response.json();
}

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
          fetchCollection('profile'),
          ...collections.map((name) => fetchCollection(name))
        ]);
        this.profile = profile;
        collections.forEach((name, index) => {
          this[name] = items[index];
        });
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to load portfolio content';
      } finally {
        this.loading = false;
      }
    }
  }
});
