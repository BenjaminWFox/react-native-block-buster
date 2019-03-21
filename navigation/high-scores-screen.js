import React from 'react'
import { Text, View } from 'react-native'

class HighScoresScreen extends React.Component {
  state = {
    highScores: undefined,
  }

  componentDidMount = async () => {
    // get high scores
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#000000',
      }}
      >
        <Text>High Scores:</Text>
      </View>
    )
  }
}
export default HighScoresScreen
