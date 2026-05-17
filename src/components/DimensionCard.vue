<script setup>
import CodeBadge from './atoms/CodeBadge.vue'
import ScaleMeter from './atoms/ScaleMeter.vue'
import { POPULATION } from '../data/dimensions'
const props = defineProps({ d: Object, score: Number, percentile: Number })
const emit = defineEmits(['open'])
</script>
<template>
  <button @click="emit('open')" class="card"
    :style="{ padding:'28px', textAlign:'left', cursor:'pointer', background:'var(--bg-surface)', border:'1px solid var(--border)', borderRadius:'16px', position:'relative', overflow:'hidden' }">
    <div :style="{
      position:'absolute', top:'-80px', right:'-80px', width:'200px', height:'200px',
      borderRadius:'9999px',
      background: 'radial-gradient(circle, oklch(82% 0.14 ' + d.hue + ' / 0.15), transparent 70%)',
      pointerEvents:'none',
    }"/>
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:24px">
      <div style="display:flex; align-items:center; gap:14px">
        <CodeBadge :code="d.code" :hue="d.hue" />
        <div>
          <h3 class="serif" style="margin:0; font-size:24px; font-weight:400">{{ d.name }}</h3>
          <div style="color: var(--text-dim); font-size: 12.5px; margin-top:2px">{{ d.tagline }}</div>
        </div>
      </div>
      <div style="text-align:right">
        <div class="mono" style="font-size:11px; color: var(--text-dim)">PERCENTILE</div>
        <div class="serif" :style="{ fontSize:'28px', color: percentile != null ? 'oklch(88% 0.14 ' + d.hue + ')' : 'var(--text-mute)', marginTop:'2px' }">
          <template v-if="percentile != null">p{{ percentile }}</template>
          <template v-else>—</template>
        </div>
      </div>
    </div>
    <ScaleMeter :value="score" :hue="d.hue" :loLabel="d.poles.lo.code" :hiLabel="d.poles.hi.code" :popMean="POPULATION[d.id].mean" :height="36"/>
  </button>
</template>
