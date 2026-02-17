import type { DrumChain, LimbChar, LimbCombination } from '@/types'

/**
 * Separate drum chain into individual limb combinations.
 *
 * Given a drum chain, separate it into individual limb combinations.
 * The limb parameter should be either 'arm' or 'leg'.
 *
 * @param {DrumChain} chain - The drum chain to separate.
 * @param {'arm'|'leg'} limb - The limb to separate (either 'arm' or 'leg').
 * @returns {LimbCombination[]} - An array of individual limb combinations.
 */
export const separateLimb = (chain: DrumChain, limb: 'arm' | 'leg'): LimbCombination[] => {
  const idx = Number(limb === 'leg') as 0 | 1

  return chain.map((el) =>
    el[idx].reduce(
      (acc: LimbCombination, char: LimbChar) => (acc + char.toUpperCase()) as LimbCombination,
      '',
    ),
  )
}
