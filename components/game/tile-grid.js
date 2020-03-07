import React from 'react'
import { View, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import TileManager from './tile-manager'

class TileGrid extends React.Component {
  constructor() {
    super()

    const screenWidth = Math.round(Dimensions.get('window').width)
    const screenHeight = Math.round(Dimensions.get('window').height)

    this.ROWS = 12
    this.TILES_PER_ROW = 10
    this.TILE_PADDING = 2
    this.WIDTH_SHRINK_VALUE = 1

    // If the screen ration as ~4:3 or greater, the width needs to shrink
    // a little to keep the score in view.
    if (screenWidth / screenHeight > 0.7) this.WIDTH_SHRINK_VALUE = 0.9
  }

  state = {
    tileEdge: undefined,
    gridWidth: undefined,
    gridHeight: undefined,
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const { tileEdge } = this.state
    const { displayMessage } = this.props

    if (tileEdge !== nextState.tileEdge) {
      return true
    }

    if (displayMessage !== nextProps.displayMessage) {
      return true
    }

    return false
  }

  handleLayout = (width) => {
    const tileEdge = Math.floor(width / this.TILES_PER_ROW * this.WIDTH_SHRINK_VALUE)
    const gridHeight = tileEdge * this.ROWS
    this.setState({ gridWidth: width, gridHeight, tileEdge })
  }

  render() {
    const { tileEdge, gridWidth, gridHeight } = this.state
    const {
      handleUpdateScore, handleUpdateGameMeta, isNewGame,
      tileData, difficulty, displayMessage, audioManager,
    } = this.props

    // console.log('Rerender?', displayMessage)

    return (
      <View
        style={{
          height: gridHeight,
          width: '100%',
        }}
        onLayout={(event) => {
          const {
            width,
          } = event.nativeEvent.layout
          this.handleLayout(width)
        }}
      >
        { gridWidth > 0 && gridHeight > 0 && displayMessage
          && displayMessage(gridWidth, gridHeight) }
        { tileEdge && tileEdge > 0 && (
        <TileManager
          audioManager={audioManager}
          isNewGame={isNewGame}
          difficulty={difficulty}
          tileData={tileData}
          tileEdge={tileEdge}
          tileRows={this.ROWS}
          tilesPerRow={this.TILES_PER_ROW}
          tilePadding={this.TILE_PADDING}
          gridWidth={gridWidth}
          gridHeight={gridHeight}
          handleUpdateScore={handleUpdateScore}
          handleUpdateGameMeta={handleUpdateGameMeta}
        />
        )
        }
      </View>
    )
  }
}

TileGrid.propTypes = {
  handleUpdateScore: PropTypes.func.isRequired,
  handleUpdateGameMeta: PropTypes.func.isRequired,
  isNewGame: PropTypes.bool.isRequired,
  difficulty: PropTypes.number.isRequired,
  audioManager: PropTypes.object.isRequired,
  displayMessage: PropTypes.func,
  tileData: PropTypes.array,
}

TileGrid.defaultProps = {
  tileData: undefined,
  displayMessage: null,
}

export default TileGrid
