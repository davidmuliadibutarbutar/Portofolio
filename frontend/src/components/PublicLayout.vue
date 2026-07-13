<template>
  <div class="app-shell grid-surface min-h-screen overflow-x-clip text-slate-800">
    <header class="sticky top-0 z-40 border-b border-emerald-900/10 bg-white/75 backdrop-blur-xl">
      <nav class="container-page flex h-16 items-center justify-between">
        <RouterLink to="/" class="flex min-w-0 items-center gap-2 font-semibold text-slate-950" @click="closeMenu">
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-emerald-700 text-sm font-black text-white">D</span>
          <span class="truncate">David Muliadi</span>
        </RouterLink>
        <button
          class="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-stone-300 bg-white text-slate-800 shadow-sm md:hidden"
          type="button"
          aria-label="Open navigation menu"
          aria-controls="mobile-navigation"
          :aria-expanded="open"
          @click="openMenu"
        >
          <Menu class="h-6 w-6" />
        </button>
        <div class="hidden items-center gap-6 md:flex">
          <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="text-sm text-slate-700 hover:text-emerald-700">{{ item.label }}</RouterLink>
          <RouterLink to="/admin" class="btn-muted">Admin</RouterLink>
        </div>
      </nav>
    </header>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="open"
          id="mobile-navigation"
          class="fixed inset-0 z-[100] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <button class="absolute inset-0 h-full w-full bg-slate-950/45 backdrop-blur-sm" type="button" aria-label="Close navigation menu" @click="closeMenu"></button>
          <aside class="absolute right-0 top-0 flex h-full w-[min(86vw,20rem)] flex-col overflow-y-auto bg-white shadow-2xl">
            <div class="flex h-16 shrink-0 items-center justify-between border-b border-stone-200 px-5">
              <p class="font-semibold text-slate-950">Navigation</p>
              <button class="grid h-10 w-10 place-items-center rounded-md border border-stone-300 text-slate-700" type="button" aria-label="Close navigation menu" @click="closeMenu">
                <X class="h-5 w-5" />
              </button>
            </div>
            <nav class="flex flex-1 flex-col gap-2 p-4" aria-label="Mobile navigation">
              <RouterLink
                v-for="item in nav"
                :key="item.to"
                :to="item.to"
                class="flex min-h-12 items-center rounded-lg px-4 text-base font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
                active-class="bg-emerald-50 text-emerald-800"
                @click="closeMenu"
              >
                {{ item.label }}
              </RouterLink>
              <RouterLink to="/admin" class="btn-muted mt-3 min-h-12 w-full" @click="closeMenu">Admin</RouterLink>
            </nav>
          </aside>
        </div>
      </Transition>
    </Teleport>

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
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Menu, X } from 'lucide-vue-next';

const open = ref(false);
const closeMenu = () => {
  open.value = false;
};
const openMenu = () => {
  open.value = true;
};

function handleKeydown(event) {
  if (event.key === 'Escape') closeMenu();
}

watch(open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

onMounted(() => window.addEventListener('keydown', handleKeydown));
onBeforeUnmount(() => {
  document.body.style.overflow = '';
  window.removeEventListener('keydown', handleKeydown);
});

const nav = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' }
];
</script>
