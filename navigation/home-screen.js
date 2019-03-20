import React from 'react'
import { View, Text } from 'react-native'
import Theme from '../theme'
import { getGameData } from '../components/game/game-saver'

class HomeScreen extends React.Component {
  constructor({ navigation }) {
    super()

    this.handleScreenFocus = navigation.addListener(
      'willFocus',
      async () => {
        await this.updateGameData()
      },
    )

    this.handleScreenBlur = navigation.addListener(
      'didBlur',
      () => {
        this.setState({
          canResumeGame: false,
          existingGameData: null,
        })
      },
    )
  }

  state = {
    canResumeGame: false,
    existingGameData: null,
  }

  componentWillUnmount = () => {
    this.handleScreenBlur.remove()
    this.handleScreenFocus.remove()
  }

  updateGameData = async () => {
    const gameData = await getGameData()

    if (gameData) {
      this.setState({
        canResumeGame: true,
        existingGameData: gameData,
      })
    }
  }

  render() {
    const { canResumeGame, existingGameData } = this.state
    const { navigation } = this.props

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Theme.Button
          disabled={!canResumeGame}
          backgroundColor={Theme.colors.jewel.orange}
          textColor="#ffffff"
          title="Resume Game"
          onPressFunc={() => {
            navigation.navigate('Game', { isNewGame: false, existingGameData })
          }}
        />
        <Theme.Button
          backgroundColor={Theme.colors.jewel.orange}
          textColor="#ffffff"
          title="New Game"
          onPressFunc={() => {
            navigation.navigate('Game', { isNewGame: true })
          }}
        />
        <Theme.Button
          backgroundColor={Theme.colors.jewel.orange}
          textColor="#ffffff"
          title="Options"
          onPressFunc={() => {
          }}
        />
        <Theme.Button
          backgroundColor={Theme.colors.jewel.orange}
          textColor="#ffffff"
          title="Tutorial"
          onPressFunc={() => {
          }}
        />
      </View>
    )
  }
}
export default HomeScreen
