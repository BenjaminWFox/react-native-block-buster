import React from 'react'
import { View, Picker, Platform } from 'react-native'
import Theme from '../theme'
import { getOptions, setOptions, difficulties } from '../classes/options-manager'

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
      <View style={{
        flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}
      >
        <View>
          <View style={{ zIndex: 2, backgroundColor: '#ffffff' }}>
            <Theme.Text>DIFFICULTY</Theme.Text>
            <Theme.Text>(colors on the board)</Theme.Text>
          </View>
          <View style={{ zIndex: 1 }}>
            <Picker
              selectedValue={options.difficulty}
              mode="dropdown"
              onValueChange={(itemValue) => {
                this.handleDifficultyUpdate(itemValue)
              }}
              style={{
                marginTop: Platform.OS === 'ios' ? -60 : 0,
              }}
              itemStyle={{
                fontFamily: Theme.fontFamily,
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
        <View>
          <Theme.Text>
            Clear High Scores
          </Theme.Text>
        </View>
        <View>
          <Theme.Text>
            Show Tutorial Next Launch
          </Theme.Text>
        </View>
      </View>
    )
  }
}

export default OptionsScreen
