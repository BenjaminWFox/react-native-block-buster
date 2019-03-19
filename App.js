import React from 'react'
import {
  StatusBar, View, NativeModules, Platform, SafeAreaView,
} from 'react-native'
import Game from './components/game/game'
import ScoreManager from './components/score-manager/score-manager'
import InfoTile from './components/bottom-info/info-tile'
import { formatScore } from './classes/formatting'

class App extends React.Component {
  state = {
    sbHeight: 0,
    score: 0,
    highScore: null,
    points: 0,
    movesLeft: 0,
    lastTouch: {},
  }

  componentDidMount = () => {
    const { StatusBarManager } = NativeModules
    // ScoreManager.setHighScore(0)
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

  render() {
    const {
      sbHeight, score, points, lastTouch, movesLeft, highScore,
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
        <Game style={{ paddingVertical: 10 }} handleUpdateScore={this.handleUpdateScore} handleUpdateMoves={this.handleUpdateMoves} />
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
              <InfoTile title="Potential Moves" displayData={movesLeft} />
              <InfoTile title="High Score" displayData={highScore} />
              <InfoTile title="Restart" displayData="[O]" />
            </View>
          </SafeAreaView>
        </View>
        <ScoreManager.PointPopper coords={lastTouch} points={points} />
      </View>
    )
  }
}

export default App
