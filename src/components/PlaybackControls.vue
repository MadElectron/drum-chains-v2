<template>
  <div class="controls">
    <!-- Buttons -->
    <el-button-group>
      <!-- Play/pause -->
      <PlayPauseButton @click="onPlayPauseClick" />

      <!-- Loop -->
      <!-- <el-button text>
        <font-awesome-icon icon="fa-solid fa-rotate" />
      </el-button> -->
    </el-button-group>
    <!-- Input -->
    <el-form-item label="BPM:">
      <el-input-number v-model="tempo" :min="min" :max="max" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import PlayPauseButton from './controls/PlayPauseButton.vue'
import { playback as config } from '@/config'

const { min, max } = config.tempo

const emit = defineEmits<{
  (e: 'play'): void
  (e: 'stop'): void
  (e: 'change', value: number): void
}>()
const store = useStore()
const { playback } = storeToRefs(store)

const tempo = ref<number>(60)

const onPlayPauseClick = () => {
  playback.value.isPlayed ? emit('stop') : emit('play')
  playback.value.isPlayed = !playback.value.isPlayed
}

watch(tempo, (value: number) => {
  emit('change', value)
})
</script>

<style lang="scss" scoped>
$size: 32px;
$sizePadded: 36px;

@mixin buttonHover {
  background: #f1f1f1;
  transition: background 0.5s;
}

.controls {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 8px;

  :deep(*) {
    color: #000;
  }
}

.el-button {
  border-radius: 10px !important;
  font-size: 21px;

  &:hover {
    @include buttonHover;
  }
}

.el-form-item {
  margin: 0;

  :deep(*) {
    font-size: $size;
    line-height: $sizePadded;
  }
}

.el-input-number {
  height: $sizePadded;

  :deep(.el-input__wrapper) {
    box-shadow: none !important;
  }

  :deep(.el-input-number__decrease),
  :deep(.el-input-number__increase) {
    height: $size;
    width: $size;
    padding: 2px;
    border: none !important;
    border-radius: $size/2;
    background: none;

    &:hover,
    &:focus {
      @include buttonHover;
    }
  }

  :deep(.el-input__inner) {
    height: $sizePadded;

    &:hover,
    &:focus {
      box-shadow: 0 3px 0 #000 !important;
      transition: box-shadow 0.5s;
    }
  }
}
</style>
