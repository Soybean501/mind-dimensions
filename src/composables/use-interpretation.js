import { computed } from 'vue'
import { DIMENSIONS } from '../data/dimensions.js'
import { useQuizStore } from '../stores/quiz-store.js'

const CROSS_PATTERNS = [
  {
    id: 'dual-coding',
    title: 'Dual-Coding Thinker',
    condition: s => s['inner-speech'] > 0.4 && s['visual-imagery'] > 0.4,
    text: 'You have both a strong inner monologue and vivid visual imagery. Allan Paivio\'s dual-coding theory proposes that information encoded simultaneously in verbal and imagistic form is better retained and more flexibly manipulated. For you, thinking is likely a rich, multi-channel process. This combination is common among writers who also work visually, and among learners who naturally create mental diagrams alongside verbal explanations.',
  },
  {
    id: 'verbal-thinker',
    title: 'Predominantly Verbal Thinker',
    condition: s => s['inner-speech'] > 0.4 && s['visual-imagery'] < -0.2,
    text: 'Strong inner speech combined with weak visual imagery suggests predominantly verbal cognition. You process, store, and retrieve using language more than imagery. This profile is associated with strong writing and verbal reasoning, and with people who find reading and writing deeply natural modes of thought. Concepts are held in words, not pictures.',
  },
  {
    id: 'non-verbal-visual',
    title: 'Non-Verbal Visual Thinker',
    condition: s => s['inner-speech'] < -0.2 && s['visual-imagery'] > 0.4,
    text: 'Low inner speech with rich visual imagery is a profile that includes what Temple Grandin described as "thinking in pictures" — meaning arrives as scenes rather than sentences. This combination appears in visual artists, certain engineers, and people who report that their strongest thinking happens before they find words for it.',
  },
  {
    id: 'concept-first',
    title: 'Concept-First Mind',
    condition: s => s['inner-speech'] < -0.4 && s['visual-imagery'] < -0.4,
    text: 'Very low inner speech and very low visual imagery together suggest thought that is predominantly conceptual and unsymbolized — neither narrated nor pictorial. Hurlburt\'s research shows this combination is rarer than either alone. If this is accurate for you, your cognitive life unfolds largely outside of language and imagery — a mode that is genuinely difficult to describe because most introspective language assumes either words or images as the substrate of thought.',
  },
  {
    id: 'abstract-structural',
    title: 'Abstract-Structural Reasoner',
    condition: s => s['systemising-drive'] > 0.4 && s['visualisation-mode'] > 0.4,
    text: 'A high systemising drive combined with spatial visualisation is the profile Kozhevnikov and colleagues associate with theoretical STEM work — particularly mathematics, physics, and engineering — where what matters is reasoning about abstract structural relationships rather than concrete objects. You likely find diagrams and formal notation more useful than words or vivid pictures.',
  },
  {
    id: 'systems-thinker',
    title: 'Systems Thinker',
    condition: s => s['systemising-drive'] > 0.5 && s['processing-style'] > 0.4,
    text: 'High systemising drive combined with holistic processing describes what is often called systems thinking — the ability to apprehend complex rule-governed systems as unified wholes. You are drawn to understanding how things work, and you prefer to grasp overall structure before attending to individual components. This combination is characteristic of theoretical science, architecture, and complex systems design.',
  },
  {
    id: 'gestalt-visual',
    title: 'Gestalt Visual Processor',
    condition: s => s['processing-style'] > 0.4 && s['visual-imagery'] > 0.4 && s['visualisation-mode'] < 0,
    text: 'Holistic processing with rich object imagery suggests a mind that apprehends scenes and situations all at once, in concrete visual detail. This combination is associated with fast intuitive pattern recognition — the whole is grasped before the parts are analysed, and it is grasped in concrete pictures rather than abstract diagrams.',
  },
  {
    id: 'pure-concept',
    title: 'Pure-Concept Thinker',
    condition: s => s['unsymbolized-thought'] > 0.4 && s['inner-speech'] < 0 && s['visual-imagery'] < 0,
    text: 'A high unsymbolized-thought score combined with low inner speech and low imagery is, per Hurlburt\'s sampling research, among the rarer profiles. Thought arrives as direct knowing — no verbal wrapper, no mental picture. If this resonates, you may find it genuinely difficult to describe how you think, because the experience lacks the symbolic handles most introspective accounts rely on.',
  },
]

function interpretDimension(dim, score) {
  if (score < -0.4) return { band: 'poleA', label: dim.poleA.label, text: dim.interpretations.poleA }
  if (score > 0.4) return { band: 'poleB', label: dim.poleB.label, text: dim.interpretations.poleB }
  return { band: 'middle', label: 'Variable', text: dim.interpretations.middle }
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

  const crossPatterns = computed(() => {
    const scores = store.normalizedScores
    const matched = CROSS_PATTERNS.filter(p => p.condition(scores))
    if (matched.length === 0) {
      return [{
        id: 'balanced',
        title: 'Flexible Cognitive Profile',
        text: 'Your scores are distributed across the centre of most dimensions, suggesting a flexible or context-dependent cognitive style rather than a strong bias toward any one pole. This is a common and often highly adaptive profile — you bring different modes of cognition to different situations rather than relying on a single dominant style.',
      }]
    }
    return matched.slice(0, 3)
  })

  return { dimensionInterpretations, crossPatterns }
}
