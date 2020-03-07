import { Animated } from 'react-native'

export const scaleInAnimation = () => {
  const animation = new Animated.Value(0)

  Animated.spring(
    animation,
    {
      toValue: 1,
      duration: 500,
    },
  ).start()

  return animation
}

export const scaleInOutAnimation = () => {
  const animation = new Animated.Value(0)

  Animated.sequence([
    Animated.spring(
      animation,
      {
        toValue: 1,
        duration: 500,
      },
    ),
    Animated.delay(500),
    Animated.spring(
      animation,
      {
        toValue: 0,
        duration: 500,
      },
    ),

  ]).start()

  return animation
}

export const flashLastPointsAnimation = function flashLastPointsAnimation() {
  const animation = new Animated.Value(1)

  Animated.timing(
    animation,
    {
      toValue: 0,
      duration: 2000,
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
  const start = startAnimatedValue === 0 ? 0 : startAnimatedValue._value // eslint-disable-line
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

export const slideDownAnimation = function getSlideDownAnimation(start, finish, callback) {
  const animation = new Animated.Value(start)

  Animated.timing(
    animation,
    {
      toValue: finish,
      duration: 350,
    },
  ).start(() => {
    callback()
  })

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
