// import { Audio } from 'expo'
// import AudioLoader from './audio-loader'
import { getRandomInt } from '../utilities'
import AudioLoader from './audio-loader'

export default class AudioManger {
  constructor() {
    this.sounds = undefined
    this.lastSoundPlayed = undefined
    this.ready = false
    this.soundAnimation = undefined
    this.soundAnimationTimesPlayed = 0
    this.soundAnimationMaxPlays = 4
  }

  async load() {
    const audioLoader = new AudioLoader()

    await audioLoader.init()

    console.log('AM done loading')

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
      }
    }
    let idx = this.lastSoundPlayed

    while (idx === this.lastSoundPlayed) {
      idx = getRandomInt(0, this.sounds.length - 1)
    }

    this.lastSoundPlayed = idx

    await this.sounds[idx].sound.playFromPositionAsync(0).then(() => {}).catch(() => {})
  }

  playGameOverSound = async () => {
    this.soundAnimation = setTimeout(this.playNewHighScoreSound, 150)
    this.playSound()
  }

  playNewHighScoreSound = async () => {
    this.soundAnimation = setTimeout(this.playNewHighScoreSound, 150)
    this.playSound()
  }
}

// AudioLoader.init()

// const getStartingSound = () => {
//   const { sounds } = AudioLoader
//   const noteIndexes = sounds.length - 1
//   const startSoundIndex = getRandomInt(0, noteIndexes)

//   return sounds[startSoundIndex]
// }
export const load = async () => {
  const audioLoader = new AudioLoader()

  await audioLoader.init()
}

export const playSound = () => {
  // const sound = getStartingSound()

  // sound.playAsync()
  console.log('PLAY SOUND...')
}

export const playGameOverSound = () => {
  // AudioLoader.gameOverSound()
  console.log('PLAY GO SOUND...')
}

export const playNewHighScoreSound = () => {
  // AudioLoader.newHighScoreSound()
  console.log('PLAY HS SOUND...')
}

export const playNSounds = (number) => {
  console.log('Play how many sounds?', number)
}
