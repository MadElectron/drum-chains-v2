export type Timeout = ReturnType<typeof setInterval>

/**
 * @type Playback
 *
 * Describes drum chain playback process
 * @member active - active chain element index (0-3)
 * @member isPlayed - playback state (played/paused)
 * @member loop - loop state
 * @member count - played chains' counter
 * @member tempo - playback speed, bpm
 * @member sustain - hit 'sustain' inside a single hit
 */
export type Playback = {
  active: number
  isPlayed: boolean
  loop: boolean
  count: number
  tempo: number
  sustain: number
}

export type LimbChar = 'L' | 'R' | 'l' | 'r'
export type LimbCombination = 'L' | 'R' | 'LR' | ''
export type DrumHitArms = [] | ['l'] | ['r'] | ['l', 'r']
export type DrumHitLeg = [] | ['L'] | ['R'] | ['L', 'R']
export type DrumHit = [DrumHitArms, DrumHitLeg]
export type DrumChain = [DrumHit, DrumHit, DrumHit, DrumHit]
