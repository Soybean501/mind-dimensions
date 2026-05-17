// Dimension metadata. Question banks live in ./questions.js and are sampled
// dynamically at quiz start (5 of 8 per dimension).

export const DIMENSIONS = [
  {
    id: 'inner-speech',
    name: 'Inner Speech',
    reference: 'Fernyhough, Hurlburt, Nedergård',
    poleA: {
      label: 'Anendophasia',
      description: 'Thinking occurs with minimal or no verbal narration. Cognition proceeds through images, feelings, and wordless knowing.',
    },
    poleB: {
      label: 'Inner Monologue',
      description: 'A near-continuous stream of inner speech accompanies thought. You effectively narrate your experience as it happens.',
    },
    about: 'Inner speech is the experience of talking to yourself in your head. It ranges from total absence (anendophasia, studied by Nedergård & Lupyan, 2023) to an incessant inner monologue. Hurlburt\'s Descriptive Experience Sampling shows most people fall somewhere between these poles, and many are surprised by where they land.',
    interpretations: {
      poleA: 'Your responses suggest thinking that proceeds largely without verbal narration — what researchers are beginning to call anendophasia. A 2023 study by Nedergård and Lupyan estimated around 5–10% of people rarely or never experience inner speech. If this is accurate for you, you may find it puzzling that most introspective language assumes a "voice in the head," since the phenomenon is simply absent.',
      middle: 'Your inner speech is moderate and variable — sometimes a running commentary, sometimes quiet, depending on the task and your mental state. This is the most common profile. Charles Fernyhough\'s research suggests inner speech often occurs in condensed, abbreviated form rather than as fully formed sentences.',
      poleB: 'Your responses indicate a strong inner monologue — a near-continuous stream of verbal thought that accompanies most of your experience. This is what Fernyhough describes as dialogic inner speech: thinking that has the structure of an internal conversation. It likely plays a significant role in how you plan, reason, and self-regulate.',
    },
  },

  {
    id: 'visual-imagery',
    name: 'Visual Imagery',
    reference: 'Adam Zeman, University of Exeter',
    poleA: {
      label: 'Aphantasia',
      description: 'No voluntary visual mental imagery. Recalled scenes or imagined places produce no inner picture whatsoever.',
    },
    poleB: {
      label: 'Hyperphantasia',
      description: 'Exceptionally vivid, detailed, often involuntary mental imagery. Recalled memories can feel photographic; imagination is immersive.',
    },
    about: 'Adam Zeman\'s group at Exeter coined "aphantasia" in 2015 for the complete absence of voluntary visual imagery. Its opposite, "hyperphantasia," describes imagery so vivid it can blur with perception. Most people fall between these poles, and very few have explored where.',
    interpretations: {
      poleA: 'You appear to have little or no voluntary visual mental imagery — the condition Adam Zeman\'s group at Exeter called aphantasia in 2015. You process visual information and understand spatial concepts, but without any accompanying inner picture. Notably, aphantasic individuals often perform at or above average on spatial reasoning tasks; the pictorial and spatial systems are partly independent.',
      middle: 'Your visual imagery is moderate — present and reasonably clear, but not extraordinarily vivid. This is the most common range. The images you form are functional: clear enough to be useful for memory and imagination, but unlikely to be confused with actual perception.',
      poleB: 'Your mental imagery appears unusually vivid and detailed — what Zeman\'s group calls hyperphantasia. Your mind\'s eye generates images that can feel almost perceptual in their clarity. This can be an asset in creative and spatial work, though some people in this range also report involuntary imagery or difficulty "unseeing" vivid memories.',
    },
  },

  {
    id: 'unsymbolized-thought',
    name: 'Unsymbolized Thought',
    reference: 'Russell Hurlburt, Descriptive Experience Sampling',
    poleA: {
      label: 'Symbolized',
      description: 'Thoughts almost always arrive with words or images. Thinking and symbolic form are essentially inseparable.',
    },
    poleB: {
      label: 'Unsymbolized',
      description: 'Thoughts frequently arrive as pure conceptual knowing with no linguistic or sensory form — direct apprehension without a wrapper.',
    },
    about: 'Russell Hurlburt\'s Descriptive Experience Sampling (DES) method — using a beeper to sample inner experience in real time — has documented that many people frequently have thoughts with no symbolic form: no inner voice, no mental image, just direct knowing. This challenges the assumption that all thought is encoded in words or pictures.',
    interpretations: {
      poleA: 'Your thinking appears to be consistently accompanied by verbal or imagistic form — words, inner speech, or mental images are present for most of your thoughts. This is the profile that most psychological accounts assume is universal. Hurlburt\'s research suggests it is common, but not as universal as traditionally assumed.',
      middle: 'Your experience of unsymbolized thought is mixed — sometimes thoughts arrive with clear symbolic form (words or images), sometimes they seem more like direct knowings. This variability across situations and tasks is common. Hurlburt\'s DES research suggests moment-to-moment experience is often more varied than people expect when asked to introspect globally.',
      poleB: 'Your responses suggest frequent unsymbolized thought — concepts and judgements that arrive without any accompanying verbal or visual form. Hurlburt\'s DES research, which samples inner experience in real time, has documented this as a genuine and surprisingly common mode of cognition, though one that tends to be invisible in everyday conversation because it is genuinely hard to put into words.',
    },
  },

  {
    id: 'systemising-drive',
    name: 'Systemising Drive',
    reference: 'Simon Baron-Cohen, Systemising Quotient',
    poleA: {
      label: 'Low Systemising',
      description: 'Low drive to find rules and structures in the world. Engagement is more contextual, relational, or pragmatic than rule-seeking.',
    },
    poleB: {
      label: 'High Systemising',
      description: 'Strong drive to identify underlying rules and construct mental models of how systems work — across technology, nature, language, music, and social domains.',
    },
    about: 'Simon Baron-Cohen\'s Systemising Quotient measures the drive to analyse and construct rule-governed systems. It is distinct from intelligence and from expertise — it is a motivational orientation. High systemisers are drawn to finding the rules even when it isn\'t strictly useful. It correlates with, but is not the same as, empathising drive, which runs in the opposite direction.',
    interpretations: {
      poleA: 'You appear to have a low drive to systematise — to seek out and build mental models of rule-governed systems. Baron-Cohen\'s research identifies this as one end of a broad axis often correlated with higher empathising drive: a preference for understanding the world through people and contexts rather than through rules and structures. This is not a deficit; it reflects a different orientation toward what makes things intelligible.',
      middle: 'Your systemising drive appears moderate — you engage with rules and patterns when needed, but it\'s not a dominant preoccupation. You likely move fluidly between analysing systems and engaging with context and people depending on what a situation calls for.',
      poleB: 'Your systemising drive is high. You habitually notice patterns, seek out underlying rules, and build mental models of how things work — across technology, social dynamics, language, music, and other domains. Baron-Cohen\'s research links strong systemising to persistent attention to regularities that others pass over. This drive tends to produce deep expertise in specific domains and strong intuitions about how systems will behave.',
    },
  },

  {
    id: 'processing-style',
    name: 'Processing Style',
    reference: 'Riding, Kozhevnikov — cognitive style literature',
    poleA: {
      label: 'Sequential',
      description: 'Processes information step by step, one element at a time. Understanding builds incrementally in an ordered sequence.',
    },
    poleB: {
      label: 'Parallel / Holistic',
      description: 'Apprehends systems as structural wholes. Can grasp the shape of a complex argument or system before working through its parts.',
    },
    about: 'Cognitive style research distinguishes between step-by-step sequential processing and more global, structural processing in which whole configurations are apprehended at once. Neither is superior in general; each confers advantages in different domains. Sequential processing suits procedural tasks; holistic processing suits rapid pattern recognition and complex system reasoning.',
    interpretations: {
      poleA: 'Your processing style appears predominantly sequential — you build understanding step by step, one element at a time, in an ordered sequence. This style is particularly well-suited to procedural domains (programming, mathematics, formal reasoning) where correctness depends on the order of operations and each step must be confirmed before the next.',
      middle: 'Your processing style is flexible — you can work through things sequentially when that\'s the right approach, and grasp structural wholes when the situation calls for it. This adaptability is cognitively valuable, allowing you to match your approach to the task at hand.',
      poleB: 'Your processing tends to be parallel and holistic — you apprehend systems as structural wholes rather than sequential steps. You\'re likely to grasp the shape of an argument, a system, or a problem before working through its components. This gestalt mode of cognition is associated with rapid pattern recognition and strong intuitions about complex systems.',
    },
  },

  {
    id: 'visualisation-mode',
    name: 'Visualisation Mode',
    reference: 'Maria Kozhevnikov, Object-Spatial Imagery Questionnaire',
    poleA: {
      label: 'Object Visualiser',
      description: 'Mental imagery is concrete and pictorial — objects with their visual properties (colour, texture, shape) rather than abstract spatial relationships.',
    },
    poleB: {
      label: 'Spatial Visualiser',
      description: 'Mental representations favour abstract structural and relational information over concrete pictorial detail. Thinks in diagrams and relationships.',
    },
    about: 'Maria Kozhevnikov\'s Object-Spatial Imagery Questionnaire (OSIQ) distinguishes two independent imagery styles. Object visualisers generate detailed, colourful, literal pictures of individual objects. Spatial visualisers think in abstract, schematic diagrams of relationships and spatial structures. Both styles are found across ability levels, but they correlate with different domain preferences — object visualisers tend toward visual arts; spatial visualisers toward STEM.',
    interpretations: {
      poleA: 'You appear to be primarily an object visualiser — your mental imagery is concrete and pictorial, representing objects with their visual properties (colour, texture, shape) rather than their abstract spatial relationships. Kozhevnikov\'s research links this style to visual arts and design. Your strength is in vivid, detailed mental representation of specific things.',
      middle: 'Your visualisation mode is mixed — you use both object-based and spatial-relational imagery depending on what you\'re thinking about. This flexibility is common and useful, allowing you to access both concrete visual representation and abstract spatial reasoning as needed.',
      poleB: 'You appear to be primarily a spatial visualiser — your mental representations favour abstract structural and relational information over concrete pictorial detail. You think in diagrams and relationships more than in pictures. Kozhevnikov\'s research links this style to STEM disciplines, particularly mathematics, physics, and engineering, where reasoning about abstract spatial structures matters more than vivid mental imagery.',
    },
  },
]

export const DIMENSIONS_BY_ID = Object.fromEntries(DIMENSIONS.map(d => [d.id, d]))

export const QUESTIONS_PER_DIMENSION = 5
