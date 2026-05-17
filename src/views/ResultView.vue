<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConstellationField from '../components/atoms/ConstellationField.vue'
import CodeBadge from '../components/atoms/CodeBadge.vue'
import ScaleMeter from '../components/atoms/ScaleMeter.vue'
import { DIMENSIONS, POPULATION, interpretFor } from '../data/dimensions'
import { useProfile } from '../stores/profile'
const route = useRoute()
const router = useRouter()
const profile = useProfile()
const d = computed(() => DIMENSIONS.find(x => x.id === route.params.id) || DIMENSIONS[0])
const score = computed(() => profile.scores[d.value.id])
const pct = computed(() => profile.percentiles[d.value.id])
const verdict = computed(() => score.value > 0.65 ? d.value.poles.hi.label : score.value < 0.35 ? d.value.poles.lo.label : 'Balanced')
</script>
<template>
  <div style="position:relative; height:100%; overflow:auto">
    <div style="position:absolute; inset:0; z-index:0">
      <ConstellationField :density="1.2"/>
    </div>
    <div style="position:relative; z-index:1; max-width:1180px; margin:0 auto; padding:40px 56px 80px">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:48px">
        <button class="btn btn-ghost" @click="router.push({ name: 'dimension', params: { id: d.id } })">← {{ d.name }}</button>
        <span class="mono" style="font-size:11px; color: var(--text-dim)">RESULT · ASSESSMENT COMPLETE</span>
        <span style="width:80px"/>
      </div>

      <div style="text-align:center; margin-bottom:56px">
        <CodeBadge :code="d.code" :hue="d.hue" size="lg"/>
        <div class="micro" style="margin-top:24px">YOUR POSITION ON {{ d.name.toUpperCase() }}</div>
        <h1 class="serif" style="margin:16px 0 8px; font-size:88px; line-height:0.95; font-weight:400; letter-spacing:-0.025em">
          <em :style="{ color: 'oklch(88% 0.14 ' + d.hue + ')' }">{{ verdict }}</em>
        </h1>
        <div class="serif" style="font-size:28px; color: var(--text-mute); font-style:italic">
          score {{ Math.round(score*100) }}<template v-if="pct != null"> · p{{ pct }}</template>
        </div>
      </div>

      <div class="card" style="padding:56px; margin-bottom:32px">
        <ScaleMeter :value="score" :hue="d.hue" :loLabel="d.poles.lo.label" :hiLabel="d.poles.hi.label" :popMean="POPULATION[d.id].mean" :percentile="pct" :height="64"/>
      </div>

      <div class="card" style="padding:40px; margin-bottom:32px">
        <div class="micro" :style="{ marginBottom:'18px', color: 'oklch(85% 0.14 ' + d.hue + ')' }">YOUR READING</div>
        <p class="serif" style="font-size:26px; line-height:1.35; margin:0; letter-spacing:-0.005em">{{ interpretFor(d, score) }}</p>
      </div>

      <div class="card" style="padding:28px; display:flex; align-items:center; gap:24px">
        <div style="flex:1">
          <div class="serif" style="font-size:22px">
            You've mapped <em>{{ profile.completed }}</em> of {{ DIMENSIONS.length }} dimensions.
          </div>
          <div style="color: var(--text-mute); font-size:13.5px">Pick another, or open your full atlas.</div>
        </div>
        <button class="btn" @click="router.push({ name: 'dashboard' })">Back to atlas</button>
        <button class="btn btn-primary" @click="router.push({ name: 'profile' })">Open full profile →</button>
      </div>
    </div>
  </div>
</template>
