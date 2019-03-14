import React from 'react'
import PropTypes from 'prop-types'
import TileElement from './tile-element'

class Tile {
  constructor(key, edge, padding, x, y, color, onRespawn) {
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
