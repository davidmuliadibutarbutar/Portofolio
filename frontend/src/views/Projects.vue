<template>
  <PublicLayout>
    <section class="container-page section">
      <HeaderBlock label="Projects" title="Portfolio projects" />
      <div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard v-for="project in store.projects" :key="project.id" :project="project" />
      </div>
    </section>
  </PublicLayout>
</template>

<script setup>
import { onMounted } from 'vue';
import PublicLayout from '../components/PublicLayout.vue';
import ProjectCard from '../components/ProjectCard.vue';
import HeaderBlock from '../components/HeaderBlock.vue';
import { usePortfolioStore } from '../stores/portfolioStore';

const store = usePortfolioStore();
onMounted(() => store.fetchAll());
</script>
