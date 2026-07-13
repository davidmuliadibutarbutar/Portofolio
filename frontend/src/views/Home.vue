<template>
  <PublicLayout>
    <div v-if="store.loading" class="container-page py-24 text-slate-500">Loading portfolio...</div>
    <div v-else>
      <section class="container-page grid min-h-[calc(100vh-4rem)] items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.25fr_.75fr]">
        <div class="space-y-7">
          <div class="flex flex-wrap gap-2">
            <p class="inline-flex rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-700">{{ profile.location }}</p>
            <p class="inline-flex rounded-md border border-amber-200 bg-amber-50 px-3 py-1 text-sm text-amber-700">Backend · API · Database</p>
          </div>
          <div class="space-y-4">
            <h1 class="max-w-4xl break-words text-3xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">Hi, I'm {{ profile.name }}.</h1>
            <p class="max-w-2xl text-lg leading-8 text-slate-700">{{ profile.headline }}</p>
          </div>
          <div class="grid gap-3 sm:flex sm:flex-wrap">
            <RouterLink to="/projects" class="btn-primary w-full sm:w-auto"><Briefcase class="h-4 w-4" />View Projects</RouterLink>
            <a :href="apiUrl(profile.resume)" class="btn-muted w-full sm:w-auto" target="_blank"><Download class="h-4 w-4" />Download Resume</a>
            <RouterLink to="/contact" class="btn-muted w-full sm:w-auto"><Mail class="h-4 w-4" />Contact Me</RouterLink>
          </div>
        </div>
        <div v-if="profile.photo" class="panel mx-auto w-full max-w-sm overflow-hidden">
          <img :src="apiUrl(profile.photo)" :alt="profile.name" class="aspect-[4/4.6] w-full object-cover object-[center_28%]" />
          <div class="space-y-1.5 p-4">
            <p class="label">{{ profile.title }}</p>
            <h2 class="text-xl font-bold text-slate-950">{{ profile.name }}</h2>
            <p class="text-sm leading-6 text-slate-600">{{ profile.location }}</p>
          </div>
        </div>
        <EnterpriseVisual v-else />
      </section>

      <section class="border-y border-emerald-900/10 bg-white/45 py-5">
        <div class="container-page grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="metric in metrics" :key="metric.label" class="rounded-lg border border-stone-200 bg-white/70 p-4 shadow-sm">
            <p :class="['text-3xl font-bold', metric.color]">{{ metric.value }}</p>
            <p class="mt-1 text-sm text-slate-500">{{ metric.label }}</p>
          </div>
        </div>
      </section>

      <section id="about" class="section border-y border-emerald-900/10 bg-emerald-50/55">
        <div class="container-page grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p class="label">About</p>
            <h2 class="mt-2 text-3xl font-bold text-slate-950">Enterprise systems, clean APIs, reliable data flows.</h2>
          </div>
          <p class="text-lg leading-8 text-slate-700">{{ profile.bio }}</p>
        </div>
      </section>

      <section class="section">
        <div class="container-page">
          <HeaderBlock label="Skills" title="Technical toolkit" />
          <div class="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="(items, category, index) in groupedSkills" :key="category" class="panel overflow-hidden">
              <div :class="['h-1', accentBars[index % accentBars.length]]"></div>
              <div class="p-5">
              <h3 class="font-semibold text-slate-950">{{ category }}</h3>
              <div class="mt-4 space-y-3">
                <div v-for="skill in items" :key="skill.id">
                  <div class="flex justify-between text-sm">
                    <span>{{ skill.name }}</span>
                    <span class="text-slate-500">{{ skill.level }}%</span>
                  </div>
                  <div class="mt-2 h-2 rounded-full bg-stone-200">
                    <div class="h-2 rounded-full bg-emerald-600" :style="{ width: `${skill.level || 60}%` }"></div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section border-y border-emerald-900/10 bg-white/45">
        <div class="container-page">
          <HeaderBlock label="Featured Projects" title="Selected enterprise work" />
          <div class="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard v-for="project in featuredProjects" :key="project.id" :project="project" />
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container-page">
          <HeaderBlock label="Experience" title="Work timeline" />
          <Timeline :items="store.experience" />
        </div>
      </section>

      <section class="section border-y border-emerald-900/10 bg-amber-50/45">
        <div class="container-page grid gap-6 lg:grid-cols-2">
          <InfoList title="Education" :items="store.education" primary="institution" secondary="degree" />
          <InfoList title="Publications" :items="store.publications" primary="title" secondary="journal" />
        </div>
      </section>
    </div>
  </PublicLayout>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { Briefcase, Download, Mail } from 'lucide-vue-next';
import PublicLayout from '../components/PublicLayout.vue';
import ProjectCard from '../components/ProjectCard.vue';
import HeaderBlock from '../components/HeaderBlock.vue';
import Timeline from '../components/Timeline.vue';
import InfoList from '../components/InfoList.vue';
import EnterpriseVisual from '../components/EnterpriseVisual.vue';
import { usePortfolioStore } from '../stores/portfolioStore';

const store = usePortfolioStore();
onMounted(() => store.fetchAll());

const profile = computed(() => store.profile || {});
const featuredProjects = computed(() => [...store.projects].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 4));
const groupedSkills = computed(() => store.skills.reduce((acc, skill) => {
  acc[skill.category] = acc[skill.category] || [];
  acc[skill.category].push(skill);
  return acc;
}, {}));
const metrics = computed(() => [
  { value: `${store.projects.length}+`, label: 'Portfolio projects', color: 'text-teal-700' },
  { value: `${store.skills.length}+`, label: 'Technical skills', color: 'text-emerald-700' },
  { value: '4+', label: 'Enterprise domains', color: 'text-amber-700' },
  { value: '2022', label: 'Professional start', color: 'text-rose-700' }
]);
const accentBars = ['bg-teal-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-400', 'bg-sky-500'];
const apiUrl = (path) => path?.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${path}` : path;
</script>
