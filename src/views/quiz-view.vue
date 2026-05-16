<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '../stores/quiz-store.js'
import ProgressBar from '../components/progress-bar.vue'
import QuestionCard from '../components/question-card.vue'

const router = useRouter()
const store = useQuizStore()

onMounted(() => {
  if (!store.isInitialized) {
    const restored = store.restore()
    if (!restored) {
      router.replace('/')
      return
    }
  }
  if (store.isComplete) {
    router.replace('/results')
  }
})

function handleAnswer(value) {
  store.answer(value)
  if (store.isComplete) {
    router.push('/results')
  }
}
</script>

<template>
  <div class="quiz-view view-container">
    <ProgressBar :current="store.displayStep" :total="store.totalSteps" />

    <div v-if="store.currentDimension" class="quiz-dimension-label">
      {{ store.currentDimension.name }}
    </div>

    <Transition name="question-slide" mode="out-in">
      <QuestionCard
        v-if="store.currentQuestion"
        :key="store.currentStep"
        :question="store.currentQuestion"
        @answered="handleAnswer"
      />
    </Transition>
  </div>
</template>
