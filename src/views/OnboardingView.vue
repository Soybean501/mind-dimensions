<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ConstellationField from '../components/atoms/ConstellationField.vue'
import Wordmark from '../components/atoms/Wordmark.vue'
import CodeBadge from '../components/atoms/CodeBadge.vue'
import CalibrationSlider from '../components/quiz/CalibrationSlider.vue'
import { DIMENSIONS } from '../data/dimensions'
const router = useRouter()
const step = ref(0)
const cal = ref({ verbal: null, visual: null })
const total = 4
</script>
<template>
  <div style="position:relative; height:100%; overflow:auto">
    <div style="position:absolute; inset:0; z-index:0">
      <ConstellationField :density="0.8" />
    </div>
    <div style="position:relative; z-index:1; max-width:720px; margin:0 auto; padding:48px 32px 80px; min-height:100%">
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:64px">
        <Wordmark small />
        <div style="flex:1; height:1px; background: var(--border)"/>
        <span class="mono" style="font-size:11px; color: var(--text-dim)">
          STEP {{ String(step+1).padStart(2,'0') }} / {{ String(total).padStart(2,'0') }}
        </span>
      </div>

      <div v-if="step === 0" class="fade-up">
        <div class="micro" style="margin-bottom:24px">WELCOME</div>
        <h1 class="serif" style="font-size:56px; line-height:1; font-weight:400; margin:0; letter-spacing:-0.02em">
          Before we begin, a quick orientation.
        </h1>
        <p style="color: var(--text-mute); font-size:17px; line-height:1.6; margin-top:24px; max-width:560px">
          Cognitype isn't a personality test. We won't sort you into a type or hand you a label. Instead, we'll help you notice things about how your mind works that are usually invisible — even to you.
        </p>
        <p style="color: var(--text-mute); font-size:17px; line-height:1.6; margin-top:16px; max-width:560px">
          The whole atlas takes about <em class="serif" style="color: var(--text)">24 minutes</em>. You can do one dimension at a time. Everything stays on your device.
        </p>
        <div style="display:flex; gap:12px; margin-top:48px">
          <button class="btn btn-primary" @click="step = 1">Continue</button>
          <button class="btn btn-ghost" @click="router.push({ name: 'landing' })">Back</button>
        </div>
      </div>

      <div v-else-if="step === 1" class="fade-up">
        <div class="micro" style="margin-bottom:24px">CALIBRATION · 1 of 2</div>
        <h1 class="serif" style="font-size:46px; line-height:1.05; font-weight:400; margin:0; letter-spacing:-0.015em">
          Read this sentence silently. <em>How loud was the voice?</em>
        </h1>
        <p style="color: var(--text-mute); font-size:15px; margin-top:18px">
          This is a calibration moment, not a quiz. There is no right answer.
        </p>
        <div style="margin-top:56px">
          <CalibrationSlider :value="cal.verbal" @update:value="v => cal.verbal = v"
            :anchors="['Complete silence','A murmur','Full inner voice']" :hue="220"/>
        </div>
        <div style="display:flex; gap:12px; margin-top:56px">
          <button class="btn btn-primary" :disabled="cal.verbal == null" @click="step = 2">Continue</button>
          <button class="btn btn-ghost" @click="step = 0">Back</button>
        </div>
      </div>

      <div v-else-if="step === 2" class="fade-up">
        <div class="micro" style="margin-bottom:24px">CALIBRATION · 2 of 2</div>
        <h1 class="serif" style="font-size:46px; line-height:1.05; font-weight:400; margin:0; letter-spacing:-0.015em">
          Close your eyes. Picture an apple on a wooden table. <em>How vivid?</em>
        </h1>
        <p style="color: var(--text-mute); font-size:15px; margin-top:18px">
          Some people see a photographic apple. Some see nothing at all. Both are normal.
        </p>
        <div style="margin-top:56px">
          <CalibrationSlider :value="cal.visual" @update:value="v => cal.visual = v"
            :anchors="['No image','A dim impression','Sharply photographic']" :hue="330"/>
        </div>
        <div style="display:flex; gap:12px; margin-top:56px">
          <button class="btn btn-primary" :disabled="cal.visual == null" @click="step = 3">Continue</button>
          <button class="btn btn-ghost" @click="step = 1">Back</button>
        </div>
      </div>

      <div v-else class="fade-up">
        <div class="micro" style="margin-bottom:24px">READY</div>
        <h1 class="serif" style="font-size:56px; line-height:1; font-weight:400; margin:0; letter-spacing:-0.02em">
          Your atlas is empty. Let's draw the first star.
        </h1>
        <p style="color: var(--text-mute); font-size:17px; line-height:1.6; margin-top:24px; max-width:560px">
          We'll start with whichever dimension calls to you. Most people begin with Inner Speech or Visual Imagery — they're the most concrete.
        </p>
        <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:12px; margin-top:40px">
          <button v-for="d in DIMENSIONS" :key="d.id" class="card"
            @click="router.push({ name: 'dashboard' })"
            style="padding:18px 20px; text-align:left; display:flex; gap:14px; align-items:center; background: var(--bg-surface); cursor:pointer">
            <CodeBadge :code="d.code" :hue="d.hue"/>
            <div>
              <div class="serif" style="font-size:18px">{{ d.name }}</div>
              <div style="color: var(--text-mute); font-size:12px">{{ d.tagline }}</div>
            </div>
            <span class="mono" style="margin-left:auto; color: var(--text-dim); font-size:11px">~4m</span>
          </button>
        </div>
        <div style="margin-top:40px">
          <button class="btn btn-ghost" @click="router.push({ name: 'dashboard' })">Skip to dashboard →</button>
        </div>
      </div>
    </div>
  </div>
</template>
