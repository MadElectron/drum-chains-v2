<template>
  <div class="slider">
    <div class="span" :class="{ top }">
      <el-slider
        :model-value="position"
        :max="1000"
        :marks="marks"
        :show-tooltip="false"
        disabled
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { playback as config } from '@/config'

const store = useStore()
const { playback } = storeToRefs(store)

const position = computed<number>(() => {
  const tickValue = (playback.value.active / 4) * 1000
  const sustain = playback.value.sustain
  const offset = Math.ceil(config.sustainPoints / 2)

  return (tickValue + sustain + offset) % 1000
})
const marks = computed<Record<number, ''>>(() => ({
  125: '',
  375: '',
  625: '',
  875: '',
}))
const top = computed<boolean>(() => playback.value.count % 2 === 0)
</script>

<style scoped lang="scss">
.slider {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(5, 1fr);

  .span {
    grid-column: span 4;
    grid-column-start: 2;
    grid-column-end: 6;
    padding-block: 10px;
  }
}

::v-deep(.el-slider__button) {
  position: relative;
  background: transparent;
  border: none;

  &.hover {
    transform: unset !important;
  }

  &::before {
    content: '\25b3';
    text-rendering: auto;
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;

    .top & {
      transform: rotate(180deg);
      top: -14px;
    }
  }
}
</style>
