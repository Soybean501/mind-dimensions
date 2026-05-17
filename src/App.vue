<script setup>
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()
const showSidebar = computed(() => route.name !== 'landing')
const menuOpen = ref(false)
watch(() => route.fullPath, () => { menuOpen.value = false })
</script>
<template>
  <div style="display:flex; height:100%; overflow:hidden; background: var(--bg-deep)">
    <template v-if="showSidebar">
      <button class="mobile-menu-btn" aria-label="Open menu" @click="menuOpen = true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="4" y1="7" x2="20" y2="7"/>
          <line x1="4" y1="12" x2="20" y2="12"/>
          <line x1="4" y1="17" x2="20" y2="17"/>
        </svg>
      </button>
      <div class="mobile-backdrop" :class="{ open: menuOpen }" @click="menuOpen = false"/>
      <Sidebar :class="{ open: menuOpen }" @navigate="menuOpen = false" />
    </template>
    <main style="flex:1; overflow:hidden; position:relative; min-width:0">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>
<style>
.fade-enter-active { transition: all 460ms cubic-bezier(.2,.7,.2,1); }
.fade-leave-active { transition: all 200ms ease; }
.fade-enter-from { opacity: 0; transform: translateY(12px) scale(0.995); filter: blur(4px); }
.fade-leave-to   { opacity: 0; transform: translateY(-4px); }
</style>
