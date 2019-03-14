import React from 'react'
import {
  StatusBar, SafeAreaView,
} from 'react-native'
import Grid from './grid/grid'

const App = function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style={{ backgroundColor: 'black' }} barStyle="light-content" />
      <Grid />
    </SafeAreaView>
  )
}

export default App
