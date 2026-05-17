import { reactive, watchEffect } from 'vue'

const state = reactive({
  theme: 'cosmic',
  density: 'regular',
  vizDefault: 'radar',
  showNav: true,
})

watchEffect(() => {
  document.documentElement.setAttribute('data-theme', state.theme)
  document.documentElement.setAttribute('data-density', state.density)
})

export function useTweaks() { return state }
