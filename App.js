import React from 'react'
import { AsyncStorage, StatusBar } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Font } from 'expo'
import AppContainer from './navigation/navigators'
import { KEYS } from './classes/storage-api'
import { getOptions } from './classes/options-manager'

class App extends React.Component {
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

    this.setState({ loaded: true })
  }

  render() {
    const { loaded } = this.state
    return loaded && (
      <>
        <StatusBar barStyle="light-content" />
        <AppContainer
          ref={(nav) => {
            this.navigator = nav
          }}
        />
      </>
    )
  }
}

export default App
