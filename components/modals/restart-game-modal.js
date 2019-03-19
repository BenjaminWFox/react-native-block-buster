import React from 'react'
import {
  Modal, View, TouchableHighlight, Text,
} from 'react-native'
import Theme from '../../theme'

const RestartGameModal = function RestartGameModal({ isVisible, willRestartGame }) {
  return (
    <Modal onRequestClose={() => {}} animationType="slide" transparent visible={isVisible}>
      <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
          width: '50%',
          backgroundColor: '#000000',
          borderWidth: 2,
          borderColor: '#333333',
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
        >
          <Theme.Text
            variant="large"
            style={{
              color: Theme.colors.white, fontSize: 30, fontWeight: 'bold', marginBottom: 0,
            }}
          >
            Restart...
          </Theme.Text>
          <Theme.Text variant="large" style={{ color: Theme.colors.white, fontSize: 30, fontWeight: 'bold' }}>Are you sure?</Theme.Text>
          <Theme.Button
            backgroundColor={Theme.colors.jewel.orange}
            textColor="#ffffff"
            title="Yes"
            onPressFunc={() => {
              willRestartGame(true)
            }}
          >
          </Theme.Button>
          <Theme.Button
            backgroundColor={Theme.colors.jewel.green}
            textColor="#ffffff"
            title="No"
            onPressFunc={() => {
              willRestartGame(false)
            }}
          >
          </Theme.Button>
        </View>
      </View>
    </Modal>
  )
}

export default RestartGameModal
