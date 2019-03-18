import React from 'react'
import { View, Text } from 'react-native'

const ScoreBoard = function ScoreBoard({ score }) {
  const formatScore = (score) => score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return (
    <View style={{
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 5,
      borderColor: '#333',
    }}
    >
      <Text style={{
        color: '#bb0043',
        fontSize: 40,
        fontWeight: 'bold',
      }}
      >
        {formatScore(score)}
      </Text>
    </View>
  )
}

export default ScoreBoard
