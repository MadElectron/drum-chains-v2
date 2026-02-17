<template>
  <div class="grid">
    <!-- TODO: Hand-with-drumstick icon -->
    <DrumChainElement
      class="arm"
      :active="isActive(idx)"
      v-for="(el, idx) in arms"
      :key="idx"
      :char="el"
    />
    <!-- TODO: Foot icon -->
    <DrumChainElement
      class="leg"
      :active="isActive(idx)"
      v-for="(el, idx) in legs"
      :key="idx"
      :char="el"
    />
  </div>
</template>

<script setup lang="ts">
import type { DrumChain, LimbCombination } from '@/types'
import { computed, onMounted } from 'vue'
import DrumChainElement from '@/components/DrumChainElement.vue'
import { usePlaybackStore } from '@/stores/playback'
import { storeToRefs } from 'pinia'
import { separateLimb } from '@/utils/helpers'
import { play } from '@/composables/playback'

const props = defineProps<{ chain: DrumChain | [] }>()

const arms = computed<LimbCombination[]>(() => separateLimb(props.chain as DrumChain, 'arm'))
const legs = computed<LimbCombination[]>(() => separateLimb(props.chain as DrumChain, 'leg'))

const store = usePlaybackStore()
const { playback } = storeToRefs(store)

const isActive = (idx: number): boolean => playback.value.active === idx

onMounted(() => {
  play()
})
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, fr);
}
</style>
