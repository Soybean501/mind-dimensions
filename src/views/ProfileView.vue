<script setup>
import RadarChart from '../components/atoms/RadarChart.vue'
import DistributionCurve from '../components/atoms/DistributionCurve.vue'
import CodeBadge from '../components/atoms/CodeBadge.vue'
import { DIMENSIONS, POPULATION } from '../data/dimensions'
import { useProfile } from '../stores/profile'
const profile = useProfile()
</script>
<template>
  <div style="height:100%; overflow:auto; padding:32px 56px 80px">
    <div style="max-width:1280px; margin:0 auto">
      <div style="margin-bottom:56px">
        <div class="micro" style="margin-bottom:14px">FULL ATLAS<template v-if="profile.name"> · {{ profile.name.toUpperCase() }}</template></div>
        <h1 class="serif" style="margin:0; font-size:76px; line-height:0.95; font-weight:400; letter-spacing:-0.025em; max-width:900px">
          <template v-if="profile.type">{{ profile.type }}</template>
          <template v-else>An <em style="color: var(--accent)">unmapped</em> mind.</template>
        </h1>
        <p style="margin-top:20px; font-size:18px; color: var(--text-mute); line-height:1.5; max-width:640px">
          <template v-if="profile.signature">{{ profile.signature }}</template>
          <template v-else>Your atlas is a snapshot of where your mind sits across {{ DIMENSIONS.length }} cognitive axes. Map a few dimensions to begin drawing it.</template>
        </p>
        <div style="display:flex; gap:24px; margin-top:28px; align-items:center">
          <span class="mono" style="font-size:11.5px; color: var(--text-dim)">{{ profile.completed }} / {{ DIMENSIONS.length }} DIMENSIONS</span>
        </div>
      </div>

      <div class="card" style="padding:32px; margin-bottom:48px; position:relative; display:flex; align-items:center; justify-content:center; min-height:540px">
        <div class="micro" style="position:absolute; top:24px; left:32px">RADAR · ALL {{ DIMENSIONS.length }} AT ONCE</div>
        <div class="mono" style="position:absolute; bottom:24px; left:32px; font-size:11px; color: var(--text-dim)">
          ⊕ YOU · · · ⊕ POPULATION MEAN
        </div>
        <RadarChart :scores="profile.scores" :size="480"/>
      </div>

      <div style="display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:18px">
        <div>
          <div class="micro" style="margin-bottom:6px">DETAIL · ALL {{ DIMENSIONS.length }}</div>
          <h2 class="serif" style="margin:0; font-size:32px; font-weight:400">Each axis, expanded</h2>
          <p style="color: var(--text-mute); margin:8px 0 0; max-width:540px">Score, percentile, and distribution alongside the population.</p>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px">
        <div v-for="d in DIMENSIONS" :key="d.id" class="card" style="padding:24px">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:18px">
            <CodeBadge :code="d.code" :hue="d.hue"/>
            <div class="serif" style="font-size:22px">{{ d.name }}</div>
            <span class="mono" style="margin-left:auto; font-size:11px; color: var(--text-mute)">
              <template v-if="profile.percentiles[d.id] != null">{{ Math.round(profile.scores[d.id]*100) }} · p{{ profile.percentiles[d.id] }}</template>
              <template v-else>unmapped</template>
            </span>
          </div>
          <DistributionCurve :value="profile.scores[d.id]" :mean="POPULATION[d.id].mean" :sd="POPULATION[d.id].sd" :mode="POPULATION[d.id].mode" :hue="d.hue" :w="460" :h="80"/>
          <div class="micro" style="display:flex; justify-content:space-between; margin-top:8px">
            <span>{{ d.poles.lo.code }}</span><span>{{ d.poles.hi.code }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
