import React from 'react'
import { TouchableHighlight, Animated } from 'react-native'
import PropTypes from 'prop-types'

class TileElement extends React.Component {
  constructor() {
    super()

    this.TOTAL_ANIMATIONS = 4
    this.animationsComplete = 0
  }

  state = {
    hit: false,
  }

  animation = () => {
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

  handleAnimationComplete = () => {
    const { onRespawn, index } = this.props

    this.animationsComplete += 1
    if (this.animationsComplete === this.TOTAL_ANIMATIONS) {
      this.animationsComplete = 0
      this.setState({ hit: false })
      onRespawn(index)
    }
  }

  handleTilePress = () => {
    const { hit } = this.state
    if (!hit) {
      this.setState({ hit: true })
    }
  }

  render() {
    const {
      edge, padding, color, x, y,
    } = this.props
    const { hit } = this.state
    const width = edge
    const height = edge

    return (
      <Animated.View style={{
        width,
        height,
        padding,
        left: x,
        top: y,
        position: 'absolute',
        backgroundColor: 'transparent',
      }}
      >
        <TouchableHighlight
          onPress={this.handleTilePress}
          underlayColor="transparent"
        >
          <Animated.View style={{
            backgroundColor: color,
            width: hit ? this.animation().interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }) : '100%',
            height: hit ? this.animation().interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }) : '100%',
            left: hit ? this.animation().interpolate({
              inputRange: [0, 100],
              outputRange: [edge / 2 - 2, 0],
            }) : 0,
            top: hit ? this.animation().interpolate({
              inputRange: [0, 100],
              outputRange: [edge / 2 - 2, 0],
            }) : 0,
          }}
          />
        </TouchableHighlight>
      </Animated.View>
    )
  }
}

TileElement.propTypes = {
  edge: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
}

export default TileElement
