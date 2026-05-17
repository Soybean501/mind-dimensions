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
  <div style="height:100%; overflow:auto">
    <div :style="{ maxWidth:'1180px', margin:'0 auto', padding:'var(--page-pad-y) var(--page-pad-x) var(--page-pad-bot)' }">
      <div style="display:flex; align-items:center; gap:12px; color: var(--text-mute); font-size:13px; margin-bottom:24px; flex-wrap:wrap">
        <a @click="router.push({ name: 'dashboard' })" style="cursor:pointer; color:inherit">Atlas</a>
        <span class="mono" style="color: var(--text-dim)">/</span>
        <span style="color: var(--text)">{{ d.name }}</span>
        <span class="mono" style="color: var(--text-dim); margin-left:auto">
          {{ String(DIMENSIONS.indexOf(d)+1).padStart(2,'0') }} / {{ String(DIMENSIONS.length).padStart(2,'0') }}
        </span>
      </div>

      <div :style="{ display:'grid', gridTemplateColumns:'var(--grid-dim-hero)', gap:'var(--col-gap-lg)', alignItems:'center', marginBottom:'var(--section-gap)' }">
        <div>
          <div style="display:flex; align-items:center; gap:14px; margin-bottom:24px">
            <CodeBadge :code="d.code" :hue="d.hue" size="lg" />
            <span class="micro">{{ d.poles.lo.code }} ↔ {{ d.poles.hi.code }}</span>
          </div>
          <h1 class="serif" :style="{ margin:0, fontSize:'var(--hero-lg)', lineHeight:0.98, fontWeight:400, letterSpacing:'-0.025em' }">
            {{ d.name }}<em :style="{ color: 'oklch(85% 0.14 ' + d.hue + ')' }">.</em>
          </h1>
          <p class="serif" :style="{ marginTop:'20px', fontSize:'var(--h4)', color:'var(--text-mute)', lineHeight:1.4, maxWidth:'540px' }">
            <em>{{ d.tagline }}</em>
          </p>
          <p :style="{ marginTop:'20px', fontSize:'var(--copy-md)', lineHeight:1.55, maxWidth:'560px' }">
            {{ d.description }}
          </p>
        </div>
        <div style="aspect-ratio:1; display:flex; align-items:center; justify-content:center; position:relative; max-width:380px; width:100%; justify-self:center">
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
            <g v-if="pct != null" :transform="'translate(' + (190 + (score-0.5)*2*160) + ',190)'">
              <circle r="42" :fill="'oklch(82% 0.14 ' + d.hue + ' / 0.18)'"/>
              <circle r="22" :fill="'oklch(82% 0.14 ' + d.hue + ' / 0.4)'"/>
              <circle r="6" :fill="'oklch(92% 0.14 ' + d.hue + ')'">
                <animate attributeName="r" values="5.5;7;5.5" dur="3s" repeatCount="indefinite"/>
              </circle>
            </g>
            <text v-if="pct != null" :x="190 + (score-0.5)*2*160" y="118" text-anchor="middle" fill="var(--text)" style="font:500 10.5px var(--font-mono); letter-spacing:0.08em">YOU</text>
          </svg>
        </div>
      </div>

      <div class="card" :style="{ padding:'var(--card-pad-lg)', marginBottom:'32px' }">
        <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:28px; gap:16px">
          <div>
            <div class="micro" style="margin-bottom:8px">YOUR POSITION</div>
            <div class="serif" :style="{ fontSize:'var(--h3)', fontWeight:400 }">
              <em v-if="pct != null" :style="{ color: 'oklch(85% 0.14 ' + d.hue + ')' }">{{ Math.round(score*100) }}</em>
              <em v-else style="color: var(--text-mute)">—</em>
              <span style="color: var(--text-dim); font-size:0.66em"> / 100</span>
            </div>
          </div>
          <div style="text-align:right">
            <div class="mono" style="font-size:11px; color: var(--text-dim)">POPULATION RANK</div>
            <div class="serif" :style="{ fontSize:'var(--h3)', fontWeight:400 }">
              <template v-if="pct != null">p<em>{{ pct }}</em></template>
              <em v-else style="color: var(--text-mute)">—</em>
            </div>
          </div>
        </div>
        <ScaleMeter :value="score" :hue="d.hue" :loLabel="d.poles.lo.label" :hiLabel="d.poles.hi.label" :popMean="POPULATION[d.id].mean" :percentile="pct" :height="48"/>
        <hr class="rule" style="margin:28px 0"/>
        <div class="micro" style="margin-bottom:10px">VS. POPULATION</div>
        <div style="width:100%; overflow:hidden">
          <DistributionCurve :value="score" :mean="POPULATION[d.id].mean" :sd="POPULATION[d.id].sd" :mode="POPULATION[d.id].mode" :hue="d.hue" :w="1080" :h="140"/>
        </div>
        <div class="mono" style="font-size:11px; color: var(--text-dim); margin-top:8px">
          · · · POPULATION MEAN ({{ Math.round(POPULATION[d.id].mean*100) }}) — YOU
        </div>
      </div>

      <div :style="{ display:'grid', gridTemplateColumns:'var(--grid-2)', gap:'var(--col-gap-md)', marginBottom:'32px' }">
        <div class="card" :style="{ padding:'var(--card-pad-md)' }">
          <div class="micro" style="margin-bottom:14px">WHAT THIS MEANS</div>
          <template v-if="pct != null">
            <h3 class="serif" :style="{ margin:'0 0 12px', fontSize:'var(--h4)', fontWeight:400 }">
              You sit closer to the {{ score > 0.5 ? d.poles.hi.code.toLowerCase() : d.poles.lo.code.toLowerCase() }} pole.
            </h3>
            <p style="color: var(--text-mute); font-size:14.5px; line-height:1.6; margin:0">{{ interpretFor(d, score) }}</p>
          </template>
          <template v-else>
            <h3 class="serif" :style="{ margin:'0 0 12px', fontSize:'var(--h4)', fontWeight:400, color:'var(--text-mute)' }">
              Not yet mapped.
            </h3>
            <p style="color: var(--text-mute); font-size:14.5px; line-height:1.6; margin:0">
              Take the assessment to read where you sit on this axis and what it tends to mean.
            </p>
          </template>
        </div>
        <div class="card" :style="{ padding:'var(--card-pad-md)' }">
          <div class="micro" :style="{ marginBottom:'14px', color: 'oklch(85% 0.14 ' + d.hue + ')' }">HOW WE MEASURED</div>
          <h3 class="serif" :style="{ margin:'0 0 12px', fontSize:'var(--h4)', fontWeight:400 }">
            Six items, drawn from {{ d.research.split(';')[0].split(',')[0] }}.
          </h3>
          <p style="color: var(--text-mute); font-size:14.5px; line-height:1.6; margin:0">
            {{ d.research }} The instrument mixes Likert items with calibration sliders to anchor responses against concrete moments of experience.
          </p>
        </div>
      </div>

      <div class="card" style="padding:24px; display:flex; align-items:center; gap:16px; flex-wrap:wrap">
        <div style="flex:1 1 220px; min-width:220px">
          <div class="serif" style="font-size:20px">
            <template v-if="pct != null">Re-take {{ d.name }}</template>
            <template v-else>Map {{ d.name }}</template>
          </div>
          <div style="color: var(--text-mute); font-size:13.5px">Six items · about 4 minutes.</div>
        </div>
        <button class="btn btn-primary" @click="router.push({ name: 'quiz', params: { id: d.id } })">
          Begin assessment <span class="mono" style="opacity:0.5">→</span>
        </button>
      </div>
    </div>
  </div>
</template>
