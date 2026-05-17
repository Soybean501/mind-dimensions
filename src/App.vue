<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()
const showSidebar = computed(() => route.name !== 'landing')
</script>
<template>
  <div style="display:flex; height:100vh; overflow:hidden; background: var(--bg-deep)">
    <Sidebar v-if="showSidebar" />
    <main style="flex:1; overflow:hidden; position:relative">
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
