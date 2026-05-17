<script setup>
import { ref } from 'vue'
import { useStarfield } from '../../composables/useStarfield'

const props = defineProps({ density: { default: 1 }, lines: { default: true } })
const canvas = ref(null)
useStarfield(canvas, { density: props.density, lines: props.lines })
</script>
<template>
  <canvas ref="canvas" style="width:100%;height:100%;display:block" />
</template>
