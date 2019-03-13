import React from 'react'
import { TouchableHighlight, Animated, View } from 'react-native'

class Tile extends React.Component {
  state = {
    hit: false,
    gone: false,
  }

  animation = () => {
    const out = new Animated.Value(100)

    Animated.timing(
      out,
      {
        toValue: 0,
        duration: 150,
      },
    ).start()

    return out
  }

  handleTilePress = (event) => {
    this.setState({ hit: true })
  }

  render() {
    const { edge, padding, color } = this.props
    const { hit } = this.state
    const width = edge
    const height = edge

    return (
      <TouchableHighlight
        onPress={this.handleTilePress}
        underlayColor="transparent"
        style={{
          width,
          height,
          padding,
          backgroundColor: 'transparent',
        }}
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
    )
  }
}

export default Tile
