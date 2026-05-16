<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '../stores/quiz-store.js'
import { DIMENSIONS } from '../data/dimensions.js'

const router = useRouter()
const store = useQuizStore()

onMounted(() => {
  if (!store.isInitialized) {
    store.restore()
  }
})

const hasInProgress = computed(() => store.isInitialized && !store.isComplete)
const hasResults = computed(() => store.isComplete)

function startQuiz() {
  store.init()
  router.push('/quiz')
}

function resumeQuiz() {
  router.push('/quiz')
}

function viewResults() {
  router.push('/results')
}
</script>

<template>
  <div class="home-view">
    <header class="home-header">
      <h1 class="home-title">Mind Type Profiler</h1>
      <p class="home-subtitle">
        Map your cognitive style across six independent dimensions of inner experience.
      </p>
      <p class="home-intro">
        Popular cognitive typologies slot people into a handful of flat categories. Real
        cognitive variation is multidimensional. This profiler measures six dimensions
        grounded in cognitive science research — inner speech, visual imagery, unsymbolized
        thought, systemising drive, processing style, and visualisation mode. The output
        isn't a type label. It's your position in a six-dimensional space, with written
        interpretation of what the combination suggests.
      </p>

      <div class="home-cta">
        <button v-if="!hasInProgress && !hasResults" class="btn-primary" @click="startQuiz">
          Begin profiling — 30 questions
        </button>
        <template v-if="hasInProgress">
          <button class="btn-primary" @click="resumeQuiz">
            Resume quiz — question {{ store.displayStep }} of {{ store.totalSteps }}
          </button>
          <button class="btn-ghost" @click="startQuiz">Start over</button>
        </template>
        <template v-if="hasResults">
          <button class="btn-primary" @click="viewResults">View your profile</button>
          <button class="btn-ghost" @click="startQuiz">Retake quiz</button>
        </template>
      </div>
    </header>

    <section class="dimensions-section">
      <h2 class="section-heading">The six dimensions</h2>
      <div class="dimensions-grid">
        <div v-for="dim in DIMENSIONS" :key="dim.id" class="dim-card">
          <div class="dim-card-header">
            <span class="dim-card-name">{{ dim.name }}</span>
            <span class="dim-card-ref">{{ dim.reference }}</span>
          </div>
          <p class="dim-card-about">{{ dim.about }}</p>
          <div class="dim-card-poles">
            <span class="pole-chip pole-a">{{ dim.poleA.label }}</span>
            <span class="poles-arrow">↔</span>
            <span class="pole-chip pole-b">{{ dim.poleB.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <footer class="home-footer">
      <p>
        Self-report has limits. These dimensions are based on published cognitive science
        research, but a questionnaire can only approximate what trained experiential
        sampling methods reveal. Treat your profile as a starting point for reflection,
        not a definitive measurement.
      </p>
    </footer>
  </div>
</template>
