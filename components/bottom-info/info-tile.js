import React from 'react'
import { View } from 'react-native'
import Theme from '../../theme'

const InfoTile = function InfoTile({ title, displayData }) {
  return (
    <View style={{
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}
    >
      <Theme.Text>{title}</Theme.Text>
      <Theme.Text>{displayData}</Theme.Text>
    </View>
  )
}

export default InfoTile
