import React from 'react'
import { AsyncStorage, StatusBar } from 'react-native'
import { NavigationActions } from 'react-navigation'
import AppContainer from './navigation/navigators'
import { KEYS } from './classes/storage-api'
import { getOptions } from './classes/options-manager'

class App extends React.Component {
  componentDidMount = async () => {
    // AsyncStorage.clear()
    // await AsyncStorage.multiRemove([
    //   KEYS.OPTIONS,
    //   KEYS.HIGH_SCORES,
    // ])
  }

  render() {
    return (
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
