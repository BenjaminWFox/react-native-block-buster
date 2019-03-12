import React from 'react'
import { Text, StyleSheet } from 'react-native'
import theme from './styles'

const ThemedView = function ThemedView({
  variant, style, children, ...rest
}) {
  let componentThemeStyles = theme.text

  if (style) {
    componentThemeStyles = StyleSheet.flatten([componentThemeStyles, style])
  }

  switch (variant) {
    case 'large':
      componentThemeStyles = StyleSheet.flatten([componentThemeStyles, theme.textLarge])
      break
    case 'small':
      componentThemeStyles = StyleSheet.flatten([componentThemeStyles, theme.textSmall])
      break
    default:
      break
  }

  return (
    <Text style={componentThemeStyles} {...rest}>
      {children}
    </Text>
  )
}

export default ThemedView
