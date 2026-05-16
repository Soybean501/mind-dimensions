import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { DIMENSIONS, QUIZ_SEQUENCE } from '../data/dimensions.js'

const STORAGE_KEY = 'mind-dimensions-quiz'

export const useQuizStore = defineStore('quiz', () => {
  const rawScores = ref({})
  const currentStep = ref(0)
  const isComplete = ref(false)

  const isInitialized = computed(() => Object.keys(rawScores.value).length > 0)

  const currentDescriptor = computed(() => QUIZ_SEQUENCE[currentStep.value])

  const currentDimension = computed(() => {
    const desc = currentDescriptor.value
    if (!desc) return null
    return DIMENSIONS.find(d => d.id === desc.dimensionId) ?? null
  })

  const currentQuestion = computed(() => {
    const dim = currentDimension.value
    const desc = currentDescriptor.value
    if (!dim || !desc) return null
    return dim.questions[desc.questionIndex] ?? null
  })

  const totalSteps = QUIZ_SEQUENCE.length

  const displayStep = computed(() => currentStep.value + 1)

  const normalizedScores = computed(() => {
    const out = {}
    DIMENSIONS.forEach(d => {
      out[d.id] = (rawScores.value[d.id] ?? 0) / 10
    })
    return out
  })

  function init() {
    const scores = {}
    DIMENSIONS.forEach(d => { scores[d.id] = 0 })
    rawScores.value = scores
    currentStep.value = 0
    isComplete.value = false
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }

  function restore() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) return false
      const data = JSON.parse(saved)
      rawScores.value = data.rawScores
      currentStep.value = data.currentStep
      isComplete.value = data.isComplete
      return true
    } catch {
      return false
    }
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        rawScores: rawScores.value,
        currentStep: currentStep.value,
        isComplete: isComplete.value,
      }))
    } catch {}
  }

  function answer(value) {
    const { dimensionId } = currentDescriptor.value
    rawScores.value = {
      ...rawScores.value,
      [dimensionId]: (rawScores.value[dimensionId] ?? 0) + value,
    }
    if (currentStep.value < QUIZ_SEQUENCE.length - 1) {
      currentStep.value++
    } else {
      isComplete.value = true
    }
    persist()
  }

  return {
    rawScores,
    currentStep,
    isComplete,
    isInitialized,
    currentDescriptor,
    currentDimension,
    currentQuestion,
    totalSteps,
    displayStep,
    normalizedScores,
    init,
    restore,
    persist,
    answer,
  }
})
