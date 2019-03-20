import React from 'react'
import { View, Text } from 'react-native'
import Theme from '../theme'

const HomeScreen = function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Theme.Button
        backgroundColor={Theme.colors.jewel.orange}
        textColor="#ffffff"
        title="Resume Game"
        onPressFunc={() => {
        }}
      />
      <Theme.Button
        backgroundColor={Theme.colors.jewel.orange}
        textColor="#ffffff"
        title="New Game"
        onPressFunc={() => {
        }}
      />
      <Theme.Button
        backgroundColor={Theme.colors.jewel.orange}
        textColor="#ffffff"
        title="Options"
        onPressFunc={() => {
        }}
      />
    </View>
  )
}

export default HomeScreen
