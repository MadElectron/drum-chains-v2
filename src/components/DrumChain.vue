<template>
  <div class="grid">
    <DrumChainElement class="arm" v-for="(el, idx) in arms" :key="idx" :char="el" />
    <DrumChainElement class="leg" v-for="(el, idx) in legs" :key="idx" :char="el" />
  </div>
</template>

<script setup lang="ts">
import type { DrumChain, LimbCombination } from '@/types'
import { computed } from 'vue'
import DrumChainElement from '@/components/DrumChainElement.vue'

const props = defineProps<{ chain: DrumChain | [] }>()

const arms = computed<LimbCombination[]>(() =>
  props.chain.map((el) =>
    el[0].reduce(
      (acc: LimbCombination, char: 'l' | 'r') => (acc + char.toUpperCase()) as LimbCombination,
      '',
    ),
  ),
)
const legs = computed<LimbCombination[]>(() =>
  props.chain.map((el) =>
    el[1].reduce((acc: LimbCombination, char: 'L' | 'R') => (acc + char) as LimbCombination, ''),
  ),
)
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, fr);
}
</style>
