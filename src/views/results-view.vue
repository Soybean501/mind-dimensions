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

const { dimensionInterpretations, archetypeMatches } = useInterpretation()

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
      the other, midline is centre. Scores are normalised from the questions you answered
      in each dimension.
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
      <h2>Your profile most resembles…</h2>
      <p class="results-patterns-intro">
        Your scores place you in a six-dimensional space rather than a single type. These
        are the patterns your profile most closely resembles, ordered by how strongly
        they fit. It's normal for more than one to apply.
      </p>
      <template v-if="archetypeMatches.length > 0">
        <PatternCard v-for="p in archetypeMatches" :key="p.id" :pattern="p" />
      </template>
      <p v-else class="results-patterns-empty">
        Your profile sits between the named patterns. That's a real cognitive
        style of its own — flexible and context-dependent rather than strongly
        biased toward any single mode.
      </p>
    </section>

    <div class="results-actions">
      <button class="btn-ghost" @click="retake">Retake quiz</button>
    </div>
  </div>
</template>
