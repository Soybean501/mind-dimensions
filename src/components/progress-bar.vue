<script setup>
defineProps({
  current: Number,
  total: Number,
})
</script>

<template>
  <div class="progress-bar-wrapper">
    <div
      class="progress-track"
      role="progressbar"
      :aria-valuenow="current"
      :aria-valuemax="total"
      :aria-label="`Question ${current} of ${total}`"
    >
      <div class="progress-fill" :style="{ width: (current / total * 100) + '%' }" />
    </div>
    <p class="progress-label">Question {{ current }} of {{ total }}</p>
  </div>
</template>
