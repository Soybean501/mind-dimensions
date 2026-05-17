<script setup>
import { useRouter } from 'vue-router'
import DimensionCard from '../components/DimensionCard.vue'
import { DIMENSIONS } from '../data/dimensions'
import { useProfile } from '../stores/profile'
const router = useRouter()
const profile = useProfile()
function openDimension(id) { router.push({ name: 'dimension', params: { id } }) }
</script>
<template>
  <div style="height:100%; overflow:auto; padding:40px 56px 80px">
    <div style="max-width:1280px; margin:0 auto">
      <div style="margin-bottom:48px">
        <div class="micro" style="margin-bottom:12px">⊕ ATLAS · {{ profile.completed }}/{{ DIMENSIONS.length }} MAPPED</div>
        <h1 class="serif" style="margin:0; font-size:52px; font-weight:400; letter-spacing:-0.02em; line-height:1">
          <template v-if="profile.name">Welcome back, {{ profile.name.split(' ')[0] }}.</template>
          <template v-else>Your atlas, in one glance.</template>
        </h1>
        <p style="margin:12px 0 0; color: var(--text-mute); font-size:17px; max-width:540px">
          Each dimension you map adds a star to your atlas. Open one to read its definition or take the assessment.
        </p>
      </div>

      <div class="stagger" style="display:grid; grid-template-columns:repeat(2,1fr); gap:18px">
        <DimensionCard v-for="d in DIMENSIONS" :key="d.id" :d="d"
          :score="profile.scores[d.id]" :percentile="profile.percentiles[d.id]"
          @open="openDimension(d.id)" />
      </div>
    </div>
  </div>
</template>
