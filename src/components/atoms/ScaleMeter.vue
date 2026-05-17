<script setup>
import GlowDot from './GlowDot.vue'
const props = defineProps({
  value: Number, hue: { default: 220 }, loLabel: String, hiLabel: String,
  popMean: { default: null }, percentile: { default: null }, height: { default: 56 },
})
</script>
<template>
  <div style="width:100%">
    <div :style="{
      position:'relative', height: height+'px', borderRadius: '9999px',
      background: 'linear-gradient(90deg, color-mix(in oklch, var(--bg-elev) 80%, transparent), var(--bg-elev))',
      border: '1px solid var(--border)', overflow:'hidden',
    }">
      <div v-for="t in [10,20,30,40,50,60,70,80,90]" :key="t"
        :style="{ position:'absolute', left: t+'%', top:0, bottom:0, width:'1px', background:'var(--border)', opacity: t===50?1:0.45 }" />
      <div v-if="popMean != null" :style="{ position:'absolute', left: (popMean*100)+'%', top:'50%', transform:'translate(-50%,-50%)' }">
        <div :style="{ width:'2px', height:(height-12)+'px', background:'var(--text-dim)', opacity:0.6, borderRadius:'1px' }" />
      </div>
      <div :style="{ position:'absolute', left: Math.round(value*100)+'%', top:'50%', transform:'translate(-50%,-50%)' }">
        <GlowDot :size="18" :hue="hue" :intensity="1.3" pulse />
      </div>
    </div>
    <div style="display:flex; justify-content:space-between; margin-top:8px">
      <span class="micro">{{ loLabel }}</span>
      <span class="mono" style="font-size:11px; color: var(--text-mute)">
        <template v-if="percentile != null">p{{ percentile }} · </template>
        score {{ Math.round(value*100) }}
      </span>
      <span class="micro" style="text-align:right">{{ hiLabel }}</span>
    </div>
  </div>
</template>
