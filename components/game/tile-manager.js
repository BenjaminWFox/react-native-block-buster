import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Tile from './tile'
import { slideDownAnimation } from '../../animation/animations'

const COLORS = [
  /* Jewel tones: */
  '#bb0043', // red
  '#342f9c', // blue
  '#fabb13', // yellow
  '#009975', // green // easy - 3
  '#e15500', // orange // normal - 4
  '#3499ac', // teal // hard - 5
  '#70336e', // purple // crazy - 6
]

const getRandomInt = function getRandomInt(pMin, pMax) {
  const min = Math.ceil(pMin)
  const max = Math.floor(pMax)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getColorsForIndexes = function getColorsForIndexes(difficulty, numColors) {
  const colorArray = []

  for (let i = 0; i < numColors; i += 1) {
    colorArray.push(COLORS[getRandomInt(0, difficulty - 1)])
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
    // this.colors = getColorsForIndexes(difficulty, tileRows * tilesPerRow)
    this.state = {
      tiles: [],
      tileElements: [],
      tilesCreated: false,
    }
    this.getRandomColor = () => COLORS[getRandomInt(0, COLORS.length - 1)]
    this.updateQueue = []

    Tile.init(this.tileEdge, this.tilePadding, this.handleTileClick, this.handleTileRespawn)
  }

  componentDidMount = async () => {
    const {
      isNewGame, tileData, tileRows, tilesPerRow, difficulty,
    } = this.props

    this.colors = getColorsForIndexes(difficulty, tileRows * tilesPerRow)

    this.setupAllTiles(tileData)
  }

  setupAllTiles = (existingTileData = undefined) => {
    const { tiles, tilesCreated } = this.state
    const centeringOffset = (this.gridWidth - (this.tileEdge * this.tilesPerRow)) / 2
    const tempTiles = tiles
    let row = -1
    let column = 0

    if (this.tileEdge > 0 && !tilesCreated && !this.burstTiles.length) {
      for (let i = 0; i < this.tileRows * this.tilesPerRow; i += 1) {
        column = 0 + (i % this.tilesPerRow)
        row = (i % this.tilesPerRow) === 0 ? row + 1 : row

        const color = existingTileData ? existingTileData[i].color : this.colors[i]
        const x = (this.tileEdge * column) + centeringOffset
        const y = (this.tileEdge * row)

        const tile = this.getNewTile(i, x, y, Tile.states.stationary, color)

        this.columns[column].push(tile)

        tempTiles.push(tile)
      }

      this.updateTiles(tempTiles)
    }
  }

  getNewTile(index, x, y, tileState, color = undefined) {
    const thisColor = color || this.getRandomColor()

    return new Tile(index, x, y, tileState, thisColor)
  }

  updateTiles = (tilesArray) => {
    this.updateGameMeta(tilesArray)

    this.setState({
      tiles: tilesArray,
      tileElements: tilesArray.map((tile) => tile.element),
    })
  }

  updateGameMeta = async (tilesArray) => {
    const { handleUpdateGameMeta, difficulty } = this.props
    const moves = await this.moveAnalyzer(tilesArray)

    console.log('Updating game meta. Current difficulty:', difficulty)
    handleUpdateGameMeta(difficulty, moves, tilesArray)
  }

  moveAnalyzer = async (tileset) => {
    // const visitedUnburstable = {}
    // const visitedBurstable = {}
    const tilesFullyChecked = {}
    const burstableGroups = []

    for (let i = 0; i < tileset.length; i += 1) {
      const currentKey = i
      let burstableGroup = [currentKey]

      if (!tilesFullyChecked[currentKey]) {
        burstableGroup = this.addAdjacentHits(currentKey, burstableGroup, tileset)

        burstableGroup.forEach((tileKey) => {
          tilesFullyChecked[tileKey] = true
        })

        if (burstableGroup.length >= 3) {
          burstableGroups.push(burstableGroup)
        }
      }
    }

    return burstableGroups.length
  }

  respawnAllTiles = () => {
    const { tiles } = this.state
    const tempTiles = tiles
    const columnUpdateInfo = {}

    this.burstTiles.forEach((tileIndex) => {
      const exists = !!columnUpdateInfo[tileIndex % 10]
      if (!exists) {
        columnUpdateInfo[tileIndex % 10] = {}
        columnUpdateInfo[tileIndex % 10].shiftFactor = 1
        columnUpdateInfo[tileIndex % 10].hitTiles = [tileIndex]
      }
      else {
        columnUpdateInfo[tileIndex % 10].shiftFactor += 1
        columnUpdateInfo[tileIndex % 10].hitTiles.push(tileIndex)
      }
    })

    const newColumnTiles = []

    Object.keys(columnUpdateInfo).forEach((key) => {
      const currentColumn = columnUpdateInfo[key]
      const parsedKey = parseInt(key, 10)
      currentColumn.hitTiles.sort((a, b) => a - b)

      newColumnTiles.push(this.processTilesForColumn(tiles, parsedKey, currentColumn))
    })

    newColumnTiles.forEach((tilesArray) => {
      tilesArray.forEach((tile) => {
        tempTiles[tile.index] = tile
      })
    })

    this.updateTiles(tempTiles)
    this.burstTiles = []
    this.readyTiles = 0
  }

  // eslint-disable-next-line
  processTilesForColumn(tilesArray, columnKey, currentColumn) {
    const { hitTiles } = currentColumn
    // hitTiles.sort((a, b) => a - b)

    const updatedColumnTiles = []
    const lastTileIndex = hitTiles[hitTiles.length - 1]

    let runningShiftUpFactor = 0
    let runningShiftDownFactor = 0


    for (let i = lastTileIndex; i >= 0; i -= 10) {
      const currentTile = tilesArray[i]

      if (hitTiles.includes(i)) {
        const tileStartY = 0 - this.tileEdge - (this.tileEdge * runningShiftUpFactor)
        const tileEndY = tileStartY + this.tileEdge + (this.tileEdge * runningShiftDownFactor * 2)

        updatedColumnTiles.push(this.getNewTile(
          columnKey + (10 * (runningShiftUpFactor)),
          currentTile.x,
          slideDownAnimation(tileStartY, tileEndY),
          Tile.states.stationary,
          this.getRandomColor(),
        ))
        runningShiftUpFactor += 1
        runningShiftDownFactor += 1
      }
      else {
        const tileStartY = this.getTileY(currentTile.y)
        const tileEndY = tileStartY + (this.tileEdge * runningShiftDownFactor)

        updatedColumnTiles.push(this.getNewTile(
          currentTile.index + (10 * runningShiftDownFactor),
          currentTile.x,
          slideDownAnimation(tileStartY, tileEndY),
          Tile.states.stationary,
          currentTile.color,
        ))
      }
    }
    return updatedColumnTiles
  }

  getTileY = (yValue) => {
    if (yValue._value || yValue._value === 0) { // eslint-disable-line
      return yValue._value // eslint-disable-line
    }

    return yValue
  }

  getTileKey = (row, column) => parseInt(row.toString() + column.toString(), 10)

  handleTileRespawn = () => {
    this.readyTiles += 1
    if (this.readyTiles === this.burstTiles.length) {
      this.respawnAllTiles()
    }
  }

  handleTileClick = (key, event) => {
    if (!this.burstTiles.length) {
      const { tiles } = this.state
      const tempTiles = tiles
      let allHitTiles = [key]

      allHitTiles = this.addAdjacentHits(key, allHitTiles)

      if (allHitTiles.length > 2) {
        allHitTiles.forEach((tileKey) => {
          const currentTile = tiles[tileKey]

          tempTiles[tileKey] = this.getNewTile(
            currentTile.index,
            currentTile.x,
            this.getTileY(currentTile.y),
            Tile.states.hit,
            currentTile.color,
          )
        })

        this.sendScoreUpdate(allHitTiles.length, event)
        this.burstTiles = allHitTiles
        this.readyTiles = 0
        this.setState({
          tiles: tempTiles,
          tileElements: tiles.map((tile) => tile.element),
        })
      }
      else {
        this.burstTiles = []
        this.readyTiles = 0
      }
    }
  }

  sendScoreUpdate = (totalHitTiles, event) => {
    const { handleUpdateScore, difficulty } = this.props
    const POINTS_PER_TILE = 10
    const OVERRUN_MULTIPLYER_PER_TILE = 0.5
    let points = 0

    if (totalHitTiles <= 3) {
      points = POINTS_PER_TILE * totalHitTiles
    }
    else {
      const multiplyer = 1 + ((totalHitTiles - 3) * OVERRUN_MULTIPLYER_PER_TILE)
      points = POINTS_PER_TILE * totalHitTiles * multiplyer
    }

    handleUpdateScore(points, event, difficulty)
  }

  addAdjacentHits = (hitTileKey, hitArray) => {
    const { tiles } = this.state
    const currentTile = tiles[hitTileKey]

    const adjacentTileKeys = this.getAdjacentTiles(hitTileKey)

    adjacentTileKeys.forEach((key) => {
      if ((key || key === 0) && !hitArray.includes(key)) {
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
    const { gridHeight } = this.props

    return (
      <View style={{
        flex: 1, justifyContent: 'center', overflow: 'hidden', height: gridHeight,
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
  gridHeight: PropTypes.number.isRequired,
  handleUpdateScore: PropTypes.func.isRequired,
}

export default TileManager
