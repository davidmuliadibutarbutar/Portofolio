<template>
  <div class="app-shell grid-surface min-h-screen text-slate-800">
    <header class="sticky top-0 z-40 border-b border-emerald-900/10 bg-white/75 backdrop-blur-xl">
      <nav class="container-page flex h-16 items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2 font-semibold text-slate-950">
          <span class="grid h-8 w-8 place-items-center rounded-md bg-emerald-700 text-sm font-black text-white">D</span>
          David Muliadi
        </RouterLink>
        <button class="rounded-md border border-stone-300 bg-white/70 p-2 md:hidden" @click="open = !open" aria-label="Toggle menu">
          <Menu class="h-5 w-5" />
        </button>
        <div :class="['absolute left-0 right-0 top-16 border-b border-stone-200 bg-white p-4 md:static md:flex md:border-0 md:bg-transparent md:p-0', open ? 'block' : 'hidden']">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="text-sm text-slate-700 hover:text-emerald-700" @click="open = false">{{ item.label }}</RouterLink>
            <RouterLink to="/admin" class="btn-muted">Admin</RouterLink>
          </div>
        </div>
      </nav>
    </header>
    <main>
      <slot />
    </main>
    <footer class="border-t border-emerald-900/10 bg-white/45 py-8">
      <div class="container-page flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ new Date().getFullYear() }} David Muliadi Butarbutar.</p>
        <p>Built with Vue, Node.js, and JSON storage.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Menu } from 'lucide-vue-next';

const open = ref(false);
const nav = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' }
];
</script>
