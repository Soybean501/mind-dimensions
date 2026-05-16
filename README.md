# Mind Dimensions

A web app that helps people explore how their mind works across multiple dimensions. Users can take guided quizzes and assessments to discover their cognitive patterns, learning styles, and mental tendencies.

## Stack

- **Framework:** Vue 3
- **Build tool:** Vite
- **Package manager:** npm

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
  assets/        # Static assets (images, fonts, global CSS)
  components/    # Reusable Vue components
  views/         # Page-level components (one per route)
  router/        # Vue Router configuration
  stores/        # Pinia state stores
  composables/   # Reusable composition functions
  data/          # Dimension definitions and quiz question banks
```

## Concepts

- **Dimensions** — The different axes along which a person's mind can be characterised (e.g. analytical vs. creative, introverted vs. extroverted thinking styles). Each dimension has a definition, description, and associated quiz.
- **Quizzes** — Short question sequences that narrow down where a user sits on a given dimension.
- **Profile** — A user's aggregated results across all dimensions they've explored.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
