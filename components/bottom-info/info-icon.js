import React from 'react'
import { TouchableHighlight, View } from 'react-native'
import PropTypes from 'prop-types'
import Theme from '../../theme'

const InfoIcon = function InfoIcon({ title, onPress }) {
  return (
    <View
      style={{
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <TouchableHighlight
        onPress={onPress}
        style={{
          flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10,
        }}
      >
        <Theme.Text>{title}</Theme.Text>
      </TouchableHighlight>
    </View>
  )
}

InfoIcon.propTypes = {
  title: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default InfoIcon
