import { usePlaybackStore } from '@/stores/playback'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export function play() {
  const store = usePlaybackStore()
  const { playback } = storeToRefs(store)

  const delay = computed<number>(() => (playback.value.tempo / 60) * 1000)

  setInterval(() => {
    store.playNext()
  }, delay.value)
}
