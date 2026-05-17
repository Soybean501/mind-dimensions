<script setup>
import { useRouter } from 'vue-router'
import ConstellationField from '../components/atoms/ConstellationField.vue'
import Wordmark from '../components/atoms/Wordmark.vue'
import CodeBadge from '../components/atoms/CodeBadge.vue'
import GlowDot from '../components/atoms/GlowDot.vue'
import { DIMENSIONS } from '../data/dimensions'
import { useProfile } from '../stores/profile'
const router = useRouter()
const profile = useProfile()
</script>
<template>
  <div style="position:relative; height:100%; overflow:auto">
    <div style="position:absolute; inset:0; z-index:0">
      <ConstellationField :density="1.4" />
    </div>
    <div :style="{ position:'relative', zIndex:1, maxWidth:'var(--content-max)', margin:'0 auto', padding:'var(--page-pad-y) var(--page-pad-x) var(--page-pad-bot)' }">
      <div :style="{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'var(--section-gap)', gap:'12px', flexWrap:'wrap' }">
        <Wordmark />
        <button class="btn btn-primary" @click="router.push({ name: 'dashboard' })">Begin atlas</button>
      </div>

      <div :style="{ display:'grid', gridTemplateColumns:'var(--grid-hero)', gap:'var(--col-gap-lg)', alignItems:'center', marginBottom:'var(--section-gap)' }">
        <div class="fade-up">
          <div class="micro" style="margin-bottom:24px">ATLAS · {{ DIMENSIONS.length }} DIMENSIONS</div>
          <h1 class="serif" :style="{ margin:0, fontSize:'var(--hero-xl)', lineHeight:0.96, fontWeight:400, letterSpacing:'-0.025em' }">
            Your mind has<br/>
            <em style="color: var(--accent)">coordinates</em>.
          </h1>
          <p :style="{ marginTop:'24px', fontSize:'var(--copy-lg)', lineHeight:1.45, color:'var(--text-mute)', maxWidth:'520px' }">
            Cognitype is an atlas for the interior. Take guided assessments across {{ DIMENSIONS.length }} dimensions of cognition — inner speech, mental imagery, wordless thought, systemising drive, processing style, sensory vividness — and find where your mind sits in the space of possible minds.
          </p>
          <div style="display:flex; gap:12px; margin-top:32px; flex-wrap:wrap">
            <button class="btn btn-primary" style="padding:14px 24px; font-size:14.5px" @click="router.push({ name: 'dashboard' })">
              Map my mind <span class="mono" style="opacity:0.5">→</span>
            </button>
          </div>
          <div style="display:flex; gap:18px; margin-top:36px; align-items:center; flex-wrap:wrap">
            <div class="mono" style="font-size:11px; color: var(--text-dim)">⊕ {{ DIMENSIONS.length }} cognitive dimensions</div>
            <div class="mono" style="font-size:11px; color: var(--text-dim)">⊕ peer-reviewed instruments</div>
            <div class="mono" style="font-size:11px; color: var(--text-dim)">⊕ private by default</div>
          </div>
        </div>

        <div class="breathe" style="position:relative; aspect-ratio:1; max-width:520px; justify-self:center; width:100%">
          <svg viewBox="0 0 520 520" style="width:100%; height:100%">
            <defs>
              <radialGradient id="orb-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%"  stop-color="oklch(82% 0.14 220 / 0.5)"/>
                <stop offset="60%" stop-color="oklch(80% 0.14 290 / 0.18)"/>
                <stop offset="100%" stop-color="oklch(78% 0.14 330 / 0)"/>
              </radialGradient>
            </defs>
            <circle cx="260" cy="260" r="240" fill="url(#orb-glow)"/>
            <circle v-for="(r,i) in [80,130,180,230]" :key="r" cx="260" cy="260" :r="r" stroke="oklch(85% 0.05 220 / 0.18)" fill="none" :stroke-dasharray="i%2?'':'2 4'">
              <animateTransform v-if="i===3" attributeName="transform" type="rotate" from="0 260 260" to="360 260 260" dur="80s" repeatCount="indefinite"/>
              <animateTransform v-if="i===1" attributeName="transform" type="rotate" from="360 260 260" to="0 260 260" dur="60s" repeatCount="indefinite"/>
            </circle>
            <line v-for="(d,i) in DIMENSIONS" :key="d.id"
              x1="260" y1="260"
              :x2="260 + Math.cos((-Math.PI/2)+(i/6)*Math.PI*2)*230"
              :y2="260 + Math.sin((-Math.PI/2)+(i/6)*Math.PI*2)*230"
              :stroke="'oklch(82% 0.14 ' + d.hue + ' / 0.22)'" stroke-width="1"/>
            <polygon
              :points="DIMENSIONS.map((d,i) => {
                const a = (-Math.PI/2) + (i/6)*Math.PI*2
                const v = profile.scores[d.id]
                return (260+Math.cos(a)*230*v) + ',' + (260+Math.sin(a)*230*v)
              }).join(' ')"
              fill="oklch(82% 0.14 220 / 0.18)" stroke="oklch(82% 0.14 220 / 0.7)" stroke-width="1.4"/>
            <g v-for="(d,i) in DIMENSIONS" :key="'p'+d.id">
              <circle :cx="260 + Math.cos((-Math.PI/2)+(i/6)*Math.PI*2)*230*profile.scores[d.id]"
                :cy="260 + Math.sin((-Math.PI/2)+(i/6)*Math.PI*2)*230*profile.scores[d.id]"
                r="12" :fill="'oklch(82% 0.14 ' + d.hue + ' / 0.18)'"/>
              <circle :cx="260 + Math.cos((-Math.PI/2)+(i/6)*Math.PI*2)*230*profile.scores[d.id]"
                :cy="260 + Math.sin((-Math.PI/2)+(i/6)*Math.PI*2)*230*profile.scores[d.id]"
                r="4" :fill="'oklch(88% 0.14 ' + d.hue + ')'">
                <animate attributeName="r" values="3.5;4.8;3.5" dur="3.5s" repeatCount="indefinite" :begin="(i*0.3)+'s'"/>
              </circle>
            </g>
            <circle cx="260" cy="260" r="6" fill="oklch(95% 0.06 220)"/>
          </svg>
        </div>
      </div>

      <div :style="{ marginBottom:'var(--section-gap)' }">
        <div class="micro" style="margin-bottom:14px">THE SIX DIMENSIONS</div>
        <h2 class="serif" :style="{ margin:0, fontSize:'var(--h2)', fontWeight:400, maxWidth:'800px' }">
          Six axes, drawn from the science of subjective experience.
        </h2>
        <div class="stagger" :style="{ display:'grid', gridTemplateColumns:'var(--grid-3)', gap:'1px', marginTop:'40px', background:'var(--border)', border:'1px solid var(--border)', borderRadius:'16px', overflow:'hidden' }">
          <div v-for="(d,i) in DIMENSIONS" :key="d.id" :style="{ padding:'var(--card-pad-md)', background:'var(--bg-surface)', minHeight:'220px', position:'relative' }">
            <div style="display:flex; justify-content:space-between; align-items:flex-start">
              <CodeBadge :code="d.code" :hue="d.hue" size="lg" />
              <span class="mono" style="color: var(--text-dim); font-size:10px">0{{ i+1 }}</span>
            </div>
            <h3 class="serif" :style="{ margin:'24px 0 6px', fontSize:'var(--h4)', fontWeight:400 }">{{ d.name }}</h3>
            <p style="margin:0; color: var(--text-mute); font-size:14px; line-height:1.5">{{ d.tagline }}</p>
            <div :style="{ position:'absolute', bottom:'20px', left:'var(--card-pad-md)', right:'var(--card-pad-md)', display:'flex', justifyContent:'space-between', alignItems:'center' }">
              <span class="mono" style="font-size:10px; color: var(--text-dim); letter-spacing:0.06em">
                {{ d.poles.lo.code }} ↔ {{ d.poles.hi.code }}
              </span>
              <GlowDot :size="6" :hue="d.hue"/>
            </div>
          </div>
        </div>
      </div>

      <div class="card" :style="{ padding:'var(--card-pad-xl)', marginBottom:'var(--section-gap)' }">
        <div class="micro" style="margin-bottom:16px; color: var(--accent)">FROM THE RESEARCH</div>
        <p class="serif" :style="{ fontSize:'var(--h3)', lineHeight:1.3, margin:0, maxWidth:'880px', letterSpacing:'-0.005em' }">
          <em>"The phenomenology of the moment is not what most people assume it to be. The first job is to take it seriously enough to look — carefully, and without theory."</em>
        </p>
        <div class="mono" style="margin-top:24px; color: var(--text-dim); font-size:12px">
          — Russell Hurlburt, on Descriptive Experience Sampling
        </div>
      </div>

      <div style="border-top:1px solid var(--border); padding-top:24px; color: var(--text-dim); font-size:12px">
        <div class="mono">COGNITYPE · ATLAS OF THE INTERIOR</div>
      </div>
    </div>
  </div>
</template>
