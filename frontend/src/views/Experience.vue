<template>
  <PublicLayout>
    <section class="container-page section">
      <HeaderBlock label="Experience" title="Professional timeline" />
      <Timeline :items="store.experience" />
    </section>
  </PublicLayout>
</template>

<script setup>
import { onMounted } from 'vue';
import PublicLayout from '../components/PublicLayout.vue';
import HeaderBlock from '../components/HeaderBlock.vue';
import Timeline from '../components/Timeline.vue';
import { usePortfolioStore } from '../stores/portfolioStore';

const store = usePortfolioStore();
onMounted(() => store.fetchAll());
</script>
