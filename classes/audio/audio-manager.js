// import { Audio } from 'expo'
import AudioLoader from './audio-loader'
import { getRandomInt } from '../utilities'

AudioLoader.init()

const getStartingSound = () => {
  const { sounds } = AudioLoader
  const noteIndexes = sounds.length - 1
  const startSoundIndex = getRandomInt(0, noteIndexes)

  return sounds[startSoundIndex]
}

export const playSound = () => {
  const sound = getStartingSound()

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
