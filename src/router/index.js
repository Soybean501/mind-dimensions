import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/',              name: 'landing',    component: () => import('../views/LandingView.vue') },
  { path: '/onboarding',    name: 'onboarding', component: () => import('../views/OnboardingView.vue') },
  { path: '/atlas',         name: 'dashboard',  component: () => import('../views/DashboardView.vue') },
  { path: '/d/:id',         name: 'dimension',  component: () => import('../views/DimensionView.vue'), props: true },
  { path: '/d/:id/quiz',    name: 'quiz',       component: () => import('../views/QuizView.vue'), props: true },
  { path: '/d/:id/result',  name: 'result',     component: () => import('../views/ResultView.vue'), props: true },
  { path: '/profile',       name: 'profile',    component: () => import('../views/ProfileView.vue') },
  { path: '/comparison',    name: 'comparison', component: () => import('../views/ComparisonView.vue') },
  { path: '/journal',       name: 'journal',    component: () => import('../views/JournalView.vue') },
]

export default createRouter({ history: createWebHashHistory(), routes })
