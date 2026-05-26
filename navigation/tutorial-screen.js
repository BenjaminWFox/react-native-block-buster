import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useVideoPlayer, VideoView } from 'expo-video'

const videoSource = require('../assets/tutorial.mp4')

export default function TutorialScreen({ navigation }) {
  const player = useVideoPlayer(videoSource, (p) => {
    p.play()
  })

  useEffect(() => {
    const subscription = player.addListener('playToEnd', () => {
      navigation.goBack()
    })

    return () => {
      subscription.remove()
    }
  }, [player, navigation])

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#000000',
    }}
    >
      <VideoView
        player={player}
        contentFit="contain"
        nativeControls={false}
        style={{ height: 600 }}
      />
    </View>
  )
}
