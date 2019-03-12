import React from 'react'
import { View, StyleSheet } from 'react-native'
import theme from './styles'

let componentThemeStyles = theme.container

const ThemedView = function ThemedView({ style, children, ...rest }) {
  if (style) {
    componentThemeStyles = StyleSheet.flatten([componentThemeStyles, style])
  }

  return (
    <View style={componentThemeStyles} {...rest}>
      {children}
    </View>
  )
}

export default ThemedView
