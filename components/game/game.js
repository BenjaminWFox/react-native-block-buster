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
import { setGameData } from './game-saver'

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
    const { isNewGame, existingGameData } = this.props

    if (isNewGame) {
      this.handleUpdateHighScore()
    }
    else {
      this.handleUpdateScore(existingGameData.score, { x: 0, y: 0 })
    }
  }

  handleUpdateHighScore = async () => {
    const { score, highScore } = this.state

    if (!highScore) {
      const storedHighScore = await ScoreManager.getHighScore()
      this.setState({ highScore: storedHighScore })
    }
    else if (score > highScore.replace(/,/g, '')) {
      ScoreManager.setHighScore(score)
      this.setState({ highScore: formatScore(score) })
    }
  }

  handleUpdateScore = (scoreIncrease, event, currentDifficulty) => {
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

  handleUpdateGameMeta = (currentDifficulty, moves, tiles) => {
    const { score } = this.state
    setGameData(currentDifficulty, score, tiles)
    this.setState({
      movesLeft: moves,
    })
  }

  render() {
    const {
      score, points, lastTouch, movesLeft, highScore, confirmRestart,
    } = this.state
    const {
      launchRestartModal, launchMenuScreen, options, isNewGame, existingGameData,
    } = this.props

    let tileData
    let { difficulty } = options

    // If loading an existing game, refernce that games difficulty rather than the current saved difficulty
    if (existingGameData) {
      tileData = existingGameData.tileData // eslint-disable-line
      difficulty = existingGameData.difficulty // eslint-disable-line
    }

    return (
      <>
        <TileGrid
          isNewGame={isNewGame}
          difficulty={difficulty}
          tileData={tileData}
          handleUpdateScore={this.handleUpdateScore}
          handleUpdateGameMeta={this.handleUpdateGameMeta}
        />
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
              <InfoIcon title={<Ionicons name="md-menu" size={40} />} onPress={launchMenuScreen} />
              <InfoTile title="Possible Moves" displayData={movesLeft} />
              <InfoTile title="High Score" displayData={highScore} />
              <InfoIcon title={<Ionicons name="md-refresh" size={40} />} onPress={launchRestartModal} />
            </View>
          </SafeAreaView>
        </View>
        <ScoreManager.PointPopper coords={lastTouch} points={points} />
      </>
    )
  }
}

Game.propTypes = {
  isNewGame: PropTypes.bool.isRequired,
}

export default Game
