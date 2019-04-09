// import { Audio } from 'expo'
// import AudioLoader from './audio-loader'
import { getRandomInt } from '../utilities'
import AudioLoader from './audio-loader'

const DEFAULT_MAX_PLAYS = 4

export default class AudioManger {
  constructor() {
    this.sounds = undefined
    this.lastSoundIndexPlayed = undefined
    this.ready = false
    this.soundAnimation = undefined
    this.soundAnimationTimesPlayed = 0
    this.soundAnimationMaxPlays = DEFAULT_MAX_PLAYS

    this.staggeredSoundsTimer = undefined
  }

  async load() {
    const audioLoader = new AudioLoader()

    await audioLoader.init()

    this.sounds = audioLoader.sounds
    this.totalNotes = this.sounds.length
    this.ready = true
  }

  getNewSoundIndex = () => {
    let idx = this.lastSoundIndexPlayed

    while (idx === this.lastSoundIndexPlayed) {
      idx = getRandomInt(0, this.sounds.length - 1)
    }

    this.lastSoundIndexPlayed = idx

    return idx
  }

  playSound = (soundIndex) => {
    this.lastSoundIndexPlayed = soundIndex

    this.sounds[soundIndex].sound.playFromPositionAsync(100).then(() => {}).catch(() => { })
  }

  playNewSound = () => {
    this.playSound(this.getNewSoundIndex())
  }

  getHarmonyIndexes = (totalNotes) => {
    const harmonyIndexes = []

    for (let i = 0; i < totalNotes; i += 1) {
      if (!harmonyIndexes.length) {
        harmonyIndexes.push(this.getNextThirdIndex(this.lastSoundIndexPlayed))
      }
      else {
        harmonyIndexes.push(this.getNextThirdIndex(harmonyIndexes[i - 1]))
      }
    }

    return harmonyIndexes
  }

  getDisharmonyIndexes = (totalNotes) => {
    const harmonyIndexes = []

    for (let i = 0; i < totalNotes; i += 1) {
      if (!harmonyIndexes.length) {
        harmonyIndexes.push(this.getPreviousNoteIndex(this.lastSoundIndexPlayed))
      }
      else if (i % 2 === 0) {
        harmonyIndexes.push(this.getPreviousThirdIndex(harmonyIndexes[i - 1]))
      }
      else {
        harmonyIndexes.push(this.getPreviousNoteIndex(harmonyIndexes[i - 1]))
      }
    }

    console.log('Disharmony:', harmonyIndexes)

    return harmonyIndexes
  }

  playHarmonySequence = (totalNotes) => {
    this.playSoundsStaggered(this.getHarmonyIndexes(totalNotes))
  }

  playHarmonyChord = (totalNotes) => {
    this.playSounds(this.getHarmonyIndexes(totalNotes))
  }

  playDisharmonySequence = (totalNotes) => {
    this.playSoundsStaggered(this.getDisharmonyIndexes(totalNotes))
  }

  playDisharmonyChord = (totalNotes) => {
    this.playSounds(this.getDisharmonyIndexes(totalNotes))
  }

  playSounds = (soundIndexesArray) => {
    if (soundIndexesArray.length) {
      soundIndexesArray.forEach((soundIndex) => {
        this.playSound(soundIndex)
      })
    }
  }

  playSoundsStaggered = (soundIndexesArray) => {
    if (soundIndexesArray.length) {
      const soundIndexToPlay = soundIndexesArray.shift()
      this.playSound(soundIndexToPlay)
      setTimeout(() => {
        this.playSoundsStaggered(soundIndexesArray)
      }, 200)
    }
  }

  getNextThirdIndex = (startIndex) => {
    if (startIndex + 1 === this.totalNotes) {
      return 1
    }
    if (startIndex + 2 === this.totalNotes) {
      return 0
    }
    return startIndex + 2
  }

  getPreviousThirdIndex = (startIndex) => {
    if (startIndex - 1 < 0) {
      return this.totalNotes - 2
    }
    if (startIndex - 2 < 0) {
      return this.totalNotes - 1
    }
    return startIndex - 2
  }

  getPreviousNoteIndex = (startIndex) => {
    let index = startIndex
    if (!index) {
      index = this.getNewSoundIndex()
    }
    if (index - 1 < 0) {
      return this.totalNotes - 1
    }

    return index - 1
  }

  playGameOverSound = async () => {
    this.playDisharmonyChord(4)
  }

  playNewHighScoreSound = async () => {
    this.playHarmonyChord(3)
  }

  playNSounds = async (n) => {
    this.soundAnimationMaxPLays = n
    this.soundAnimation = setTimeout(() => {
      this.playNSounds(n)
    }, 150)
    this.playSound()
  }
}
