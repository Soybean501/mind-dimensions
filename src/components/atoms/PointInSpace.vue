<script setup>
import { computed } from 'vue'
import { DIMENSIONS } from '../../data/dimensions'
import { useProfile } from '../../stores/profile'
const props = defineProps({ scores: Object, size: { default: 360 }, rotate: { default: 0 } })
const profile = useProfile()
const cx = props.size/2, cy = props.size/2
const project = (vec) => {
  const basis = [
    [0.55, 0.10, 0.30], [-0.20, 0.60, 0.15], [0.30, -0.50, 0.20],
    [-0.50, 0.10, 0.50], [0.15, 0.45, -0.55], [-0.30, -0.40, -0.30],
  ]
  let x=0,y=0,z=0
  vec.forEach((v,i) => { x += (v-0.5)*basis[i][0]; y += (v-0.5)*basis[i][1]; z += (v-0.5)*basis[i][2] })
  return [x,y,z]
}
const rot = (p, theta) => { const [x,y,z]=p, c=Math.cos(theta), s=Math.sin(theta); return [x*c - z*s, y, x*s + z*c] }
const screen = (p) => { const [x,y,z]=p, persp = 1/(1+z*0.7); return [cx + x*props.size*0.6*persp, cy + y*props.size*0.6*persp, z, persp] }

const all = computed(() => {
  const vec = DIMENSIONS.map(d => props.scores[d.id])
  const neighbors = [
    { name: 'Visual·Synthetic',    v: [0.30, 0.86, 0.40, 0.45, 0.78, 0.74] },
    { name: 'Verbal·Analytic',     v: [0.82, 0.30, 0.60, 0.78, 0.40, 0.55] },
    { name: 'Felt·Holistic',       v: [0.32, 0.55, 0.78, 0.30, 0.78, 0.66] },
    { name: 'Mechanical·Sequencer',v: [0.65, 0.40, 0.30, 0.88, 0.20, 0.40] },
    { name: 'Lyrical·Sensorial',   v: [0.60, 0.70, 0.50, 0.30, 0.55, 0.85] },
  ]
  const ptUser = screen(rot(project(vec), props.rotate))
  const ptNs = neighbors.map(n => ({ ...n, type: 'cluster', s: screen(rot(project(n.v), props.rotate)) }))
  const list = [...ptNs, { name: profile.name, s: ptUser, type: 'user' }]
  return { user: ptUser, neighbors: ptNs, all: list.sort((a,b)=>a.s[2]-b.s[2]) }
})
</script>
<template>
  <svg :width="size" :height="size" :viewBox="'0 0 ' + size + ' ' + size">
    <defs>
      <radialGradient id="userHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%"  stop-color="oklch(82% 0.14 220 / 0.55)"/>
        <stop offset="100%" stop-color="oklch(82% 0.14 220 / 0)"/>
      </radialGradient>
    </defs>
    <line v-for="(n,i) in all.neighbors" :key="i"
      :x1="all.user[0]" :y1="all.user[1]" :x2="n.s[0]" :y2="n.s[1]"
      stroke="var(--text-mute)" stroke-opacity="0.18" stroke-width="1" stroke-dasharray="2 3"/>
    <g v-for="(p,i) in all.all" :key="i">
      <circle v-if="p.type==='user'" :cx="p.s[0]" :cy="p.s[1]" r="42" fill="url(#userHalo)"/>
      <circle :cx="p.s[0]" :cy="p.s[1]" :r="p.type==='user' ? 14 : (3 + p.s[3]*3)*1.8"
        :fill="'oklch(82% 0.14 ' + (p.type==='user'?220:(180+i*30)) + ' / ' + (p.type==='user'?0.25:0.12) + ')'"/>
      <circle :cx="p.s[0]" :cy="p.s[1]" :r="p.type==='user' ? 8 : 3 + p.s[3]*3"
        :fill="p.type==='user' ? 'oklch(90% 0.14 220)' : 'oklch(78% 0.10 ' + (180+i*30) + ')'"/>
      <text :x="p.s[0] + (p.type==='user'?14:9)" :y="p.s[1]+3"
        :style="{ font: p.type==='user' ? '500 11.5px var(--font-sans)' : '400 10.5px var(--font-mono)' }"
        :fill="p.type==='user' ? 'var(--text)' : 'var(--text-mute)'">{{ p.name }}</text>
    </g>
  </svg>
</template>
