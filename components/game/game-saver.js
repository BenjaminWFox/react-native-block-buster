import { AsyncStorage } from 'react-native'

const TileDataKey = 'RNJTBS_TileData'
const ScoreKey = 'RNJTBS_Score'

export const setGameData = async (score, tileset) => {
  try {
    await AsyncStorage.setItem(TileDataKey, JSON.stringify(tileset))
    await AsyncStorage.setItem(ScoreKey, score.toString())
  }
  catch (error) {
    console.error('Error setting tileset', error)
  }
}

export const getGameData = async () => {
  try {
    const score = await AsyncStorage.getItem(ScoreKey)
    const tileDataRaw = await AsyncStorage.getItem(TileDataKey)

    if (score !== null && tileDataRaw !== null) {
      const tileData = JSON.parse(tileDataRaw)

      return {
        score: parseInt(score, 10),
        tileData,
      }
    }
    return null
  }
  catch (error) {
    console.error('Error getting tileset', error)
  }
}
