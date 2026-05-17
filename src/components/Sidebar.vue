<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Wordmark from './atoms/Wordmark.vue'
import GlowDot from './atoms/GlowDot.vue'
import { DIMENSIONS } from '../data/dimensions'
import { useProfile } from '../stores/profile'

const route = useRoute()
const profile = useProfile()

const NAV = [
  { name: 'dashboard', label: 'Atlas' },
  { name: 'profile',   label: 'Full profile' },
]
const showDimList = computed(() => ['dimension','quiz','result'].includes(route.name))
</script>
<template>
  <aside style="width:240px; height:100%; border-right:1px solid var(--border); background: var(--bg-surface); display:flex; flex-direction:column; flex-shrink:0; z-index:5; position:relative">
    <div style="padding: 20px 22px; border-bottom: 1px solid var(--border)">
      <Wordmark small />
    </div>

    <div style="padding:14px 18px; border-bottom: 1px solid var(--border); display:flex; align-items:center; gap:10px">
      <div style="width:30px; height:30px; border-radius:9999px; background: radial-gradient(circle at 30% 30%, oklch(82% 0.13 220), oklch(50% 0.10 220)); display:flex; align-items:center; justify-content:center; font:500 11px var(--font-mono); color: var(--bg-deep)">{{ profile.initials || '—' }}</div>
      <div>
        <div style="font-size:13.5px">{{ profile.name || 'Guest' }}</div>
        <div class="mono" style="font-size:10px; color: var(--text-dim)">{{ profile.completed }}/{{ DIMENSIONS.length }} MAPPED</div>
      </div>
    </div>

    <nav style="padding:12px 10px; flex:1; overflow:auto">
      <RouterLink v-for="n in NAV" :key="n.name"
        :to="{ name: n.name }" custom v-slot="{ navigate, isActive }">
        <button @click="navigate" :style="{
          display:'flex', alignItems:'center', gap:'10px', width:'100%', textAlign:'left',
          padding:'7px 12px', borderRadius:'8px', border:0,
          background: isActive ? 'var(--bg-elev)' : 'transparent',
          color: isActive ? 'var(--text)' : 'var(--text-mute)',
          cursor:'pointer', fontSize:'13.5px',
          transition: 'background 160ms ease, color 160ms ease',
        }">
          <span :style="{
            width:'5px', height:'5px', borderRadius:'9999px',
            background: isActive ? 'var(--accent)' : 'var(--text-dim)',
            boxShadow: isActive ? '0 0 8px 1px var(--accent-glow)' : 'none',
          }"/>
          {{ n.label }}
        </button>
      </RouterLink>

      <div v-if="showDimList" style="margin-top:14px; padding:12px; background: var(--bg-elev); border-radius:10px">
        <div class="micro" style="margin-bottom:8px">SWITCH DIMENSION</div>
        <RouterLink v-for="d in DIMENSIONS" :key="d.id"
          :to="{ name: route.name, params: { id: d.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" style="display:flex; align-items:center; gap:8px; padding:6px 4px; width:100%; text-align:left; background:transparent; border:0; cursor:pointer; color: var(--text-mute); font-size:12.5px">
            <GlowDot :size="5" :hue="d.hue" :intensity="0.7"/>
            {{ d.name }}
          </button>
        </RouterLink>
      </div>
    </nav>
  </aside>
</template>
