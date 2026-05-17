<script setup>
import RadarChart from '../components/atoms/RadarChart.vue'
import DistributionCurve from '../components/atoms/DistributionCurve.vue'
import CodeBadge from '../components/atoms/CodeBadge.vue'
import { DIMENSIONS, POPULATION } from '../data/dimensions'
import { useProfile } from '../stores/profile'
const profile = useProfile()
</script>
<template>
  <div style="height:100%; overflow:auto">
    <div :style="{ maxWidth:'var(--content-max)', margin:'0 auto', padding:'var(--page-pad-y) var(--page-pad-x) var(--page-pad-bot)' }">
      <div style="margin-bottom:40px">
        <div class="micro" style="margin-bottom:14px">FULL ATLAS<template v-if="profile.name"> · {{ profile.name.toUpperCase() }}</template></div>
        <h1 class="serif" :style="{ margin:0, fontSize:'var(--hero-lg)', lineHeight:0.95, fontWeight:400, letterSpacing:'-0.025em', maxWidth:'900px' }">
          <template v-if="profile.type">{{ profile.type }}</template>
          <template v-else>An <em style="color: var(--accent)">unmapped</em> mind.</template>
        </h1>
        <p :style="{ marginTop:'18px', fontSize:'var(--copy-lg)', color:'var(--text-mute)', lineHeight:1.5, maxWidth:'640px' }">
          <template v-if="profile.signature">{{ profile.signature }}</template>
          <template v-else>Your atlas is a snapshot of where your mind sits across {{ DIMENSIONS.length }} cognitive axes. Map a few dimensions to begin drawing it.</template>
        </p>
        <div style="display:flex; gap:24px; margin-top:22px; align-items:center">
          <span class="mono" style="font-size:11.5px; color: var(--text-dim)">{{ profile.completed }} / {{ DIMENSIONS.length }} DIMENSIONS</span>
        </div>
      </div>

      <div class="card profile-radar-card" style="position:relative; display:flex; align-items:center; justify-content:center">
        <div class="micro" style="position:absolute; top:18px; left:20px">RADAR · ALL {{ DIMENSIONS.length }}</div>
        <div class="mono profile-radar-legend" style="position:absolute; bottom:18px; left:20px; font-size:11px; color: var(--text-dim)">
          ⊕ YOU · · · ⊕ POPULATION MEAN
        </div>
        <RadarChart :scores="profile.scores" :size="480"/>
      </div>

      <div style="display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:18px">
        <div>
          <div class="micro" style="margin-bottom:6px">DETAIL · ALL {{ DIMENSIONS.length }}</div>
          <h2 class="serif" :style="{ margin:0, fontSize:'var(--h3)', fontWeight:400 }">Each axis, expanded</h2>
          <p style="color: var(--text-mute); margin:8px 0 0; max-width:540px">Score, percentile, and distribution alongside the population.</p>
        </div>
      </div>
      <div :style="{ display:'grid', gridTemplateColumns:'var(--grid-2)', gap:'var(--col-gap-sm)' }">
        <div v-for="d in DIMENSIONS" :key="d.id" class="card" :style="{ padding:'var(--card-pad-sm)' }">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px">
            <CodeBadge :code="d.code" :hue="d.hue"/>
            <div class="serif" style="font-size:20px">{{ d.name }}</div>
            <span class="mono" style="margin-left:auto; font-size:11px; color: var(--text-mute)">
              <template v-if="profile.percentiles[d.id] != null">{{ Math.round(profile.scores[d.id]*100) }} · p{{ profile.percentiles[d.id] }}</template>
              <template v-else>unmapped</template>
            </span>
          </div>
          <div style="width:100%; overflow:hidden">
            <DistributionCurve :value="profile.scores[d.id]" :mean="POPULATION[d.id].mean" :sd="POPULATION[d.id].sd" :mode="POPULATION[d.id].mode" :hue="d.hue" :w="460" :h="80"/>
          </div>
          <div class="micro" style="display:flex; justify-content:space-between; margin-top:8px">
            <span>{{ d.poles.lo.code }}</span><span>{{ d.poles.hi.code }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.profile-radar-card {
  padding: 32px;
  min-height: 540px;
  margin-bottom: 40px;
}
@media (max-width: 768px) {
  .profile-radar-card { padding: 18px; min-height: 360px; margin-bottom: 28px; }
  .profile-radar-card :deep(svg) { width: 100%; height: auto; max-width: 320px; }
  .profile-radar-legend { font-size: 10px; }
}
</style>
