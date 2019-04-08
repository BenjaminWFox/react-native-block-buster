import React from 'react'
import { Animated, View } from 'react-native'
import PropTypes from 'prop-types'
import Theme from '../../theme'
import { scaleInAnimation, scaleInOutAnimation } from '../../animation/animations'

const CenteredGameMessage = function CenteredMessage({
  width, height, messageTextArray, autoOut,
}) {
  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        width,
        height,
        left: 0,
        top: 0,
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {messageTextArray.map((entry) => (
        <Animated.View
          key={entry}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            borderRadius: 8,
            paddingHorizontal: 8,
            margin: 8,
            transform: [
              { scaleX: autoOut ? scaleInOutAnimation() : scaleInAnimation() },
              { scaleY: autoOut ? scaleInOutAnimation() : scaleInAnimation() },
            ],
          }}
        >
          <Theme.Text style={{
            fontSize: 40,
            textShadowColor: '#000000',
            textShadowOffset: { width: 1, hegiht: 1 },
            textShadowRadius: 1,
            margin: 0,
            padding: 0,
          }}
          >
            {entry}

          </Theme.Text>
        </Animated.View>
      ))}
    </View>
  )
}

CenteredGameMessage.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  messageTextArray: PropTypes.array.isRequired,
  autoOut: PropTypes.bool.isRequired,
}

export default CenteredGameMessage
