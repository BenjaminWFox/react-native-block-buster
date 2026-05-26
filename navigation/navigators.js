import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './home-screen'
import GameScreen from './game-screen'
import OptionsScreen from './options-screen'
import TutorialScreen from './tutorial-screen'
import HighScoresScreen from './high-scores-screen'
import Theme from '../theme'

const Stack = createStackNavigator()

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: '#000000',
  },
  headerTitleStyle: {
    color: Theme.colors.jewel.green,
    fontFamily: Theme.fontFamily,
    fontWeight: '200',
  },
  headerLeftContainerStyle: {
    fontFamily: Theme.fontFamily,
  },
  headerTintColor: Theme.colors.jewel.green,
  headerBackTitleStyle: {
    color: Theme.colors.jewel.green,
    fontFamily: Theme.fontFamily,
  },
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={defaultScreenOptions}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Jewel Tones Blast | Solitare' }}
        />
        <Stack.Screen
          name="Tutorial"
          component={TutorialScreen}
          options={{ title: 'Tutorial' }}
        />
        <Stack.Screen
          name="Options"
          component={OptionsScreen}
          options={{ title: 'Options' }}
        />
        <Stack.Screen
          name="HighScores"
          component={HighScoresScreen}
          options={{ title: 'High Scores' }}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
