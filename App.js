import React from 'react'
import {
  StatusBar, View, NativeModules, Platform,
} from 'react-native'
import Grid from './grid/grid'

class App extends React.Component {
  state = { sbHeight: 0 }

  componentDidMount = () => {
    const { StatusBarManager } = NativeModules

    const assignHeightAndroid = () => {
      this.setState({ sbHeight: StatusBar.currentHeight })
    }

    const assignHeightIOS = () => StatusBarManager.getHeight(({ height }) => {
      this.setState({ sbHeight: height })
    })
    if (Platform.OS === 'android') {
      assignHeightAndroid()
    }
    else {
      assignHeightIOS()
    }
  }

  render() {
    const { sbHeight } = this.state
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style={{ backgroundColor: '#333' }} barStyle="light-content" />
        <View style={{
          backgroundColor: '#333',
          height: sbHeight,
        }}
        />
        <Grid style={{
          paddingVertical: 10,
        }}
        />
        <View style={{
          flex: 1,
          height: 100,
          backgroundColor: '#333',
        }}
        />
      </View>
    )
  }
}

export default App
