import React from 'react'
import { View } from 'react-native'
import Theme from '../theme'
import { getGameData } from '../components/game/game-saver'
import { getOptions, setOptions } from '../classes/options-manager'

class HomeScreen extends React.Component {
  constructor({ navigation }) {
    super()

    this.handleScreenFocus = navigation.addListener(
      'willFocus',

      async () => {
        await this.updateGameData()
        const options = await this.getGameOptions()
        if (!options.hasSeenTutorial) {
          options.hasSeenTutorial = true
          setOptions(options)
          navigation.navigate('Tutorial')
        }
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
    ready: false,
    canResumeGame: false,
    existingGameData: null,
    gameOptions: null,
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

  getGameOptions = async () => {
    const gameOptions = await getOptions()

    console.log('Have options', gameOptions)
    if (gameOptions) {
      this.setState({
        gameOptions,
      })

      return gameOptions
    }
  }

  render() {
    const { canResumeGame, existingGameData, gameOptions } = this.state
    const { navigation } = this.props

    return (
      <View style={{
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000',
      }}
      >
        <Theme.Button
          disabled={!canResumeGame}
          backgroundColor={Theme.colors.jewel.orange}
          textColor="#ffffff"
          title="Resume Game"
          onPressFunc={() => {
            navigation.navigate('Game', { isNewGame: false, existingGameData, gameOptions })
          }}
        />
        <Theme.Button
          backgroundColor={Theme.colors.jewel.orange}
          textColor="#ffffff"
          title="New Game"
          onPressFunc={() => {
            navigation.navigate('Game', { isNewGame: true, gameOptions })
          }}
        />
        <Theme.Button
          backgroundColor={Theme.colors.jewel.orange}
          textColor="#ffffff"
          title="Options"
          onPressFunc={() => {
            navigation.navigate('Options', { gameOptions })
          }}
        />
        <Theme.Button
          backgroundColor={Theme.colors.jewel.orange}
          textColor="#ffffff"
          title="Tutorial"
          onPressFunc={() => {
            navigation.navigate('Tutorial', { cameFromHome: true })
          }}
        />
      </View>
    )
  }
}
export default HomeScreen
