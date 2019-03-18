import { Animated } from 'react-native'

export const slideDownAnimation = function getSlideDownAnimation(start, finish) {
  const animation = new Animated.Value(start)

  Animated.timing(
    animation,
    {
      toValue: finish,
      duration: 150,
    },
  ).start()

  return animation
}

export const fadeOutAnimation = function fadeOutAnimation(callback) {
  const out = new Animated.Value(100)

  Animated.timing(
    out,
    {
      toValue: 0,
      duration: 500,
    },
  ).start(() => {
    callback()
  })

  return out
}

export const dimensionFadeOutInterpolation = function getDimensionFadeOutAnimation(callback) {
  return fadeOutAnimation(callback).interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  })
}

export const positionFadeOutInterpolation = function getPositionFadeOutAnimation(edge, callback) {
  return fadeOutAnimation(callback).interpolate({
    inputRange: [0, 100],
    outputRange: [edge / 2 - 2, 0],
  })
}
