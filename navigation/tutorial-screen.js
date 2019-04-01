import React from 'react'
import { View } from 'react-native'
import { Video, Asset } from 'expo'
// import TutorialVideo from '../assets/tutorial.mp4'
const TutorialVideo = Asset.fromModule(require('../assets/tutorial.mp4'))

class TutorialScreen extends React.Component {
  // constructor() {
  //   super()
  // }

  _onPlaybackStatusUpdate = (playbackStatus) => {
    const { navigation } = this.props

    if (playbackStatus.didJustFinish) {
      navigation.pop(1)
    }
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#000000',
      }}
      >
        <Video
          source={{ uri: TutorialVideo.uri }}
          ref={(ref) => {
            this.player = ref
          }}
          onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
          shouldPlay
          resizeMode="contain"
          style={{ height: 200 }}
        />
      </View>
    )
  }
}
export default TutorialScreen
