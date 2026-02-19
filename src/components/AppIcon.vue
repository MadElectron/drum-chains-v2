<template>
  <component :is="IconComponent" :style="style" />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

const props = withDefaults(defineProps<{ icon: string; size: number }>(), {
  size: 32,
})

const style = computed<{ width: string; height: string }>(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
}))

const IconComponent = computed(() =>
  defineAsyncComponent(() => import(`../assets/icons/${props.icon}.svg`)),
)
</script>

<style scoped lang="scss">
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
