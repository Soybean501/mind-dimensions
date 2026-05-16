<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '../stores/quiz-store.js'
import { useInterpretation } from '../composables/use-interpretation.js'
import { DIMENSIONS } from '../data/dimensions.js'
import DimensionBar from '../components/dimension-bar.vue'
import PatternCard from '../components/pattern-card.vue'

const router = useRouter()
const store = useQuizStore()

onMounted(() => {
  if (!store.isInitialized) {
    store.restore()
  }
  if (!store.isComplete) {
    router.replace('/')
  }
})

const { dimensionInterpretations, crossPatterns } = useInterpretation()

function retake() {
  store.init()
  router.push('/quiz')
}
</script>

<template>
  <div class="results-view view-container">
    <h1 class="results-title">Your Mind Type Profile</h1>
    <p class="results-intro">
      Each bar shows your position on one dimension — left end is one pole, right end is
      the other, midline is centre. Scores are based on mean option values across five
      questions per dimension.
    </p>

    <section class="results-bars">
      <DimensionBar
        v-for="dim in DIMENSIONS"
        :key="dim.id"
        :dimension="dim"
        :score="store.normalizedScores[dim.id]"
      />
    </section>

    <section class="results-interpretations">
      <h2>Dimension Insights</h2>
      <div
        v-for="interp in dimensionInterpretations"
        :key="interp.dimensionId"
        class="interp-block"
      >
        <div class="interp-header">
          <span class="interp-name">{{ interp.name }}</span>
          <span class="interp-band" :class="`band-${interp.band}`">{{ interp.label }}</span>
        </div>
        <p class="interp-text">{{ interp.text }}</p>
      </div>
    </section>

    <section class="results-patterns">
      <h2>Cross-Dimension Patterns</h2>
      <PatternCard v-for="p in crossPatterns" :key="p.id" :pattern="p" />
    </section>

    <div class="results-actions">
      <button class="btn-ghost" @click="retake">Retake quiz</button>
    </div>
  </div>
</template>
