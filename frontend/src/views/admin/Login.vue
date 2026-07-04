<template>
  <div class="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,#164e63_0,#07101d_40%,#050914_100%)] px-4 text-slate-100">
    <form class="panel w-full max-w-sm space-y-5 p-6" @submit.prevent="submit">
      <div>
        <p class="label">Admin</p>
        <h1 class="mt-2 text-2xl font-bold text-white">Sign in to CMS</h1>
      </div>
      <label class="block space-y-2">
        <span class="label">Username</span>
        <input v-model="form.username" class="input" autocomplete="username" />
      </label>
      <label class="block space-y-2">
        <span class="label">Password</span>
        <input v-model="form.password" type="password" class="input" autocomplete="current-password" />
      </label>
      <p v-if="error" class="rounded-md border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{{ error }}</p>
      <button class="btn-primary w-full" :disabled="loading">{{ loading ? 'Signing in...' : 'Login' }}</button>
      <p class="text-xs text-slate-500">-</p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';

const router = useRouter();
const auth = useAuthStore();
const form = reactive({ username: 'admin', password: 'admin123' });
const loading = ref(false);
const error = ref('');

async function submit() {
  loading.value = true;
  error.value = '';
  try {
    await auth.login(form);
    router.push('/admin');
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed';
  } finally {
    loading.value = false;
  }
}
</script>
