<script setup>
import { computed } from 'vue'

const props = defineProps({
  question: Object,
})

const emit = defineEmits(['answered'])

// Shuffle option order per question so the high-pole answer isn't always first.
// Keyed by question.id so re-renders of the same question keep the same order.
const shuffledOptions = computed(() => {
  const opts = props.question?.options ?? []
  const a = opts.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
})
</script>

<template>
  <div class="question-card">
    <p class="question-text">{{ question.text }}</p>
    <div class="options-list">
      <button
        v-for="(opt, i) in shuffledOptions"
        :key="i"
        class="option-btn"
        @click="emit('answered', opt.value)"
      >
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>
