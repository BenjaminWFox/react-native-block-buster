import React from 'react'
import { AsyncStorage, StatusBar } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Font } from 'expo'
import AppContainer from './navigation/navigators'
import { KEYS } from './classes/storage-api'
import { getOptions } from './classes/options-manager'
import AudioManager from './classes/audio/audio-manager'
import AudioContext from './classes/audio/audio-context'

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
      'WendyOne-Regular': require('./assets/fonts/WendyOne-Regular.ttf'),
    })
    const audioManager = new AudioManager()

    await audioManager.load()

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
