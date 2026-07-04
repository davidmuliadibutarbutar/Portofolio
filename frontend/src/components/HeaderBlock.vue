<template>
  <div>
    <p class="label">{{ label }}</p>
    <h2 class="heading mt-2 text-3xl font-bold">{{ title }}</h2>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  title: { type: String, required: true }
});
</script>
