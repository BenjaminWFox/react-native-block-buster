import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Button } from 'react-native'
import HomeScreen from './home-screen'
import GameScreen from './game-screen'
import OptionsScreen from './options-screen'
import TutorialScreen from './tutorial-screen'
import Theme from '../theme'

const headerStyle = {
  backgroundColor: '#000000',

}
const headerTitleStyle = {
  color: Theme.colors.jewel.green,
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
        headerTintColor: Theme.colors.jewel.green,
        // headerRight: (!navigation.getParam('cameFromHome')
        //   && (
        //   <Button
        //     onPress={() => navigation.replace('Home')}
        //     title="Skip > "
        //   />
        //   )
        // ),
      }),
    },
    Options: {
      screen: OptionsScreen,
      navigationOptions: {
        title: 'Options',
        headerStyle,
        headerTitleStyle,
        headerTintColor: Theme.colors.jewel.green,
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
