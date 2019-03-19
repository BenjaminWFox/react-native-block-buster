import React from 'react'
import { Animated, Text, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { flashLastPointsAnimation, interpolatePointsAnimForPosition } from '../../animation/animations'
import { formatScore } from '../../classes/formatting'

class PointPopper extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    const { coords, points } = this.props
    if (coords.x !== nextProps.coords.x && coords.y !== nextProps.coords.y && points !== nextProps) {
      return true
    }
    return false
  }

  render() {
    const { coords, points } = this.props
    const { x, y } = coords.x && coords.y ? coords : { x: 0, y: 0 }
    const { height, width } = Dimensions.get('window')
    let xPos = x - 25
    let yPos = y

    if (width - xPos < 75) {
      xPos -= 35
    }
    if (width - xPos > width - 50) {
      xPos += 25
    }
    if (height - yPos > height - 70) {
      yPos += 25
    }

    return (
      <Animated.View
        style={{
          position: 'absolute',
          left: xPos,
          top: interpolatePointsAnimForPosition(yPos),
          opacity: points === 0 ? 0 : flashLastPointsAnimation(),
          display: points === 0 ? 'none' : 'flex',

        }}
        pointerEvents="none"
      >
        <Text style={{
          color: '#fff',
          fontSize: 30,
          fontWeight: 'bold',
        }}
        >
        +
          {formatScore(points)}
        </Text>
      </Animated.View>
    )
  }
}

PointPopper.propTypes = {
  coords: PropTypes.object.isRequired,
  points: PropTypes.number.isRequired,
}

export default PointPopper
