<template>
  <article class="panel group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-emerald-300">
    <div :class="['relative flex aspect-[5/3] items-center justify-center overflow-hidden', coverImage ? 'bg-stone-100' : visual.bg]">
      <img v-if="coverImage" :src="imageUrl(coverImage)" :alt="project.title" class="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105" />
      <div v-if="coverImage" class="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent"></div>
      <div class="absolute inset-0 opacity-35 grid-surface"></div>
      <div class="absolute left-4 top-4 rounded-md border border-white/70 bg-white/70 px-2.5 py-1 text-[11px] text-slate-700">{{ project.category || 'System' }}</div>
      <div v-if="!coverImage" class="relative grid h-14 w-14 place-items-center rounded-lg border border-white/80 bg-white/60 text-slate-800 shadow-2xl shadow-emerald-950/10 transition group-hover:scale-105">
        <component :is="visual.icon" class="h-7 w-7" />
      </div>
      <div class="absolute bottom-3 left-4 right-4 h-1.5 rounded-full bg-white/60">
        <div :class="['h-1.5 rounded-full', visual.bar]" :style="{ width: project.featured ? '78%' : '56%' }"></div>
      </div>
    </div>
    <div class="flex flex-1 flex-col p-4">
      <div>
        <p class="label">{{ project.category || 'Project' }}</p>
        <h3 class="mt-1 text-base font-semibold leading-snug text-slate-950">{{ project.title }}</h3>
      </div>
      <p class="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-700">{{ project.description }}</p>
      <div class="mt-3 flex min-h-14 flex-wrap content-start gap-1.5">
        <span v-for="tech in project.techStack?.slice(0, 5)" :key="tech" class="rounded-md border border-emerald-100 bg-emerald-50 px-2 py-1 text-[11px] text-emerald-800">{{ tech }}</span>
      </div>
      <RouterLink :to="`/projects/${project.slug || project.id}`" class="btn-muted mt-4 w-full py-2">View Detail</RouterLink>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue';
import { Blocks, ChartNoAxesCombined, Code2, Database, GitBranch, Scale } from 'lucide-vue-next';

const props = defineProps({
  project: { type: Object, required: true }
});

const visuals = [
  { bg: 'bg-gradient-to-br from-teal-100 via-emerald-50 to-lime-100', bar: 'bg-teal-500', icon: Blocks },
  { bg: 'bg-gradient-to-br from-amber-100 via-white to-emerald-100', bar: 'bg-emerald-500', icon: ChartNoAxesCombined },
  { bg: 'bg-gradient-to-br from-sky-100 via-white to-teal-100', bar: 'bg-sky-500', icon: GitBranch },
  { bg: 'bg-gradient-to-br from-orange-100 via-white to-rose-100', bar: 'bg-amber-500', icon: Scale },
  { bg: 'bg-gradient-to-br from-lime-100 via-white to-sky-100', bar: 'bg-lime-500', icon: Database }
];

const visual = computed(() => visuals[(Number(props.project.id) - 1 || 0) % visuals.length] || { ...visuals[0], icon: Code2 });
const coverImage = computed(() => props.project.images?.[0] || props.project.image || '');
function imageUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//.test(path)) return path;
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  return `${apiBase.replace('/api', '')}${path}`;
}
</script>
