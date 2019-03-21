// import React from 'react'
import { AsyncStorage } from 'react-native'
import PointPopper from './point-popper'
import Scoreboard from './scoreboard'
import { formatScore } from '../../classes/formatting'
import { getValue, setValue, KEYS } from '../../classes/storage-api'
// import { difficulties } from '../../classes/options-manager'

const setHighScore = async (score, difficulty) => {
  console.log('SHS', score, difficulty)
  setValue(`${KEYS.HIGH_SCORES}_${difficulty}`, score)
}

const deleteHighScore = () => {
  // AsyncStorage.clear()
  AsyncStorage.removeItem(HighScoreKey)
}

const getHighScore = async (difficulty) => {
  const score = await getValue(`${KEYS.HIGH_SCORES}_${difficulty}`)

  if (score !== null) {
    console.log('GHS', score, difficulty)
    return formatScore(score)
  }

  setHighScore(0, difficulty)

  return 0
}

export default {
  PointPopper, Scoreboard, getHighScore, setHighScore, deleteHighScore,
}
