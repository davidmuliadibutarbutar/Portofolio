<template>
  <div class="min-h-screen bg-[#07101d] text-slate-100">
    <aside class="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-ink p-4 lg:block">
      <RouterLink to="/admin" class="text-lg font-semibold text-white">Portfolio CMS</RouterLink>
      <nav class="mt-8 space-y-1">
        <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="block rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">{{ item.label }}</RouterLink>
      </nav>
    </aside>
    <div class="lg:pl-64">
      <header class="sticky top-0 z-30 border-b border-line bg-ink/90 backdrop-blur">
        <div class="flex h-16 items-center justify-between px-4 sm:px-6">
          <div>
            <p class="text-sm text-slate-400">Admin panel</p>
            <h1 class="font-semibold text-white">{{ title }}</h1>
          </div>
          <div class="flex items-center gap-2">
            <RouterLink to="/" class="btn-muted hidden sm:inline-flex">View Site</RouterLink>
            <button class="btn-muted" @click="logout"><LogOut class="h-4 w-4" />Logout</button>
          </div>
        </div>
      </header>
      <main class="p-4 sm:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { LogOut } from 'lucide-vue-next';
import { useAuthStore } from '../../stores/authStore';

defineProps({
  title: { type: String, default: 'Dashboard' }
});

const router = useRouter();
const auth = useAuthStore();
const nav = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/profile', label: 'Profile' },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/experience', label: 'Experience' },
  { to: '/admin/skills', label: 'Skills' },
  { to: '/admin/education', label: 'Education' },
  { to: '/admin/publications', label: 'Publications' },
  { to: '/admin/certifications', label: 'Certifications' },
  { to: '/admin/languages', label: 'Languages' },
  { to: '/admin/change-password', label: 'Change Password' }
];

function logout() {
  auth.logout();
  router.push('/admin/login');
}
</script>
