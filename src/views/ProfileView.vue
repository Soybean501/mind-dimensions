<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import RadarChart from '../components/atoms/RadarChart.vue'
import PointInSpace from '../components/atoms/PointInSpace.vue'
import PolarBars from '../components/atoms/PolarBars.vue'
import Fingerprint from '../components/atoms/Fingerprint.vue'
import DistributionCurve from '../components/atoms/DistributionCurve.vue'
import GlowDot from '../components/atoms/GlowDot.vue'
import CodeBadge from '../components/atoms/CodeBadge.vue'
import { DIMENSIONS, POPULATION } from '../data/dimensions'
import { useProfile } from '../stores/profile'
import { useTweaks } from '../composables/useTweaks'
const router = useRouter()
const profile = useProfile()
const t = useTweaks()
const view = ref(t.vizDefault || 'radar')
const rot = ref(0)
let raf
const tabs = [
  { id: 'radar', label: 'Radar' },
  { id: 'space', label: 'In space' },
  { id: 'bars',  label: 'Polar bars' },
  { id: 'fingerprint', label: 'Fingerprint' },
]
function tick(now) {
  rot.value = ((now)/12000) * Math.PI * 2
  raf = requestAnimationFrame(tick)
}
onMounted(() => { raf = requestAnimationFrame(tick) })
onBeforeUnmount(() => { if (raf) cancelAnimationFrame(raf) })

const standouts = []
const clusters = []
</script>
<template>
  <div style="height:100%; overflow:auto; padding:32px 56px 80px">
    <div style="max-width:1280px; margin:0 auto">
      <div style="display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:56px">
        <div>
          <div class="micro" style="margin-bottom:14px">FULL ATLAS<template v-if="profile.name"> · {{ profile.name.toUpperCase() }}</template></div>
          <h1 class="serif" style="margin:0; font-size:76px; line-height:0.95; font-weight:400; letter-spacing:-0.025em; max-width:900px">
            <template v-if="profile.type">{{ profile.type }}</template>
            <template v-else>An <em style="color: var(--accent)">unmapped</em> mind.</template>
          </h1>
          <p style="margin-top:20px; font-size:18px; color: var(--text-mute); line-height:1.5; max-width:640px">
            <template v-if="profile.signature">{{ profile.signature }}</template>
            <template v-else>Your atlas is a snapshot of where your mind sits across {{ DIMENSIONS.length }} cognitive axes. Map a few dimensions to begin drawing it.</template>
          </p>
          <div style="display:flex; gap:24px; margin-top:28px; align-items:center">
            <span class="mono" style="font-size:11.5px; color: var(--text-dim)">{{ profile.completed }} / {{ DIMENSIONS.length }} DIMENSIONS</span>
          </div>
        </div>
        <div style="display:flex; gap:10px">
          <button class="btn">Export</button>
          <button class="btn btn-primary">Share atlas</button>
        </div>
      </div>

      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:24px">
        <div style="display:inline-flex; background: var(--bg-elev); border:1px solid var(--border); border-radius:9999px; padding:4px">
          <button v-for="tab in tabs" :key="tab.id" @click="view = tab.id"
            :style="{ padding:'8px 18px', borderRadius:'9999px', border:0,
              background: view === tab.id ? 'var(--text)' : 'transparent',
              color: view === tab.id ? 'var(--bg-deep)' : 'var(--text-mute)',
              cursor:'pointer', fontSize:'13px', fontWeight:500 }">{{ tab.label }}</button>
        </div>
        <span class="mono" style="font-size:11px; color: var(--text-dim)">⊕ Same data · four readings</span>
      </div>

      <div style="display:grid; grid-template-columns:1.4fr 1fr; gap:32px; margin-bottom:32px">
        <div class="card" style="padding:32px; min-height:540px; position:relative; display:flex; align-items:center; justify-content:center">
          <div class="micro" style="position:absolute; top:24px; left:32px">
            <template v-if="view==='radar'">RADAR · ALL SIX AT ONCE</template>
            <template v-else-if="view==='space'">POINT IN COGNITIVE SPACE · 6D → 3D</template>
            <template v-else-if="view==='bars'">POLAR BARS · POLE-TO-POLE</template>
            <template v-else>COGNITIVE FINGERPRINT · ABSTRACT</template>
          </div>
          <div class="mono" style="position:absolute; top:24px; right:32px; font-size:11px; color: var(--text-dim)">
            VIEW · 0{{ tabs.findIndex(x => x.id===view)+1 }}/04
          </div>
          <div style="width:100%; display:flex; align-items:center; justify-content:center; padding:32px 0">
            <RadarChart v-if="view==='radar'" :scores="profile.scores" :size="480"/>
            <PointInSpace v-else-if="view==='space'" :scores="profile.scores" :size="480" :rotate="rot"/>
            <div v-else-if="view==='bars'" style="width:100%; max-width:560px">
              <PolarBars :scores="profile.scores"/>
            </div>
            <Fingerprint v-else :scores="profile.scores" :size="420"/>
          </div>
          <div class="mono" style="position:absolute; bottom:24px; left:32px; font-size:11px; color: var(--text-dim)">
            ⊕ YOU · · · ⊕ POPULATION MEAN
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:16px">
          <div class="card" style="padding:28px">
            <div class="micro" style="margin-bottom:14px">SIGNATURE</div>
            <div style="display:flex; align-items:baseline; gap:8px; flex-wrap:wrap">
              <span v-for="d in DIMENSIONS" :key="d.id" style="display:inline-flex; align-items:center; gap:6px">
                <GlowDot :size="6" :hue="d.hue"/>
                <span class="mono" style="font-size:11.5px; color: var(--text-mute)">{{ d.code }}</span>
                <span class="serif" :style="{ fontSize:'18px', color: 'oklch(88% 0.14 ' + d.hue + ')' }">
                  {{ (profile.scores[d.id] > 0.6 ? d.poles.hi.code : profile.scores[d.id] < 0.4 ? d.poles.lo.code : '~').toLowerCase() }}
                </span>
              </span>
            </div>
            <p style="color: var(--text-mute); font-size:13.5px; margin-top:18px; line-height:1.55">
              A compact 'formula' of your six axes. Hover any dimension to see its score and percentile.
            </p>
          </div>

          <div class="card" style="padding:28px">
            <div class="micro" style="margin-bottom:14px">STANDOUTS</div>
            <template v-if="standouts.length">
              <div v-for="(s,i) in standouts" :key="i"
                :style="{ display:'flex', alignItems:'center', gap:'14px', padding:'12px 0', borderTop: i>0 ? '1px solid var(--border)' : 'none' }">
                <CodeBadge :code="s.d.code" :hue="s.d.hue" size="sm"/>
                <div style="flex:1">
                  <div class="serif" style="font-size:17px">{{ s.d.name }}</div>
                  <div style="color: var(--text-dim); font-size:12px">{{ s.note }}</div>
                </div>
                <button @click="router.push({ name: 'dimension', params: { id: s.d.id } })"
                  style="background:none; border:0; color: var(--text-mute); cursor:pointer">→</button>
              </div>
            </template>
            <p v-else class="serif" style="color: var(--text-mute); font-size:15px; margin:0">
              <em>Standouts appear once you've mapped a few dimensions.</em>
            </p>
          </div>

          <div class="card" style="padding:28px">
            <div class="micro" style="margin-bottom:14px">NEAREST CLUSTERS</div>
            <template v-if="clusters.length">
              <div v-for="(c,i) in clusters" :key="i"
                :style="{ display:'grid', gridTemplateColumns:'1fr 80px 40px', alignItems:'center', padding:'10px 0', borderTop: i>0 ? '1px solid var(--border)' : 'none', gap:'12px' }">
                <span style="font-size:14px">{{ c.name }}</span>
                <div style="height:4px; background: var(--bg-elev); border-radius:4px; position:relative; overflow:hidden">
                  <div :style="{ position:'absolute', left:0, top:0, bottom:0, width: ((1-c.d)*100) + '%', background: 'var(--accent)' }"/>
                </div>
                <span class="mono" style="font-size:11px; color: var(--text-mute); text-align:right">{{ c.d.toFixed(2) }}</span>
              </div>
            </template>
            <p v-else class="serif" style="color: var(--text-mute); font-size:15px; margin:0">
              <em>Cluster matches appear when your atlas is complete.</em>
            </p>
          </div>
        </div>
      </div>

      <div style="display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:18px">
        <div>
          <div class="micro" style="margin-bottom:6px">DETAIL · ALL SIX</div>
          <h2 class="serif" style="margin:0; font-size:32px; font-weight:400">Each axis, expanded</h2>
          <p style="color: var(--text-mute); margin:8px 0 0; max-width:540px">Score, percentile, and distribution alongside the population.</p>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px">
        <div v-for="d in DIMENSIONS" :key="d.id" class="card" style="padding:24px">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:18px">
            <CodeBadge :code="d.code" :hue="d.hue"/>
            <div class="serif" style="font-size:22px">{{ d.name }}</div>
            <span class="mono" style="margin-left:auto; font-size:11px; color: var(--text-mute)">
              <template v-if="profile.percentiles[d.id] != null">{{ Math.round(profile.scores[d.id]*100) }} · p{{ profile.percentiles[d.id] }}</template>
              <template v-else>unmapped</template>
            </span>
          </div>
          <DistributionCurve :value="profile.scores[d.id]" :mean="POPULATION[d.id].mean" :sd="POPULATION[d.id].sd" :mode="POPULATION[d.id].mode" :hue="d.hue" :w="460" :h="80"/>
          <div class="micro" style="display:flex; justify-content:space-between; margin-top:8px">
            <span>{{ d.poles.lo.code }}</span><span>{{ d.poles.hi.code }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
