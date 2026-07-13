<template>
  <PublicLayout>
    <section class="container-page section">
      <RouterLink to="/projects" class="text-sm font-semibold text-emerald-700 hover:text-emerald-900">Back to projects</RouterLink>
      <article v-if="project" class="mt-6 space-y-10">
        <div class="grid items-start gap-8 lg:grid-cols-[.95fr_1.05fr]">
          <div class="space-y-5 pt-2">
            <p class="label">{{ project.category }}</p>
            <h1 class="text-4xl font-bold text-slate-950">{{ project.title }}</h1>
            <p class="text-lg leading-8 text-slate-700">{{ project.description }}</p>
            <div class="grid gap-3 sm:grid-cols-3">
              <div class="rounded-lg border border-stone-200 bg-white/70 p-3">
                <p class="label">Status</p>
                <p class="mt-1 font-semibold text-slate-950">{{ project.featured ? 'Featured' : 'Portfolio' }}</p>
              </div>
              <div class="rounded-lg border border-stone-200 bg-white/70 p-3">
                <p class="label">Stack</p>
                <p class="mt-1 font-semibold text-slate-950">{{ project.techStack?.length || 0 }} tools</p>
              </div>
              <div class="rounded-lg border border-stone-200 bg-white/70 p-3">
                <p class="label">Preview</p>
                <p class="mt-1 font-semibold text-slate-950">{{ gallery.length }} images</p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <button type="button" class="panel block w-full overflow-hidden text-left" @click="openLightbox(0)">
              <img v-if="cover" :src="imageUrl(cover)" :alt="`${project.title} cover`" class="aspect-[16/10] w-full object-cover" />
              <div v-else class="grid aspect-[16/10] place-items-center bg-emerald-50 text-sm text-emerald-700">No preview image</div>
            </button>
            <aside class="panel p-5">
              <div class="flex items-center justify-between gap-3">
                <h2 class="font-semibold text-slate-950">Technology Stack</h2>
                <span class="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">{{ project.techStack?.length || 0 }} items</span>
              </div>
              <div class="mt-4 flex flex-wrap gap-2">
                <span v-for="tech in project.techStack" :key="tech" class="rounded-md border border-emerald-100 bg-emerald-50 px-2 py-1 text-xs text-emerald-800">{{ tech }}</span>
              </div>
            </aside>
          </div>
        </div>

        <section v-if="gallery.length" class="space-y-4">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="label">Project Preview</p>
              <h2 class="mt-2 text-2xl font-bold text-slate-950">Screenshots and review images</h2>
            </div>
            <p class="text-sm text-slate-500">{{ gallery.length }} uploaded images</p>
          </div>
          <div class="panel p-4">
            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <button v-for="(image, index) in gallery" :key="image" type="button" class="group overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg" @click="openLightbox(index)">
                <img :src="imageUrl(image)" :alt="`${project.title} screenshot ${index + 1}`" class="aspect-video w-full object-cover transition group-hover:scale-[1.02]" />
                <div class="flex items-center justify-between px-3 py-2 text-xs text-slate-500">
                  <span>Image {{ index + 1 }}</span>
                  <span>View</span>
                </div>
              </button>
            </div>
          </div>
        </section>

        <Teleport to="body">
          <div v-if="lightboxOpen" class="fixed inset-0 z-50 bg-slate-950/90 p-4 text-white backdrop-blur" @click.self="closeLightbox">
            <div class="mx-auto flex h-full max-w-7xl flex-col">
              <div class="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p class="text-sm text-white/60">{{ project.title }}</p>
                  <p class="font-semibold">Image {{ activeImageIndex + 1 }} of {{ gallery.length }}</p>
                </div>
                <button type="button" class="rounded-md bg-white/10 p-2 hover:bg-white/20" aria-label="Close image preview" @click="closeLightbox">
                  <X class="h-5 w-5" />
                </button>
              </div>
              <div class="relative min-h-0 flex-1 rounded-lg bg-black/30">
                <img :src="imageUrl(gallery[activeImageIndex])" :alt="`${project.title} full preview`" class="h-full w-full object-contain" />
                <button v-if="gallery.length > 1" type="button" class="absolute left-3 top-1/2 rounded-md bg-white/10 p-3 backdrop-blur hover:bg-white/20" aria-label="Previous image" @click="previousImage">
                  <ChevronLeft class="h-6 w-6" />
                </button>
                <button v-if="gallery.length > 1" type="button" class="absolute right-3 top-1/2 rounded-md bg-white/10 p-3 backdrop-blur hover:bg-white/20" aria-label="Next image" @click="nextImage">
                  <ChevronRight class="h-6 w-6" />
                </button>
              </div>
              <div v-if="gallery.length > 1" class="mt-3 flex gap-2 overflow-x-auto pb-1">
                <button v-for="(image, index) in gallery" :key="image" type="button" :class="['h-16 w-24 shrink-0 overflow-hidden rounded-md border', index === activeImageIndex ? 'border-emerald-300' : 'border-white/20']" @click="activeImageIndex = index">
                  <img :src="imageUrl(image)" :alt="`${project.title} thumbnail ${index + 1}`" class="h-full w-full object-cover" />
                </button>
              </div>
            </div>
          </div>
        </Teleport>
      </article>
      <p v-else class="mt-8 text-slate-600">Project not found.</p>
    </section>
  </PublicLayout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ChevronLeft, ChevronRight, X } from 'lucide-vue-next';
import PublicLayout from '../components/PublicLayout.vue';
import { usePortfolioStore } from '../stores/portfolioStore';

const route = useRoute();
const store = usePortfolioStore();
onMounted(() => store.fetchAll());
const project = computed(() => store.projects.find((item) => item.id === route.params.id || item.slug === route.params.id));
const gallery = computed(() => {
  if (!project.value) return [];
  return [...new Set([...(project.value.images || []), project.value.image].filter(Boolean))];
});
const cover = computed(() => gallery.value[0] || '');
const lightboxOpen = ref(false);
const activeImageIndex = ref(0);

function openLightbox(index) {
  if (!gallery.value.length) return;
  activeImageIndex.value = index;
  lightboxOpen.value = true;
}

function closeLightbox() {
  lightboxOpen.value = false;
}

function previousImage() {
  activeImageIndex.value = (activeImageIndex.value - 1 + gallery.value.length) % gallery.value.length;
}

function nextImage() {
  activeImageIndex.value = (activeImageIndex.value + 1) % gallery.value.length;
}

function imageUrl(path) {
  if (/^https?:\/\//.test(path)) return path;
  const apiBase = import.meta.env.VITE_API_URL || '/api';
  return `${apiBase.replace('/api', '')}${path}`;
}
</script>
