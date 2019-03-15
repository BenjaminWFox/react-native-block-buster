import React from 'react'
import PropTypes from 'prop-types'
import TileElement from './tile-element'
import { positionFadeOutInterpolation, dimensionFadeOutInterpolation } from '../animation/animations'

class Tile {
  constructor(key, x, y, tileState, color) {
    if (!Tile.edge || !Tile.padding || !Tile.onClick || !Tile.onRespawn) {
      console.error('Tile is uninitialized. Did you forget to call init()?')
    }
    console.log('Making tile', tileState, Tile.getInnerDimension(), Tile.getInnerPosition())
    this.index = key
    this.x = x
    this.y = y
    this.color = color
    this.element = (
      <TileElement
        key={key}
        index={key}
        edge={Tile.edge}
        padding={Tile.padding}
        color={this.color}
        x={x}
        y={y}
        innerDimension={Tile.getInnerDimension(tileState)}
        innerPosition={Tile.getInnerPosition(tileState)}
        onClick={Tile.onClick}
        onRespawn={Tile.onRespawn}
      />
    )
  }
}

Tile.init = (edge, padding, onClick, onRespawn) => {
  Tile.edge = edge
  Tile.padding = padding
  Tile.onClick = onClick
  Tile.onRespawn = onRespawn
  Tile.states = {
    stationary: 'stationary',
    hit: 'hit',
    respawning: 'respawning',
    dropping: 'dropping',
  }
}

Tile.getInnerDimension = (state) => {
  switch (state) {
    case Tile.states.stationary:
      return '100%'
    case Tile.states.hit:
      return dimensionFadeOutInterpolation()
    default:
      return '100%'
  }
}

Tile.getInnerPosition = (state) => {
  switch (state) {
    case Tile.states.stationary:
      return 0
    case Tile.states.hit:
      return positionFadeOutInterpolation(Tile.edge)
    default:
      return 0
  }
}

Tile.propTypes = {
  key: PropTypes.number.isRequired,
  edge: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
}

export default Tile
