<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConstellationField from '../components/atoms/ConstellationField.vue'
import CodeBadge from '../components/atoms/CodeBadge.vue'
import ScaleMeter from '../components/atoms/ScaleMeter.vue'
import { DIMENSIONS, POPULATION, QUIZ_INNER_SPEECH, interpretFor } from '../data/dimensions'
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
        <button class="btn">Share</button>
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

      <div style="display:grid; grid-template-columns:1.3fr 1fr; gap:24px; margin-bottom:32px">
        <div class="card" style="padding:40px">
          <div class="micro" :style="{ marginBottom:'18px', color: 'oklch(85% 0.14 ' + d.hue + ')' }">YOUR READING</div>
          <p class="serif" style="font-size:26px; line-height:1.35; margin:0; letter-spacing:-0.005em">{{ interpretFor(d, score) }}</p>
          <hr class="rule" style="margin:32px 0"/>
          <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:24px">
            <div>
              <div class="micro" style="margin-bottom:6px">CONFIDENCE</div>
              <div class="serif" style="font-size:30px; color: var(--text-mute)">—</div>
              <div style="color: var(--text-dim); font-size:11.5px; margin-top:2px; font-family:var(--font-mono)">awaiting items</div>
            </div>
            <div>
              <div class="micro" style="margin-bottom:6px">VS LAST TIME</div>
              <div class="serif" style="font-size:30px; color: var(--text-mute)">—</div>
              <div style="color: var(--text-dim); font-size:11.5px; margin-top:2px; font-family:var(--font-mono)">no prior reading</div>
            </div>
            <div>
              <div class="micro" style="margin-bottom:6px">RARITY</div>
              <div class="serif" style="font-size:30px; color: var(--text-mute)">—</div>
              <div style="color: var(--text-dim); font-size:11.5px; margin-top:2px; font-family:var(--font-mono)">unmapped</div>
            </div>
          </div>
        </div>
        <div class="card" style="padding:32px; display:flex; flex-direction:column">
          <div class="micro" style="margin-bottom:14px">NEXT</div>
          <div class="serif" style="font-size:22px; font-weight:400">
            You've mapped <em>{{ profile.completed }}</em> of {{ DIMENSIONS.length }} dimensions.
          </div>
          <p style="color: var(--text-mute); font-size:13.5px; margin-top:8px">Pick another, or open your full atlas.</p>
          <div style="margin-top:auto; display:flex; flex-direction:column; gap:8px">
            <button class="btn btn-primary" @click="router.push({ name: 'profile' })">Open full profile →</button>
            <button class="btn" @click="router.push({ name: 'dashboard' })">Back to atlas</button>
            <button class="btn btn-ghost" @click="router.push({ name: 'journal' })">+ Journal a thought</button>
          </div>
        </div>
      </div>

      <div class="card" style="padding:32px">
        <div style="display:flex; justify-content:space-between; margin-bottom:20px">
          <div>
            <div class="micro" style="margin-bottom:4px">ITEM RESPONSES</div>
            <h3 class="serif" style="margin:0; font-size:24px; font-weight:400">How each answer shifted your position</h3>
          </div>
          <button class="btn btn-ghost">Re-take all →</button>
        </div>
        <div style="display:grid; gap:0">
          <div v-for="(qq,i) in QUIZ_INNER_SPEECH" :key="qq.id"
            :style="{ display:'grid', gridTemplateColumns:'40px 1fr 120px 80px', gap:'20px', padding:'14px 0', borderTop: i>0 ? '1px solid var(--border)' : 'none', alignItems:'center' }">
            <span class="mono" style="font-size:11px; color: var(--text-dim)">{{ String(i+1).padStart(2,'0') }}</span>
            <span style="font-size:13.5px; color: var(--text-mute)">{{ qq.prompt }}</span>
            <div style="position:relative; height:6px; background: var(--bg-elev); border-radius:3px; overflow:hidden"/>
            <span class="mono" style="font-size:11px; color: var(--text-dim); text-align:right">—</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
