import { computed } from 'vue'
import { DIMENSIONS, DIMENSIONS_BY_ID } from '../data/dimensions.js'
import { ARCHETYPES } from '../data/archetypes.js'
import { useQuizStore } from '../stores/quiz-store.js'

function interpretDimension(dim, score) {
  if (score < -0.4) return { band: 'poleA', label: dim.poleA.label, text: dim.interpretations.poleA }
  if (score > 0.4) return { band: 'poleB', label: dim.poleB.label, text: dim.interpretations.poleB }
  return { band: 'middle', label: 'Variable', text: dim.interpretations.middle }
}

// Returns null if the user's score on `dimId` is outside the [low, high] band,
// otherwise a non-negative number measuring how strongly the user sits in the
// band. Bands anchored at +1 reward higher scores, bands anchored at -1 reward
// lower scores, middle bands reward proximity to the band centre.
function rangeStrength(score, low, high) {
  if (score < low || score > high) return null
  const atUpper = high >= 0.999
  const atLower = low <= -0.999
  if (atUpper && !atLower) return score - low
  if (atLower && !atUpper) return high - score
  const center = (low + high) / 2
  const halfWidth = (high - low) / 2
  return halfWidth - Math.abs(score - center)
}

function matchArchetype(arch, scores) {
  let total = 0
  for (const [dimId, [low, high]] of Object.entries(arch.signature)) {
    const strength = rangeStrength(scores[dimId] ?? 0, low, high)
    if (strength === null) return null
    total += strength
  }
  return total
}

function intensityWord(absScore) {
  if (absScore >= 0.8) return 'unusually strong'
  if (absScore >= 0.6) return 'pronounced'
  if (absScore >= 0.4) return 'clear'
  return 'mild'
}

// Build a one-sentence personalisation note for the archetype's most-extreme
// signature dimension. Returns null when no dimension is extreme enough to
// be worth calling out.
function buildPersonalisationNote(arch, scores) {
  let bestDim = null
  let bestAbs = 0
  for (const dimId of Object.keys(arch.signature)) {
    const s = scores[dimId] ?? 0
    if (Math.abs(s) > bestAbs) {
      bestAbs = Math.abs(s)
      bestDim = { id: dimId, score: s }
    }
  }
  if (!bestDim || bestAbs < 0.4) return null
  const dim = DIMENSIONS_BY_ID[bestDim.id]
  if (!dim) return null
  const pole = bestDim.score > 0 ? dim.poleB.label : dim.poleA.label
  return `Your ${intensityWord(bestAbs)} ${pole.toLowerCase()} score sharpens this pattern.`
}

export function useInterpretation() {
  const store = useQuizStore()

  const dimensionInterpretations = computed(() =>
    DIMENSIONS.map(dim => {
      const score = store.normalizedScores[dim.id] ?? 0
      return {
        dimensionId: dim.id,
        name: dim.name,
        score,
        ...interpretDimension(dim, score),
      }
    })
  )

  const archetypeMatches = computed(() => {
    const scores = store.normalizedScores
    const matches = []
    for (const arch of ARCHETYPES) {
      const strength = matchArchetype(arch, scores)
      if (strength === null) continue
      matches.push({
        id: arch.id,
        title: arch.name,
        description: arch.description,
        personalisation: buildPersonalisationNote(arch, scores),
        strength,
      })
    }
    matches.sort((a, b) => b.strength - a.strength)
    return matches.slice(0, 3)
  })

  return { dimensionInterpretations, archetypeMatches }
}
