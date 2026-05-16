# Mind Dimensions — Claude Code Context

## What this app does

Mind Dimensions lets users explore how their mind works across a set of defined cognitive/psychological dimensions. Each dimension has a definition and a short quiz. After completing quizzes, users see a profile showing where they sit across all explored dimensions.

## Stack

- **Vue 3** with `<script setup>` SFCs (Composition API)
- **Vite** as the build tool
- **npm** as the package manager
- No TypeScript (plain JavaScript)

## Key concepts

- **Dimension** — A named axis (e.g. "Analytical vs Intuitive"). Defined in `src/data/dimensions.js`. Each has: id, name, description, two poles (pole A / pole B), and a list of quiz questions.
- **Quiz** — A sequence of multiple-choice or slider questions that scores the user on a dimension's spectrum.
- **Profile** — The user's collected scores across dimensions, stored client-side (localStorage or Pinia store).

## Conventions

- One Vue SFC per component, kebab-case filenames (e.g. `quiz-card.vue`)
- Page-level views go in `src/views/`, reusable pieces in `src/components/`
- Shared state in Pinia stores under `src/stores/`
- Composables (e.g. `useQuiz.js`) in `src/composables/`
- Dimension data and question banks in `src/data/`

## Commands

```bash
npm run dev      # dev server on http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## What to build next

1. Define the dimension data schema in `src/data/dimensions.js`
2. Build the home/explore page listing all available dimensions
3. Build the quiz flow component
4. Build the profile/results view
5. Add Vue Router for navigation between pages
6. Add Pinia for global state (quiz progress, results)
