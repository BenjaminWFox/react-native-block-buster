import { Audio } from 'expo-av';

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
  }

  init = async () => {
    this.sounds = await Promise.all(
      this.sounds.map(() => Audio.Sound.createAsync(this.assetRequired, {}, null, false)),
    )
    this.isReady = true
    this.callbackOnInit()
    return true
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

const getNewRepeatableSound = async (sound, num, callback, forcedAwaitObj, objLetter) => {
  console.log('Forced await', objLetter)
  const nrm = new RepeatableSound(sound, num, callback)
  await nrm.init()
  return nrm
}

const getAllSounds = async (callback) => {
  console.log('Starting get all sounds...')
  const a = await getNewRepeatableSound(c2, 5, callback, null, 'null')
  const b = await getNewRepeatableSound(d2, 5, callback, a, 'a')
  const c = await getNewRepeatableSound(e2, 5, callback, b, 'b')
  const d = await getNewRepeatableSound(f2, 5, callback, c, 'c')
  const e = await getNewRepeatableSound(g2, 5, callback, d, 'd')
  const f = await getNewRepeatableSound(a3, 5, callback, e, 'e')
  const g = await getNewRepeatableSound(b3, 5, callback, f, 'f')
  const h = await getNewRepeatableSound(c3, 5, callback, g, 'g')
  const i = await getNewRepeatableSound(d3, 5, callback, h, 'h')
  const j = await getNewRepeatableSound(e3, 5, callback, i, 'i')
  const k = await getNewRepeatableSound(f3, 5, callback, j, 'j')
  const l = await getNewRepeatableSound(g3, 5, callback, k, 'k')
  const m = await getNewRepeatableSound(a4, 5, callback, l, 'l')
  const n = await getNewRepeatableSound(b4, 5, callback, m, 'm')
  const o = await getNewRepeatableSound(c4, 5, callback, n, 'n')

  return [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o]
}

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
