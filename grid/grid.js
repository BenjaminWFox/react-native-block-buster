import React from 'react'
import { View } from 'react-native'
import TileManager from './tile-manager'

class Grid extends React.Component {
  constructor() {
    super()

    this.ROWS = 15
    this.TILES_PER_ROW = 10
    this.TILE_PADDING = 2
  }

  state = {
    tileEdge: undefined,
    gridWidth: undefined,
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const { tileEdge } = this.state

    if (tileEdge !== nextState.tileEdge) {
      return true
    }

    return false
  }

  handleLayout = (width) => {
    const tileEdge = Math.floor(width / this.TILES_PER_ROW)

    this.setState({ gridWidth: width, tileEdge })
  }

  render() {
    const { tileEdge, gridWidth } = this.state

    return (
      <View
        style={{
          flex: 1,
          width: '100%',
        }}
        onLayout={(event) => {
          const {
            width,
          } = event.nativeEvent.layout
          this.handleLayout(width)
        }}
      >
        { tileEdge && tileEdge > 0 && (
        <TileManager
          tileEdge={tileEdge}
          tileRows={this.ROWS}
          tilesPerRow={this.TILES_PER_ROW}
          tilePadding={this.TILE_PADDING}
          gridWidth={gridWidth}
        />
        )
        }
      </View>
    )
  }
}

export default Grid
