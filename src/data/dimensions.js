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
    questions: [
      {
        text: 'You\'re driving a familiar route and you miss your turn. What happens inside your mind in the next few seconds?',
        options: [
          { label: 'Nothing verbal — a jolt, maybe a flash of the missed street, and I\'m already correcting.', value: -2 },
          { label: 'A brief internal word or two ("damn" or "turn") but nothing sustained.', value: -1 },
          { label: 'I narrate it to myself: "Okay, I missed it — take the next left and loop back."', value: 1 },
          { label: 'A full internal monologue starts — I replay the moment, explain it to myself, plan aloud in my head.', value: 2 },
        ],
      },
      {
        text: 'When you\'re reading a novel and processing what a character is feeling, how does that understanding arrive?',
        options: [
          { label: 'As a felt sense — I know without any words forming.', value: -2 },
          { label: 'Mostly non-verbal, though a word occasionally surfaces.', value: -1 },
          { label: 'I often find myself sub-vocalising the character\'s situation to grasp it.', value: 1 },
          { label: 'I explicitly talk it through in my head, almost as if explaining to someone else.', value: 2 },
        ],
      },
      {
        text: 'When you wake in the night unable to sleep, what tends to fill your mind?',
        options: [
          { label: 'Fragments, sensations, or images — rarely words.', value: -2 },
          { label: 'Sometimes words, but not a consistent stream.', value: -1 },
          { label: 'A fairly continuous verbal flow — I\'m essentially talking to myself.', value: 1 },
          { label: 'An intense, unstoppable internal monologue.', value: 2 },
        ],
      },
      {
        text: 'Before saying something important to someone, how do you prepare?',
        options: [
          { label: 'I don\'t rehearse in words at all — the right thing tends to come out when it comes.', value: -2 },
          { label: 'I sometimes run through the gist verbally, but briefly.', value: -1 },
          { label: 'I tend to rehearse full sentences in my head beforehand.', value: 1 },
          { label: 'I run through multiple versions of what I might say, almost scripting it.', value: 2 },
        ],
      },
      {
        text: 'As you read this question right now, is there a voice in your head reading it?',
        options: [
          { label: 'No — I absorb the text without any auditory quality.', value: -2 },
          { label: 'Occasionally, for emphasis, but generally silent.', value: -1 },
          { label: 'Yes, most of the time there\'s a quiet voice along for the ride.', value: 1 },
          { label: 'Always — reading without an inner voice feels impossible to imagine.', value: 2 },
        ],
      },
    ],
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
    questions: [
      {
        text: 'Close your eyes and think of your front door. What do you experience?',
        options: [
          { label: 'Nothing visual — I know it\'s there conceptually, but no image forms.', value: -2 },
          { label: 'A vague, dim shape — more like an impression than a picture.', value: -1 },
          { label: 'A reasonably clear image — colour, general shape, recognisable.', value: 1 },
          { label: 'A vivid, detailed image — almost as clear as seeing it with open eyes.', value: 2 },
        ],
      },
      {
        text: 'When you read a novel and the author describes a landscape in detail, what happens?',
        options: [
          { label: 'I have no picture — I engage with the meaning of the words only.', value: -2 },
          { label: 'A faint sense of space, but not a visual scene as such.', value: -1 },
          { label: 'A scene forms that I can navigate — somewhat like a mental film set.', value: 1 },
          { label: 'A vivid, immersive scene — I feel like I\'m standing in it.', value: 2 },
        ],
      },
      {
        text: 'Try to visualise a red apple right now. How would you rate its clarity?',
        options: [
          { label: 'There is no apple — just the concept "apple."', value: -2 },
          { label: 'Something very faint that barely qualifies as an image.', value: -1 },
          { label: 'Moderately clear — coloured, shaped, recognisably an apple.', value: 1 },
          { label: 'Vivid enough that I can make out the sheen and stem.', value: 2 },
        ],
      },
      {
        text: 'When you recall a holiday or memorable event from the past, what do you get?',
        options: [
          { label: 'Facts and feelings — no visual recall at all.', value: -2 },
          { label: 'Flickers of something, but not images I could describe.', value: -1 },
          { label: 'Reasonable visual fragments — I can describe what places looked like.', value: 1 },
          { label: 'Rich, detailed scenes that feel like replaying footage.', value: 2 },
        ],
      },
      {
        text: 'If someone asks you to imagine a blue triangle rotating slowly, what happens?',
        options: [
          { label: 'Nothing. I understand the concept, but there is no image.', value: -2 },
          { label: 'A suggestion of motion or shape, but nothing I\'d call a picture.', value: -1 },
          { label: 'I see it reasonably clearly and can track its rotation.', value: 1 },
          { label: 'A vivid, smooth rotation — I could almost count its edges.', value: 2 },
        ],
      },
    ],
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
    questions: [
      {
        text: 'You suddenly know you\'ve forgotten something important — but before you know what it is, there\'s a moment of pure "I\'ve forgotten something." What is that moment like?',
        options: [
          { label: 'Immediately verbal or visual — the label or image arrives almost simultaneously.', value: -2 },
          { label: 'Mostly symbolic, but with a hint of wordless urgency.', value: -1 },
          { label: 'More like a pure signal — the knowing arrives before any words or pictures.', value: 1 },
          { label: 'Entirely wordless and imageless — a direct, formless certainty.', value: 2 },
        ],
      },
      {
        text: 'You\'re asked "what\'s 8 × 7?" How does the answer arrive?',
        options: [
          { label: 'I hear or sub-vocalise "56" — the number comes as a word.', value: -2 },
          { label: 'Partly verbal, but also something more immediate I can\'t name.', value: -1 },
          { label: 'It just appears — I\'m not sure it arrives as a word or image.', value: 1 },
          { label: 'Direct retrieval — no verbal or visual step I can detect.', value: 2 },
        ],
      },
      {
        text: 'You realise mid-conversation that a friend is upset about something specific — before you\'ve consciously reasoned it out. That realisation...',
        options: [
          { label: 'Arrives in words: I internally say something like "she\'s upset about X."', value: -2 },
          { label: 'Is partly verbal and partly something harder to name.', value: -1 },
          { label: 'Feels more like a direct knowing with no particular verbal form.', value: 1 },
          { label: 'Is a pure, wordless, imageless apprehension — I just know.', value: 2 },
        ],
      },
      {
        text: 'You immediately get a joke someone just told. The moment of understanding...',
        options: [
          { label: 'Comes with the words of the punchline echoing internally.', value: -2 },
          { label: 'Has a verbal flavour but flashes faster than speech.', value: -1 },
          { label: 'Is more of a conceptual click — not particularly verbal.', value: 1 },
          { label: 'Happens instantly and without any internal words or images.', value: 2 },
        ],
      },
      {
        text: 'You\'re thinking about an abstract concept — say, "momentum" or "fairness." Your thinking feels...',
        options: [
          { label: 'Verbal — sentences, definitions, examples in words.', value: -2 },
          { label: 'Mostly verbal, sometimes with images.', value: -1 },
          { label: 'Sometimes worded, sometimes wordless — it varies.', value: 1 },
          { label: 'Often or usually wordless — concepts seem to hold themselves.', value: 2 },
        ],
      },
    ],
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
    questions: [
      {
        text: 'You\'re using a new app and it behaves unexpectedly — a button does something different from what you anticipated. You\'re most likely to...',
        options: [
          { label: 'Shrug and adapt — you don\'t need to know why it happened.', value: -2 },
          { label: 'Be mildly curious but move on quickly.', value: -1 },
          { label: 'Try to understand what rule or condition triggers the behaviour.', value: 1 },
          { label: 'Systematically probe it until you have a complete mental model.', value: 2 },
        ],
      },
      {
        text: 'At a gathering with people you don\'t know well, you find yourself...',
        options: [
          { label: 'Going with the social flow — not analysing, just being present.', value: -2 },
          { label: 'Occasionally noticing social patterns but not dwelling on them.', value: -1 },
          { label: 'Noticing regularities — who dominates, who defers, why.', value: 1 },
          { label: 'Mentally building a model of the group dynamics and their underlying rules.', value: 2 },
        ],
      },
      {
        text: 'When you learn that something you believed is wrong, your response is...',
        options: [
          { label: 'Update and move on — you don\'t dig into why you were wrong.', value: -2 },
          { label: 'Reflect briefly on the correct information and continue.', value: -1 },
          { label: 'Try to understand what assumption or rule led you astray.', value: 1 },
          { label: 'Investigate systematically to find what was wrong with your mental model.', value: 2 },
        ],
      },
      {
        text: 'A game you play frequently has a rule you\'ve never seen exploited. You...',
        options: [
          { label: 'Don\'t think much about it — it just never comes up.', value: -2 },
          { label: 'Note it vaguely in case it proves useful.', value: -1 },
          { label: 'Think about when and how it would change the game.', value: 1 },
          { label: 'Map out its interaction with other rules and how it should alter strategy.', value: 2 },
        ],
      },
      {
        text: 'When you hear music you know well, you tend to...',
        options: [
          { label: 'Feel it and respond emotionally — structure is irrelevant.', value: -2 },
          { label: 'Notice the melody and enjoy it, not much else.', value: -1 },
          { label: 'Often notice chord progressions, rhythmic patterns, and form.', value: 1 },
          { label: 'Almost automatically analyse the structure, even when you\'d prefer not to.', value: 2 },
        ],
      },
    ],
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
    questions: [
      {
        text: 'You\'re learning how a complicated system works — a new organisation, a codebase, a supply chain. You prefer to...',
        options: [
          { label: 'Work through it part by part in a logical sequence.', value: -2 },
          { label: 'Mostly sequential, but with some early orientation to the whole.', value: -1 },
          { label: 'Get a rough overall picture first, then fill in the pieces.', value: 1 },
          { label: 'Immediately try to see the whole structure — the parts make sense only in context.', value: 2 },
        ],
      },
      {
        text: 'When planning a project, you naturally...',
        options: [
          { label: 'List the tasks in order and work through them linearly.', value: -2 },
          { label: 'Start with a rough structure and then sequence within it.', value: -1 },
          { label: 'Think about how everything connects before deciding on sequence.', value: 1 },
          { label: 'Map the whole as an interconnected system before thinking about order.', value: 2 },
        ],
      },
      {
        text: 'When reading a complex argument, you\'re most comfortable when...',
        options: [
          { label: 'Each point is laid out sequentially, building step by step toward the conclusion.', value: -2 },
          { label: 'There\'s a clear structure, but you can follow either way.', value: -1 },
          { label: 'You can see where it\'s going early and fill in the steps as you go.', value: 1 },
          { label: 'You grasp the overall thesis first and understand the argument as a whole.', value: 2 },
        ],
      },
      {
        text: 'In conversation, when someone is explaining something complex, you tend to...',
        options: [
          { label: 'Follow step by step, building your understanding incrementally.', value: -2 },
          { label: 'Mostly follow sequentially but occasionally anticipate ahead.', value: -1 },
          { label: 'Try to infer the whole picture before they\'ve finished.', value: 1 },
          { label: 'Often complete the structure in your head before they\'re done, waiting for confirmation.', value: 2 },
        ],
      },
      {
        text: 'You\'re troubleshooting a problem in a system — a device, a process, a codebase. You...',
        options: [
          { label: 'Start at the beginning and trace through step by step.', value: -2 },
          { label: 'Step through the most likely sequence of causes.', value: -1 },
          { label: 'Generate hypotheses about failure points based on your model of the system.', value: 1 },
          { label: 'Immediately form a model of the whole system and reason about where inconsistencies must be.', value: 2 },
        ],
      },
    ],
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
    questions: [
      {
        text: 'Someone gives you walking directions to a place you haven\'t been. You most naturally represent them as...',
        options: [
          { label: 'Concrete mental pictures — imagining the street, the corner, the building as you\'ll see them.', value: -2 },
          { label: 'A mix of pictures and spatial sense.', value: -1 },
          { label: 'Mostly an abstract sense of direction and distance.', value: 1 },
          { label: 'A schematic map — turns and spatial relationships, without vivid imagery.', value: 2 },
        ],
      },
      {
        text: 'When you think about how a city you know well is laid out, you...',
        options: [
          { label: 'See specific places — streets, facades, landmarks — as pictures.', value: -2 },
          { label: 'Have both pictorial and spatial components.', value: -1 },
          { label: 'Think in terms of distances, directions, and how areas relate.', value: 1 },
          { label: 'Have a purely topological sense — a mental graph of connections, no vivid imagery.', value: 2 },
        ],
      },
      {
        text: 'You\'re trying to remember where you left something in your home. You...',
        options: [
          { label: 'Mentally walk through the space, seeing it visually — like a mental CCTV replay.', value: -2 },
          { label: 'Get some visual scene combined with a spatial sense.', value: -1 },
          { label: 'Think about locations and proximity rather than pictures.', value: 1 },
          { label: 'Reason spatially — where could it be relative to where I last was?', value: 2 },
        ],
      },
      {
        text: 'A friend describes a new piece of furniture they\'ve bought. You picture...',
        options: [
          { label: 'A fairly vivid image of the object — shape, colour, material.', value: -2 },
          { label: 'A partial image, mainly its overall shape.', value: -1 },
          { label: 'More its spatial properties — dimensions, proportions — than its appearance.', value: 1 },
          { label: 'An abstract sense of the object\'s form and how it might fit in a space.', value: 2 },
        ],
      },
      {
        text: 'When you think about the solar system, what comes to mind most naturally?',
        options: [
          { label: 'Pictorial images — planets with colours and textures orbiting the sun.', value: -2 },
          { label: 'A rough picture with some spatial structure.', value: -1 },
          { label: 'Orbital relationships and relative scales more than appearance.', value: 1 },
          { label: 'An abstract relational model — order, distances, angular positions, without imagery.', value: 2 },
        ],
      },
    ],
  },
]

export const QUIZ_SEQUENCE = []
for (let round = 0; round < 5; round++) {
  for (let d = 0; d < 6; d++) {
    QUIZ_SEQUENCE.push({
      dimensionId: DIMENSIONS[d].id,
      questionIndex: round,
    })
  }
}
