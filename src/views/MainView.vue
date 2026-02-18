<template>
  <el-container direction="vertical">
    <h1>Играй!</h1>

    <!-- Controls -->
    <PlaybackControls @play="onPlay" @stop="onStop" @loop="onLoop" @change="onChange" />

    <!-- Chains -->
    <div class="grid">
      <DrumChain v-if="currentChain" :chain="currentChain" :class="{ bottom }" playing />
      <DrumChain v-if="nextChain" :chain="nextChain" :class="{ next }" :style="style" />
    </div>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStore } from '@/stores'
import DrumChain from '@/components/DrumChain.vue'
import PlaybackControls from '@/components/PlaybackControls.vue'
import { storeToRefs } from 'pinia'
import type { Timeout } from '@/types'
import { play, stop } from '@/composables/playback'
import { playback as config } from '@/config'

const { min, max } = config.tempo

const store = useStore()
const { currentChain, nextChain, playback } = storeToRefs(store)

const next = computed<boolean>(() => playback.value.active === 3)
const bottom = computed<boolean>(() => playback.value.count % 2 !== 0)
const style = computed<{ animationDuration: string }>(() => ({
  animationDuration: `${60 / playback.value.tempo}s`,
}))

const playbackTimer = ref<Timeout | null>(null)

onMounted(() => {
  store.initChains()
})

const onPlay = (): void => {
  playbackTimer.value = play()
}
const onStop = (): void => {
  stop(playbackTimer.value as Timeout)
}
const onLoop = (): void => {
  store.toggleLoop()
}
const onChange = (value: number): void => {
  if (value >= min || value <= max) {
    playback.value.tempo = value
    stop(playbackTimer.value as Timeout)
    playbackTimer.value = play()
  }
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
}

.next {
  animation:
    1s ease-in fadeIn forwards,
    1s ease-in colorize;
}

.bottom {
  order: 2;
}
</style>
