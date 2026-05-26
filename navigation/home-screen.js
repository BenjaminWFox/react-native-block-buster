import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Theme from '../theme'
import { getGameData } from '../components/game/game-saver'
import { getOptionsFromStorageAsync, setOptions } from '../classes/options-manager'
import NewGameModal from '../components/modals/new-game-modal'

class HomeScreen extends React.Component {
  constructor({ navigation }) {
    super()
    this.handleScreenFocus = navigation.addListener(
      'focus',

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
      'blur',
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
    newGameModalVisible: false,
  }

  componentWillUnmount = () => {
    if (this.handleScreenBlur) this.handleScreenBlur()
    if (this.handleScreenFocus) this.handleScreenFocus()
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

  handleNewGamePress = () => {
    const { canResumeGame } = this.state

    if (canResumeGame) {
      this.setState({ newGameModalVisible: true })
    } else {
      this.startNewGame()
    }
  }

  handleNewGameOrNot = (willStart) => {
    this.setState({ newGameModalVisible: false })

    if (willStart) {
      this.startNewGame()
    }
  }

  startNewGame = () => {
    const { navigation } = this.props
    const { gameOptions } = this.state

    navigation.navigate('Game', { isNewGame: true, gameOptions })
  }

  handleSoundPress = (audio) => {
    audio.playGameOverSound()
  }

  render() {
    const { canResumeGame, existingGameData, gameOptions, newGameModalVisible } = this.state
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
          onPressFunc={this.handleNewGamePress}
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
        { newGameModalVisible && (
          <NewGameModal
            isVisible={newGameModalVisible}
            willStartNewGame={this.handleNewGameOrNot}
          />
        )}
      </View>
    )
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}
export default HomeScreen
