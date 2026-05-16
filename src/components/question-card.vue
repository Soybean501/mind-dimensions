<script setup>
defineProps({
  question: Object,
})

const emit = defineEmits(['answered'])
</script>

<template>
  <div class="question-card">
    <p class="question-text">{{ question.text }}</p>
    <div class="options-list">
      <button
        v-for="(opt, i) in question.options"
        :key="i"
        class="option-btn"
        @click="emit('answered', opt.value)"
      >
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>
