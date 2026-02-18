<template>
  <el-button text>
    <font-awesome-icon :icon="['fa-solid', icon]" />
  </el-button>
</template>

<script setup lang="ts">
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const store = useStore()
const { playback } = storeToRefs(store)

const icon = computed(() => {
  return playback.value.isPlayed ? 'fa-pause' : 'fa-play'
})
</script>
