import React from 'react'
import {
  StatusBar,
} from 'react-native'
import AppContainer from './navigation/main-routing'

const App = function App() {
  return (
    <>
      <StatusBar style={{ backgroundColor: 'black' }} barStyle="light-content" />
      <AppContainer style={{ backgroundColor: 'black' }} />
    </>
  )
}

export default App
