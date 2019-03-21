import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { formatScore } from '../../classes/formatting'
import Theme from '../../theme'

const Scoreboard = function Scoreboard({ score }) {
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      // borderBottomWidth: 2,
      // borderColor: '#333',
    }}
    >
      <Theme.Text style={{
        color: '#bb0043',
        fontSize: 40,
      }}
      >
        {formatScore(score)}
      </Theme.Text>
    </View>
  )
}

Scoreboard.propTypes = {
  score: PropTypes.number.isRequired,
}

export default Scoreboard
