import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { DIMENSIONS, QUESTIONS_PER_DIMENSION } from '../data/dimensions.js'
import { QUESTIONS_BY_ID, questionsForDimension } from '../data/questions.js'

const STORAGE_KEY = 'mind-dimensions-quiz'

function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Sample QUESTIONS_PER_DIMENSION questions per dimension and interleave them
// so the user sees one question from each dimension per round.
function buildQuestionSequence() {
  const perDim = {}
  for (const d of DIMENSIONS) {
    const pool = shuffle(questionsForDimension(d.id))
    perDim[d.id] = pool.slice(0, QUESTIONS_PER_DIMENSION).map(q => q.id)
  }
  const sequence = []
  for (let round = 0; round < QUESTIONS_PER_DIMENSION; round++) {
    for (const d of DIMENSIONS) {
      sequence.push(perDim[d.id][round])
    }
  }
  return sequence
}

export const useQuizStore = defineStore('quiz', () => {
  const rawScores = ref({})
  const answeredCount = ref({})
  const questionSequence = ref([])
  const currentStep = ref(0)
  const isComplete = ref(false)

  const isInitialized = computed(() => questionSequence.value.length > 0)

  const currentQuestionId = computed(() => questionSequence.value[currentStep.value] ?? null)

  const currentQuestion = computed(() => {
    const id = currentQuestionId.value
    return id ? QUESTIONS_BY_ID[id] ?? null : null
  })

  const currentDimension = computed(() => {
    const q = currentQuestion.value
    if (!q) return null
    return DIMENSIONS.find(d => d.id === q.dimensionId) ?? null
  })

  const totalSteps = computed(() => questionSequence.value.length)

  const displayStep = computed(() => currentStep.value + 1)

  const normalizedScores = computed(() => {
    const out = {}
    for (const d of DIMENSIONS) {
      const raw = rawScores.value[d.id] ?? 0
      const n = answeredCount.value[d.id] ?? 0
      out[d.id] = n > 0 ? raw / (n * 2) : 0
    }
    return out
  })

  function init() {
    const scores = {}
    const counts = {}
    for (const d of DIMENSIONS) {
      scores[d.id] = 0
      counts[d.id] = 0
    }
    rawScores.value = scores
    answeredCount.value = counts
    questionSequence.value = buildQuestionSequence()
    currentStep.value = 0
    isComplete.value = false
    persist()
  }

  function restore() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) return false
      const data = JSON.parse(saved)
      if (!Array.isArray(data.questionSequence) || data.questionSequence.length === 0) return false
      // Defensive: drop saved state if any question IDs are stale.
      if (data.questionSequence.some(id => !QUESTIONS_BY_ID[id])) return false
      rawScores.value = data.rawScores ?? {}
      answeredCount.value = data.answeredCount ?? {}
      questionSequence.value = data.questionSequence
      currentStep.value = data.currentStep ?? 0
      isComplete.value = data.isComplete ?? false
      return true
    } catch {
      return false
    }
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        rawScores: rawScores.value,
        answeredCount: answeredCount.value,
        questionSequence: questionSequence.value,
        currentStep: currentStep.value,
        isComplete: isComplete.value,
      }))
    } catch {}
  }

  function answer(value) {
    const q = currentQuestion.value
    if (!q) return
    const dimId = q.dimensionId
    rawScores.value = {
      ...rawScores.value,
      [dimId]: (rawScores.value[dimId] ?? 0) + value,
    }
    answeredCount.value = {
      ...answeredCount.value,
      [dimId]: (answeredCount.value[dimId] ?? 0) + 1,
    }
    if (currentStep.value < questionSequence.value.length - 1) {
      currentStep.value++
    } else {
      isComplete.value = true
    }
    persist()
  }

  return {
    rawScores,
    answeredCount,
    questionSequence,
    currentStep,
    isComplete,
    isInitialized,
    currentQuestionId,
    currentQuestion,
    currentDimension,
    totalSteps,
    displayStep,
    normalizedScores,
    init,
    restore,
    persist,
    answer,
  }
})
