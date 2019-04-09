import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Tile from './tile'
import { slideDownAnimation } from '../../animation/animations'
import {
  getColorsForIndexes, getRandomColor, getColumnsArray,
} from '../../classes/utilities'
import { tileColors } from '../../classes/options-manager'
import { tilesBrokenEvent } from './game-events'

class TileManager extends React.Component {
  constructor({
    tileEdge, tileRows, tilesPerRow, tilePadding, gridWidth, difficulty, audioManager,
  }) {
    super()

    this.audioManager = audioManager
    this.tileEdge = tileEdge
    this.tileRows = tileRows
    this.columns = getColumnsArray(tilesPerRow)
    this.tilesPerRow = tilesPerRow
    this.tilePadding = tilePadding
    this.gridWidth = gridWidth
    this.burstTiles = []
    this.burstTilesCompletedDespawn = 0
    this.tilesFallingDown = 0
    this.state = {
      tiles: [],
      tileElements: [],
      tilesCreated: false,
    }
    this.getRandomColor = () => getRandomColor(difficulty, tileColors)

    Tile.init(this.tileEdge, this.tilePadding, this.handleTileClick, this.handleTileRespawn)
  }

  componentDidMount = async () => {
    const {
      tileData, tileRows, tilesPerRow, difficulty,
    } = this.props

    this.colors = getColorsForIndexes(difficulty, tileRows * tilesPerRow, tileColors)

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

  updateTiles = (tilesArray, updateType) => {
    this.updateGameMeta(tilesArray)

    this.setState({
      tiles: tilesArray,
      tileElements: tilesArray.map((tile) => tile.element),
    }, () => {
      if (updateType === Tile.states.falling) {
        // console.log('EVENT: Tiles starting to fall')
      }
    })
  }

  updateGameMeta = async (tilesArray) => {
    const { handleUpdateGameMeta, difficulty } = this.props
    const moves = await this.moveAnalyzer(tilesArray)

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
        this.tilesFallingDown += 1
        tempTiles[tile.index] = tile
      })
    })

    // console.log('EVENT: Blocks respawned', this.tilesFallingDown)

    this.updateTiles(tempTiles, Tile.states.falling)
    this.burstTiles = []
    this.burstTilesCompletedDespawn = 0
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
          slideDownAnimation(tileStartY, tileEndY, this.handleTileFallComplete),
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
          slideDownAnimation(tileStartY, tileEndY, this.handleTileFallComplete),
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
    this.burstTilesCompletedDespawn += 1
    if (this.burstTilesCompletedDespawn === this.burstTiles.length) {
      // console.log('EVENT: Blocks DeSpawned')
      this.respawnAllTiles()
    }
  }

  handleTileClick = (key, event) => {
    if (!this.burstTiles.length && this.tilesFallingDown === 0) {
      const { tiles } = this.state
      const tempTiles = tiles
      let allHitTiles = [key]

      allHitTiles = this.addAdjacentHits(key, allHitTiles)
      tilesBrokenEvent(this.audioManager, allHitTiles.length)

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

        // console.log('EVENT: Blocks Broken')
        this.sendScoreUpdate(allHitTiles.length, event)
        this.burstTiles = allHitTiles
        this.burstTilesCompletedDespawn = 0
        this.setState({
          tiles: tempTiles,
          tileElements: tiles.map((tile) => tile.element),
        })
      }
      else {
        this.burstTiles = []
        this.burstTilesCompletedDespawn = 0
      }
    }
  }

  sendScoreUpdate = (totalHitTiles, event) => {
    const { handleUpdateScore } = this.props
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

    handleUpdateScore(points, event)
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

  handleTileFallComplete = () => {
    this.tilesFallingDown -= 1

    if (this.tilesFallingDown === 0) {
      // console.log('EVENT: All tiles settled')
    }
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
  handleUpdateGameMeta: PropTypes.func.isRequired,
  difficulty: PropTypes.number.isRequired,
  tileData: PropTypes.array,
  audioManager: PropTypes.object.isRequired,
}

TileManager.defaultProps = {
  tileData: undefined,
}

export default TileManager
