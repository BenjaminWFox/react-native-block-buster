import React from 'react'
import PropTypes from 'prop-types'
import {
  View, SafeAreaView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import TileGrid from './tile-grid'
import ScoreManager from '../score-manager/score-manager'
import InfoTile from '../bottom-info/info-tile'
import InfoIcon from '../bottom-info/info-icon'
import { formatScore } from '../../classes/formatting'

class Game extends React.Component {
  state = {
    score: 0,
    highScore: null,
    points: 0,
    movesLeft: 0,
    lastTouch: {},
    confirmRestart: false,
  }

  componentDidMount = () => {
    this.handleUpdateHighScore()
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
      score, points, lastTouch, movesLeft, highScore, confirmRestart,
    } = this.state
    const { launchRestartModal } = this.props

    return (
      <>
        <TileGrid handleUpdateScore={this.handleUpdateScore} handleUpdateMoves={this.handleUpdateMoves} />
        <View style={{
          flex: 1,
          borderTopWidth: 2,
          borderColor: '#333',
          flexDirection: 'column',
        }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <ScoreManager.Scoreboard score={score} points={points} />
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            >
              <InfoTile title="Possible Moves" displayData={movesLeft} />
              <InfoTile title="High Score" displayData={highScore} />
              <InfoIcon title={<Ionicons name="md-refresh" size={40} />} onPress={launchRestartModal} />
              <InfoIcon title={<Ionicons name="md-menu" size={40} />} onPress={this.handleOpenMenu} />
            </View>
          </SafeAreaView>
        </View>
        <ScoreManager.PointPopper coords={lastTouch} points={points} />
      </>
    )
  }
}

export default Game
