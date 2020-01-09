import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './home-screen'
import GameScreen from './game-screen'
import OptionsScreen from './options-screen'
import TutorialScreen from './tutorial-screen'
import HighScoresScreen from './high-scores-screen'
import Theme from '../theme'

const headerStyle = {
  backgroundColor: '#000000',
}
const headerTitleStyle = {
  color: Theme.colors.jewel.green,
  fontFamily: Theme.fontFamily,
  fontWeight: '200', // This needs to be set for Android or else the fontWeight is a bold style & custom font won't load
}
const headerLeftContainerStyle = {
  fontFamily: Theme.fontFamily,
}

const defaultNavOptions = (title) => () => ({
  title,
  headerStyle,
  headerTitleStyle,
  headerLeftContainerStyle,
  headerTintColor: Theme.colors.jewel.green,
  headerBackTitleStyle: {
    color: Theme.colors.jewel.green,
    fontFamily: Theme.fontFamily,
  },
})

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: defaultNavOptions('Jewel Tones Blast | Solitare'),
    },
    Tutorial: {
      screen: TutorialScreen,
      navigationOptions: defaultNavOptions('Tutorial'),
    },
    Options: {
      screen: OptionsScreen,
      navigationOptions: defaultNavOptions('Options'),
    },
    HighScores: {
      screen: HighScoresScreen,
      navigationOptions: defaultNavOptions('High Scores'),
    },
    Game: {
      screen: GameScreen,
      headerMode: 'none',
      navigationOptions: defaultNavOptions(''),
    },
  },
  {
    initialRouteName: 'Home',
  },
)

export default createAppContainer(AppNavigator)
