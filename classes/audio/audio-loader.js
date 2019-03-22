import { Audio } from 'expo'

/**
 * So expo doesn't let one sound play multiple times in sequence
 * - it restarts and cuts off the previous play
 *
 * This class allows N repeat instances of a given sound before cutting off the previous
 */
class RepeatableSound {
  constructor(assetRequired, numRepeats) {
    this.assetRequired = assetRequired
    this.numRepeats = numRepeats
    this.sounds = [...Array(numRepeats)]
    this.playCount = 0
    this.init()
  }

  init = async () => {
    this.sounds = await Promise.all(
      this.sounds.map(() => Audio.Sound.createAsync(this.assetRequired)),
    )
  }

  playAsync = () => {
    this.sounds[this.playCount].sound.playFromPositionAsync(100)
    this.playCount += 1
    if (this.playCount === this.numRepeats) {
      this.playCount = 0
    }
  }
}

const c2 = require('../../assets/sounds/c2.mp3')
const d2 = require('../../assets/sounds/d2.mp3')
const e2 = require('../../assets/sounds/e2.mp3')
const f2 = require('../../assets/sounds/f2.mp3')
const g2 = require('../../assets/sounds/g2.mp3')
const a3 = require('../../assets/sounds/a3.mp3')
const b3 = require('../../assets/sounds/b3.mp3')
const c3 = require('../../assets/sounds/c3.mp3')
const d3 = require('../../assets/sounds/d3.mp3')
const e3 = require('../../assets/sounds/e3.mp3')
const f3 = require('../../assets/sounds/f3.mp3')
const g3 = require('../../assets/sounds/g3.mp3')
const a4 = require('../../assets/sounds/a4.mp3')
const b4 = require('../../assets/sounds/b4.mp3')
const c4 = require('../../assets/sounds/c4.mp3')

const getAllSounds = () => [
  new RepeatableSound(c2, 5),
  new RepeatableSound(d2, 5),
  new RepeatableSound(e2, 5),
  new RepeatableSound(f2, 5),
  new RepeatableSound(g2, 5),
  new RepeatableSound(a3, 5),
  new RepeatableSound(b3, 5),
  new RepeatableSound(c3, 5),
  new RepeatableSound(d3, 5),
  new RepeatableSound(e3, 5),
  new RepeatableSound(f3, 5),
  new RepeatableSound(g3, 5),
  new RepeatableSound(a4, 5),
  new RepeatableSound(b4, 5),
  new RepeatableSound(c4, 5),
]

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
