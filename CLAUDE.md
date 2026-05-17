# Mind Dimensions — Claude Code Context

## What this app does

Mind Dimensions (working name: **Cognitype**) lets users explore how their mind works across a set of defined cognitive/psychological dimensions. Each dimension has a definition and a short quiz. After completing quizzes, users see a profile showing where they sit across all explored dimensions.

The app uses a custom "Atlas of the interior" design system: cosmic dark theme with `oklch()` colour space, a custom canvas starfield, serif display type (Instrument Serif), sans body (Space Grotesk), and mono labels (JetBrains Mono).

## Stack

- **Vue 3** with `<script setup>` SFCs (Composition API)
- **Vue Router** (hash history)
- **Pinia** for global state
- **Vite** as the build tool
- **npm** as the package manager
- No TypeScript (plain JavaScript)

## Key concepts

- **Dimension** — A named axis. Defined in `src/data/dimensions.js`. Each has: `id`, `code` (2-letter), `name`, `tagline`, `description`, `poles.lo`/`poles.hi` (each with `code` + `label`), `hue` (OKLCH hue used for the dimension's accent colour), `research` citation, and `facets`.
- **Population data** lives alongside each dimension (`POPULATION[id]`) with `mean`, `sd`, and `mode` (e.g. `'bimodal'`, `'left-skewed'`).
- **Quiz** — A sequence of likert / forced-choice / calibration-slider items. Currently a single shared `QUIZ_INNER_SPEECH` bank is wired up; per-dimension banks are TODO.
- **Profile** — User scores, percentiles, and metadata. Pinia store at `src/stores/profile.js`. Starts blank (no name, no completed dimensions, midpoint scores) until results are written.

## Project structure

```
src/
  App.vue                       # Shell: sidebar + router-view
  main.js                       # Pinia + Router setup
  style.css                     # Design tokens, animations, button + card primitives
  router/index.js               # Hash-history routes
  stores/profile.js             # Pinia store for the user's profile
  data/dimensions.js            # DIMENSIONS, POPULATION, LIKERT_LABELS, interpretFor()
  composables/
    useStarfield.js             # Canvas starfield + shooting stars + nebula
  components/
    Sidebar.vue                 # Left nav, profile chip, dimension switcher
    DimensionCard.vue           # Card used on the dashboard grid
    atoms/                      # CodeBadge, ConstellationField, DistributionCurve,
                                # GlowDot, RadarChart, ScaleMeter, Wordmark
    quiz/                       # LikertScale, ForcedChoice, CalibrationSlider
  views/
    LandingView.vue             # Marketing landing page
    DashboardView.vue           # Atlas home — grid of dimensions
    DimensionView.vue           # Per-dimension explainer + result summary
    QuizView.vue                # Assessment flow
    ResultView.vue              # Post-assessment summary
    ProfileView.vue             # Full atlas: radar + per-dimension grid
```

## Conventions

- Vue SFCs use PascalCase filenames (matching the prototype). Atoms in `components/atoms/`, quiz inputs in `components/quiz/`.
- Use the design tokens from `style.css` (`--bg-deep`, `--text`, `--accent`, etc.) rather than hard-coded colours. Per-dimension colour comes from the dimension's `hue` plugged into `oklch(82% 0.14 <hue> / <alpha>)`.
- Animations: prefer the named utilities (`.fade-up`, `.fade-up-strong`, `.breathe`, `.stagger`) and the `cubic-bezier(.2,.7,.2,1)` easing used throughout.
- Treat percentiles as nullable (`profile.percentiles[id] == null` means "not yet mapped") and render "—" / blank rather than fake numbers.

## Commands

```bash
npm run dev      # dev server on http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## What's wired vs. what isn't

- All views, routing, sidebar, animations, and visualisations work end-to-end with blank profile data.
- The **quiz** captures answers locally but does not yet score back into the profile store. `QUIZ_INNER_SPEECH` is used for every dimension as a placeholder bank.
- The **profile store** starts blank; no scoring pipeline writes to it yet. The midpoint (0.5) is used as the placeholder value for charts.
