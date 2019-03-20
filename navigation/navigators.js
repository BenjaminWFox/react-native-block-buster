import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Button } from 'react-native'
import HomeScreen from './home-screen'
import GameScreen from './game-screen'
import OptionsScreen from './options-screen'
import TutorialScreen from './tutorial-screen'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Menu',
      },
    },
    Tutorial: {
      screen: TutorialScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Tutorial',
        headerRight: (!navigation.getParam('cameFromHome')
          && (
          <Button
            onPress={() => navigation.replace('Home')}
            title="Skip > "
          />
          )
        ),
      }),
    },
    Options: {
      screen: OptionsScreen,
      navigationOptions: {
        title: 'Menu',
      },
    },
    Game: {
      screen: GameScreen,
      headerMode: 'none',
    },
  },
  {
    initialRouteName: 'Tutorial',
  },
)

export default createAppContainer(AppNavigator)
