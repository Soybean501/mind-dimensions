// The six cognitive dimensions, plus population data + mock user state.

export const DIMENSIONS = [
  {
    id: 'inner-speech',
    code: 'IS',
    name: 'Inner Speech',
    tagline: 'The silent voice in your head.',
    description:
      'The frequency and texture of verbal thought experienced as an inner monologue — distinct from imagined sound or recalled speech.',
    poles: { lo: { code: 'Silent', label: 'Silent Mind' }, hi: { code: 'Voiced', label: 'Constant Narration' } },
    hue: 220,
    research: 'Heavery, Hurlburt — Descriptive Experience Sampling (DES) studies, 2008–2021.',
    facets: ['Self-talk', 'Narration', 'Linguistic rumination'],
  },
  {
    id: 'visual-imagery',
    code: 'VI',
    name: 'Visual Imagery',
    tagline: 'How vividly your mind sees.',
    description:
      'The clarity and vividness of voluntary visual mental imagery, on a spectrum from imageless cognition (aphantasia) to photographically vivid (hyperphantasia).',
    poles: { lo: { code: 'Aphantasic', label: 'Aphantasic' }, hi: { code: 'Hyperphantasic', label: 'Hyperphantasic' } },
    hue: 330,
    research: 'Zeman et al., Cortex 2015; VVIQ-2 (Marks).',
    facets: ['Faces', 'Objects', 'Landscapes', 'Memory replay'],
  },
  {
    id: 'unsymbolized',
    code: 'UT',
    name: 'Unsymbolized Thought',
    tagline: 'Wordless, imageless knowing.',
    description:
      'The experience of having a definite thought without accompanying words, images, or sensations — a felt understanding that resists linguistic capture.',
    poles: { lo: { code: 'Rare', label: 'Rarely Unsymbolized' }, hi: { code: 'Pervasive', label: 'Often Unsymbolized' } },
    hue: 80,
    research: 'Hurlburt & Akhter, Phenomenology and the Cognitive Sciences, 2008.',
    facets: ['Felt sense', 'Tacit knowing', 'Pre-verbal certainty'],
  },
  {
    id: 'systemising',
    code: 'SD',
    name: 'Systemising Drive',
    tagline: 'The pull toward rules and patterns.',
    description:
      'A disposition toward analyzing, constructing, and exploring rule-based systems — mechanical, mathematical, linguistic, or social.',
    poles: { lo: { code: 'Intuitive', label: 'Intuitive' }, hi: { code: 'Systemising', label: 'Systemising' } },
    hue: 160,
    research: 'Baron-Cohen et al., SQ-R, 2003.',
    facets: ['Mechanical', 'Abstract', 'Natural', 'Social'],
  },
  {
    id: 'processing',
    code: 'PS',
    name: 'Processing Style',
    tagline: 'Step-by-step, or all-at-once.',
    description:
      'Preference for sequential, linear analysis versus parallel, holistic synthesis — how attention is distributed across the parts and the whole.',
    poles: { lo: { code: 'Sequential', label: 'Sequential' }, hi: { code: 'Parallel', label: 'Parallel' } },
    hue: 290,
    research: 'Allinson & Hayes Cognitive Style Index; Riding RAT.',
    facets: ['Attention', 'Comprehension', 'Memory'],
  },
  {
    id: 'sensory',
    code: 'SV',
    name: 'Sensory Vividness',
    tagline: 'Texture of the inner senses.',
    description:
      'The cross-modal richness of imagined non-visual experience — sound, taste, touch, smell — independent of visual imagery.',
    poles: { lo: { code: 'Faint', label: 'Subdued Senses' }, hi: { code: 'Vivid', label: 'Vivid Senses' } },
    hue: 20,
    research: 'Plymouth Sensory Imagery Questionnaire (Psi-Q).',
    facets: ['Auditory', 'Tactile', 'Olfactory', 'Gustatory', 'Kinaesthetic'],
  },
]

export const POPULATION = {
  'inner-speech':   { mean: 0.55, sd: 0.22, mode: 'bimodal' },
  'visual-imagery': { mean: 0.62, sd: 0.24, mode: 'left-skewed' },
  'unsymbolized':   { mean: 0.41, sd: 0.20, mode: 'right-skewed' },
  'systemising':    { mean: 0.50, sd: 0.21, mode: 'normal' },
  'processing':     { mean: 0.50, sd: 0.18, mode: 'normal' },
  'sensory':        { mean: 0.54, sd: 0.20, mode: 'normal' },
}

export const LIKERT_LABELS = [
  'Strongly disagree','Disagree','Slightly disagree','Neither','Slightly agree','Agree','Strongly agree'
]

export const QUIZ_INNER_SPEECH = [
  { id: 'q1', kind: 'likert', prompt: 'I often hear my thoughts as words, as if someone is speaking inside my head.', sublabel: 'Anchor moment: think about the last hour.' },
  { id: 'q2', kind: 'choice', prompt: 'When you make a decision, what most often happens first?',
    options: [
      { id: 'a', label: 'I talk it through, silently or aloud.' },
      { id: 'b', label: 'I weigh it without words — a feeling tips me.' },
      { id: 'c', label: 'I see consequences play out as images.' },
      { id: 'd', label: 'It varies wildly day to day.' },
    ] },
  { id: 'q3', kind: 'slider', prompt: 'When you read this sentence, how loud is the voice in your head?',
    sublabel: 'Move the marker between silence and full volume.', anchors: ['Silent','Murmur','Full voice'] },
  { id: 'q4', kind: 'likert', prompt: 'I narrate ordinary actions to myself — "now I am opening the door".', sublabel: 'Frequency, not vividness.' },
  { id: 'q5', kind: 'choice', prompt: 'A friend describes a problem to you. Before you reply, you most often:',
    options: [
      { id: 'a', label: "Rehearse what I'll say." },
      { id: 'b', label: 'Feel the shape of an answer wordlessly.' },
      { id: 'c', label: 'Picture the scene they described.' },
      { id: 'd', label: 'Notice my body — tension, breath, posture.' },
    ] },
  { id: 'q6', kind: 'slider', prompt: 'Right now, in this moment, where does your mind sit?',
    sublabel: 'There is no correct answer.', anchors: ['Wordless','Words and silence','All words'] },
]

export function interpretFor(d, score) {
  const hi = score > 0.5
  const intensity = Math.abs(score - 0.5) * 2
  const tag = intensity > 0.5 ? 'pronounced' : intensity > 0.25 ? 'noticeable' : 'subtle'
  const map = {
    'inner-speech': hi
      ? `Your inner life is heavily verbal. Thoughts often arrive as sentences; you may rehearse, narrate, or talk things through silently. This is a ${tag} lean toward continuous inner speech.`
      : `Your mind is unusually quiet. Many of your thoughts arrive without words — as felt understandings, images, or bodily senses. This is a ${tag} lean toward a silent mind.`,
    'visual-imagery': hi
      ? `You experience vivid voluntary visual imagery — closer to photographic than schematic. This is a ${tag} hyperphantasic profile.`
      : `Your mind's eye is dim or absent. Memory and imagination function through knowledge and feeling, not pictures. This is a ${tag} aphantasic profile.`,
    'unsymbolized': hi
      ? `You frequently know things without words or images — a definite thought without a sensory wrapper. This is a ${tag} disposition toward unsymbolized thought.`
      : `Your thoughts tend to wear sensory clothing — words, images, feelings. Unsymbolized thinking is ${tag === 'subtle' ? 'uncommon' : 'rare'} for you.`,
    'systemising': hi
      ? `You're drawn to rule-based systems — mechanical, abstract, or social. You enjoy finding the engine inside things. This is a ${tag} systemising profile.`
      : `You read situations holistically rather than as systems. Patterns reveal themselves through feeling and use rather than analysis. This is a ${tag} intuitive profile.`,
    'processing': hi
      ? `You tend to take things in parallel and assemble them at once. Holistic comprehension comes before linear breakdown. This is a ${tag} parallel-processing profile.`
      : `You think in sequence — step, step, step. Linear analysis is your strong suit. This is a ${tag} sequential-processing profile.`,
    'sensory': hi
      ? `Your inner non-visual senses are vivid — you can hear, taste, touch, and smell in imagination with notable clarity. This is a ${tag} vivid-senses profile.`
      : `Your imagined non-visual senses are faint or absent — sounds, tastes, and textures don't come alive in the mind's ear or palm. This is a ${tag} subdued-senses profile.`,
  }
  return map[d.id]
}
