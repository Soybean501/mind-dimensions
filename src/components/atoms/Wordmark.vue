<script setup>
defineProps({ small: Boolean })
</script>
<template>
  <div style="display:flex; align-items:center; gap:10px">
    <svg :width="small?22:26" :height="small?22:26" viewBox="0 0 26 26">
      <defs>
        <radialGradient id="wm-g" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="oklch(85% 0.14 220)"/>
          <stop offset="100%" stop-color="oklch(85% 0.14 220 / 0)"/>
        </radialGradient>
      </defs>
      <circle cx="13" cy="13" r="13" fill="url(#wm-g)" opacity="0.6"/>
      <circle cx="13" cy="13" r="2.4" fill="oklch(92% 0.14 220)"/>
      <circle cx="4" cy="8" r="1.1" fill="var(--text)" opacity="0.5"/>
      <circle cx="22" cy="6" r="0.9" fill="var(--text)" opacity="0.4"/>
      <circle cx="20" cy="20" r="1.2" fill="var(--text)" opacity="0.55"/>
      <circle cx="6" cy="20" r="0.8" fill="var(--text)" opacity="0.35"/>
    </svg>
    <span class="serif" :style="{ fontSize: (small?16:18) + 'px', letterSpacing:'-0.005em' }">Cognitype</span>
  </div>
</template>
