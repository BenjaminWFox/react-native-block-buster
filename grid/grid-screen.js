import React from 'react'
import {
  View,
} from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import Theme from '../theme'
import Grid from './grid'

class GridScreen extends React.Component {
  render() {
    return (
      <View style={[Theme.styles.container, { paddingTop: Constants.statusBarHeight }]}>
        <Grid />
      </View>
    )
  }
}

export default createStackNavigator(
  { GridScreen },
  {
    headerMode: 'none',
  },
)
