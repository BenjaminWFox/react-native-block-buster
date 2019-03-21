import React from 'react'
import { TouchableHighlight, Text } from 'react-native'
import * as Styles from './styles'

const Button = function Button({
  onPressFunc, title, backgroundColor, textColor, disabled,
}) {
  return (
    <TouchableHighlight
      disabled={disabled}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Styles.radius,
        backgroundColor,
        margin: Styles.unit,
        padding: Styles.unit * 2,
        opacity: disabled ? 0.5 : 1,
      }}
      onPress={onPressFunc}
    >
      <Text style={{
        fontWeight: 'bold', color: textColor, fontSize: 20, fontFamily: Styles.fontFamily,
      }}
      >
        {title}

      </Text>
    </TouchableHighlight>
  )
}

export default Button
