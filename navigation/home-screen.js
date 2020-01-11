import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Theme from '../theme'
import { getGameData } from '../components/game/game-saver'
import { getOptionsFromStorageAsync, setOptions } from '../classes/options-manager'
// import AudioContext from '../classes/audio/audio-context'

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
    const gameOptions = await getOptionsFromStorageAsync()

    if (gameOptions) {
      this.setState({
        gameOptions,
      })

      return gameOptions
    }

    return false
  }

  handleSoundPress = (audio) => {
    audio.playGameOverSound()
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
          backgroundColor={Theme.colors.jewel.blue}
          textColor="#ffffff"
          title="Resume Game"
          onPressFunc={() => {
            navigation.navigate('Game', { isNewGame: false, existingGameData, gameOptions })
          }}
        />
        <Theme.Button
          backgroundColor={Theme.colors.jewel.red}
          textColor="#ffffff"
          title="New Game"
          onPressFunc={() => {
            navigation.navigate('Game', { isNewGame: true, gameOptions })
          }}
        />
        <Theme.Button
          backgroundColor={Theme.colors.jewel.orange}
          textColor="#ffffff"
          title="High Scores"
          onPressFunc={() => {
            navigation.navigate('HighScores')
          }}
        />
        <Theme.Button
          backgroundColor={Theme.colors.jewel.green}
          textColor="#ffffff"
          title="Options"
          onPressFunc={() => {
            navigation.navigate('Options', { gameOptions })
          }}
        />
        <Theme.Button
          backgroundColor={Theme.colors.jewel.yellow}
          textColor="#ffffff"
          title="Tutorial"
          onPressFunc={() => {
            navigation.navigate('Tutorial', { cameFromHome: true })
          }}
        />
        {/* <AudioContext.Consumer>
          { (sounds) => (
            <Theme.Button
              backgroundColor={Theme.colors.jewel.yellow}
              textColor="#ffffff"
              title="Play a sound"
              onPressFunc={() => {
                this.handleSoundPress(sounds)
              }}
            />
          )
        }
        </AudioContext.Consumer> */}
      </View>
    )
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}
export default HomeScreen
