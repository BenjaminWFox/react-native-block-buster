import React from 'react'
import PropTypes from 'prop-types'
import TileElement from './tile-element'

class Tile {
  constructor(key, edge, padding, x, y, isHit, color, onClick, onRespawn) {
    this.index = key
    this.x = x
    this.y = y
    this.color = color
    this.ref = undefined
    this.element = (
      <TileElement
        key={key}
        ref={(ref) => {
          this.ref = ref
        }}
        index={key}
        edge={edge}
        padding={padding}
        color={this.color}
        x={x}
        y={y}
        isHit={isHit}
        onClick={onClick}
        onRespawn={onRespawn}
      />
    )
  }
}

Tile.propTypes = {
  key: PropTypes.number.isRequired,
  edge: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
}

export default Tile
