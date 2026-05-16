import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home-view.vue'
import QuizView from '../views/quiz-view.vue'
import ResultsView from '../views/results-view.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/quiz', component: QuizView },
    { path: '/results', component: ResultsView },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
