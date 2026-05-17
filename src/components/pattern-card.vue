<script setup>
defineProps({ pattern: Object })
</script>

<template>
  <div class="pattern-card">
    <h3>{{ pattern.title }}</h3>
    <p>{{ pattern.description }}</p>
    <p v-if="pattern.personalisation" class="pattern-personalisation">
      {{ pattern.personalisation }}
    </p>
  </div>
</template>
