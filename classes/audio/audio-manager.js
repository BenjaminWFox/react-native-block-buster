// import { Audio } from 'expo'
// import AudioLoader from './audio-loader'
import { getRandomInt } from '../utilities'
import AudioLoader from './audio-loader'

const DEFAULT_MAX_PLAYS = 4

export default class AudioManger {
  constructor() {
    this.sounds = undefined
    this.lastSoundPlayed = undefined
    this.ready = false
    this.soundAnimation = undefined
    this.soundAnimationTimesPlayed = 0
    this.soundAnimationMaxPlays = DEFAULT_MAX_PLAYS
  }

  async load() {
    const audioLoader = new AudioLoader()

    await audioLoader.init()

    this.sounds = audioLoader.sounds
    this.ready = true
  }

  playSound = async () => {
    if (this.soundAnimation) {
      this.soundAnimationTimesPlayed += 1
      if (this.soundAnimationTimesPlayed >= this.soundAnimationMaxPlays) {
        clearTimeout(this.soundAnimation)
        this.soundAnimation = undefined
        this.soundAnimationTimesPlayed = 0
        this.soundAnimationMaxPlays = DEFAULT_MAX_PLAYS
      }
    }
    let idx = this.lastSoundPlayed

    while (idx === this.lastSoundPlayed) {
      idx = getRandomInt(0, this.sounds.length - 1)
    }

    this.lastSoundPlayed = idx

    await this.sounds[idx].sound.playFromPositionAsync(100).then(() => {}).catch(() => {})
  }

  playGameOverSound = async () => {
    this.soundAnimation = setTimeout(this.playNewHighScoreSound, 150)
    this.playSound()
  }

  playNewHighScoreSound = async () => {
    this.soundAnimation = setTimeout(this.playNewHighScoreSound, 150)
    this.playSound()
  }

  playNSounds = async (n) => {
    this.soundAnimationMaxPLays = n
    this.soundAnimation = setTimeout(() => {
      this.playNSounds(n)
    }, 150)
    this.playSound()
  }
}
