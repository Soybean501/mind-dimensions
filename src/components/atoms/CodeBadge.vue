<script setup>
const props = defineProps({ code: String, hue: { default: 220 }, size: { default: 'md' } })
const px = props.size === 'sm' ? 24 : props.size === 'lg' ? 44 : 32
const fs = props.size === 'sm' ? 9 : props.size === 'lg' ? 13 : 11
</script>
<template>
  <span :style="{
    display:'inline-flex', alignItems:'center', justifyContent:'center',
    width: px + 'px', height: px + 'px', borderRadius: '8px',
    background: 'oklch(82% 0.14 ' + hue + ' / 0.12)',
    border: '1px solid oklch(82% 0.14 ' + hue + ' / 0.35)',
    color: 'oklch(90% 0.14 ' + hue + ')',
    fontFamily:'var(--font-mono)', fontSize: fs + 'px',
    letterSpacing:'0.06em', fontWeight: 500,
  }">{{ code }}</span>
</template>
