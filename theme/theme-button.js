import React from 'react'
import { TouchableHighlight, Text } from 'react-native'
import * as Styles from './styles'

const Button = function Button({
  onPressFunc, title, backgroundColor, textColor,
}) {
  return (
    <TouchableHighlight
      style={{
        height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor, margin: Styles.unit,
      }}
      onPress={onPressFunc}
    >
      <Text style={{ fontWeight: 'bold', color: textColor, fontSize: 20 }}>{title}</Text>
    </TouchableHighlight>
  )
}

export default Button
