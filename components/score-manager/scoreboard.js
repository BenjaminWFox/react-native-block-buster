import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

const Scoreboard = function Scoreboard({ score }) {
  const formatScore = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return (
    <View style={{
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 2,
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

Scoreboard.propTypes = {
  score: PropTypes.number.isRequired,
}

export default Scoreboard
