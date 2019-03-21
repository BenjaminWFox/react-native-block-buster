import React from 'react'
import { View, Picker } from 'react-native'
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

  // componentDidMount = async () => {
  //   const options = await getOptions()

  //   this.setState({ options })
  // }

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
          <Theme.Text>DIFFICULTY</Theme.Text>
          <Theme.Text>(colors on the board)</Theme.Text>
          <Picker
            selectedValue={options.difficulty}
            onValueChange={(itemValue) => {
              this.handleDifficultyUpdate(itemValue)
            }}
          >
            { Object.keys(difficulties).map((difficulty) => (
              <Picker.Item key={difficulty} label={`${difficulty} (${difficulties[difficulty]})`} value={difficulties[difficulty]}></Picker.Item>
            ))}
          </Picker>
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
