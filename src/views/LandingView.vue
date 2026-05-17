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
    <div style="position:relative; z-index:1; max-width:1280px; margin:0 auto; padding:40px 56px 80px">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:80px">
        <Wordmark />
        <nav style="display:flex; gap:28px; color: var(--text-mute); font-size:13.5px">
          <a>Atlas</a><a>Research</a><a>Methodology</a><a>Journal</a>
        </nav>
        <div style="display:flex; gap:10px">
          <button class="btn btn-ghost">Sign in</button>
          <button class="btn btn-primary" @click="router.push({ name: 'onboarding' })">Begin atlas</button>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1.05fr 0.95fr; gap:80px; align-items:center; margin-bottom:120px">
        <div class="fade-up">
          <div class="micro" style="margin-bottom:24px">v0.1 · ATLAS MK-1 · 6 DIMENSIONS</div>
          <h1 class="serif" style="margin:0; font-size:88px; line-height:0.96; font-weight:400; letter-spacing:-0.025em">
            Your mind has<br/>
            <em style="color: var(--accent)">coordinates</em>.
          </h1>
          <p style="margin-top:32px; font-size:19px; line-height:1.45; color: var(--text-mute); max-width:520px">
            Cognitype is an atlas for the interior. Take guided assessments across six dimensions of cognition — inner speech, mental imagery, wordless thought, systemising drive, processing style, sensory vividness — and find where your mind sits in the space of possible minds.
          </p>
          <div style="display:flex; gap:12px; margin-top:36px">
            <button class="btn btn-primary" style="padding:14px 24px; font-size:14.5px" @click="router.push({ name: 'onboarding' })">
              Map my mind <span class="mono" style="opacity:0.5">→</span>
            </button>
            <button class="btn" style="padding:14px 24px; font-size:14.5px" @click="router.push({ name: 'dashboard' })">
              Explore the atlas
            </button>
          </div>
          <div style="display:flex; gap:24px; margin-top:48px; align-items:center">
            <div class="mono" style="font-size:11px; color: var(--text-dim)">⊕ {{ DIMENSIONS.length }} cognitive dimensions</div>
            <div style="width:1px; height:14px; background: var(--border)"/>
            <div class="mono" style="font-size:11px; color: var(--text-dim)">⊕ peer-reviewed instruments</div>
            <div style="width:1px; height:14px; background: var(--border)"/>
            <div class="mono" style="font-size:11px; color: var(--text-dim)">⊕ private by default</div>
          </div>
        </div>

        <div class="breathe" style="position:relative; aspect-ratio:1; max-width:520px; justify-self:end; width:100%">
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

      <div style="margin-bottom:120px">
        <div class="micro" style="margin-bottom:14px">THE SIX DIMENSIONS</div>
        <h2 class="serif" style="margin:0; font-size:48px; font-weight:400; max-width:800px">
          Six axes, drawn from the science of subjective experience.
        </h2>
        <div class="stagger" style="display:grid; grid-template-columns:repeat(3,1fr); gap:1px; margin-top:56px; background: var(--border); border:1px solid var(--border); border-radius:16px; overflow:hidden">
          <div v-for="(d,i) in DIMENSIONS" :key="d.id" style="padding:32px; background: var(--bg-surface); min-height:240px; position:relative">
            <div style="display:flex; justify-content:space-between; align-items:flex-start">
              <CodeBadge :code="d.code" :hue="d.hue" size="lg" />
              <span class="mono" style="color: var(--text-dim); font-size:10px">0{{ i+1 }}</span>
            </div>
            <h3 class="serif" style="margin:24px 0 6px; font-size:28px; font-weight:400">{{ d.name }}</h3>
            <p style="margin:0; color: var(--text-mute); font-size:14px; line-height:1.5">{{ d.tagline }}</p>
            <div style="position:absolute; bottom:24px; left:32px; right:32px; display:flex; justify-content:space-between; align-items:center">
              <span class="mono" style="font-size:10px; color: var(--text-dim); letter-spacing:0.06em">
                {{ d.poles.lo.code }} ↔ {{ d.poles.hi.code }}
              </span>
              <GlowDot :size="6" :hue="d.hue"/>
            </div>
          </div>
        </div>
      </div>

      <div class="card" style="padding:56px; margin-bottom:120px">
        <div class="micro" style="margin-bottom:16px; color: var(--accent)">FROM THE RESEARCH</div>
        <p class="serif" style="font-size:30px; line-height:1.3; margin:0; max-width:880px; letter-spacing:-0.005em">
          <em>"The phenomenology of the moment is not what most people assume it to be. The first job is to take it seriously enough to look — carefully, and without theory."</em>
        </p>
        <div class="mono" style="margin-top:24px; color: var(--text-dim); font-size:12px">
          — Russell Hurlburt, on Descriptive Experience Sampling
        </div>
      </div>

      <div style="border-top:1px solid var(--border); padding-top:32px; display:flex; justify-content:space-between; color: var(--text-dim); font-size:12px">
        <div class="mono">COGNITYPE · ATLAS OF THE INTERIOR · MMXXVI</div>
        <div style="display:flex; gap:24px">
          <span>Methodology</span><span>Research</span><span>Privacy</span><span>Contact</span>
        </div>
      </div>
    </div>
  </div>
</template>
