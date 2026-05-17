<script setup>
import { useRouter } from 'vue-router'
import DimensionCard from '../components/DimensionCard.vue'
import Fingerprint from '../components/atoms/Fingerprint.vue'
import { DIMENSIONS } from '../data/dimensions'
import { useProfile } from '../stores/profile'
const router = useRouter()
const profile = useProfile()
function openDimension(id) { router.push({ name: 'dimension', params: { id } }) }
</script>
<template>
  <div style="height:100%; overflow:auto; padding:40px 56px 80px">
    <div style="max-width:1280px; margin:0 auto">
      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:48px">
        <div>
          <div class="micro" style="margin-bottom:12px">⊕ ATLAS · {{ profile.completed }}/{{ DIMENSIONS.length }} MAPPED</div>
          <h1 class="serif" style="margin:0; font-size:52px; font-weight:400; letter-spacing:-0.02em; line-height:1">
            <template v-if="profile.name">Welcome back, {{ profile.name.split(' ')[0] }}.</template>
            <template v-else>Your atlas, in one glance.</template>
          </h1>
          <p style="margin:12px 0 0; color: var(--text-mute); font-size:17px; max-width:540px">
            Each dimension you map adds a star to your atlas. Open one to read its definition or take the assessment.
          </p>
        </div>
      </div>

      <div class="card" style="display:grid; grid-template-columns:1.1fr 1fr; gap:0; margin-bottom:48px; overflow:hidden">
        <div style="padding:40px; position:relative; border-right:1px solid var(--border)">
          <div class="micro" style="margin-bottom:16px">YOUR COGNITYPE</div>
          <h2 class="serif" style="margin:0; font-size:44px; font-weight:400; line-height:1.05; letter-spacing:-0.015em">
            <em v-if="profile.type" style="color: var(--accent)">{{ profile.type }}</em>
            <em v-else style="color: var(--text-mute)">Unmapped</em>
          </h2>
          <p style="margin-top:16px; color: var(--text-mute); font-size:15.5px; line-height:1.55; max-width:380px">
            <template v-if="profile.signature">{{ profile.signature }}</template>
            <template v-else>Complete a few dimensions to start drawing the shape of your mind.</template>
          </p>
          <div style="display:flex; gap:24px; margin-top:32px">
            <div>
              <div class="mono" style="font-size:11px; color: var(--text-dim)">NEAREST CLUSTER</div>
              <div class="serif" style="font-size:22px; margin-top:2px; color: var(--text-mute)">—</div>
            </div>
            <div style="width:1px; background: var(--border)"/>
            <div>
              <div class="mono" style="font-size:11px; color: var(--text-dim)">RARITY</div>
              <div class="serif" style="font-size:22px; margin-top:2px; color: var(--text-mute)">—</div>
            </div>
          </div>
          <button class="btn btn-primary" style="margin-top:32px" @click="router.push({ name: 'profile' })">
            Open full profile <span class="mono" style="opacity:0.5">→</span>
          </button>
        </div>
        <div style="background: radial-gradient(circle at 50% 50%, oklch(20% 0.04 280), var(--bg-deep)); padding:24px; display:flex; align-items:center; justify-content:center">
          <Fingerprint :scores="profile.scores" :size="320"/>
        </div>
      </div>

      <div style="display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:18px; gap:24px">
        <div>
          <div class="micro" style="margin-bottom:6px">THE SIX · YOUR POSITIONS</div>
          <h2 class="serif" style="margin:0; font-size:32px; line-height:1.05; font-weight:400">Where you sit on each axis</h2>
          <p style="margin:8px 0 0; color: var(--text-mute); max-width:540px">Each card is the live result for one dimension. Click in to revisit the assessment or read the explainer.</p>
        </div>
        <button class="btn">Sort by rarity ↓</button>
      </div>

      <div class="stagger" style="display:grid; grid-template-columns:repeat(2,1fr); gap:18px">
        <DimensionCard v-for="d in DIMENSIONS" :key="d.id" :d="d"
          :score="profile.scores[d.id]" :percentile="profile.percentiles[d.id]"
          @open="openDimension(d.id)" />
      </div>

      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:48px">
        <button class="card" @click="router.push({ name: 'comparison' })"
          style="padding:28px; text-align:left; cursor:pointer; background: var(--bg-surface); border:1px solid var(--border); border-radius:16px">
          <div class="micro" style="margin-bottom:14px; color: var(--accent)">POPULATION</div>
          <h3 class="serif" style="margin:0; font-size:24px; font-weight:400">How rare is your mind?</h3>
          <p style="color: var(--text-mute); margin:8px 0 0; font-size:13.5px">Compare each of your axes to the mapped population.</p>
        </button>
        <button class="card" @click="router.push({ name: 'journal' })"
          style="padding:28px; text-align:left; cursor:pointer; background: var(--bg-surface); border:1px solid var(--border); border-radius:16px">
          <div class="micro" style="margin-bottom:14px; color: var(--warm)">JOURNAL · {{ profile.journal.length }} {{ profile.journal.length === 1 ? 'ENTRY' : 'ENTRIES' }}</div>
          <h3 class="serif" style="margin:0; font-size:24px; font-weight:400">Notice and note</h3>
          <p style="color: var(--text-mute); margin:8px 0 0; font-size:13.5px">Quick observations, tagged to dimensions, retained privately.</p>
        </button>
        <button class="card" style="padding:28px; text-align:left; cursor:pointer; background: var(--bg-surface); border:1px solid var(--border); border-radius:16px">
          <div class="micro" style="margin-bottom:14px">RESEARCH</div>
          <h3 class="serif" style="margin:0; font-size:24px; font-weight:400">The science behind</h3>
          <p style="color: var(--text-mute); margin:8px 0 0; font-size:13.5px">Read the papers that informed each instrument.</p>
        </button>
      </div>
    </div>
  </div>
</template>
