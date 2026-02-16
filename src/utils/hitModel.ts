import type { DrumHit } from '@/types'

/**
 * Contains key-value pairs for hit model
 * complexity => hit codes' array
 *
 *
 * Hit codes:
 *
 *  1 | 00 01 | l
 *  2 | 00 10 | r
 *  3 | 00 11 | lr
 *  4 | 01 00 | L
 *  5 | 01 01 | Ll
 *  6 | 01 10 | Lr
 *  7 | 01 11 | Llr
 *  8 | 10 00 | R
 *  9 | 10 01 | Rl
 * 10 | 10 10 | Rr
 * 11 | 10 11 | Rlr
 * 12 | 11 00 | LR
 * 13 | 11 01 | LRl
 * 14 | 11 10 | LRr
 * 15 | 11 11 | LRlr
 *
 *
 * Complexity levels:
 *
 * 1: Arm = 1,2
 * 2: Leg = 4,8
 * 3: 2 Arms = 3
 * 4: 2 Legs = 12
 * 5: Arm + Leg = 5,6,9,10
 * 6: 2 Arms + leg = 7,11
 * 7: Arm + 2 Legs = 13,14
 * 8: 2 Arms + 2 Legs = 15
 */
const COMPLEXITY_MAP = new Map<number, number[]>([
  [1, [1, 2]],
  [2, [4, 8]],
  [3, [3]],
  [4, [12]],
  [5, [5, 6, 9, 10]],
  [6, [7, 11]],
  [7, [13, 14]],
  [8, [15]],
])

/**
 * Decodes a hit code into a DrumHit object.
 *
 * The hit code is a number between 0 and 15 that represents
 * a combination of arms and legs to hit.
 * The decoding is done by converting the hit code to a binary string,
 * padding it to 4 characters with leading zeroes, and then splitting it
 * into an array of strings. Each string is then mapped to either 'R', 'L', 'r', or 'l'
 * depending on its value and position in the array. The resulting array is then filtered
 * to remove any null values, sorted, and returned as a DrumHit object.
 *
 * @param {number} hitCode - The hit code to decode.
 * @returns {DrumHit} The decoded DrumHit object.
 */
export const decodeHit = (hitCode: number): DrumHit => {
  const limbs = hitCode
    .toString(2)
    .padStart(4, '0')
    .split('')
    .map((value, idx) => (+value ? ['R', 'L', 'r', 'l'][idx] : null))

  return [[limbs[2], limbs[3]].sort(), [limbs[0], limbs[1]].sort()].map((subchain) =>
    subchain.filter(Boolean),
  ) as DrumHit
}

/**
 * Generates a random DrumHit object based on the provided complexity levels.
 *
 * The complexity levels are used to filter the available hit codes from the COMPLEXITY_MAP.
 * A random hit code is then selected from the available hit codes and decoded into a DrumHit object.
 *
 * @param {number[]} complexityLevels - The complexity levels to generate a DrumHit from.
 * @returns {DrumHit} The generated DrumHit object.
 */
export const makeHit = (complexityLevels: number[]): DrumHit => {
  const availableHits: number[] = [...COMPLEXITY_MAP]
    .filter(([key]) => complexityLevels.includes(key))
    .reduce((acc, [_key, hitsArr]) => acc.concat(hitsArr), [] as number[])

  const hitIndex: number = Math.floor(Math.random() * availableHits.length)
  const hitCode: number = availableHits[hitIndex] as number

  return decodeHit(hitCode)
}
