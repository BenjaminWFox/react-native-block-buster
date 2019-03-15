import React from 'react'
import { View, Animated } from 'react-native'
import PropTypes from 'prop-types'
import Tile from './tile'

const COLORS = [
  '#00FF00', // GREEN
  '#FF00FF', // FUSCIA
  '#FF0000', // RED
  '#0000FF', // BLUE
]

const getRandomInt = function getRandomInt(pMin, pMax) {
  const min = Math.ceil(pMin)
  const max = Math.floor(pMax)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getColorsForIndexes = function getColorsForIndexes(numColors) {
  const colorArray = []

  for (let i = 0; i < numColors; i += 1) {
    colorArray.push(COLORS[getRandomInt(0, COLORS.length - 1)])
  }

  return colorArray
}

const getColumnsArray = function getColumnsArray(numColumns) {
  const arr = []

  for (let i = 0; i < numColumns; i += 1) {
    arr.push([])
  }

  return arr
}

class TileManager extends React.Component {
  constructor({
    tileEdge, tileRows, tilesPerRow, tilePadding, gridWidth,
  }) {
    super()

    this.tileEdge = tileEdge
    this.tileRows = tileRows
    this.columns = getColumnsArray(tilesPerRow)
    this.tilesPerRow = tilesPerRow
    this.tilePadding = tilePadding
    this.gridWidth = gridWidth
    this.burstTiles = []
    this.readyTiles = 0
    this.colors = getColorsForIndexes(tileRows * tilesPerRow)
    this.state = {
      tiles: [],
      tileElements: [],
      tilesCreated: false,
    }
    this.getRandomColor = () => COLORS[getRandomInt(0, COLORS.length - 1)]
    this.updateQueue = []

    Tile.init(this.tileEdge, this.tilePadding, this.handleTileClick, this.handleTileRespawn)
  }

  componentDidMount = () => {
    this.setupAllTiles()
  }

  setupAllTiles = () => {
    const { tiles, tilesCreated } = this.state
    const centeringOffset = (this.gridWidth - (this.tileEdge * this.tilesPerRow)) / 2
    const tempTiles = tiles
    let row = -1
    let column = 0

    if (this.tileEdge > 0 && !tilesCreated && !this.burstTiles.length) {
      for (let i = 0; i < this.tileRows * this.tilesPerRow; i += 1) {
        column = 0 + (i % this.tilesPerRow)
        row = (i % this.tilesPerRow) === 0 ? row + 1 : row

        const x = (this.tileEdge * column) + centeringOffset
        const y = (this.tileEdge * row)

        const tile = this.getNewTile(i, x, y, Tile.states.stationary, this.colors[i])

        this.columns[column].push(tile)

        tempTiles.push(tile)
      }

      this.updateTiles(tempTiles)
    }

    console.log('Finished setup')
  }

  getNewTile(index, x, y, tileState, color = undefined) {
    const thisColor = color || this.getRandomColor()

    return new Tile(index, x, y, tileState, thisColor)
  }

  updateTiles = (tilesArray, index) => {
    this.setState({
      tiles: tilesArray,
      tileElements: tilesArray.map((tile) => tile.element),
    })
  }

  respawnAllTiles = () => {
    const { tiles } = this.state
    let tempTiles = tiles

    for (let i = 0; i < this.burstTiles.length; i += 1) {
      tempTiles = this.respawnTile(this.burstTiles[i], tempTiles)
    }

    this.updateTiles(tempTiles)
    this.burstTiles = []
    this.readyTiles = 0
  }

  respawnTile = (tileIndex, tiles) => {
    const operatingIndex = tileIndex
    const currentIndex = tileIndex
    const currentTile = tiles[currentIndex]
    const tempTiles = tiles

    console.log('COMPARE...before:', currentTile)
    tempTiles[currentIndex] = this.getNewTile(currentIndex, currentTile.x, currentTile.y, Tile.states.stationary, this.getRandomColor())
    console.log('COMPARE...after:', tempTiles[currentIndex])
    // while (operatingIndex > this.tilesPerRow) {
    //   const tileAbove = tempTiles[operatingIndex - this.tilesPerRow]
    //   // console.log('OI', operatingIndex, tileAbove.color)
    //   console.log('Setting Y for Index', tileAbove.y, operatingIndex)
    //   tempTiles[operatingIndex] = this.getNewTile(operatingIndex, tileAbove.x, tileAbove.y + this.tileEdge, Tile.states.stationary, tileAbove.color)
    //   operatingIndex -= this.tilesPerRow
    // }
    // console.log('Final Setting Y for Index', 0, operatingIndex)
    // tempTiles[operatingIndex] = this.getNewTile(operatingIndex, currentTile.x, 0, Tile.states.stationary, this.getRandomColor())

    // this.updateTiles(tempTiles, tileIndex)
    return tempTiles
  }

  getTileKey = (row, column) => parseInt(row.toString() + column.toString(), 10)

  handleTileRespawn = (index) => {
    console.log('Respawning', index)
    this.readyTiles += 1
    if (this.readyTiles === this.burstTiles.length) {
      this.respawnAllTiles()
    }
  }

  handleTileClick = (key) => {
    if (!this.burstTiles.length) {
      console.log('Handling click with index:', key)
      const { tiles } = this.state
      const tempTiles = tiles
      let allHitTiles = [key]

      allHitTiles = this.addAdjacentHits(key, allHitTiles)

      allHitTiles.forEach((tileKey) => {
        const currentTile = tiles[tileKey]

        tempTiles[tileKey] = this.getNewTile(currentTile.index, currentTile.x, currentTile.y, Tile.states.hit, currentTile.color)
      })

      this.burstTiles = allHitTiles
      this.readyTiles = 0
      this.setState({
        tiles: tempTiles,
        tileElements: tiles.map((tile) => tile.element),
      })
    }
    else {
      console.log('Currently respawning tiles, please wait.')
    }
  }

  addAdjacentHits = (hitTileKey, hitArray) => {
    const { tiles } = this.state
    const currentTile = tiles[hitTileKey]

    const adjacentTileKeys = this.getAdjacentTiles(hitTileKey)

    adjacentTileKeys.forEach((key) => {
      if (key && !hitArray.includes(key)) {
        if (currentTile.color === tiles[key].color) {
          hitArray.push(key)
          this.addAdjacentHits(key, hitArray)
        }
      }
    })

    return hitArray
  }

  getAdjacentTiles = (key) => [
    key - 10 < 0 ? null : key - 10, // top
    (key + 1) % (this.tilesPerRow) === 0 ? null : key + 1, // right
    key + 10 >= this.tilesPerRow * this.tileRows ? null : key + 10, // bottom
    key % this.tilesPerRow === 0 ? null : key - 1, // left
  ]

  // Gets the current colum (as array)
  getColumnIndexForKey = (key) => 0 + (key % this.tilesPerRow)

  getColumnForKey = (key) => this.columns[this.getColumnIndexForKey(key)]

  render() {
    const { tileElements } = this.state
    return (
      <View style={{
        flex: 1, backgroundColor: 'black', justifyContent: 'center',
      }}
      >
        { tileElements }
      </View>
    )
  }
}

TileManager.propTypes = {
  tileEdge: PropTypes.number.isRequired,
  tileRows: PropTypes.number.isRequired,
  tilesPerRow: PropTypes.number.isRequired,
  tilePadding: PropTypes.number.isRequired,
  gridWidth: PropTypes.number.isRequired,
}

export default TileManager
