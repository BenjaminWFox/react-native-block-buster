import { getValue, setValue, KEYS } from './storage-api'

export const difficulties = {
  easy: 4,
  normal: 5,
  hard: 6,
  crazy: 7,
}

const defaultOptions = {
  difficulty: difficulties.normal,
  hasSeenTutorial: false,
}

export const setOptions = async (options) => {
  setValue(KEYS.OPTIONS, options)
}


export const getOptions = async () => {
  const options = await getValue(KEYS.OPTIONS)
  if (options) {
    return options
  }

  setOptions(defaultOptions)

  return defaultOptions
}
