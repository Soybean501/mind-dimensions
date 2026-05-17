import { defineStore } from 'pinia'
import { DIMENSIONS } from '../data/dimensions'

const blankScores = () => Object.fromEntries(DIMENSIONS.map(d => [d.id, 0.5]))
const blankPercentiles = () => Object.fromEntries(DIMENSIONS.map(d => [d.id, null]))

export const useProfile = defineStore('profile', {
  state: () => ({
    name: '',
    handle: '',
    joined: '',
    completed: 0,
    scores: blankScores(),
    percentiles: blankPercentiles(),
    type: '',
    signature: '',
    journal: [],
  }),
  getters: {
    initials: (s) => {
      if (!s.name) return ''
      return s.name.split(/\s+/).filter(Boolean).map(p => p[0]).join('').slice(0, 2).toUpperCase()
    },
    hasResult: (s) => (id) => s.percentiles[id] != null,
  },
  actions: {
    addJournal(entry) { this.journal.unshift(entry) },
    setScore(id, value) { this.scores[id] = value },
  },
})
