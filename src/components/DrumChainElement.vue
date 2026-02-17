<template>
  <div class="char" :class="{ active, [charClass]: charClass }">{{ props.char }}</div>
</template>

<script setup lang="ts">
import type { LimbCombination } from '@/types'
import { computed, ref } from 'vue'

const props = defineProps<{
  char: LimbCombination
}>()

const active = ref(true)

const charClass = computed<string>(() => props.char && `char-${props.char.toLowerCase()}`)
</script>

<style scoped lang="scss">
.beat {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 0.5em;
}

.char {
  position: relative;
  height: 4.5rem;
  line-height: 4.5rem;
  text-align: center;
  cursor: pointer;

  &.arm {
    font-size: 3rem;
    color: darkred;
  }

  &.leg {
    font-size: 4.5rem;
    color: green;
  }

  &.active {
    &.char-l::after {
      content: 'L';
    }

    &.char-r::after {
      content: 'R';
    }

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      animation: 0.5s ease-out pulse;
    }
  }
}
</style>
