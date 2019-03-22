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
import {
  getNewHighScoreMessage, getGameOverMessage, highScoreSurpassedEvent, gameOverEvent,
} from './game-events'

class Game extends React.Component {
  state = {
    score: 0,
    highScore: null,
    surpassedHighScore: false,
    points: 0,
    movesLeft: 0,
    lastTouch: {},
    displayMessage: null,
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
    const { currentDifficulty } = this.props
    const { score, highScore, surpassedHighScore } = this.state
    const numericHighScore = (highScore && highScore.replace(/,/g, '')) || 0
    const didSurpass = !surpassedHighScore && numericHighScore > 0 && score > numericHighScore

    if (didSurpass) {
      highScoreSurpassedEvent()

      this.setState({
        displayMessage: this.wrapMessageDelivery(getNewHighScoreMessage),
      })
    }

    if (!highScore) {
      const storedHighScore = await ScoreManager.getHighScore(currentDifficulty)
      this.setState({ highScore: storedHighScore })
    }
    else if (score > numericHighScore) {
      ScoreManager.setHighScore(score, currentDifficulty)
      this.setState({
        highScore: formatScore(score),
        surpassedHighScore: true,
      })
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

  wrapMessageDelivery = (messageDeliveryFunc) => messageDeliveryFunc

  handleUpdateGameMeta = (currentDifficulty, moves, tiles) => {
    const { score } = this.state
    setGameData(currentDifficulty, score, tiles)

    if (moves === 0) {
      gameOverEvent()

      this.setState({
        displayMessage: this.wrapMessageDelivery(getGameOverMessage),
      })
    }

    this.setState({
      movesLeft: moves,
    })
  }

  handleUpdateDisplayMessage = (message) => {
    this.setState({ displayMessage: message })
  }

  render() {
    const {
      score, points, lastTouch, movesLeft, highScore, displayMessage,
    } = this.state
    const {
      launchRestartModal, launchMenuScreen, isNewGame, existingGameData, currentDifficulty,
    } = this.props

    const { tileData } = existingGameData || {}

    return (
      <>
        <TileGrid
          isNewGame={isNewGame}
          difficulty={currentDifficulty}
          tileData={tileData}
          handleUpdateScore={this.handleUpdateScore}
          handleUpdateGameMeta={this.handleUpdateGameMeta}
          displayMessage={displayMessage}
          messageCompleteCallback={this.handleUpdateDisplayMessage}
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
  existingGameData: PropTypes.object,
  currentDifficulty: PropTypes.number.isRequired,
  launchRestartModal: PropTypes.func.isRequired,
  launchMenuScreen: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
}

Game.defaultProps = {
  existingGameData: {},
}

export default Game
