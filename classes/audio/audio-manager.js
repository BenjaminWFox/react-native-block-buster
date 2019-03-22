// import { Audio } from 'expo'
import AudioLoader from './audio-loader'
import { getRandomInt } from '../utilities'

AudioLoader.init()

const getStartingSound = () => {
  const { sounds } = AudioLoader
  const noteIndexes = sounds.length - 1
  const startSoundIndex = getRandomInt(0, noteIndexes)

  // console.log('Have sounds from AudioLoader', sounds)

  return sounds[startSoundIndex]
}

export const playSound = () => {
  const sound = getStartingSound()

  // console.log('Got a sound?', sound)

  sound.playAsync()
}

export const playGameOverSound = () => {
  AudioLoader.gameOverSound()
}

export const playNewHighScoreSound = () => {
  AudioLoader.newHighScoreSound()
}

export const playNSounds = (number) => {
  console.log('Play how many sounds?', number)
}
