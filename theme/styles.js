import { StyleSheet, StatusBar, Platform } from 'react-native'

// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
// const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56

const colors = {
  // primary: {
  //   main: '#0f1f38',
  //   accent: '#f55449',
  //   text: '#fefcfa',
  // },
  // secondary: {
  //   main: '#8e7970',
  //   accent: '#1b4b5a',
  //   text: '#fefcfa',
  // },
  jewel: {
    red: '#bb0043', // red
    blue: '#342f9c', // blue
    orange: '#e15500', // orange
    green: '#009975', // green
    yellow: '#fabb13', // yellow
    teal: '#3499ac', // teal
    purple: '#70336e', // purple
  },
  white: '#ffffff',
  black: '#000000',
}

const unit = 8

const radius = unit

const fontFamily = 'WendyOne-Regular'

const theme = StyleSheet.create({
  // statusBar: {
  //   backgroundColor: colors.secondary.accent,
  //   height: STATUSBAR_HEIGHT,
  // },
  // appBar: {
  //   backgroundColor: colors.secondary.accent,
  //   height: APPBAR_HEIGHT,
  // },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // borderPrimary: {
  //   borderWidth: 1,
  //   borderColor: colors.primary.accent,
  //   padding: unit * 2,
  // },
  // borderSecondary: {
  //   borderWidth: 1,
  //   borderColor: colors.secondary.main,
  //   padding: unit * 2,
  // },
  text: {
    color: colors.jewel.green,
    fontSize: 17,
    textAlign: 'center',
    marginVertical: unit,
    fontFamily,
  },
  textSmall: {
    fontSize: 15,
  },
  textLarge: {
    fontSize: 19,
  },
})

StatusBar.setBarStyle('dark-content', false)
// StatusBar.setTranslucent(false)
// StatusBar.setBackgroundColor('#fff')

export {
  colors, unit, radius, fontFamily,
}
export default theme
