import { Audio } from 'expo'

/**
 * So expo doesn't let one sound play multiple times in sequence
 * - it restarts and cuts off the previous play
 *
 * This class allows N repeat instances of a given sound before cutting off the previous
 */
class RepeatableSound {
  constructor(assetRequired, numRepeats, callback) {
    this.assetRequired = assetRequired
    this.numRepeats = numRepeats
    this.sounds = [...Array(numRepeats)]
    this.playCount = 0
    this.callbackOnInit = callback
    this.isReady = false
    this.init()
  }

  init = async () => {
    this.sounds = await Promise.all(
      this.sounds.map(() => Audio.Sound.createAsync(this.assetRequired)),
    )
    this.isReady = true
    this.callbackOnInit()
  }

  playAsync = () => {
    if (this.isReady) {
      this.sounds[this.playCount].sound.playFromPositionAsync(100)
      this.playCount += 1
      if (this.playCount === this.numRepeats) {
        this.playCount = 0
      }
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

const getAllSounds = (callback) => [
  new RepeatableSound(c2, 5, callback),
  new RepeatableSound(d2, 5, callback),
  new RepeatableSound(e2, 5, callback),
  new RepeatableSound(f2, 5, callback),
  new RepeatableSound(g2, 5, callback),
  new RepeatableSound(a3, 5, callback),
  new RepeatableSound(b3, 5, callback),
  new RepeatableSound(c3, 5, callback),
  new RepeatableSound(d3, 5, callback),
  new RepeatableSound(e3, 5, callback),
  new RepeatableSound(f3, 5, callback),
  new RepeatableSound(g3, 5, callback),
  new RepeatableSound(a4, 5, callback),
  new RepeatableSound(b4, 5, callback),
  new RepeatableSound(c4, 5, callback),
]

class AudioLoader {
  constructor() {
    AudioLoader.ready = false
    AudioLoader.sounds = []
    AudioLoader.waitingOn = 0
    AudioLoader.gameOverSound = undefined
    AudioLoader.newHighScoreSound = undefined
  }
}

AudioLoader.reportFinished = () => {
  AudioLoader.waitingOn -= 1
  if (AudioLoader.waitingOn === 0) {
    AudioLoader.ready = true
  }
}

AudioLoader.constructGameSounds = () => {
  AudioLoader.gameOverSound = () => {
    const gos1 = AudioLoader.sounds[1]
    const gos2 = AudioLoader.sounds[2]
    const gos3 = AudioLoader.sounds[3]
    const gos4 = AudioLoader.sounds[5]
    if (AudioLoader.ready) {
      gos1.playAsync()
      gos2.playAsync()
      gos3.playAsync()
      gos4.playAsync()
    }
  }
  AudioLoader.newHighScoreSound = () => {
    const gos1 = AudioLoader.sounds[0]
    const gos2 = AudioLoader.sounds[2]
    const gos3 = AudioLoader.sounds[4]
    const gos4 = AudioLoader.sounds[7]
    if (AudioLoader.ready) {
      gos1.playAsync()
      gos2.playAsync()
      gos3.playAsync()
      gos4.playAsync()
    }
  }
}

AudioLoader.init = async () => {
  AudioLoader.sounds = await getAllSounds(AudioLoader.reportFinished)
  AudioLoader.waitingOn = AudioLoader.sounds.length

  AudioLoader.constructGameSounds()
}


export default AudioLoader
