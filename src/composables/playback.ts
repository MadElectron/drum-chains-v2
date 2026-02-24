import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import type { Timeout } from '@/types'
import { playback as config } from '@/config'

export function play(): Timeout {
  const store = useStore()
  const { playback } = storeToRefs(store)

  const delay = computed<number>(() => ((60 / playback.value.tempo) * 1000) / config.sustainPoints)

  return setInterval(() => {
    if (playback.value.sustain === config.sustainPoints) {
      playback.value.sustain = 0
    } else {
      playback.value.sustain++
    }

    if (playback.value.sustain === 0) {
      store.playNext()
    }
  }, delay.value)
}

export function stop(interval: Timeout): void {
  clearInterval(interval)
}
