<template>
  <div class="panel p-5">
    <h2 class="text-xl font-semibold text-slate-950">{{ title }}</h2>
    <div class="mt-4 space-y-4">
      <article v-for="item in items" :key="item.id" class="border-t border-line pt-4 first:border-0 first:pt-0">
        <h3 class="font-semibold text-slate-950">{{ item[primary] }}</h3>
        <p class="text-sm text-emerald-700">{{ item[secondary] }} {{ item.field ? '- ' + item.field : '' }}</p>
        <p class="mt-2 text-sm leading-6 text-slate-700">{{ item.description }}</p>
      </article>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  items: { type: Array, default: () => [] },
  primary: { type: String, required: true },
  secondary: { type: String, required: true }
});
</script>
