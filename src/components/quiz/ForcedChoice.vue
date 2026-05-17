<script setup>
import GlowDot from '../atoms/GlowDot.vue'
const props = defineProps({ options: Array, value: String, hue: { default: 220 } })
const emit = defineEmits(['update:value'])
</script>
<template>
  <div style="display:grid; gap:12px">
    <button v-for="(o, i) in options" :key="o.id"
      @click="emit('update:value', o.id)"
      :style="{
        cursor:'pointer', display:'flex', alignItems:'center', gap:'18px', textAlign:'left',
        padding: '20px 24px',
        background: value === o.id ? 'oklch(82% 0.14 ' + hue + ' / 0.10)' : 'var(--bg-surface)',
        border: '1px solid ' + (value === o.id ? 'oklch(82% 0.14 ' + hue + ' / 0.6)' : 'var(--border)'),
        borderRadius:'14px', color: 'var(--text)',
        transition: 'all 200ms ease', fontSize:'17px',
      }">
      <div :style="{
        width:'36px', height:'36px', borderRadius:'9999px',
        border: '1px solid ' + (value === o.id ? 'oklch(82% 0.14 ' + hue + ')' : 'var(--border-bright)'),
        display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily: 'var(--font-mono)', fontSize: '13px',
        color: value === o.id ? 'oklch(90% 0.14 ' + hue + ')' : 'var(--text-mute)',
        background: value === o.id ? 'oklch(82% 0.14 ' + hue + ' / 0.15)' : 'transparent',
        flexShrink: 0,
      }">{{ String.fromCharCode(65+i) }}</div>
      <span style="flex:1">{{ o.label }}</span>
      <GlowDot v-if="value === o.id" :size="8" :hue="hue"/>
    </button>
  </div>
</template>
