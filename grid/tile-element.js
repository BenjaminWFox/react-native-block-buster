import React from 'react'
import { TouchableHighlight, Animated } from 'react-native'
import PropTypes from 'prop-types'

const TileElement = function TileElement({
  edge, padding, color, x, y, onClick, index, innerDimension, innerPosition,
}) {
  return (
    <Animated.View style={{
      width: edge,
      height: edge,
      padding,
      left: x,
      top: y,
      position: 'absolute',
      backgroundColor: 'transparent',
    }}
    >
      <TouchableHighlight
        onPress={() => onClick(index)}
        underlayColor="transparent"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Animated.View style={{
          backgroundColor: color,
          width: innerDimension,
          height: innerDimension,
          left: innerPosition,
          top: innerPosition,
        }}
        />
      </TouchableHighlight>
    </Animated.View>
  )
}

TileElement.propTypes = {
  edge: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
}

export default TileElement
