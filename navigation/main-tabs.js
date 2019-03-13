import React from 'react'
import { createBottomTabNavigator, withNavigation, createStackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import ThemeScreen from '../theme/theme-screen'
import GridScreen from '../grid/grid-screen'
import Theme from '../theme'

const MainTabs = createBottomTabNavigator({
  Grid: GridScreen,
  Theme: ThemeScreen,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => { // eslint-disable-line
      const { routeName } = navigation.state
      const IconComponent = Ionicons
      let iconName
      if (routeName === 'Theme') {
        iconName = 'md-home'
        // Sometimes we want to add badges to some icons.
        // You can check the implementation below.
        // IconComponent = https://reactnavigation.org/docs/en/tab-based-navigation.html
      }
      else if (routeName === 'Grid') {
        iconName = 'md-settings'
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />
    },
  }),
  tabBarOptions: {
    activeTintColor: Theme.colors.primary.accent,
    inactiveTintColor: '#fff',
    style: {
      backgroundColor: Theme.colors.primary.main,
    },
  },
})

export default withNavigation(MainTabs)
