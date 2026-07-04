<template>
  <AdminLayout title="Change Password">
    <form class="panel max-w-xl space-y-5 p-5" @submit.prevent="submit">
      <div>
        <h2 class="text-lg font-semibold text-white">Change Admin Password</h2>
        <p class="mt-2 text-sm leading-6 text-slate-400">Set a new admin password directly. Old password is not required.</p>
      </div>

      <label class="block space-y-2">
        <span class="label">New Password</span>
        <input v-model="form.password" type="password" class="input" autocomplete="new-password" />
      </label>

      <label class="block space-y-2">
        <span class="label">Confirm Password</span>
        <input v-model="form.confirmPassword" type="password" class="input" autocomplete="new-password" />
      </label>

      <p v-if="message" :class="['rounded-md p-3 text-sm', success ? 'border border-emerald-300/30 bg-emerald-300/10 text-emerald-100' : 'border border-red-300/30 bg-red-300/10 text-red-100']">{{ message }}</p>

      <button class="btn-primary" :disabled="loading">{{ loading ? 'Saving...' : 'Change Password' }}</button>
    </form>
  </AdminLayout>
</template>

<script setup>
import { reactive, ref } from 'vue';
import AdminLayout from '../../components/admin/AdminLayout.vue';
import { api } from '../../services/api';

const form = reactive({ password: '', confirmPassword: '' });
const loading = ref(false);
const message = ref('');
const success = ref(false);

async function submit() {
  message.value = '';
  success.value = false;

  if (form.password.length < 6) {
    message.value = 'Password must be at least 6 characters.';
    return;
  }
  if (form.password !== form.confirmPassword) {
    message.value = 'Password confirmation does not match.';
    return;
  }

  loading.value = true;
  try {
    const { data } = await api.put('/auth/change-password', { password: form.password });
    success.value = true;
    message.value = data.message || 'Password changed successfully.';
    form.password = '';
    form.confirmPassword = '';
  } catch (error) {
    message.value = error.response?.data?.message || 'Failed to change password.';
  } finally {
    loading.value = false;
  }
}
</script>
