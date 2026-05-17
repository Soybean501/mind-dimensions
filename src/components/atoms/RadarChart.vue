<script setup>
import { DIMENSIONS, POPULATION } from '../../data/dimensions'
const props = defineProps({ scores: Object, size: { default: 360 }, showPopulation: { default: true } })
const dims = DIMENSIONS
const n = dims.length
const cx = props.size/2, cy = props.size/2, r = props.size*0.38
const angle = (i) => (-Math.PI/2) + (i*2*Math.PI/n)
const userPts = dims.map((d,i) => {
  const v = props.scores[d.id] ?? 0.5
  const a = angle(i)
  return [cx + Math.cos(a)*r*v, cy + Math.sin(a)*r*v]
})
const popPts = dims.map((d,i) => {
  const v = POPULATION[d.id].mean
  const a = angle(i)
  return [cx + Math.cos(a)*r*v, cy + Math.sin(a)*r*v]
})
const ringFrac = [0.25, 0.5, 0.75, 1.0]
</script>
<template>
  <svg :width="size" :height="size" :viewBox="'0 0 ' + size + ' ' + size">
    <defs>
      <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
        <stop offset="0%"  stop-color="oklch(82% 0.14 220 / 0.4)"/>
        <stop offset="100%" stop-color="oklch(82% 0.14 220 / 0.02)"/>
      </radialGradient>
    </defs>
    <circle v-for="(f,i) in ringFrac" :key="i" :cx="cx" :cy="cy" :r="r*f"
      stroke="var(--border)" :stroke-opacity="i===3?0.9:0.4" fill="none" :stroke-dasharray="i===3?'':'3 4'"/>
    <line v-for="(d,i) in dims" :key="d.id" :x1="cx" :y1="cy"
      :x2="cx + Math.cos(angle(i))*r" :y2="cy + Math.sin(angle(i))*r"
      stroke="var(--border)" stroke-opacity="0.5"/>
    <polygon v-if="showPopulation"
      :points="popPts.map(p => p.join(',')).join(' ')"
      fill="none" stroke="var(--text-dim)" stroke-width="1.2" stroke-dasharray="2 3" />
    <polygon :points="userPts.map(p => p.join(',')).join(' ')"
      fill="url(#radarFill)" stroke="oklch(82% 0.14 220)" stroke-width="1.6">
      <animate attributeName="stroke-opacity" values="0.7;1;0.7" dur="5s" repeatCount="indefinite"/>
    </polygon>
    <g v-for="(p,i) in userPts" :key="'u'+i">
      <circle :cx="p[0]" :cy="p[1]" r="9" :fill="'oklch(82% 0.14 ' + dims[i].hue + ' / 0.18)'">
        <animate attributeName="r" :values="'8;12;8'" :dur="(3 + i*0.3) + 's'" repeatCount="indefinite" :begin="(i*0.2)+'s'"/>
        <animate attributeName="opacity" :values="'0.5;1;0.5'" :dur="(3+i*0.3)+'s'" repeatCount="indefinite" :begin="(i*0.2)+'s'"/>
      </circle>
      <circle :cx="p[0]" :cy="p[1]" r="3.5" :fill="'oklch(85% 0.14 ' + dims[i].hue + ')'"/>
    </g>
    <g v-for="(d,i) in dims" :key="'l'+d.id">
      <text :x="cx + Math.cos(angle(i))*(r+28)" :y="cy + Math.sin(angle(i))*(r+28)"
        text-anchor="middle" dominant-baseline="middle"
        :style="{ font: '500 11px var(--font-mono)', letterSpacing:'0.08em', textTransform:'uppercase' }"
        fill="var(--text-mute)">{{ d.code }}</text>
      <text :x="cx + Math.cos(angle(i))*(r+28)" :y="cy + Math.sin(angle(i))*(r+28)+13"
        text-anchor="middle" dominant-baseline="middle"
        :style="{ font: '400 10.5px var(--font-sans)' }"
        fill="var(--text-dim)">{{ d.name }}</text>
    </g>
  </svg>
</template>
