<script setup>
import { ref } from 'vue'
import GlowDot from '../atoms/GlowDot.vue'
const props = defineProps({ value: { type: Number, default: null }, anchors: Array, hue: { default: 220 } })
const emit = defineEmits(['update:value'])
const trackRef = ref(null)
const hover = ref(null)
function setVal(e) {
  const rect = trackRef.value.getBoundingClientRect()
  const v = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
  emit('update:value', v)
}
function mm(e) {
  const rect = trackRef.value.getBoundingClientRect()
  hover.value = (e.clientX - rect.left) / rect.width
}
</script>
<template>
  <div>
    <div ref="trackRef"
      @mousemove="mm" @mouseleave="hover = null" @click="setVal"
      style="position:relative; height:80px; cursor:pointer; border-radius:9999px; background: var(--bg-elev); border:1px solid var(--border); overflow:hidden">
      <div :style="{ position:'absolute', inset:0, background: 'linear-gradient(90deg, transparent, oklch(82% 0.14 ' + hue + ' / 0.15))' }" />
      <div v-for="i in 21" :key="i"
        :style="{ position:'absolute', left: ((i-1)*5) + '%', top:0, bottom:0, width:'1px', background:'var(--border-bright)', opacity: (i-1)%4===0 ? 0.7 : 0.25 }"/>
      <div v-if="hover != null && value == null" :style="{ position:'absolute', left: (hover*100) + '%', top:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none' }">
        <GlowDot :size="14" :hue="hue" :intensity="0.5"/>
      </div>
      <div v-if="value != null" :style="{ position:'absolute', left: (value*100) + '%', top:'50%', transform:'translate(-50%,-50%)' }">
        <GlowDot :size="22" :hue="hue" :intensity="1.4" pulse />
      </div>
    </div>
    <div style="display:flex; justify-content:space-between; margin-top:14px">
      <span v-for="(a,i) in anchors" :key="i" class="micro"
        :style="{ textAlign: i===0?'left':i===anchors.length-1?'right':'center', flex:1 }">{{ a }}</span>
    </div>
  </div>
</template>
