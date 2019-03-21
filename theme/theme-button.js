import React from 'react'
import { TouchableHighlight, Text } from 'react-native'
import * as Styles from './styles'

const Button = function Button({
  onPressFunc, title, backgroundColor, textColor, disabled, variant,
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
        padding: variant === 'small' ? Styles.unit : Styles.unit * 2,
        opacity: disabled ? 0.5 : 1,
      }}
      onPress={onPressFunc}
    >
      <Text style={{
        color: textColor, fontSize: 20, fontFamily: Styles.fontFamily,
      }}
      >
        {title}

      </Text>
    </TouchableHighlight>
  )
}

export default Button
