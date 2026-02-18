import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Playback, DrumChain } from '@/types'
import { makeRandomChain } from '@/utils/hitModel'

export const useStore = defineStore('playback', () => {
  const playback = reactive<Playback>({
    active: 0,
    isPlayed: false,
    loop: false,
    count: 0,
    tempo: 60,
  })

  const currentChain = ref<DrumChain | null>(null)
  const nextChain = ref<DrumChain | null>(null)

  const setNextChain = (): void => {
    nextChain.value = playback.loop ? currentChain.value : makeRandomChain(4, [1, 2])
  }
  const initChains = (): void => {
    currentChain.value = makeRandomChain(4, [1, 2])
    setNextChain()
  }
  const popChain = (): void => {
    currentChain.value = nextChain.value
    setNextChain()
    playback.count++
  }
  const playNext = (): void => {
    if (currentChain.value) {
      playback.active = (playback.active + 1) % 4
      !playback.active && popChain()
    }
  }
  const toggleLoop = (): void => {
    playback.loop = !playback.loop
    setNextChain()
  }

  return { playback, currentChain, nextChain, initChains, popChain, playNext, toggleLoop }
})
