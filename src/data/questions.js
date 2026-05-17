// Question pool — 8 questions per dimension. At quiz start, 5 of 8 are
// sampled per dimension. Option order is shuffled at render time.

export const QUESTIONS = [
  // --- Inner Speech ---
  {
    id: 'is1',
    dimensionId: 'inner-speech',
    text: 'You\'re walking somewhere alone with nothing to occupy you. What\'s mostly going on in your head?',
    options: [
      { label: 'A pretty constant running monologue in words', value: 2 },
      { label: 'A mix of words, images, and half-formed thoughts', value: 0 },
      { label: 'Mostly impressions, feelings, things I notice — not really language', value: -1 },
      { label: 'It\'s quiet up there. Very little verbal activity', value: -2 },
    ],
  },
  {
    id: 'is2',
    dimensionId: 'inner-speech',
    text: 'When you\'re reading silently, what does it actually feel like inside?',
    options: [
      { label: 'I clearly hear each word as if someone is speaking it', value: 2 },
      { label: 'I hear most words, though sometimes the meaning just lands', value: 1 },
      { label: 'Meaning comes through without much sound — I rarely hear the words', value: -1 },
      { label: 'No inner voice at all. I just absorb the meaning directly', value: -2 },
    ],
  },
  {
    id: 'is3',
    dimensionId: 'inner-speech',
    text: 'You\'re working through a hard problem on your own. How does it unfold?',
    options: [
      { label: 'I talk myself through it step by step in my head', value: 2 },
      { label: 'Mostly verbal reasoning with the occasional diagram', value: 1 },
      { label: 'Mostly visual or structural, with words only for key moments', value: -1 },
      { label: 'I just think about it. Not really in words at all', value: -2 },
    ],
  },
  {
    id: 'is4',
    dimensionId: 'inner-speech',
    text: 'After a difficult conversation, what happens later?',
    options: [
      { label: 'I replay the exact words back, sometimes for hours', value: 2 },
      { label: 'I remember the gist verbally, with some replaying', value: 1 },
      { label: 'I get a feeling-impression of how it went, not specific words', value: -1 },
      { label: 'I don\'t really replay conversations in my head', value: -2 },
    ],
  },
  {
    id: 'is5',
    dimensionId: 'inner-speech',
    text: 'When you make a plan for the day, what does that look like internally?',
    options: [
      { label: 'I list things out in words, almost like dictation to myself', value: 2 },
      { label: 'Some words, some mental images of where I\'ll be', value: 0 },
      { label: 'Mostly a sense of shape — where I need to be, what fits', value: -1 },
      { label: 'I just know what I\'m doing without rehearsing it verbally', value: -2 },
    ],
  },
  {
    id: 'is6',
    dimensionId: 'inner-speech',
    text: 'Someone asks how you\'re feeling. What happens first?',
    options: [
      { label: 'Words come to mind — I almost have the answer ready', value: 2 },
      { label: 'I check in, then find words for what\'s there', value: 0 },
      { label: 'I get an impression I then have to translate into language', value: -2 },
    ],
  },
  {
    id: 'is7',
    dimensionId: 'inner-speech',
    text: 'When your mind is idle, what\'s its default state?',
    options: [
      { label: 'Chattering. There\'s almost always something being said in there', value: 2 },
      { label: 'Sometimes chattering, sometimes quiet', value: 0 },
      { label: 'Mostly quiet. Things happen but they\'re not verbal', value: -2 },
    ],
  },
  {
    id: 'is8',
    dimensionId: 'inner-speech',
    text: 'When you\'re writing, the words…',
    options: [
      { label: 'Are spoken in my head first, then I type them', value: 2 },
      { label: 'Come out as I type — speaking and typing feel close together', value: 0 },
      { label: 'Appear on the page without me really hearing them first', value: -2 },
    ],
  },

  // --- Visual Imagery ---
  {
    id: 'vi1',
    dimensionId: 'visual-imagery',
    text: 'Close your eyes and picture an apple sitting on a table. How vivid is the image?',
    options: [
      { label: 'Photographic. Colour, highlights, every detail', value: 2 },
      { label: 'Clear, but a bit less defined than reality', value: 1 },
      { label: 'Vague sense of it but not really a picture', value: -1 },
      { label: 'Nothing visual at all — I know I\'m thinking of an apple but I don\'t see one', value: -2 },
    ],
  },
  {
    id: 'vi2',
    dimensionId: 'visual-imagery',
    text: 'Recall the face of a close family member.',
    options: [
      { label: 'I see them clearly, almost like a photo', value: 2 },
      { label: 'I can build up a recognisable face with some effort', value: 1 },
      { label: 'I know what they look like but I don\'t see them in my head', value: -1 },
      { label: 'No visual memory of their face — just facts about it', value: -2 },
    ],
  },
  {
    id: 'vi3',
    dimensionId: 'visual-imagery',
    text: 'Someone describes a beach at sunset in detail. What happens?',
    options: [
      { label: 'I see it. I\'m almost there — colour, movement, the whole thing', value: 2 },
      { label: 'I picture parts of it as they\'re described', value: 1 },
      { label: 'I understand it but don\'t really see it', value: -1 },
      { label: 'No image at all. I just take in the meaning', value: -2 },
    ],
  },
  {
    id: 'vi4',
    dimensionId: 'visual-imagery',
    text: 'You\'re trying to remember where you left your keys. How?',
    options: [
      { label: 'I picture the room and look around in my head', value: 2 },
      { label: 'I half-see the room, half just know', value: 0 },
      { label: 'I think about it in terms of facts and last actions, no image', value: -2 },
    ],
  },
  {
    id: 'vi5',
    dimensionId: 'visual-imagery',
    text: 'When you read fiction, what do you experience?',
    options: [
      { label: 'A vivid film playing in my head — scenes, faces, settings', value: 2 },
      { label: 'Some imagery, flickers of scenes', value: 0 },
      { label: 'Mostly the meaning and feeling. Almost no visuals', value: -2 },
    ],
  },
  {
    id: 'vi6',
    dimensionId: 'visual-imagery',
    text: 'Imagine a sunrise.',
    options: [
      { label: 'Full colour, gradient, warmth — I\'m seeing it', value: 2 },
      { label: 'A general impression, not really seen', value: 0 },
      { label: 'I know what one is, but there\'s no image', value: -2 },
    ],
  },
  {
    id: 'vi7',
    dimensionId: 'visual-imagery',
    text: 'When you daydream…',
    options: [
      { label: 'I see things. Scenes play out visually', value: 2 },
      { label: 'It\'s a mix of imagery and thinking', value: 0 },
      { label: 'It\'s mostly thinking, not really seeing', value: -2 },
    ],
  },
  {
    id: 'vi8',
    dimensionId: 'visual-imagery',
    text: 'Someone asks how many windows are in your childhood home. How do you answer?',
    options: [
      { label: 'I walk through the house in my head and count them', value: 2 },
      { label: 'I half-picture it, half just remember', value: 0 },
      { label: 'I recall by knowledge — I don\'t see the house, I just know', value: -2 },
    ],
  },

  // --- Unsymbolized Thought ---
  {
    id: 'ut1',
    dimensionId: 'unsymbolized-thought',
    text: 'Have you ever \'known\' something completely but struggled to put it into words?',
    options: [
      { label: 'Constantly. The knowing comes first, words come slower', value: 2 },
      { label: 'Sometimes, usually with complex ideas', value: 1 },
      { label: 'Rarely — my thoughts mostly arrive in words', value: -1 },
      { label: 'Almost never. If I know it, I can usually say it', value: -2 },
    ],
  },
  {
    id: 'ut2',
    dimensionId: 'unsymbolized-thought',
    text: 'You realise something is wrong with a plan someone\'s just described. What does that realising feel like?',
    options: [
      { label: 'I just know — instantly, structurally, without thinking it through in words', value: 2 },
      { label: 'Mostly intuitive, with some reasoning following', value: 1 },
      { label: 'I think through it in words and reach the conclusion', value: -2 },
    ],
  },
  {
    id: 'ut3',
    dimensionId: 'unsymbolized-thought',
    text: 'When you make a decision, how does the conclusion arrive?',
    options: [
      { label: 'Fully formed, before I can articulate why', value: 2 },
      { label: 'Partly intuitive, partly worked through', value: 0 },
      { label: 'I work it out in language and the conclusion follows from the reasoning', value: -2 },
    ],
  },
  {
    id: 'ut4',
    dimensionId: 'unsymbolized-thought',
    text: 'Trying to explain something you understand well…',
    options: [
      { label: 'The hard part is finding words for something I clearly know', value: 2 },
      { label: 'Comes pretty naturally once I start', value: 0 },
      { label: 'I work out the explanation as I speak. It\'s a language thing', value: -2 },
    ],
  },
  {
    id: 'ut5',
    dimensionId: 'unsymbolized-thought',
    text: 'Many of your thoughts feel like…',
    options: [
      { label: 'Compressed concepts that have to be unpacked into words later', value: 2 },
      { label: 'A mix — some are verbal, some aren\'t', value: 0 },
      { label: 'Sentences. Pretty much always sentences', value: -2 },
    ],
  },
  {
    id: 'ut6',
    dimensionId: 'unsymbolized-thought',
    text: 'When you get a sudden insight, what form does it arrive in?',
    options: [
      { label: 'A whole shape clicking into place — no words at first', value: 2 },
      { label: 'A mix of an aha-feeling and immediate language', value: 0 },
      { label: 'A sentence forms and I think \'oh, that\'s it\'', value: -2 },
    ],
  },
  {
    id: 'ut7',
    dimensionId: 'unsymbolized-thought',
    text: 'Tip-of-the-tongue for a word is familiar. Do you get the same feeling for whole ideas?',
    options: [
      { label: 'Yes, often — I know the idea but the words for it lag', value: 2 },
      { label: 'Occasionally', value: 0 },
      { label: 'Not really. Thoughts come pre-worded', value: -2 },
    ],
  },
  {
    id: 'ut8',
    dimensionId: 'unsymbolized-thought',
    text: 'Could you have a thought with no words, images, sounds, or feelings attached to it?',
    options: [
      { label: 'Yes — a lot of my thinking is like this', value: 2 },
      { label: 'Some of it is', value: 0 },
      { label: 'No. Every thought I have has some sensory or verbal form', value: -2 },
    ],
  },

  // --- Systemising Drive ---
  {
    id: 'sy1',
    dimensionId: 'systemising-drive',
    text: 'You start using a new app. What\'s your instinct?',
    options: [
      { label: 'Poke every button until I have a model of how the whole thing works', value: 2 },
      { label: 'Try things and check help as needed', value: 0 },
      { label: 'Use what I need, ignore the rest', value: -1 },
      { label: 'Just want it to work — I don\'t care how', value: -2 },
    ],
  },
  {
    id: 'sy2',
    dimensionId: 'systemising-drive',
    text: 'You notice the same problem keeps recurring in your life. What do you do?',
    options: [
      { label: 'Build a system to handle it — rules, tracking, structure', value: 2 },
      { label: 'Try to be more aware of it', value: 0 },
      { label: 'Deal with it when it comes up', value: -2 },
    ],
  },
  {
    id: 'sy3',
    dimensionId: 'systemising-drive',
    text: 'Looking at a spreadsheet someone else built, you…',
    options: [
      { label: 'Want to see the formulas and how it\'s wired together', value: 2 },
      { label: 'Glance at the structure if it\'s relevant', value: 0 },
      { label: 'Just want the numbers it produces', value: -2 },
    ],
  },
  {
    id: 'sy4',
    dimensionId: 'systemising-drive',
    text: 'When you learn something new, you tend to…',
    options: [
      { label: 'Look for the underlying rules and structure', value: 2 },
      { label: 'Pick up what I need to use it', value: 0 },
      { label: 'Memorise examples and patterns from doing it', value: -2 },
    ],
  },
  {
    id: 'sy5',
    dimensionId: 'systemising-drive',
    text: 'Watching a sport you don\'t know…',
    options: [
      { label: 'I\'m trying to figure out the rules and what makes good play', value: 2 },
      { label: 'Some of both', value: 0 },
      { label: 'I just enjoy the moment-to-moment action', value: -2 },
    ],
  },
  {
    id: 'sy6',
    dimensionId: 'systemising-drive',
    text: 'How often does the thought \'how does that actually work?\' cross your mind?',
    options: [
      { label: 'Multiple times a day', value: 2 },
      { label: 'Comes up sometimes', value: 0 },
      { label: 'Rarely something I wonder about', value: -2 },
    ],
  },
  {
    id: 'sy7',
    dimensionId: 'systemising-drive',
    text: 'Reading instructions or manuals…',
    options: [
      { label: 'I read them carefully — I want the full model', value: 2 },
      { label: 'Skim them', value: 0 },
      { label: 'Skip them. I\'ll figure it out', value: -2 },
    ],
  },
  {
    id: 'sy8',
    dimensionId: 'systemising-drive',
    text: 'You\'re given a task with no defined process. What\'s your move?',
    options: [
      { label: 'Build the process before doing the task — it\'s half the work', value: 2 },
      { label: 'Sketch a rough approach, start doing it', value: 0 },
      { label: 'Just start and adjust as I go', value: -2 },
    ],
  },

  // --- Processing Style ---
  {
    id: 'ps1',
    dimensionId: 'processing-style',
    text: 'Someone explains a complex idea step by step. How does understanding usually arrive?',
    options: [
      { label: 'It clicks all at once partway through — the whole shape resolves', value: 2 },
      { label: 'It builds gradually as more pieces fit', value: 0 },
      { label: 'I follow each step and the conclusion lands at the end', value: -2 },
    ],
  },
  {
    id: 'ps2',
    dimensionId: 'processing-style',
    text: 'Reading a long article, you…',
    options: [
      { label: 'Skim the whole thing first to get the shape, then go back', value: 2 },
      { label: 'Mix of skimming and careful reading', value: 0 },
      { label: 'Read top to bottom in order', value: -2 },
    ],
  },
  {
    id: 'ps3',
    dimensionId: 'processing-style',
    text: 'You\'re shown a complicated diagram for the first time. What happens?',
    options: [
      { label: 'I take in the whole picture and the parts settle into place', value: 2 },
      { label: 'A bit of both', value: 0 },
      { label: 'I look at parts one by one until they assemble', value: -2 },
    ],
  },
  {
    id: 'ps4',
    dimensionId: 'processing-style',
    text: 'Solving a puzzle, your style is…',
    options: [
      { label: 'Stare at the whole thing until the pattern emerges', value: 2 },
      { label: 'Mix of both', value: 0 },
      { label: 'Work through it one piece at a time', value: -2 },
    ],
  },
  {
    id: 'ps5',
    dimensionId: 'processing-style',
    text: 'When you understand something, it usually feels like…',
    options: [
      { label: 'A whole structure visible at once', value: 2 },
      { label: 'Some shape, some chain', value: 0 },
      { label: 'A chain of connected steps', value: -2 },
    ],
  },
  {
    id: 'ps6',
    dimensionId: 'processing-style',
    text: 'Following a recipe, you…',
    options: [
      { label: 'Read the whole thing first, then do steps in your own order', value: 2 },
      { label: 'Read the whole thing first, then follow as written', value: 0 },
      { label: 'Read each step as you get to it', value: -2 },
    ],
  },
  {
    id: 'ps7',
    dimensionId: 'processing-style',
    text: 'Someone asks \'what was that meeting about?\' You tend to…',
    options: [
      { label: 'Summarise the overall shape and tensions', value: 2 },
      { label: 'Mix of summary and key moments', value: 0 },
      { label: 'Walk through what was said in order', value: -2 },
    ],
  },
  {
    id: 'ps8',
    dimensionId: 'processing-style',
    text: 'When you write something long, do you…',
    options: [
      { label: 'Have the whole structure in mind and fill it in', value: 2 },
      { label: 'Some plan, some emerging as you go', value: 0 },
      { label: 'Discover the structure by writing it sequentially', value: -2 },
    ],
  },

  // --- Visualisation Mode ---
  {
    id: 'vm1',
    dimensionId: 'visualisation-mode',
    text: 'When you picture a bicycle, what do you see?',
    options: [
      { label: 'A specific, detailed bicycle — colour, brand, even scratches', value: -2 },
      { label: 'A general bicycle, fairly clear', value: -1 },
      { label: 'More of a diagram — wheels, frame, how the parts relate', value: 1 },
      { label: 'Mostly the structure and relationships, not really the look', value: 2 },
    ],
  },
  {
    id: 'vm2',
    dimensionId: 'visualisation-mode',
    text: 'Doing mental maths, you…',
    options: [
      { label: 'See the numbers as objects, sometimes with shapes or textures', value: -2 },
      { label: 'Mix of seeing and abstract', value: 0 },
      { label: 'Manipulate them as abstract quantities or positions in space', value: 2 },
    ],
  },
  {
    id: 'vm3',
    dimensionId: 'visualisation-mode',
    text: 'Recalling a holiday, what comes back strongest?',
    options: [
      { label: 'Vivid scenes — colours, faces, the feel of places', value: -2 },
      { label: 'Mix of both', value: 0 },
      { label: 'The shape of the trip — where, when, how things connected', value: 2 },
    ],
  },
  {
    id: 'vm4',
    dimensionId: 'visualisation-mode',
    text: 'When you imagine a chess position…',
    options: [
      { label: 'I see the pieces clearly, like staring at a board', value: -2 },
      { label: 'Bit of both', value: 0 },
      { label: 'I sense relationships and threats more than the pieces', value: 2 },
    ],
  },
  {
    id: 'vm5',
    dimensionId: 'visualisation-mode',
    text: 'Designing something in your head, you tend to…',
    options: [
      { label: 'See it as a finished object — colour, material, look', value: -2 },
      { label: 'Map the structure, proportions, and how it fits together', value: 2 },
    ],
  },
  {
    id: 'vm6',
    dimensionId: 'visualisation-mode',
    text: 'When someone explains a network or system…',
    options: [
      { label: 'I picture concrete things — boxes, screens, people', value: -2 },
      { label: 'Bit of both', value: 0 },
      { label: 'I picture an abstract graph — nodes, links, flows', value: 2 },
    ],
  },
  {
    id: 'vm7',
    dimensionId: 'visualisation-mode',
    text: 'Faces vs maps — which are you better at remembering?',
    options: [
      { label: 'Faces, easily. I can picture people I\'ve met once', value: -2 },
      { label: 'About equal', value: 0 },
      { label: 'Maps and layouts. I can navigate places I\'ve been once but forget faces', value: 2 },
    ],
  },
  {
    id: 'vm8',
    dimensionId: 'visualisation-mode',
    text: 'Your imagination works most naturally with…',
    options: [
      { label: 'Specific, vivid scenes and objects', value: -2 },
      { label: 'Some of both', value: 0 },
      { label: 'Abstract structures, relationships, and shapes', value: 2 },
    ],
  },
]

export const QUESTIONS_BY_ID = Object.fromEntries(QUESTIONS.map(q => [q.id, q]))

export function questionsForDimension(dimensionId) {
  return QUESTIONS.filter(q => q.dimensionId === dimensionId)
}
