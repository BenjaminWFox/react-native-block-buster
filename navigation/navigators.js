import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Button, Text } from 'react-native'
import HomeScreen from './home-screen'
import GameScreen from './game-screen'
import OptionsScreen from './options-screen'
import TutorialScreen from './tutorial-screen'
import Theme from '../theme'

const headerStyle = {
  backgroundColor: '#000000',
  fontFamily: Theme.fontFamily,
}
const headerTitleStyle = {
  color: Theme.colors.jewel.green,
  fontFamily: Theme.fontFamily,
}
const headerLeftContainerStyle = {
  fontFamily: Theme.fontFamily,
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Menu',
        headerStyle,
        headerTitleStyle,
        headerTintColor: Theme.colors.jewel.green,
      },
    },
    Tutorial: {
      screen: TutorialScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Tutorial',
        headerStyle,
        headerTitleStyle,
        headerLeftContainerStyle,
        headerTintColor: Theme.colors.jewel.green,
        headerBackTitleStyle: {
          color: Theme.colors.jewel.green,
          fontFamily: Theme.fontFamily,
        },
      }),
    },
    Options: {
      screen: OptionsScreen,
      navigationOptions: {
        title: 'Options',
        headerStyle,
        headerTitleStyle,
        headerLeftContainerStyle,
        headerTintColor: Theme.colors.jewel.green,
        headerBackTitleStyle: {
          color: Theme.colors.jewel.green,
          fontFamily: Theme.fontFamily,
        },
      },
    },
    Game: {
      screen: GameScreen,
      headerMode: 'none',
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerStyle,
        headerTitleStyle,
      }),
    },
  },
  {
    initialRouteName: 'Home',
  },
)

export default createAppContainer(AppNavigator)
