import React from 'react'
import { TouchableHighlight, Animated } from 'react-native'
import PropTypes from 'prop-types'
import Theme from '../../theme'

const TileElement = function TileElement({
  edge, padding, color, x, y, onClick,
  index, innerDimension, innerPosition,
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
        onPress={(event) => {
          onClick(index, event.nativeEvent)
        }}
        underlayColor="transparent"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Animated.View style={{
          borderRadius: Theme.radius,
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
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  innerDimension: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  innerPosition: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
}

export default TileElement
