<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: String,
  width: {
    type: String,
    default: '16px'
  },
  height: {
    type: String,
    default: '16px'
  },
  color: {
    type: String,
    default: '#333'
  }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg :style="{ width, height }">
    <use :href="symbolId"
         :fill="color"></use>
  </svg>
</template>


<style scoped></style>