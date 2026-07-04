<template>
  <AdminLayout title="Dashboard">
    <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <div v-for="item in stats" :key="item.label" class="panel p-5">
        <p class="text-3xl font-bold text-cyan-200">{{ item.value }}</p>
        <p class="mt-1 text-sm text-slate-400">{{ item.label }}</p>
      </div>
    </div>
    <div class="panel mt-6 p-5">
      <h2 class="font-semibold text-white">Content Management</h2>
      <p class="mt-2 text-sm leading-6 text-slate-300">Manage public portfolio data from the sidebar. Changes are stored in backend JSON files and reflected on public pages after refresh.</p>
    </div>
  </AdminLayout>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import AdminLayout from '../../components/admin/AdminLayout.vue';
import { usePortfolioStore } from '../../stores/portfolioStore';

const store = usePortfolioStore();
onMounted(() => store.fetchAll());
const stats = computed(() => [
  { label: 'Projects', value: store.projects.length },
  { label: 'Skills', value: store.skills.length },
  { label: 'Experience', value: store.experience.length },
  { label: 'Publications', value: store.publications.length }
]);
</script>
