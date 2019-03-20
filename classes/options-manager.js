import { AsyncStorage } from 'react-native'

const OptionsKey = 'RNJTBS_Options'

export const difficulties = {
  easy: 4,
  normal: 5,
  hard: 6,
  crazy: 7,
}

const defaultOptions = {
  difficulty: difficulties.normal,
}

export const setOptions = async (options) => {
  try {
    await AsyncStorage.setItem(OptionsKey, JSON.stringify(options))
  }
  catch (error) {
    console.error('Error setting high score', error)
  }
}

export const getOptions = async () => {
  try {
    const value = await AsyncStorage.getItem(OptionsKey)
    if (value !== null) {
      return JSON.parse(value)
    }

    setOptions(defaultOptions)

    return defaultOptions
  }
  catch (error) {
    console.error('Error getting high score', error)
    return false
  }
}
