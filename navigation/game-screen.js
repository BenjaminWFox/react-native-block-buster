import React from 'react'
import {
  StatusBar, View, NativeModules, Platform,
} from 'react-native'
import Game from '../components/game/game'
import RestartGameModal from '../components/modals/restart-game-modal'

class GameScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    sbHeight: 0,
    gameId: 1,
    restartModalVisible: false,
  }

  componentDidMount = () => {
    const { StatusBarManager } = NativeModules

    const assignHeightAndroid = () => {
      this.setState({ sbHeight: StatusBar.currentHeight })
    }

    const assignHeightIOS = () => StatusBarManager.getHeight(({ height }) => {
      this.setState({ sbHeight: height })
    })

    if (Platform.OS === 'android') {
      assignHeightAndroid()
    }
    else {
      assignHeightIOS()
    }
  }

  handleRestartModal = () => {
    this.setState({
      restartModalVisible: true,
    })
  }

  handleRestartOrNot = (willRestart) => {
    this.setState({ restartModalVisible: false })
    if (willRestart) {
      const { navigation } = this.props

      const gameOptions = navigation.getParam('gameOptions', { difficulty: 'normal' })

      navigation.push('Game', { isNewGame: true, gameOptions })
      // const { gameId } = this.state

      // this.setState({
      //   gameId: gameId + 1,
      // })
    }
  }

  handleOpenMenu = (tileSet) => {
    const { navigation } = this.props

    navigation.navigate('Home')
  }

  render() {
    const {
      sbHeight, gameId, restartModalVisible,
    } = this.state
    const { navigation } = this.props
    const isNewGame = navigation.getParam('isNewGame', true)
    const existingGameData = navigation.getParam('existingGameData', undefined)
    const gameOptions = navigation.getParam('gameOptions', { difficulty: 'normal' })

    const currentDifficulty = existingGameData ? existingGameData.difficulty : gameOptions.difficulty

    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <View style={{
          height: sbHeight + 5,
          borderBottomWidth: 5,
          borderColor: '#333',
        }}
        />
        <Game
          style={{ paddingVertical: 10 }}
          key={gameId}
          options={gameOptions}
          currentDifficulty={currentDifficulty}
          isNewGame={isNewGame}
          existingGameData={existingGameData}
          launchRestartModal={this.handleRestartModal}
          launchMenuScreen={this.handleOpenMenu}
        />
        { restartModalVisible && (
          <RestartGameModal
            isVisible={restartModalVisible}
            willRestartGame={this.handleRestartOrNot}
          />
        )}
      </View>
    )
  }
}

export default GameScreen
