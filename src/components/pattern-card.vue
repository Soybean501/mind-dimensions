<script setup>
defineProps({ pattern: Object })
</script>

<template>
  <div class="pattern-card">
    <h3>{{ pattern.title }}</h3>
    <p>{{ pattern.text }}</p>
  </div>
</template>
