<template>
  <div class="grid">
    <DrumChainElement class="arm" v-for="(el, idx) in arms" :key="idx" :char="el" />
    <DrumChainElement class="leg" v-for="(el, idx) in legs" :key="idx" :char="el" />
  </div>
</template>

<script setup lang="ts">
import type { DrumChain, LimbChar, LimbCombination } from '@/types'
import { computed } from 'vue'
import DrumChainElement from '@/components/DrumChainElement.vue'

const props = defineProps<{ chain: DrumChain | [] }>()

const arms = computed<LimbCombination[]>(() => separateLimb(props.chain as DrumChain, 'arm'))
const legs = computed<LimbCombination[]>(() => separateLimb(props.chain as DrumChain, 'leg'))

const separateLimb = (chain: DrumChain, limb: 'arm' | 'leg'): LimbCombination[] => {
  const idx = Number(limb === 'leg') as 0 | 1

  return chain.map((el) =>
    el[idx].reduce(
      (acc: LimbCombination, char: LimbChar) => (acc + char.toUpperCase()) as LimbCombination,
      '',
    ),
  )
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, fr);
}
</style>
