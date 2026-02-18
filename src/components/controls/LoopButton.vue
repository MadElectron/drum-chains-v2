<template>
  <el-button text :class="{ off }">
    <font-awesome-icon icon="fa-solid fa-rotate" />
  </el-button>
</template>

<script setup lang="ts">
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const store = useStore()
const { playback } = storeToRefs(store)

const off = computed(() => !playback.value.loop)
</script>

<style scoped lang="scss">
.off :deep(path) {
  color: #ccc !important;
}
</style>
