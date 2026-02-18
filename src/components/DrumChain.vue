<template>
  <div class="grid" :class="{ playing }">
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
import { computed } from 'vue'
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { separateLimb } from '@/utils/helpers'

const props = withDefaults(defineProps<{ chain: DrumChain | []; playing?: boolean }>(), {
  playing: false,
})

const arms = computed<LimbCombination[]>(() => separateLimb(props.chain as DrumChain, 'arm'))
const legs = computed<LimbCombination[]>(() => separateLimb(props.chain as DrumChain, 'leg'))

const store = useStore()
const { playback } = storeToRefs(store)

const isActive = (idx: number): boolean => props.playing && playback.value.active === idx
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, fr);

  &:not(.playing) {
    opacity: 0;
  }
}
</style>
