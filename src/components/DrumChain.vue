<template>
  <div class="grid" :class="{ playing }">
    <!-- Arms -->
    <AppIcon icon="hand-drumstick" :size="48" />
    <DrumChainElement
      class="arm"
      :active="isActive(idx)"
      v-for="(el, idx) in arms"
      :key="idx"
      :char="el"
    />

    <!-- Legs -->
    <AppIcon icon="foot-stomp" :size="48" />
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

const isActive = (idx: number): boolean =>
  props.playing && playback.value.isPlayed && playback.value.active === idx
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, fr);
  align-items: center;
  justify-items: center;

  &:not(.playing) {
    opacity: 0;
  }
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: 3.5rem;
    width: 3.5rem;
  }
}
</style>
