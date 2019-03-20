import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './home-screen'
import GameScreen from './game-screen'
import OptionsScreen from './options-screen'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Menu',
      },
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
    initialRouteName: 'Home',
  },
)

export default createAppContainer(AppNavigator)
