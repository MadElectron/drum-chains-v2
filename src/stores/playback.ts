import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Playback, DrumChain } from '@/types'
import { makeHit } from '@/utils/hitModel'

export const usePlaybackStore = defineStore('playback', () => {
  const playback = reactive<Playback>({
    active: {
      col: 0,
      el: 0,
      chain: 0,
    },
    isPlayed: false,
    tempo: 60,
  })

  const currentChain = ref<DrumChain | null>(null)

  const setCurrentChain = () => {
    const chain: DrumChain = Array.from({ length: 4 }, () => makeHit([1, 2])) as DrumChain
    currentChain.value = chain
  }

  return { playback, currentChain, setCurrentChain }
})
