<template>
  <el-container direction="vertical">
    <h1>Играй!</h1>
    <DrumChain v-if="currentChain" :chain="currentChain" />
  </el-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePlaybackStore } from '@/stores/playback'
import DrumChain from '@/components/DrumChain.vue'
import { storeToRefs } from 'pinia'

const store = usePlaybackStore()
const { currentChain } = storeToRefs(store)
// Test
// TODO: chain should start on play button press
onMounted(() => {
  store.setCurrentChain()
})
</script>

<style lang="scss" scoped></style>
