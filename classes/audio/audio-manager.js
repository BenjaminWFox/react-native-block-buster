import { Audio } from 'expo-av'
// import AudioLoader from './audio-loader'
import { getRandomInt } from '../utilities'
import AudioLoader from './audio-loader'
import { getCurrentOptionsSync } from '../options-manager'

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
    this.audioLoader = new AudioLoader()
    this.totalNotes = this.audioLoader.rawSoundPaths.length
    this.maxSoundIndex = this.totalNotes - 1
  }

  // async load() {
  //   // const audioLoader = new AudioLoader()

  //   // await audioLoader.init()

  //   // this.sounds = audioLoader.sounds
  //   // this.totalNotes = this.sounds.length
  //   // this.ready = true
  // }

  // eslint-disable-next-line
  get canPlaySound() {
    return getCurrentOptionsSync().sound
  }

  getLastSoundIndexPlayed = () => {
    const oldSoundIndex = this.lastSoundIndexPlayed

    if (!this.lastSoundIndexPlayed) {
      this.lastSoundIndexPlayed = this.getNewSoundIndex()
    }
    else {
      while (oldSoundIndex === this.lastSoundIndexPlayed) {
        this.lastSoundIndexPlayed = this.getNewSoundIndex()
      }
    }

    console.log('last index played was:', this.lastSoundIndexPlayed)

    return this.lastSoundIndexPlayed
  }

  getNewSoundIndex = () => {
    let idx = this.lastSoundIndexPlayed

    while (idx === this.lastSoundIndexPlayed) {
      idx = getRandomInt(0, this.maxSoundIndex)
    }

    this.lastSoundIndexPlayed = idx

    console.log('Have new sound index', idx)

    return idx
  }

  playSound = (name, sound) => {
    Audio.Sound.createAsync(
      sound,
      { shouldPlay: true },
    ).then((res) => {
      res.sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.didJustFinish) return
        console.log(`Unloading ${name}`)
        res.sound.unloadAsync().catch(() => {})
      })
    }).catch((error) => {})
  }

  playSoundAtThisOrNewIndex = (pIdx = undefined) => {
    if (this.canPlaySound) {
      const index = pIdx || getRandomInt(0, this.maxSoundIndex)
      const sound = this.audioLoader.rawSoundPaths[index]

      this.playSound(`index${index}`, sound)
    }
  }

  playNewSound = () => {
    this.playSound(this.getNewSoundIndex())
  }

  getHarmonyIndexes = (totalNotes) => {
    const harmonyIndexes = []

    for (let i = 0; i < totalNotes; i += 1) {
      if (!harmonyIndexes.length) {
        harmonyIndexes.push(this.getNextThirdIndex(this.getLastSoundIndexPlayed()))
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

    return harmonyIndexes
  }

  playHarmonySequence = (totalNotes) => {
    this.playSoundsStaggered(this.getHarmonyIndexes(totalNotes))
  }

  playHarmonyChord = (totalNotes) => {
    if (this.canPlaySound) {
      this.getHarmonyIndexes(totalNotes).forEach((idx) => {
        this.playSoundAtThisOrNewIndex(idx)
      })
    }
  }

  playDisharmonySequence = (totalNotes) => {
    this.playSoundsStaggered(this.getDisharmonyIndexes(totalNotes))
  }

  playDisharmonyChord = (totalNotes) => {
    if (this.canPlaySound) {
      this.playSounds(this.getDisharmonyIndexes(totalNotes))
    }
  }

  playSounds = (soundIndexesArray) => {
    if (soundIndexesArray.length) {
      soundIndexesArray.forEach((soundIndex) => {
        this.playSoundAtThisOrNewIndex(soundIndex)
      })
    }
  }

  playSoundsStaggered = (soundIndexesArray) => {
    if (soundIndexesArray.length) {
      const soundIndexToPlay = soundIndexesArray.shift()
      this.playSound(soundIndexToPlay)
      setTimeout(() => {
        this.playSoundsStaggered(soundIndexesArray)
      }, 100)
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
