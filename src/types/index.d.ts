export type Timeout = ReturnType<typeof setInterval>

export type Playback = {
  active: number
  isPlayed: boolean
  count: number
  tempo: number
}

export type LimbChar = 'L' | 'R' | 'l' | 'r'
export type LimbCombination = 'L' | 'R' | 'LR' | ''
export type DrumHitArms = [] | ['l'] | ['r'] | ['l', 'r']
export type DrumHitLeg = [] | ['L'] | ['R'] | ['L', 'R']
export type DrumHit = [DrumHitArms, DrumHitLeg]
export type DrumChain = [DrumHit, DrumHit, DrumHit, DrumHit]
