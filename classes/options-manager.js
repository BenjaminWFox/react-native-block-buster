import { getValue, setValue, KEYS } from './storage-api'

export const difficulties = {
  easy: 4,
  normal: 5,
  hard: 6,
  crazy: 7,
}

export const tileColors = [
  /* Jewel tones: */
  '#bb0043', // red
  '#342f9c', // blue
  '#fabb13', // yellow
  '#009975', // green // easy - 3
  '#e15500', // orange // normal - 4
  '#3499ac', // teal // hard - 5
  '#70336e', // purple // crazy - 6
]

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
