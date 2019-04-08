import React from 'react'
import { View, Picker, Platform } from 'react-native'
import PropTypes from 'prop-types'
import Theme from '../theme'
import { setOptions, difficulties } from '../classes/options-manager'

class OptionsScreen extends React.Component {
  constructor({ navigation }) {
    super()

    const options = navigation.getParam('gameOptions', {})

    this.state = {
      options,
    }
  }

  handleDifficultyUpdate = (difficulty) => {
    const { options } = this.state

    options.difficulty = difficulty

    setOptions(options)
    this.setState({ options })
  }

  render() {
    const { options } = this.state

    return (
      <View style={Theme.styles.container}>
        <View>
          <View style={{ zIndex: 2 }}>
            <Theme.Text>DIFFICULTY</Theme.Text>
            <Theme.Text>(colors on the board)</Theme.Text>
          </View>
          <View style={{
            zIndex: 1,
            backgroundColor: Platform.OS === 'ios' ? Theme.colors.black : Theme.colors.white,
            borderRadius: Theme.radius,
          }}
          >
            <Picker
              selectedValue={options.difficulty}
              onValueChange={(itemValue) => {
                this.handleDifficultyUpdate(itemValue)
              }}
              style={{
                marginTop: Platform.OS === 'ios' ? -50 : 0,
              }}
              itemStyle={{
                fontFamily: Theme.fontFamily,
                color: Theme.colors.jewel.yellow,
                fontWeight: '200',
              }}
            >
              { Object.keys(difficulties).map((difficulty) => (
                <Picker.Item
                  key={difficulty}
                  label={`${difficulty} (${difficulties[difficulty]})`}
                  value={difficulties[difficulty]}
                  style={{
                    fontFamily: Theme.fontFamily,
                    fontWeight: '200',
                  }}
                >
                </Picker.Item>
              ))}
            </Picker>
          </View>
        </View>
        {/* <View>
          <Theme.Text>
            Show Tutorial Next Launch
          </Theme.Text>
        </View> */}
      </View>
    )
  }
}

OptionsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default OptionsScreen
