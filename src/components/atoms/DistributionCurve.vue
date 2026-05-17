<script setup>
const props = defineProps({
  value: Number, mean: Number, sd: Number, mode: { default: 'normal' },
  hue: { default: 220 }, w: { default: 360 }, h: { default: 90 },
})
const N = 120
const pdf = (x) => {
  const z = (x - props.mean) / props.sd
  let y = Math.exp(-z*z*1.6)
  if (props.mode === 'bimodal') {
    const z2 = (x - (1 - props.mean)) / props.sd
    y = (Math.exp(-z*z*1.6) + Math.exp(-z2*z2*1.6)) * 0.65
  }
  if (props.mode === 'left-skewed')  y *= 0.7 + x*0.7
  if (props.mode === 'right-skewed') y *= 0.7 + (1-x)*0.7
  return y
}
let maxY = 0
const samples = []
for (let i=0; i<=N; i++) {
  const x = i/N, y = pdf(x)
  samples.push([x,y]); if (y > maxY) maxY = y
}
const parts = []
samples.forEach(([x,y], i) => {
  const sx = x*props.w
  const sy = props.h - (y/maxY)*(props.h-12) - 6
  parts.push((i===0?'M':'L') + sx + ' ' + sy)
})
parts.push(`L ${props.w} ${props.h}`); parts.push(`L 0 ${props.h} Z`)
const path = parts.join(' ')
const gid = 'dg-' + props.hue
</script>
<template>
  <svg :width="w" :height="h" :viewBox="'0 0 ' + w + ' ' + h">
    <defs>
      <linearGradient :id="gid" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%"  :stop-color="'oklch(82% 0.14 ' + hue + ' / 0.5)'"/>
        <stop offset="100%" :stop-color="'oklch(82% 0.14 ' + hue + ' / 0.02)'"/>
      </linearGradient>
    </defs>
    <path :d="path" :fill="'url(#' + gid + ')'" :stroke="'oklch(82% 0.14 ' + hue + ' / 0.7)'" stroke-width="1.2"/>
    <line :x1="mean*w" :x2="mean*w" y1="0" :y2="h" stroke="var(--text-dim)" stroke-dasharray="2 3"/>
    <line :x1="value*w" :x2="value*w" y1="0" :y2="h" :stroke="'oklch(85% 0.14 ' + hue + ')'" stroke-width="1.5"/>
    <circle :cx="value*w" cy="6" r="4" :fill="'oklch(90% 0.14 ' + hue + ')'"/>
  </svg>
</template>
