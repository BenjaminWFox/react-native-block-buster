import { Animated } from 'react-native'

export const flashLastPointsAnimation = function flashLastPointsAnimation() {
  const animation = new Animated.Value(1)

  Animated.timing(
    animation,
    {
      toValue: 0,
      duration: 1000,
    },
  ).start()

  return animation
}

export const interpolatePointsAnimForPosition = function interpolatePointsAnimForPosition(yPos) {
  return flashLastPointsAnimation().interpolate({
    inputRange: [0, 1],
    outputRange: [yPos - 100, yPos - 50],
  })
}


export const countUpScoreAnimation = function countUpScoreAnimation(startAnimatedValue, increase) {
  const start = startAnimatedValue === 0 ? 0 : startAnimatedValue._value
  const finish = start + increase
  const animation = new Animated.Value(start)

  Animated.timing(
    animation,
    {
      toValue: finish,
      duartion: 500,
    },
  ).start()

  return animation
}

export const slideDownAnimation = function getSlideDownAnimation(start, finish) {
  const animation = new Animated.Value(start)

  Animated.timing(
    animation,
    {
      toValue: finish,
      duration: 350,
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
      duration: 250,
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
