import { Audio } from 'expo'

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

class AudioLoader {
  constructor() {
    this.rawSoundPaths = [c2, d2, e2, f2, g2, a3, b3, c3, d3, e3, f3, g3, a4, b4, c4]
    this.completedLoads = 0
    this.complete = false
    this.sounds = []
    this.initialPBStatus = {
      shouldPlay: false,
    }
  }

  async init() {
    await Promise.all(this.rawSoundPaths.map((soundPath) => this.loadSound(soundPath)))
  }

  async loadSound(soundPath) {
    return Audio.Sound.createAsync(soundPath, this.initialPBStatus, null, false)
      .then((soundObject) => {
        this.sounds.push(soundObject)
        this.loadCompleted()
      })
      .catch(() => {
        this.loadCompleted()
      })
  }

  loadCompleted() {
    this.completedLoads += 1
    if (this.completedLoads === this.rawSoundPaths.length) {
      this.complete = true
    }
  }
}

export default AudioLoader
