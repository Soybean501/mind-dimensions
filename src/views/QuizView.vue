<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConstellationField from '../components/atoms/ConstellationField.vue'
import CodeBadge from '../components/atoms/CodeBadge.vue'
import LikertScale from '../components/quiz/LikertScale.vue'
import ForcedChoice from '../components/quiz/ForcedChoice.vue'
import CalibrationSlider from '../components/quiz/CalibrationSlider.vue'
import { DIMENSIONS, QUIZ_INNER_SPEECH } from '../data/dimensions'
const route = useRoute()
const router = useRouter()
const d = computed(() => DIMENSIONS.find(x => x.id === route.params.id) || DIMENSIONS[0])
const questions = QUIZ_INNER_SPEECH
const idx = ref(0)
const answers = ref({})
const q = computed(() => questions[idx.value])
const total = questions.length
const progress = computed(() => idx.value / total)
const answered = computed(() => answers.value[q.value.id] !== undefined)
function next() {
  if (idx.value < total - 1) idx.value++
  else router.push({ name: 'result', params: { id: d.value.id } })
}
function prev() {
  if (idx.value > 0) idx.value--
  else router.push({ name: 'dimension', params: { id: d.value.id } })
}
function setAnswer(v) { answers.value = { ...answers.value, [q.value.id]: v } }
</script>
<template>
  <div style="position:relative; height:100%; overflow:hidden; display:flex; flex-direction:column">
    <div style="position:absolute; inset:0; z-index:0; opacity:0.4">
      <ConstellationField :density="0.5" :lines="false"/>
    </div>

    <div :style="{ position:'relative', zIndex:1, padding:'16px var(--page-pad-x)', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:'16px', flexWrap:'wrap' }">
      <button class="btn btn-ghost" @click="prev">← Back</button>
      <div style="display:flex; align-items:center; gap:12px">
        <CodeBadge :code="d.code" :hue="d.hue" size="sm"/>
        <div>
          <div class="micro" style="margin-bottom:2px">ASSESSMENT</div>
          <div class="serif" style="font-size:16px">{{ d.name }}</div>
        </div>
      </div>
      <div style="flex:1; min-width:140px">
        <div style="display:flex; justify-content:space-between; margin-bottom:6px">
          <span class="mono" style="font-size:11px; color: var(--text-dim)">
            ITEM {{ String(idx+1).padStart(2,'0') }} / {{ String(total).padStart(2,'0') }}
          </span>
          <span class="mono" style="font-size:11px; color: var(--text-dim)">
            ~{{ Math.max(1, Math.ceil((total-idx)*0.5)) }}M
          </span>
        </div>
        <div style="height:2px; background: var(--border); border-radius:2px; overflow:hidden">
          <div :style="{ height:'100%', width: (progress*100) + '%', background: 'linear-gradient(90deg, oklch(85% 0.14 ' + d.hue + '), oklch(82% 0.14 ' + d.hue + '))', transition: 'width 360ms cubic-bezier(.2,.7,.2,1)' }"/>
        </div>
      </div>
    </div>

    <div :key="q.id" class="fade-up" :style="{ position:'relative', zIndex:1, flex:1, overflow:'auto', padding:'40px var(--page-pad-x)', display:'flex', alignItems:'flex-start', justifyContent:'center' }">
      <div style="max-width:820px; width:100%">
        <div class="micro" :style="{ marginBottom:'20px', color: 'oklch(85% 0.14 ' + d.hue + ')' }">{{ q.kind.toUpperCase() }} · ITEM {{ String(idx+1).padStart(2,'0') }}</div>
        <h1 class="serif" :style="{ margin:0, fontSize:'var(--h2)', lineHeight:1.15, fontWeight:400, letterSpacing:'-0.015em', maxWidth:'760px' }">
          {{ q.prompt }}
        </h1>
        <p v-if="q.sublabel" :style="{ marginTop:'18px', color:'var(--text-mute)', fontSize:'var(--copy-md)', maxWidth:'540px' }">{{ q.sublabel }}</p>

        <div style="margin-top:40px">
          <LikertScale v-if="q.kind === 'likert'" :value="answers[q.id]" @update:value="setAnswer" :hue="d.hue"/>
          <ForcedChoice v-else-if="q.kind === 'choice'" :options="q.options" :value="answers[q.id]" @update:value="setAnswer" :hue="d.hue"/>
          <CalibrationSlider v-else :value="answers[q.id]" @update:value="setAnswer" :anchors="q.anchors" :hue="d.hue"/>
        </div>
      </div>
    </div>

    <div :style="{ position:'relative', zIndex:1, padding:'16px var(--page-pad-x)', borderTop:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px' }">
      <span class="mono desktop-only" style="font-size:11px; color: var(--text-dim)">⏎ submit · ← back</span>
      <button class="btn btn-primary" style="margin-left:auto" @click="next" :disabled="!answered">
        {{ idx < total-1 ? 'Next →' : 'See result →' }}
      </button>
    </div>
  </div>
</template>
