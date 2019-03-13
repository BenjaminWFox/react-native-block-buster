import React from 'react'
import { View } from 'react-native'
import Tile from './tile'

const getRandomInt = function getRandomInt(pMin, pMax) {
  const min = Math.ceil(pMin)
  const max = Math.floor(pMax)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

class Grid extends React.Component {
  constructor() {
    super()

    this.ROWS = 15
    this.TILES_PER_ROW = 10
    this.TILE_PADDING = 2

    this.COLORS = [
      '#00FF00',
      '#FFFF00',
      '#FF0009',
      '#0000FF',
    ]

    this.getColor = () => this.COLORS[getRandomInt(0, this.COLORS.length - 1)]
  }

  state = {
    ready: false,
    tileEdge: undefined,
  }

  handleLayout = (width) => {
    const tileEdge = Math.floor(width / this.TILES_PER_ROW)

    this.setState({ tileEdge }, () => {
      this.setState({ ready: true })
    })
  }

  setupAllTiles = () => {
    const { tileEdge } = this.state
    const tiles = []

    console.log('Set tiles...')

    for (let i = 0; i < this.ROWS * this.TILES_PER_ROW; i += 1) {
      tiles.push(<Tile key={i} edge={tileEdge} padding={this.TILE_PADDING} color={this.getColor()} />)
    }

    return tiles.map((tile) => tile)
  }

  render() {
    const { ready } = this.state

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
        }}
        onLayout={(event) => {
          console.log('Layout')
          const {
            width,
          } = event.nativeEvent.layout
          this.handleLayout(width)
        }}
      >
        { ready && this.setupAllTiles() }
      </View>
    )
  }
}

export default Grid
