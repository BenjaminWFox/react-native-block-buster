import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Theme from '../../theme'

const InfoTile = function InfoTile({ title, displayData }) {
  return (
    <View style={{
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}
    >
      {title.split(' ').map((word) => <Theme.Text key={`${word}`} style={{ paddingVertical: 0, marginVertical: 0 }}>{word}</Theme.Text>)}
      <Theme.Text>{displayData}</Theme.Text>
    </View>
  )
}

InfoTile.propTypes = {
  title: PropTypes.string.isRequired,
  displayData: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

InfoTile.defaultProps = {
  displayData: null,
}

export default InfoTile
