<script setup>
const props = defineProps({
  size: { default: 8 }, hue: { default: 220 }, intensity: { default: 1 }, pulse: { default: false },
})
</script>
<template>
  <span :style="{
    display:'inline-block', width: size+'px', height: size+'px', borderRadius:'9999px',
    background: 'oklch(82% 0.13 ' + hue + ')',
    boxShadow: '0 0 ' + (size*1.5) + 'px 1px oklch(82% 0.13 ' + hue + ' / ' + (0.55*intensity) + '), 0 0 ' + (size*3) + 'px ' + (size*0.6) + 'px oklch(82% 0.13 ' + hue + ' / ' + (0.18*intensity) + ')',
    animation: pulse ? 'glowPulse 3.2s ease-in-out infinite' : undefined,
  }" />
</template>
