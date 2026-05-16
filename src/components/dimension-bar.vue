<script setup>
import { computed } from 'vue'

const props = defineProps({
  dimension: Object,
  score: Number,
})

const fillStyle = computed(() => {
  const s = props.score ?? 0
  const left = s >= 0 ? 50 : 50 + s * 50
  const width = Math.abs(s) * 50
  return { left: left + '%', width: width + '%' }
})

const scoreDisplay = computed(() => {
  const s = props.score
  if (s == null) return '—'
  return (s >= 0 ? '+' : '') + s.toFixed(2)
})
</script>

<template>
  <div class="dim-bar-wrapper">
    <div class="dim-bar-header">
      <span class="dim-bar-name">{{ dimension.name }}</span>
      <span class="dim-bar-score">{{ scoreDisplay }}</span>
    </div>
    <div
      class="dim-bar-track"
      role="meter"
      :aria-valuenow="score"
      :aria-valuemin="-1"
      :aria-valuemax="1"
    >
      <div class="dim-bar-fill" :style="fillStyle" />
      <div class="dim-bar-midline" />
    </div>
    <div class="dim-bar-poles">
      <span class="pole-label pole-a">{{ dimension.poleA.label }}</span>
      <span class="pole-label pole-b">{{ dimension.poleB.label }}</span>
    </div>
    <p class="dim-bar-ref">{{ dimension.reference }}</p>
  </div>
</template>
