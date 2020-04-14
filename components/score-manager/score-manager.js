// import React from 'react'
import { AsyncStorage } from 'react-native'
import PointPopper from './point-popper'
import Scoreboard from './scoreboard'
import formatScore from '../../classes/formatting'
import { getValue, setValue, KEYS } from '../../classes/storage-api'
// import { difficulties } from '../../classes/options-manager'

const setHighScore = async (score, difficulty) => {
  setValue(`${KEYS.HIGH_SCORES}_${difficulty}`, score)
}

const setHighBlast = async (blastScore, difficulty) => {
  setValue(`${KEYS.HIGH_BLAST}_${difficulty}`, blastScore)
}

const deleteHighScore = async (difficulty) => {
  await AsyncStorage.removeItem(`${KEYS.HIGH_SCORES}_${difficulty}`)

  return true
}

const deleteHighBlast = async (difficulty) => {
  await AsyncStorage.removeItem(`${KEYS.HIGH_BLAST}_${difficulty}`)

  return true
}

const getHighScore = async (difficulty) => {
  const score = await getValue(`${KEYS.HIGH_SCORES}_${difficulty}`)

  if (score !== null) {
    return formatScore(score)
  }

  setHighScore(0, difficulty)

  return 0
}

const getHighBlast = async (difficulty) => {
  const score = await getValue(`${KEYS.HIGH_BLAST}_${difficulty}`)

  if (score !== null) {
    return formatScore(score)
  }

  setHighBlast(0, difficulty)

  return 0
}

export default {
  PointPopper,
  Scoreboard,
  getHighScore,
  setHighScore,
  deleteHighScore,
  getHighBlast,
  setHighBlast,
  deleteHighBlast,
}
