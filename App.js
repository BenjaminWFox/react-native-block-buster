import React from 'react'
import { StatusBar } from 'react-native' // , AsyncStorage
import * as Font from 'expo-font'
// import { KEYS } from './classes/storage-api'
import AppContainer from './navigation/navigators'
import AudioManager from './classes/audio/audio-manager'
import AudioContext from './classes/audio/audio-context'

const FONT = require('./assets/fonts/WendyOne-Regular.ttf')

class App extends React.Component {
  constructor() {
    super()

    this.audioManager = undefined
  }

  state = {
    loaded: false,
  }

  componentDidMount = async () => {
    // AsyncStorage.clear()

    // await AsyncStorage.multiRemove([
    //   KEYS.OPTIONS,
    //   KEYS.HIGH_SCORES,
    // ])

    await Font.loadAsync({
      'WendyOne-Regular': FONT,
    })
    const audioManager = new AudioManager()

    this.audioManager = audioManager

    this.setState({ loaded: true })
  }

  render() {
    const { loaded } = this.state
    return loaded && (
      <>
        <StatusBar barStyle="light-content" />
        <AudioContext.Provider value={this.audioManager}>
          <AppContainer
            ref={(nav) => {
              this.navigator = nav
            }}
          />
        </AudioContext.Provider>
      </>
    )
  }
}

export default App
