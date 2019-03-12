import { StyleSheet, StatusBar, Platform } from 'react-native'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56

const colors = {
  primary: {
    main: '#0f1f38',
    accent: '#f55449',
    text: '#fefcfa',
  },
  secondary: {
    main: '#8e7970',
    accent: '#1b4b5a',
    text: '#fefcfa',
  },
}

const unit = 8

const theme = StyleSheet.create({
  statusBar: {
    backgroundColor: colors.secondary.accent,
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: colors.secondary.accent,
    height: APPBAR_HEIGHT,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: unit * 2,
  },
  borderPrimary: {
    borderWidth: 1,
    borderColor: colors.primary.accent,
    padding: unit * 2,
  },
  borderSecondary: {
    borderWidth: 1,
    borderColor: colors.secondary.main,
    padding: unit * 2,
  },
  text: {
    color: colors.primary.text,
    fontSize: 17,
    marginVertical: unit,
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
  colors,
}
export default theme
