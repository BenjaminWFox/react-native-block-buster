import React from 'react'
import {
  StatusBar, View, NativeModules, Platform, SafeAreaView, Modal, Text, TouchableHighlight,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Game from './components/game/game'
import ScoreManager from './components/score-manager/score-manager'
import InfoTile from './components/bottom-info/info-tile'
import InfoIcon from './components/bottom-info/info-icon'
import { formatScore } from './classes/formatting'

class App extends React.Component {
  state = {
    sbHeight: 0,
    score: 0,
    highScore: null,
    points: 0,
    movesLeft: 0,
    lastTouch: {},
    gameId: 1,
    confirmRestart: false,
  }

  componentDidMount = () => {
    const { StatusBarManager } = NativeModules
    const assignHeightAndroid = () => {
      this.setState({ sbHeight: StatusBar.currentHeight })
    }

    // ScoreManager.setHighScore(0)

    const assignHeightIOS = () => StatusBarManager.getHeight(({ height }) => {
      this.setState({ sbHeight: height })
    })
    if (Platform.OS === 'android') {
      assignHeightAndroid()
    }
    else {
      assignHeightIOS()
    }

    this.handleUpdateHighScore()
  }

  componentDidUpdate = () => {

  }

  handleUpdateHighScore = async () => {
    const { score, highScore } = this.state
    console.log('Score', score, highScore)
    if (!highScore) {
      const storedHighScore = await ScoreManager.getHighScore()
      this.setState({ highScore: storedHighScore })
    }
    else if (score > highScore.replace(/,/g, '')) {
      ScoreManager.setHighScore(score)
      this.setState({ highScore: formatScore(score) })
    }
  }

  handleUpdateScore = (scoreIncrease, event) => {
    const { score } = this.state
    this.setState({
      score: Math.ceil(score + scoreIncrease),
      points: scoreIncrease,
      lastTouch: {
        x: event.pageX,
        y: event.pageY,
      },
    }, () => {
      this.handleUpdateHighScore()
    })
  }

  handleUpdateMoves = (moves) => {
    this.setState({
      movesLeft: moves,
    })
  }

  handleRestartGame = () => {
    this.setState({
      confirmRestart: true,
    })
  }

  forRealRestartGame = () => {
    const { gameId } = this.state

    this.setState({
      score: 0,
      points: 0,
      movesLeft: 0,
      lastTouch: {},
      gameId: gameId + 1,
      confirmRestart: false,
    })
  }

  handleOpenMenu = () => {
    console.log('Open menu!')
  }

  render() {
    const {
      sbHeight, score, points, lastTouch, movesLeft, highScore, gameId, confirmRestart,
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
        <Game style={{ paddingVertical: 10 }} key={gameId} handleUpdateScore={this.handleUpdateScore} handleUpdateMoves={this.handleUpdateMoves} />
        <View style={{
          flex: 1,
          borderTopWidth: 2,
          borderColor: '#333',
          flexDirection: 'column',
        }}
        >
          <ScoreManager.Scoreboard score={score} points={points} />
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            >
              <InfoTile title="Possible Moves" displayData={movesLeft} />
              <InfoTile title="High Score" displayData={highScore} />
              <InfoIcon title={<Ionicons name="md-refresh" size={40} />} onPress={this.handleRestartGame} />
              <InfoIcon title={<Ionicons name="md-menu" size={40} />} onPress={this.handleOpenMenu} />
            </View>
          </SafeAreaView>
        </View>
        <ScoreManager.PointPopper coords={lastTouch} points={points} />
        { confirmRestart && (
        <Modal onRequestClose={() => {}} animationType="slide" transparent visible={confirmRestart} style={{ }}>
          <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              width: '50%',
              backgroundColor: '#fff',
            }}
            >
              <Text>Are you really sure??</Text>
              <TouchableHighlight style={{ height: 50, justifyContent: 'center', alignItems: 'center' }} onPress={this.forRealRestartGame}><Text>Yes</Text></TouchableHighlight>
              <TouchableHighlight
                style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  this.setState({ confirmRestart: false })
                }}
              >
                <Text>No</Text>

              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        )}
      </View>
    )
  }
}

export default App
