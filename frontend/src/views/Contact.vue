<template>
  <PublicLayout>
    <section class="container-page section">
      <div class="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
        <HeaderBlock label="Contact" title="Let’s build reliable software." />
        <div class="panel space-y-4 p-6">
          <a class="flex items-center gap-3 rounded-md border border-stone-200 bg-white/60 p-3 text-slate-700 hover:border-emerald-300 hover:text-emerald-800" :href="`mailto:${profile.email}`"><Mail class="h-5 w-5" />{{ profile.email }}</a>
          <a class="flex items-center gap-3 rounded-md border border-stone-200 bg-white/60 p-3 text-slate-700 hover:border-emerald-300 hover:text-emerald-800" :href="`tel:${profile.phone}`"><Phone class="h-5 w-5" />{{ profile.phone }}</a>
          <a class="flex items-center gap-3 rounded-md border border-stone-200 bg-white/60 p-3 text-slate-700 hover:border-emerald-300 hover:text-emerald-800" :href="profile.linkedin" target="_blank"><Linkedin class="h-5 w-5" />LinkedIn</a>
          <a class="flex items-center gap-3 rounded-md border border-stone-200 bg-white/60 p-3 text-slate-700 hover:border-emerald-300 hover:text-emerald-800" :href="profile.github" target="_blank"><Github class="h-5 w-5" />GitHub</a>
        </div>
      </div>
    </section>
  </PublicLayout>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { Github, Linkedin, Mail, Phone } from 'lucide-vue-next';
import PublicLayout from '../components/PublicLayout.vue';
import HeaderBlock from '../components/HeaderBlock.vue';
import { usePortfolioStore } from '../stores/portfolioStore';

const store = usePortfolioStore();
onMounted(() => store.fetchAll());
const profile = computed(() => store.profile || {});
</script>
