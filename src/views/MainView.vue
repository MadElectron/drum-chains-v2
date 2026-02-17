<template>
  <el-container direction="vertical">
    <h1>Играй!</h1>
    <hr />
    <div class="grid">
      <DrumChain v-if="currentChain" :chain="currentChain" :class="{ bottom }" playing />
      <DrumChain v-if="nextChain" :chain="nextChain" :class="{ next }" :style="style" />
    </div>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { usePlaybackStore } from '@/stores/playback'
import DrumChain from '@/components/DrumChain.vue'
import { storeToRefs } from 'pinia'
import { play } from '@/composables/playback'

const store = usePlaybackStore()
const { currentChain, nextChain, playback } = storeToRefs(store)

const next = computed<boolean>(() => playback.value.active === 3)
const bottom = computed<boolean>(() => playback.value.count % 2 !== 0)
const style = computed<{ animationDuration: string }>(() => ({
  animationDuration: `${playback.value.tempo / 60}s`,
}))

// Test
// TODO: chain should start on play button press
onMounted(() => {
  store.initChains()
  play()
})
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
}

.next {
  animation:
    1s ease-in fadeIn,
    1s ease-in colorize;
}

.bottom {
  order: 2;
}
</style>
