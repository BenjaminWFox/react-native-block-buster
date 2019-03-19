import React from 'react'
import {
  StatusBar, View, NativeModules, Platform,
} from 'react-native'
import Game from './components/game/game'
import RestartGameModal from './components/modals/restart-game-modal'

class App extends React.Component {
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
      const { gameId } = this.state

      this.setState({
        gameId: gameId + 1,
      })
    }
  }

  handleOpenMenu = () => {
    console.log('Open menu!')
  }

  render() {
    const {
      sbHeight, gameId, restartModalVisible,
    } = this.state

    console.log('App rendering...')

    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <StatusBar barStyle="light-content" />
        <View style={{
          height: sbHeight + 5,
          borderBottomWidth: 5,
          borderColor: '#333',
        }}
        />
        <Game
          style={{ paddingVertical: 10 }}
          key={gameId}
          launchRestartModal={this.handleRestartModal}
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

export default App
