<script setup>
import { ref } from 'vue'
import { useTweaks } from '../composables/useTweaks'
const t = useTweaks()
const open = ref(true)
</script>
<template>
  <div v-if="open" style="position:fixed; bottom:20px; right:20px; width:260px; background: var(--bg-elev); border:1px solid var(--border); border-radius:14px; padding:16px; z-index:100; box-shadow: 0 18px 40px -16px rgba(0,0,0,0.7); font-size:13px">
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px">
      <div class="micro">TWEAKS</div>
      <button @click="open = false" style="background:none; border:0; color:var(--text-mute); cursor:pointer; font-size:14px">✕</button>
    </div>

    <div class="micro" style="margin-bottom:8px">COLOR THEME</div>
    <div style="display:flex; gap:4px; background: var(--bg-deep); padding:3px; border-radius:9999px; margin-bottom:14px">
      <button v-for="opt in ['cosmic','dark','light']" :key="opt"
        @click="t.theme = opt"
        :style="{ flex:1, padding:'6px 10px', borderRadius:'9999px', border:0, cursor:'pointer', fontSize:'11.5px', textTransform:'capitalize',
          background: t.theme === opt ? 'var(--text)' : 'transparent',
          color: t.theme === opt ? 'var(--bg-deep)' : 'var(--text-mute)' }">
        {{ opt }}
      </button>
    </div>

    <div class="micro" style="margin-bottom:8px">DENSITY</div>
    <div style="display:flex; gap:4px; background: var(--bg-deep); padding:3px; border-radius:9999px; margin-bottom:14px">
      <button v-for="opt in ['compact','regular']" :key="opt"
        @click="t.density = opt"
        :style="{ flex:1, padding:'6px 10px', borderRadius:'9999px', border:0, cursor:'pointer', fontSize:'11.5px', textTransform:'capitalize',
          background: t.density === opt ? 'var(--text)' : 'transparent',
          color: t.density === opt ? 'var(--bg-deep)' : 'var(--text-mute)' }">
        {{ opt }}
      </button>
    </div>

    <div class="micro" style="margin-bottom:8px">SHOW SIDEBAR</div>
    <button @click="t.showNav = !t.showNav"
      :style="{ width:'100%', padding:'8px 12px', borderRadius:'8px', border:'1px solid var(--border)', background: t.showNav ? 'var(--accent-soft)' : 'transparent', color: 'var(--text)', cursor:'pointer', fontSize:'12px' }">
      {{ t.showNav ? 'On' : 'Off' }}
    </button>
  </div>
  <button v-else @click="open = true"
    style="position:fixed; bottom:20px; right:20px; padding:8px 14px; border-radius:9999px; background: var(--bg-elev); border:1px solid var(--border); color: var(--text-mute); font-size:12px; cursor:pointer; z-index:100; font-family: var(--font-mono); letter-spacing:0.06em">
    TWEAKS
  </button>
</template>
