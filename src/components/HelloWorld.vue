<script setup lang="ts">
import { ref, type Ref } from 'vue'

const props = defineProps<{
  msg: string
}>()

const count: Ref<number> = ref(0)

/**
 * Increments the value of the 'count' variable by 1.
 */
const increaseCount = (): void => {
  count.value++
}
/**
 * Decrements the value of the 'count' variable by 1.
 */
const decreaseCount = (): void => {
  count.value--
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <div class="card">
      <p>Count is {{ count }}</p>
      <button type="button" @click="increaseCount">+</button>
      <button type="button" @click="decreaseCount">-</button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test hot module replacement.
      </p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
