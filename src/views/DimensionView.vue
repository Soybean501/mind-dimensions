<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CodeBadge from '../components/atoms/CodeBadge.vue'
import ScaleMeter from '../components/atoms/ScaleMeter.vue'
import DistributionCurve from '../components/atoms/DistributionCurve.vue'
import { DIMENSIONS, POPULATION, interpretFor } from '../data/dimensions'
import { useProfile } from '../stores/profile'
const route = useRoute()
const router = useRouter()
const profile = useProfile()
const d = computed(() => DIMENSIONS.find(x => x.id === route.params.id) || DIMENSIONS[0])
const score = computed(() => profile.scores[d.value.id])
const pct = computed(() => profile.percentiles[d.value.id])
</script>
<template>
  <div style="height:100%; overflow:auto; padding:32px 56px 80px">
    <div style="max-width:1180px; margin:0 auto">
      <div style="display:flex; align-items:center; gap:12px; color: var(--text-mute); font-size:13px; margin-bottom:32px">
        <a @click="router.push({ name: 'dashboard' })" style="cursor:pointer; color:inherit">Atlas</a>
        <span class="mono" style="color: var(--text-dim)">/</span>
        <span style="color: var(--text)">{{ d.name }}</span>
        <span class="mono" style="color: var(--text-dim); margin-left:auto">
          DIMENSION 0{{ DIMENSIONS.indexOf(d)+1 }} OF 06
        </span>
      </div>

      <div style="display:grid; grid-template-columns:1fr 0.85fr; gap:64px; align-items:center; margin-bottom:64px">
        <div>
          <div style="display:flex; align-items:center; gap:14px; margin-bottom:28px">
            <CodeBadge :code="d.code" :hue="d.hue" size="lg" />
            <span class="micro">{{ d.poles.lo.code }} ↔ {{ d.poles.hi.code }}</span>
          </div>
          <h1 class="serif" style="margin:0; font-size:76px; line-height:0.96; font-weight:400; letter-spacing:-0.025em">
            {{ d.name }}<em :style="{ color: 'oklch(85% 0.14 ' + d.hue + ')' }">.</em>
          </h1>
          <p class="serif" style="margin-top:24px; font-size:24px; color: var(--text-mute); line-height:1.4; max-width:540px">
            <em>{{ d.tagline }}</em>
          </p>
          <p style="margin-top:24px; font-size:16px; line-height:1.55; max-width:560px">
            {{ d.description }}
          </p>
        </div>
        <div style="aspect-ratio:1; display:flex; align-items:center; justify-content:center; position:relative">
          <svg viewBox="0 0 380 380" style="width:100%; max-width:380px">
            <defs>
              <radialGradient :id="'dorb-' + d.hue" cx="50%" cy="50%" r="50%">
                <stop offset="0%"  :stop-color="'oklch(82% 0.14 ' + d.hue + ' / 0.6)'"/>
                <stop offset="60%" :stop-color="'oklch(82% 0.14 ' + d.hue + ' / 0.1)'"/>
                <stop offset="100%" :stop-color="'oklch(82% 0.14 ' + d.hue + ' / 0)'"/>
              </radialGradient>
            </defs>
            <circle cx="190" cy="190" r="220" :fill="'url(#dorb-' + d.hue + ')'"/>
            <line x1="30" y1="190" x2="350" y2="190" stroke="var(--border)" stroke-width="1.2"/>
            <line v-for="(t,i) in [-1,-0.66,-0.33,0,0.33,0.66,1]" :key="i" :x1="190+t*160" :y1="t===0 ? 178 : 184" :x2="190+t*160" :y2="t===0 ? 202 : 196" stroke="var(--text-dim)" stroke-width="0.8"/>
            <text x="30" y="220" text-anchor="start" fill="var(--text-mute)" style="font:500 10px var(--font-mono); letter-spacing:0.06em">LO</text>
            <text x="350" y="220" text-anchor="end" fill="var(--text-mute)" style="font:500 10px var(--font-mono); letter-spacing:0.06em">HI</text>
            <g :transform="'translate(' + (190 + (score-0.5)*2*160) + ',190)'">
              <circle r="42" :fill="'oklch(82% 0.14 ' + d.hue + ' / 0.18)'"/>
              <circle r="22" :fill="'oklch(82% 0.14 ' + d.hue + ' / 0.4)'"/>
              <circle r="6" :fill="'oklch(92% 0.14 ' + d.hue + ')'">
                <animate attributeName="r" values="5.5;7;5.5" dur="3s" repeatCount="indefinite"/>
              </circle>
            </g>
            <text :x="190 + (score-0.5)*2*160" y="118" text-anchor="middle" fill="var(--text)" style="font:500 10.5px var(--font-mono); letter-spacing:0.08em">YOU</text>
          </svg>
        </div>
      </div>

      <div class="card" style="padding:40px; margin-bottom:48px">
        <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:32px">
          <div>
            <div class="micro" style="margin-bottom:8px">YOUR POSITION ON THIS AXIS</div>
            <div class="serif" style="font-size:36px; font-weight:400">
              <em v-if="pct != null" :style="{ color: 'oklch(85% 0.14 ' + d.hue + ')' }">{{ Math.round(score*100) }}</em>
              <em v-else style="color: var(--text-mute)">—</em>
              <span style="color: var(--text-dim); font-size:24px"> / 100</span>
            </div>
          </div>
          <div style="text-align:right">
            <div class="mono" style="font-size:11px; color: var(--text-dim)">POPULATION RANK</div>
            <div class="serif" style="font-size:36px; font-weight:400">
              <template v-if="pct != null">p<em>{{ pct }}</em></template>
              <em v-else style="color: var(--text-mute)">—</em>
            </div>
          </div>
        </div>
        <ScaleMeter :value="score" :hue="d.hue" :loLabel="d.poles.lo.label" :hiLabel="d.poles.hi.label" :popMean="POPULATION[d.id].mean" :percentile="pct" :height="56"/>
        <hr class="rule" style="margin:32px 0"/>
        <div style="display:grid; grid-template-columns:1fr 1.4fr; gap:40px">
          <div>
            <div class="micro" style="margin-bottom:10px">VS. POPULATION</div>
            <DistributionCurve :value="score" :mean="POPULATION[d.id].mean" :sd="POPULATION[d.id].sd" :mode="POPULATION[d.id].mode" :hue="d.hue" :w="380" :h="100"/>
            <div class="mono" style="font-size:11px; color: var(--text-dim); margin-top:8px">
              · · · POPULATION MEAN ({{ Math.round(POPULATION[d.id].mean*100) }}) — YOU
            </div>
          </div>
          <div>
            <div class="micro" style="margin-bottom:10px">FACETS</div>
            <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:12px">
              <div v-for="(f,i) in d.facets" :key="f"
                :style="{ display:'flex', alignItems:'center', gap:'12px', padding:'10px 0', borderTop: i>1 ? '1px solid var(--border)' : 'none' }">
                <div style="width:60px; height:4px; background: var(--bg-elev); border-radius:4px; position:relative; overflow:hidden">
                  <div :style="{ position:'absolute', left:0, top:0, bottom:0, width: (Math.max(0.1, Math.min(0.95, score + Math.sin(i*1.3)*0.1))*100) + '%', background: 'oklch(85% 0.14 ' + d.hue + ')' }"/>
                </div>
                <span style="font-size:13.5px">{{ f }}</span>
                <span class="mono" style="margin-left:auto; color: var(--text-mute); font-size:11px">{{ Math.round(Math.max(0.1, Math.min(0.95, score + Math.sin(i*1.3)*0.1))*100) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:32px; margin-bottom:48px">
        <div class="card" style="padding:36px">
          <div class="micro" style="margin-bottom:14px">WHAT THIS MEANS</div>
          <template v-if="pct != null">
            <h3 class="serif" style="margin:0 0 12px; font-size:28px; font-weight:400">
              You sit closer to the {{ score > 0.5 ? d.poles.hi.code.toLowerCase() : d.poles.lo.code.toLowerCase() }} pole.
            </h3>
            <p style="color: var(--text-mute); font-size:14.5px; line-height:1.6; margin:0">{{ interpretFor(d, score) }}</p>
          </template>
          <template v-else>
            <h3 class="serif" style="margin:0 0 12px; font-size:28px; font-weight:400; color: var(--text-mute)">
              Not yet mapped.
            </h3>
            <p style="color: var(--text-mute); font-size:14.5px; line-height:1.6; margin:0">
              Take the assessment to read where you sit on this axis and what it tends to mean.
            </p>
          </template>
        </div>
        <div class="card" style="padding:36px">
          <div class="micro" :style="{ marginBottom:'14px', color: 'oklch(85% 0.14 ' + d.hue + ')' }">HOW WE MEASURED</div>
          <h3 class="serif" style="margin:0 0 12px; font-size:28px; font-weight:400">
            Six items, drawn from {{ d.research.split(';')[0].split(',')[0] }}.
          </h3>
          <p style="color: var(--text-mute); font-size:14.5px; line-height:1.6; margin:0">
            {{ d.research }} The instrument mixes Likert items with calibration sliders to anchor responses against concrete moments of experience.
          </p>
        </div>
      </div>

      <div class="card" style="padding:28px; display:flex; align-items:center; gap:24px">
        <div style="flex:1">
          <div class="serif" style="font-size:22px">Re-take {{ d.name }}</div>
          <div style="color: var(--text-mute); font-size:13.5px">Six items · about 4 minutes. Your point on this axis may drift.</div>
        </div>
        <button class="btn" @click="router.push({ name: 'result', params: { id: d.id } })">See last result</button>
        <button class="btn btn-primary" @click="router.push({ name: 'quiz', params: { id: d.id } })">
          Begin assessment <span class="mono" style="opacity:0.5">→</span>
        </button>
      </div>
    </div>
  </div>
</template>
