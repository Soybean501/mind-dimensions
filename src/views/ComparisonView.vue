<script setup>
import { ref, computed } from 'vue'
import DistributionCurve from '../components/atoms/DistributionCurve.vue'
import GlowDot from '../components/atoms/GlowDot.vue'
import { DIMENSIONS, POPULATION } from '../data/dimensions'
import { useProfile } from '../stores/profile'
const profile = useProfile()
const selected = ref('inner-speech')
const d = computed(() => DIMENSIONS.find(x => x.id === selected.value))

const cloudPoints = (() => {
  const arr = []
  const centers = [
    [0.30,0.40,200,220], [0.65,0.55,260,320],
    [0.50,0.30,180,160], [0.78,0.70,120,90],
  ]
  centers.forEach(([cx,cy,hueA,hueB]) => {
    const n = 180
    for (let i=0; i<n; i++) {
      const r = Math.sqrt(-2*Math.log(Math.random()))
      const t = Math.random()*Math.PI*2
      arr.push({ x: cx + r*Math.cos(t)*0.07, y: cy + r*Math.sin(t)*0.07, hue: hueA + Math.random()*(hueB-hueA), z: Math.random() })
    }
  })
  return arr
})()
const ux = computed(() => profile.scores['inner-speech'])
const uy = computed(() => profile.scores['systemising'])
const W = 600, H = 320
</script>
<template>
  <div style="height:100%; overflow:auto; padding:32px 56px 80px">
    <div style="max-width:1280px; margin:0 auto">
      <div style="margin-bottom:48px">
        <div class="micro" style="margin-bottom:14px">COMPARISON · POPULATION</div>
        <h1 class="serif" style="margin:0; font-size:64px; font-weight:400; letter-spacing:-0.022em; line-height:1">
          How <em style="color: var(--accent)">rare</em> is your mind?
        </h1>
        <p style="margin:18px 0 0; font-size:17px; color: var(--text-mute); max-width:620px">
          Distance is measured in standard deviations from the centroid of the mapped population. Rarity isn't better; it's just less common.
        </p>
      </div>

      <div class="card" style="padding:56px; margin-bottom:48px; display:grid; grid-template-columns:1fr 1.4fr; gap:56px; align-items:center">
        <div>
          <div class="micro" style="margin-bottom:12px">YOUR COGNITYPE OCCURS IN</div>
          <div class="serif" style="font-size:120px; line-height:1; font-weight:400; letter-spacing:-0.04em">
            <em style="color: var(--text-mute)">—</em><span style="font-size:56px; color: var(--text-mute)">%</span>
          </div>
          <div style="color: var(--text-mute); margin-top:8px">of mapped minds</div>
          <hr class="rule" style="margin:28px 0"/>
          <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:24px">
            <div><div class="micro">Z-DISTANCE</div><div class="serif" style="font-size:30px; color: var(--text-mute)">—</div></div>
            <div><div class="micro">NEAREST PEER</div><div class="serif" style="font-size:30px; color: var(--text-mute)">—</div></div>
          </div>
        </div>
        <svg :viewBox="'0 0 ' + W + ' ' + H" style="width:100%; max-width:600px">
          <defs>
            <radialGradient id="cloud-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="oklch(85% 0.14 220 / 0.5)"/>
              <stop offset="100%" stop-color="oklch(85% 0.14 220 / 0)"/>
            </radialGradient>
          </defs>
          <line x1="20" :y1="H-20" :x2="W-10" :y2="H-20" stroke="var(--border)"/>
          <line x1="20" y1="10" x2="20" :y2="H-20" stroke="var(--border)"/>
          <text x="20" :y="H-4" fill="var(--text-dim)" style="font:500 9px var(--font-mono); letter-spacing:0.06em">INNER SPEECH →</text>
          <text x="22" y="16" fill="var(--text-dim)" style="font:500 9px var(--font-mono); letter-spacing:0.06em">↑ SYSTEMISING</text>
          <circle v-for="(p,i) in cloudPoints" :key="i"
            :cx="20 + p.x*(W-30)" :cy="(H-20) - p.y*(H-30)" :r="0.6 + p.z*1.4"
            :fill="'oklch(82% 0.10 ' + p.hue + ' / ' + (0.25 + p.z*0.35) + ')'"/>
          <g :transform="'translate(' + (20 + ux*(W-30)) + ',' + ((H-20) - uy*(H-30)) + ')'">
            <circle r="36" fill="url(#cloud-halo)"/>
            <circle r="4" fill="oklch(95% 0.06 220)"/>
            <line x1="-12" y1="0" x2="-6" y2="0" stroke="oklch(90% 0.14 220)"/>
            <line x1="6" y1="0" x2="12" y2="0" stroke="oklch(90% 0.14 220)"/>
            <line x1="0" y1="-12" x2="0" y2="-6" stroke="oklch(90% 0.14 220)"/>
            <line x1="0" y1="6" x2="0" y2="12" stroke="oklch(90% 0.14 220)"/>
            <text x="14" y="-10" fill="var(--text)" style="font:500 11px var(--font-mono); letter-spacing:0.06em">YOU</text>
          </g>
        </svg>
      </div>

      <div style="display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:18px">
        <div>
          <div class="micro" style="margin-bottom:6px">AXIS BY AXIS</div>
          <h2 class="serif" style="margin:0; font-size:32px; font-weight:400">Where you sit on each curve</h2>
          <p style="color: var(--text-mute); margin:8px 0 0">The dotted line is the population mean. The marker is you.</p>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:240px 1fr; gap:32px">
        <div class="card" style="padding:8px">
          <button v-for="dim in DIMENSIONS" :key="dim.id" @click="selected = dim.id"
            :style="{ width:'100%', display:'flex', alignItems:'center', gap:'12px',
              padding:'14px 16px', borderRadius:'10px', border:0,
              background: selected === dim.id ? 'var(--bg-elev)' : 'transparent',
              cursor:'pointer', textAlign:'left', color:'var(--text)' }">
            <GlowDot :size="8" :hue="dim.hue" :intensity="selected===dim.id?1.2:0.6"/>
            <div style="flex:1">
              <div style="font-size:14px">{{ dim.name }}</div>
              <div class="mono" style="font-size:10.5px; color: var(--text-dim)">
                <template v-if="profile.percentiles[dim.id] != null">p{{ profile.percentiles[dim.id] }}</template>
                <template v-else>unmapped</template>
                · {{ POPULATION[dim.id].mode }}
              </div>
            </div>
            <span v-if="selected === dim.id" class="mono" style="color: var(--text-dim)">•</span>
          </button>
        </div>

        <div class="card" style="padding:36px">
          <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:24px">
            <div>
              <div class="micro" style="margin-bottom:8px">{{ d.code }} · {{ d.poles.lo.code }} ↔ {{ d.poles.hi.code }}</div>
              <h3 class="serif" style="margin:0; font-size:36px; font-weight:400">{{ d.name }}</h3>
              <p style="color: var(--text-mute); margin-top:8px; max-width:540px">
                Population distribution is <em>{{ POPULATION[d.id].mode }}</em>.
                <template v-if="profile.percentiles[d.id] != null">
                  Your score of {{ Math.round(profile.scores[d.id]*100) }} places you at the <em>{{ profile.percentiles[d.id] }}th</em> percentile.
                </template>
                <template v-else>
                  Take the assessment to see where you sit on this curve.
                </template>
              </p>
            </div>
            <div style="text-align:right">
              <div class="serif" :style="{ fontSize:'56px', color: profile.percentiles[d.id] != null ? 'oklch(88% 0.14 ' + d.hue + ')' : 'var(--text-mute)', lineHeight:1 }">
                <template v-if="profile.percentiles[d.id] != null">p{{ profile.percentiles[d.id] }}</template>
                <template v-else>—</template>
              </div>
              <div class="mono" style="font-size:11px; color: var(--text-dim)">PERCENTILE</div>
            </div>
          </div>
          <DistributionCurve :value="profile.scores[d.id]" :mean="POPULATION[d.id].mean" :sd="POPULATION[d.id].sd" :mode="POPULATION[d.id].mode" :hue="d.hue" :w="800" :h="180"/>
          <div class="micro" style="display:flex; justify-content:space-between; margin-top:12px">
            <span>{{ d.poles.lo.label }}</span><span>0.5</span><span>{{ d.poles.hi.label }}</span>
          </div>
          <hr class="rule" style="margin:32px 0"/>
          <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:24px">
            <div>
              <div class="micro">YOUR SCORE</div>
              <div class="serif" style="font-size:30px" :style="{ color: profile.percentiles[d.id] != null ? 'var(--text)' : 'var(--text-mute)' }">
                <template v-if="profile.percentiles[d.id] != null">{{ Math.round(profile.scores[d.id]*100) }}</template>
                <template v-else>—</template>
              </div>
              <div style="color: var(--text-dim); font-size:11.5px; font-family:var(--font-mono)">
                <template v-if="profile.percentiles[d.id] != null">p{{ profile.percentiles[d.id] }}</template>
                <template v-else>unmapped</template>
              </div>
            </div>
            <div><div class="micro">POP. MEAN</div><div class="serif" style="font-size:30px">{{ Math.round(POPULATION[d.id].mean*100) }}</div><div style="color: var(--text-dim); font-size:11.5px; font-family:var(--font-mono)">σ {{ POPULATION[d.id].sd.toFixed(2) }}</div></div>
            <div><div class="micro">MODE</div><div class="serif" style="font-size:30px">{{ POPULATION[d.id].mode }}</div><div style="color: var(--text-dim); font-size:11.5px; font-family:var(--font-mono)">distribution shape</div></div>
            <div>
              <div class="micro">DISTANCE</div>
              <div class="serif" style="font-size:30px" :style="{ color: profile.percentiles[d.id] != null ? 'var(--text)' : 'var(--text-mute)' }">
                <template v-if="profile.percentiles[d.id] != null">{{ ((profile.scores[d.id] - POPULATION[d.id].mean) / POPULATION[d.id].sd).toFixed(2) }}σ</template>
                <template v-else>—</template>
              </div>
              <div style="color: var(--text-dim); font-size:11.5px; font-family:var(--font-mono)">from mean</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
