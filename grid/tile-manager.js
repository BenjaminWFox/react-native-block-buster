import React from 'react'
import { View, Animated } from 'react-native'
import PropTypes from 'prop-types'
import Tile from './tile'

const COLORS = [
  '#00FF00',
  '#FFFF00',
  '#FF0009',
  '#0000FF',
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

const getSlideDownAnimation = function getSlideDownAnimation(start, finish) {
  const animation = new Animated.Value(start)

  Animated.timing(
    animation,
    {
      toValue: finish,
      duration: 150,
    },
  ).start()

  return animation
}

const getFadeOutAnimation = function getFadeOutAnimation() {
  const out = new Animated.Value(100)

  Animated.timing(
    out,
    {
      toValue: 0,
      duration: 150,
    },
  ).start(() => {
    this.handleAnimationComplete()
  })

  return out
}

const getDimensionFadeOutAnimation = function getDimensionFadeOutAnimation() {
  return getFadeOutAnimation().interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  })
}

const getPositionFadeOutAnimation = function getPositionFadeOutAnimation() {
  return getFadeOutAnimation().interpolate({
    inputRange: [0, 100],
    outputRange: [edge / 2 - 2, 0],
  })
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
    this.colors = getColorsForIndexes(tileRows * tilesPerRow)
    this.state = {
      tiles: [],
      tileElements: [],
      tilesCreated: false,
      burstTiles: [],
      readyTiles: 0,
    }
    this.getRandomColor = () => COLORS[getRandomInt(0, COLORS.length - 1)]
  }

  componentDidMount = () => {
    this.setupAllTiles()
  }

  setupAllTiles = () => {
    const { tiles, tilesCreated, burstTiles } = this.state
    const centeringOffset = (this.gridWidth - (this.tileEdge * this.tilesPerRow)) / 2
    const tempTiles = tiles
    const tileElements = []
    let row = -1
    let column = 0

    if (this.tileEdge > 0 && !tilesCreated && !burstTiles.length) {
      console.log('SAT')
      for (let i = 0; i < this.tileRows * this.tilesPerRow; i += 1) {
        column = 0 + (i % this.tilesPerRow)
        row = (i % this.tilesPerRow) === 0 ? row + 1 : row

        const x = (this.tileEdge * column) + centeringOffset
        const y = (this.tileEdge * row)

        const tile = this.getNewTile(i, this.edge, x, y, false, this.colors[i])
        // new Tile(i, this.tileEdge, this.tilePadding, x, y, this.colors[i], this.handleTileClick, this.handleTileRespawn)

        this.columns[column].push(tile)

        tempTiles.push(tile)
        tileElements.push(tile.element)
      }

      console.log('Made columns', this.columns)
      this.setState({ tiles: tempTiles })
      this.setState({ tileElements })
    }
  }

  getNewTile(index, edge, x, y, isHit, color = undefined) {
    const thisColor = color || this.getRandomColor()

    return new Tile(index, this.tileEdge, this.tilePadding, x, y, isHit, thisColor, this.handleTileClick, this.handleTileRespawn)
  }

  respawnTiles = (burstTiles) => {
    for (let i = 0; i < burstTiles.length; i += 1) {
      this.respawnTile(burstTiles[i])
    }
  }

  respawnTile = (tileKey) => {
    const { tiles, tileElements } = this.state
    const currentTile = tiles[tileKey]
    const tempTiles = tiles
    const tempElements = tileElements
    const rowIndex = Math.floor(tileKey / this.tilesPerRow)
    const columnIndex = 0 + (tileKey % this.tilesPerRow)
    const column = this.columns[columnIndex]
    const extractedElement = column.splice(rowIndex, 1)
    let lastUpdatedKey
    column.unshift(extractedElement[0])

    // Update each of the tiles above the current tile with new Y coords
    // and a new Key
    for (let i = 1; i <= rowIndex; i += 1) {
      const currentKey = this.getTileKey(rowIndex, columnIndex) - i * 10

      let extraY = 0

      if (tiles[currentKey].y._animation) { // eslint-disable-line
        // tiles[currentKey].y._animation.stop()
        extraY = tiles[currentKey].y._startingValue + this.tileEdge - tiles[currentKey].y._value // eslint-disable-line
      }

      const currentY = tiles[currentKey].y._value === undefined ? tiles[currentKey].y : tiles[currentKey].y._value // eslint-disable-line

      const newKey = i === 0 ? columnIndex : currentKey + 10
      const newY = (currentY + this.tileEdge) + extraY

      // console.log('Updating tile with key from/to', currentKey, newKey)
      // console.log('Updating tile with Y from/to', currentY, newY)
      tempTiles[newKey] = this.getNewTile(newKey, this.edge, currentTile.x, getSlideDownAnimation(currentY, newY), false, tiles[currentKey].color)
      // new Tile(newKey, this.tileEdge, this.tilePadding, currentTile.x, getSlideDownAnimation(currentY, newY), tiles[currentKey].color, this.handleTileClick, this.handleTileRespawn)
      tempElements[newKey] = tempTiles[newKey].element

      lastUpdatedKey = newKey
    }

    // Respawn the original missing block
    const refY = tempTiles[lastUpdatedKey].y._value || 0

    tempTiles[columnIndex] = this.getNewTile(columnIndex, this.edge, currentTile.x, getSlideDownAnimation(refY - this.tileEdge, 0), false, this.getRandomColor())
    // new Tile(columnIndex, this.tileEdge, this.tilePadding, currentTile.x, getSlideDownAnimation(refY - this.tileEdge, 0), COLORS[getRandomInt(0, COLORS.length - 1)], this.handleTileClick, this.handleTileRespawn)
    tempElements[columnIndex] = tempTiles[columnIndex].element

    this.setState({
      tiles: tempTiles,
      tileElements: tempElements,
      burstTiles: [],
    })
  }

  getTileKey = (row, column) => parseInt(row.toString() + column.toString(), 10)

  handleTileRespawn = (key) => {
    // const { readyTiles, burstTiles } = this.state

    console.log('Respawning', key)

    // // New idea:
    // this.setState({ readyTiles: readyTiles + 1 }, () => {
    //   if (readyTiles === burstTiles.length) {
    //     this.respawnTiles(burstTiles)
    //   }
    // })

    // // Old idea:
    // const tempArray = burstTiles

    // tempArray.push(key)

    // this.setState({ burstTiles: tempArray }, () => {
    //   this.setupAllTiles()
    // })
  }

  handleTileClick = (key) => {
    const { tiles } = this.state
    const tempTiles = tiles
    let allHitTiles = [key]

    console.log('Initial tile clicked. Index:', key)

    allHitTiles = this.addAdjacentHits(key, allHitTiles)

    console.log('Received all hit tiles', allHitTiles)

    allHitTiles.forEach((tileKey) => {
      const currentTile = tiles[tileKey]

      tempTiles[tileKey] = this.getNewTile(currentTile.index, this.edge, currentTile.x, currentTile.y, true, currentTile.color)
    })

    console.log('wrapping up handle click', allHitTiles)

    this.setState({
      tiles: tempTiles,
      tileElements: tiles.map((tile) => tile.element),
      burstTiles: allHitTiles,
      readyTiles: 0,
    })
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

    // for (let i = 0; i < hitArray.length; i += 1) {
    //   const adjacentTileKeys = this.getAdjacentTiles(hitArray[i])

    //   console.log('Have adjacent keys', adjacentTileKeys)

    // }

    return hitArray
  }

  getAdjacentTiles = (key) => [
    key - 10 < this.tilesPerRow ? null : key - 10,
    key % (this.tilesPerRow - 1) === 0 ? null : key + 1,
    key + 10 > this.tilesPerRow * this.tileRows ? null : key + 10,
    key % this.tilesPerRow === 0 ? null : key - 1,
  ]
  // const above = key - 10 < this.tilesPerRow ? null : key - 10
  // const right = (key + 1) % (this.tilesPerRow - 1) !== 0 ? null : key + 1
  // const below = key + 10 > this.tilesPerRow * this.tileRows ? null : key + 10
  // const left = key % this.tilesPerRow !== 0 ? null : key + 1


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
