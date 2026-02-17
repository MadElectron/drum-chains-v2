import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Playback, DrumChain } from '@/types'
import { makeRandomChain } from '@/utils/hitModel'

export const usePlaybackStore = defineStore('playback', () => {
  const playback = reactive<Playback>({
    active: 0,
    isPlayed: false,
    tempo: 60,
  })

  const currentChain = ref<DrumChain | null>(null)
  const nextChain = ref<DrumChain | null>(null)

  const initChains = () => {
    currentChain.value = makeRandomChain(4, [1, 2])
    nextChain.value = makeRandomChain(4, [1, 2])
  }
  const popChain = () => {
    currentChain.value = nextChain.value
    nextChain.value = makeRandomChain(4, [1, 2])
  }

  const playNext = () => {
    if (currentChain.value) {
      playback.active = (playback.active + 1) % 4

      if (playback.active === 0) {
        popChain()
      }
    }
  }

  return { playback, currentChain, nextChain, initChains, popChain, playNext }
})
