<script setup>
import { LIKERT_LABELS } from '../../data/dimensions'
const props = defineProps({ value: Number, hue: { default: 220 } })
const emit = defineEmits(['update:value'])
</script>
<template>
  <div>
    <div style="display:grid; grid-template-columns:repeat(7,1fr); gap:10px">
      <button v-for="(label, i) in LIKERT_LABELS" :key="i"
        @click="emit('update:value', i)"
        :style="{
          cursor:'pointer',
          background: value === i ? 'oklch(82% 0.14 ' + hue + ' / 0.18)' : 'var(--bg-surface)',
          border: '1px solid ' + (value === i ? 'oklch(82% 0.14 ' + hue + ')' : 'var(--border)'),
          borderRadius: '12px', padding: '20px 12px 16px',
          color: 'var(--text)', transition: 'all 200ms ease',
          aspectRatio: '1 / 1.15',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'12px',
        }">
        <div :style="{
          width: (10 + Math.abs(i-3)*4) + 'px', height: (10 + Math.abs(i-3)*4) + 'px',
          borderRadius:'9999px',
          background: value === i ? 'oklch(85% 0.14 ' + hue + ')' : 'transparent',
          border: '1.5px solid ' + (value === i ? 'oklch(85% 0.14 ' + hue + ')' : 'var(--border-bright)'),
          boxShadow: value === i ? '0 0 16px 2px oklch(82% 0.14 ' + hue + ' / 0.6)' : 'none',
          transition: 'all 200ms ease',
        }" />
        <span :style="{ fontSize:'11px', lineHeight:1.2, textAlign:'center',
          color: value === i ? 'var(--text)' : 'var(--text-mute)',
          fontFamily:'var(--font-mono)', letterSpacing:'0.03em' }">{{ label }}</span>
      </button>
    </div>
    <div style="display:flex; justify-content:space-between; margin-top:14px; color: var(--text-dim)">
      <span class="micro">DISAGREE</span><span class="micro">NEUTRAL</span><span class="micro">AGREE</span>
    </div>
  </div>
</template>
