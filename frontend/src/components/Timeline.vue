<template>
  <div class="mt-8 space-y-6">
    <article v-for="item in items" :key="item.id" class="panel p-5">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 class="text-xl font-semibold text-slate-950">{{ item.position }}</h3>
          <p class="text-emerald-700">{{ item.company }} · {{ item.location }}</p>
        </div>
        <p class="text-sm text-slate-500">{{ item.startDate }} - {{ item.current ? 'Present' : item.endDate }}</p>
      </div>
      <p class="mt-4 leading-7 text-slate-700">{{ item.description }}</p>
      <ul class="mt-4 space-y-2 text-sm text-slate-700">
        <li v-for="achievement in item.achievements" :key="achievement" class="flex gap-2">
          <span class="text-emerald-600">-</span>
          <span>{{ achievement }}</span>
        </li>
      </ul>
    </article>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] }
});
</script>
