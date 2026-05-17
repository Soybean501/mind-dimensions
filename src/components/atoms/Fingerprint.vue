<script setup>
import { DIMENSIONS } from '../../data/dimensions'
const props = defineProps({ scores: Object, size: { default: 260 }, animated: { default: true } })
const cx = props.size/2, cy = props.size/2
const baseR = props.size*0.32
const dims = DIMENSIONS
const nPts = 240
const pts = []
for (let i=0; i<nPts; i++) {
  const t = i/nPts
  const a = t*Math.PI*2
  let mod = 0
  dims.forEach((d, idx) => {
    const v = props.scores[d.id]
    mod += Math.sin(a*(idx+2)+idx) * (v-0.5) * 0.45
  })
  const r = baseR * (1 + mod*0.45)
  pts.push([cx + Math.cos(a)*r, cy + Math.sin(a)*r])
}
const path = 'M ' + pts.map(p => p.join(' ')).join(' L ') + ' Z'
</script>
<template>
  <svg :width="size" :height="size" :viewBox="'0 0 ' + size + ' ' + size">
    <defs>
      <radialGradient id="fpGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%"  stop-color="oklch(85% 0.14 220 / 0.5)"/>
        <stop offset="60%" stop-color="oklch(80% 0.14 290 / 0.3)"/>
        <stop offset="100%" stop-color="oklch(78% 0.14 330 / 0.05)"/>
      </radialGradient>
      <filter id="fpBlur"><feGaussianBlur stdDeviation="0.6"/></filter>
    </defs>
    <circle v-for="(s,i) in [0.4,0.55,0.7,0.85]" :key="i" :cx="cx" :cy="cy" :r="baseR*s" stroke="var(--border)" stroke-opacity="0.4" fill="none"/>
    <path :d="path" fill="url(#fpGrad)" stroke="oklch(85% 0.14 220 / 0.7)" stroke-width="1.1" filter="url(#fpBlur)">
      <animateTransform v-if="animated" attributeName="transform" type="rotate" :from="'0 ' + cx + ' ' + cy" :to="'360 ' + cx + ' ' + cy" dur="80s" repeatCount="indefinite"/>
    </path>
    <circle v-for="(d,i) in dims" :key="d.id"
      :cx="cx + Math.cos((-Math.PI/2)+(i/dims.length)*Math.PI*2)*baseR*1.18"
      :cy="cy + Math.sin((-Math.PI/2)+(i/dims.length)*Math.PI*2)*baseR*1.18"
      r="3.5" :fill="'oklch(85% 0.14 ' + d.hue + ')'"/>
    <circle :cx="cx" :cy="cy" r="4" fill="var(--text)"/>
  </svg>
</template>
