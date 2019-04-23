import React from 'react'
import {
  View, Picker, Platform, TouchableHighlight, Text,
} from 'react-native'
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
            backgroundColor: 'transparent',
            borderRadius: Theme.radius,
          }}
          >
            { Object.keys(difficulties).map((difficulty) => {
              const selected = options.difficulty === difficulties[difficulty]
              return (
                <Theme.Button
                  key={difficulty}
                  backgroundColor={selected ? Theme.colors.jewel.orange : Theme.colors.white}
                  textColor={selected ? '#ffffff' : '#999999'}
                  title={`${difficulty} (${difficulties[difficulty]})`}
                  onPressFunc={() => {
                    this.handleDifficultyUpdate(difficulties[difficulty])
                  }}
                />
              )
            }) }
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
