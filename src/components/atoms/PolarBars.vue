<script setup>
import { DIMENSIONS, POPULATION } from '../../data/dimensions'
import { useProfile } from '../../stores/profile'
import ScaleMeter from './ScaleMeter.vue'
const props = defineProps({ scores: Object })
const profile = useProfile()
</script>
<template>
  <div style="display:grid; gap:18px">
    <div v-for="d in DIMENSIONS" :key="d.id">
      <div style="display:flex; justify-content:space-between; margin-bottom:6px">
        <span class="serif" style="font-size:19px">{{ d.name }}</span>
        <span class="mono" style="color: var(--text-mute); font-size: 11px">p{{ profile.percentiles[d.id] }}</span>
      </div>
      <ScaleMeter :value="scores[d.id]" :hue="d.hue"
        :loLabel="d.poles.lo.code" :hiLabel="d.poles.hi.code"
        :popMean="POPULATION[d.id].mean" :height="28" />
    </div>
  </div>
</template>
