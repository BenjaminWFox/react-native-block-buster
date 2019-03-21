import { AsyncStorage } from 'react-native'

export const setValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  }
  catch (error) {
    console.error('Error setting key with value', key, value, error)
  }
}

export const getValue = async (key) => {
  console.log('Get value', key)
  try {
    const value = await AsyncStorage.getItem(key)

    // const parsed = JSON.parse

    if (value !== null) {
      return JSON.parse(value)
    }

    return null
  }
  catch (error) {
    console.error('Error value for key', key)

    return false
  }
}
