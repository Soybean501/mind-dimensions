<script setup>
import { LIKERT_LABELS } from '../../data/dimensions'
const props = defineProps({ value: Number, hue: { default: 220 } })
const emit = defineEmits(['update:value'])
</script>
<template>
  <div>
    <div class="likert-grid">
      <button v-for="(label, i) in LIKERT_LABELS" :key="i"
        @click="emit('update:value', i)"
        class="likert-btn"
        :style="{
          background: value === i ? 'oklch(82% 0.14 ' + hue + ' / 0.18)' : 'var(--bg-surface)',
          border: '1px solid ' + (value === i ? 'oklch(82% 0.14 ' + hue + ')' : 'var(--border)'),
          color: 'var(--text)',
        }">
        <div :style="{
          width: (10 + Math.abs(i-3)*4) + 'px', height: (10 + Math.abs(i-3)*4) + 'px',
          borderRadius:'9999px',
          background: value === i ? 'oklch(85% 0.14 ' + hue + ')' : 'transparent',
          border: '1.5px solid ' + (value === i ? 'oklch(85% 0.14 ' + hue + ')' : 'var(--border-bright)'),
          boxShadow: value === i ? '0 0 16px 2px oklch(82% 0.14 ' + hue + ' / 0.6)' : 'none',
          transition: 'all 200ms ease',
        }" />
        <span class="likert-label" :style="{
          color: value === i ? 'var(--text)' : 'var(--text-mute)',
        }">{{ label }}</span>
      </button>
    </div>
    <div style="display:flex; justify-content:space-between; margin-top:14px; color: var(--text-dim)">
      <span class="micro">DISAGREE</span><span class="micro">NEUTRAL</span><span class="micro">AGREE</span>
    </div>
  </div>
</template>
<style scoped>
.likert-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}
.likert-btn {
  cursor: pointer;
  border-radius: 12px;
  padding: 20px 12px 16px;
  transition: all 200ms ease;
  aspect-ratio: 1 / 1.15;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.likert-label {
  font-size: 11px;
  line-height: 1.2;
  text-align: center;
  font-family: var(--font-mono);
  letter-spacing: 0.03em;
}
@media (max-width: 768px) {
  .likert-grid { gap: 4px; }
  .likert-btn { padding: 14px 4px 10px; gap: 8px; aspect-ratio: 1 / 1.35; }
  .likert-label { font-size: 9px; letter-spacing: 0; }
}
</style>
