<template>
  <div class="char">{{ props.char }}</div>
</template>

<script setup lang="ts">
import type { LimbCombination } from '@/types'

const props = defineProps<{
  char: LimbCombination
}>()
</script>

<style scoped lang="scss">
.beat {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 0.5em;
}

.char {
  height: 4.5rem;
  line-height: 4.5rem;
  cursor: pointer;

  &.arm {
    font-size: 3rem;
    color: darkred;
  }

  &.leg {
    font-size: 4.5rem;
    color: green;
  }
}
</style>
