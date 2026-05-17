// Archetype patterns. Signatures are intentionally loose so multiple may match
// a given user — the result page presents the top three by match strength.

export const ARCHETYPES = [
  {
    id: 'systems_thinker',
    name: 'The Systems Thinker',
    description: 'You apprehend wholes before parts. Concepts arrive as structures, often before language catches up. You\'re drawn to underlying rules and find satisfaction in the wiring of things. This pattern is common among engineers, mathematicians, and many autistic and ADHD profiles where pattern-recognition runs ahead of verbal serialisation.',
    signature: {
      'systemising-drive': [0.4, 1],
      'processing-style': [0.3, 1],
      'unsymbolized-thought': [0.2, 1],
    },
  },
  {
    id: 'verbal_narrator',
    name: 'The Verbal Narrator',
    description: 'Your thinking is language. There\'s an almost constant inner voice, and most of what you think is in sentences as they form. This is what people often assume "thinking" is, but it\'s just one mode among several — about a third of people experience their cognition this way, give or take.',
    signature: {
      'inner-speech': [0.5, 1],
      'unsymbolized-thought': [-1, -0.1],
    },
  },
  {
    id: 'cinema_mind',
    name: 'The Cinema Mind',
    description: 'Your imagination is vivid and pictorial. Reading fiction is closer to watching a film, memory is closer to replay. Hyperphantasia is rare and tends to come with strong object visualisation — you see things, not abstract structures.',
    signature: {
      'visual-imagery': [0.5, 1],
      'visualisation-mode': [-1, -0.2],
    },
  },
  {
    id: 'aphantasic_conceptualist',
    name: 'The Aphantasic Conceptualist',
    description: 'You think without pictures — sometimes without inner words either. Concepts arrive directly as understanding, without sensory clothing. People are often surprised to learn this is possible. Aphantasia affects roughly 1–4% of the population and is increasingly recognised as a stable cognitive variation rather than a deficit.',
    signature: {
      'visual-imagery': [-1, -0.4],
      'unsymbolized-thought': [0.2, 1],
    },
  },
  {
    id: 'spatial_mathematician',
    name: 'The Spatial Mathematician',
    description: 'You think in relationships and structures rather than concrete objects. Things click into place as topology rather than as scenes. This profile is over-represented among mathematicians, theoretical scientists, and architects.',
    signature: {
      'visualisation-mode': [0.4, 1],
      'processing-style': [0.2, 1],
      'systemising-drive': [0.2, 1],
    },
  },
  {
    id: 'step_builder',
    name: 'The Step Builder',
    description: 'Understanding accrues in your mind one piece at a time. You follow the chain, watch the conclusion form, and you can usually retrace exactly how you got there. This sequential mode is the basis of formal logic and structured argument — and the world\'s instruction manuals are written for you.',
    signature: {
      'processing-style': [-1, -0.3],
      'inner-speech': [0.2, 1],
    },
  },
  {
    id: 'intuitive_holist',
    name: 'The Intuitive Holist',
    description: 'You apprehend things whole. Conclusions arrive before reasoning, and the reasoning has to be reconstructed afterwards if anyone asks. This is fast and often accurate, but the trade-off is that it\'s hard to debug — when intuition is wrong, you can\'t easily see where it went wrong.',
    signature: {
      'processing-style': [0.4, 1],
      'unsymbolized-thought': [0.4, 1],
      'systemising-drive': [-1, 0.2],
    },
  },
  {
    id: 'pattern_reader',
    name: 'The Pattern Reader',
    description: 'You\'re tuned to structure in language, behaviour, and systems alike. You spot what doesn\'t fit and you\'re drawn to the why behind any rule. This profile often shows up in people who read voraciously, learn languages well from morphology rather than memorisation, and gravitate toward roles that involve seeing through to underlying mechanism.',
    signature: {
      'systemising-drive': [0.4, 1],
      'processing-style': [0.2, 1],
      'visualisation-mode': [0.1, 1],
    },
  },
  {
    id: 'imagistic_intuitive',
    name: 'The Imagistic Intuitive',
    description: 'Vivid imagery, fast intuition, and a tendency to apprehend things whole. You may think less in words and more in scenes and feelings that carry meaning. Often found among artists, designers, and writers of literary fiction.',
    signature: {
      'visual-imagery': [0.4, 1],
      'processing-style': [0.3, 1],
      'inner-speech': [-1, 0.2],
    },
  },
  {
    id: 'mixed_mode',
    name: 'The Mixed-Mode Thinker',
    description: 'Your profile doesn\'t strongly favour any one pole. That\'s not the boring answer — it\'s a real cognitive style. Flexible thinkers tend to shift mode depending on the task: verbal when explaining, visual when designing, structural when analysing. The trade-off is that no one mode is fully optimised.',
    signature: {
      'inner-speech': [-0.3, 0.3],
      'visual-imagery': [-0.3, 0.3],
      'unsymbolized-thought': [-0.3, 0.3],
    },
  },
]
