import React from 'react'
import {
  Modal, View, TouchableHighlight, Text,
} from 'react-native'

const RestartGameModal = function RestartGameModal({ isVisible, willRestartGame }) {
  return (
    <Modal onRequestClose={() => {}} animationType="slide" transparent visible={isVisible}>
      <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
          width: '50%',
          backgroundColor: '#fff',
        }}
        >
          <Text>Are you really sure??</Text>
          <TouchableHighlight
            style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              willRestartGame(true)
            }}
          >
            <Text>Yes</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              willRestartGame(false)
            }}
          >
            <Text>No</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  )
}

export default RestartGameModal
