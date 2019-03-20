import { AsyncStorage } from 'react-native'

const TileDataKey = 'RNJTBS_TileData'
const ScoreKey = 'RNJTBS_Score'
const DifficultyKey = 'RNJTBS_Difficulty'

const GameMetaKey = 'RNJTBS_GameMeta'

export const setGameData = async (difficulty, score, tileset) => {
  const meta = {
    tileData: tileset,
    score,
    difficulty,
  }
  try {
    await AsyncStorage.setItem(GameMetaKey, JSON.stringify(meta))
  }
  catch (error) {
    console.error('Error setting tileset', error)
  }
}

export const getGameData = async () => {
  try {
    const metaRAW = await AsyncStorage.getItem(GameMetaKey)

    if (metaRAW !== null) {
      const metaData = JSON.parse(metaRAW)

      return metaData
    }
    return null
  }
  catch (error) {
    console.error('Error getting tileset', error)
  }
}
