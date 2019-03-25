import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import TileManager from './tile-manager'
import CenteredMessage from '../game-messages/centered-message'

class TileGrid extends React.Component {
  constructor() {
    super()

    this.ROWS = 12
    this.TILES_PER_ROW = 10
    this.TILE_PADDING = 2
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
    const tileEdge = Math.floor(width / this.TILES_PER_ROW)
    const gridHeight = tileEdge * this.ROWS
    this.setState({ gridWidth: width, gridHeight, tileEdge })
  }

  // handleHeightAssignment = (height) => {
  // }

  render() {
    const { tileEdge, gridWidth, gridHeight } = this.state
    const {
      handleUpdateScore, handleUpdateGameMeta, isNewGame, tileData, difficulty, displayMessage,
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
        { gridWidth > 0 && gridHeight > 0 && displayMessage && displayMessage(gridWidth, gridHeight) }
        { tileEdge && tileEdge > 0 && (
        <TileManager
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
}

export default TileGrid
