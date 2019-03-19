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
      {title.split(' ').map((word, idx) => <Theme.Text key={idx} style={{ paddingVertical: 0, marginVertical: 0 }}>{word}</Theme.Text>)}
      <Theme.Text>{displayData}</Theme.Text>
    </View>
  )
}

export default InfoTile
