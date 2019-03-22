import { Audio } from 'expo'

class RepeatableSound {
  constructor(assetRequired, numRepeats) {
    this.assetRequired = assetRequired
    this.numRepeats = numRepeats
    this.sounds = [...Array(numRepeats)]
    this.playCount = 0
    this.init()
  }

  init = async () => {
    this.sounds = await Promise.all(this.sounds.map(() => Audio.Sound.createAsync(this.assetRequired)))

    // console.log('Have our sounds', this.sounds)
  }

  playAsync = () => {
    this.sounds[this.playCount].sound.playFromPositionAsync(100)
    this.playCount += 1
    if (this.playCount === this.numRepeats) {
      this.playCount = 0
    }
  }
}

const c2 = require('../../assets/sounds/C2.mp3')
const d2 = require('../../assets/sounds/D2.mp3')
const e2 = require('../../assets/sounds/E2.mp3')
const f2 = require('../../assets/sounds/F2.mp3')
const g2 = require('../../assets/sounds/G2.mp3')
const a3 = require('../../assets/sounds/A3.mp3')
const b3 = require('../../assets/sounds/B3.mp3')
const c3 = require('../../assets/sounds/C3.mp3')

const getAllSounds = () => [
  new RepeatableSound(c2, 5),
  new RepeatableSound(d2, 5),
  new RepeatableSound(e2, 5),
  new RepeatableSound(f2, 5),
  new RepeatableSound(g2, 5),
  new RepeatableSound(a3, 5),
  new RepeatableSound(b3, 5),
  new RepeatableSound(c3, 5),
]

// const getAllSounds = async () => Promise.all([
//   Audio.Sound.createAsync(require('../../assets/sounds/C2.mp3'), { shouldPlay: true, positionMillis: 100 }),
//   Audio.Sound.createAsync(require('../../assets/sounds/D2.mp3'), { shouldPlay: true, positionMillis: 100 }),
//   Audio.Sound.createAsync(require('../../assets/sounds/E2.mp3'), { shouldPlay: true, positionMillis: 100 }),
//   Audio.Sound.createAsync(require('../../assets/sounds/F2.mp3'), { shouldPlay: true, positionMillis: 100 }),
//   Audio.Sound.createAsync(require('../../assets/sounds/G2.mp3'), { shouldPlay: true, positionMillis: 100 }),
//   Audio.Sound.createAsync(require('../../assets/sounds/A3.mp3'), { shouldPlay: true, positionMillis: 100 }),
//   Audio.Sound.createAsync(require('../../assets/sounds/B3.mp3'), { shouldPlay: true, positionMillis: 100 }),
//   Audio.Sound.createAsync(require('../../assets/sounds/C3.mp3'), { shouldPlay: true, positionMillis: 100 }),
// ])

class AudioLoader {
  constructor() {
    AudioLoader.sounds = []
  }
}

AudioLoader.init = async () => {
  // await Audio.setIsEnabledAsync(true)

  // await Audio.setAudioModeAsync({
  //   playsInSilentModeIOS: false,
  //   allowsRecordingIOS: false,
  //   playThroughEarpieceAndroid: true,
  //   interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  //   shouldDuckAndroid: false,
  //   interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
  // })

  AudioLoader.sounds = await getAllSounds()
}

// const c2 = await Audio.Sound.createAsync(require('../../assets/sounds/C2.mp3'))
// const d2 = await Audio.Sound.createAsync(require('../../assets/sounds/D2.mp3'))
// const e2 = await Audio.Sound.createAsync(require('../../assets/sounds/E2.mp3'))
// const f2 = await Audio.Sound.createAsync(require('../../assets/sounds/F2.mp3'))
// const g2 = await Audio.Sound.createAsync(require('../../assets/sounds/G2.mp3'))
// const a3 = await Audio.Sound.createAsync(require('../../assets/sounds/A3.mp3'))
// const b3 = await Audio.Sound.createAsync(require('../../assets/sounds/B3.mp3'))
// const c3 = await Audio.Sound.createAsync(require('../../assets/sounds/C3.mp3'))


// const HarpSounds = [c2, d2, e2, f2, g2, a3, b3, c3]
// const sounds = async () => getAllSounds

export default AudioLoader
