import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import type { Timeout } from '@/types'

export function play(): Timeout {
  const store = useStore()
  const { playback } = storeToRefs(store)

  const delay = computed<number>(() => (60 / playback.value.tempo) * 1000)

  return setInterval(() => {
    store.playNext()
  }, delay.value)
}

export function stop(interval: Timeout): void {
  clearInterval(interval)
}
