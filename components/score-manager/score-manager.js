// import React from 'react'
import { AsyncStorage } from 'react-native'
import PointPopper from './point-popper'
import Scoreboard from './scoreboard'
import { formatScore } from '../../classes/formatting'

const HighScoreKey = 'RNJTBS_HighScore'

const setHighScore = async (score) => {
  try {
    await AsyncStorage.setItem(HighScoreKey, score.toString())
  }
  catch (error) {
    console.error('Error setting high score', error)
  }
}

const getHighScore = async () => {
  try {
    const value = await AsyncStorage.getItem(HighScoreKey)
    if (value !== null) {
      return formatScore(value)
    }

    setHighScore(0)

    return 0
  }
  catch (error) {
    console.log('Error getting high score', error)
    return false
  }
}

export default {
  PointPopper, Scoreboard, getHighScore, setHighScore,
}
