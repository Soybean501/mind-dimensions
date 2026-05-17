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
    <div :style="{ position:'relative', zIndex:1, maxWidth:'1180px', margin:'0 auto', padding:'var(--page-pad-y) var(--page-pad-x) var(--page-pad-bot)' }">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:40px; gap:12px; flex-wrap:wrap">
        <button class="btn btn-ghost" @click="router.push({ name: 'dimension', params: { id: d.id } })">← {{ d.name }}</button>
        <span class="mono" style="font-size:11px; color: var(--text-dim)">ASSESSMENT COMPLETE</span>
      </div>

      <div :style="{ textAlign:'center', marginBottom:'40px' }">
        <CodeBadge :code="d.code" :hue="d.hue" size="lg"/>
        <div class="micro" style="margin-top:20px">YOUR POSITION ON {{ d.name.toUpperCase() }}</div>
        <h1 class="serif" :style="{ margin:'12px 0 8px', fontSize:'var(--hero-xl)', lineHeight:0.95, fontWeight:400, letterSpacing:'-0.025em' }">
          <em :style="{ color: 'oklch(88% 0.14 ' + d.hue + ')' }">{{ verdict }}</em>
        </h1>
        <div class="serif" :style="{ fontSize:'var(--h4)', color:'var(--text-mute)', fontStyle:'italic' }">
          score {{ Math.round(score*100) }}<template v-if="pct != null"> · p{{ pct }}</template>
        </div>
      </div>

      <div class="card" :style="{ padding:'var(--card-pad-xl)', marginBottom:'24px' }">
        <ScaleMeter :value="score" :hue="d.hue" :loLabel="d.poles.lo.label" :hiLabel="d.poles.hi.label" :popMean="POPULATION[d.id].mean" :percentile="pct" :height="56"/>
      </div>

      <div class="card" :style="{ padding:'var(--card-pad-lg)', marginBottom:'24px' }">
        <div class="micro" :style="{ marginBottom:'16px', color: 'oklch(85% 0.14 ' + d.hue + ')' }">YOUR READING</div>
        <p class="serif" :style="{ fontSize:'var(--h4)', lineHeight:1.35, margin:0, letterSpacing:'-0.005em' }">{{ interpretFor(d, score) }}</p>
      </div>

      <div class="card" style="padding:20px; display:flex; align-items:center; gap:16px; flex-wrap:wrap">
        <div style="flex:1 1 220px; min-width:200px">
          <div class="serif" style="font-size:20px">
            You've mapped <em>{{ profile.completed }}</em> of {{ DIMENSIONS.length }} dimensions.
          </div>
          <div style="color: var(--text-mute); font-size:13.5px">Pick another, or open your full atlas.</div>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap">
          <button class="btn" @click="router.push({ name: 'dashboard' })">Back to atlas</button>
          <button class="btn btn-primary" @click="router.push({ name: 'profile' })">Open full profile →</button>
        </div>
      </div>
    </div>
  </div>
</template>
