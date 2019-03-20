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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Theme.Text>DIFFICULTY</Theme.Text>
        <Theme.Text>This changes the number of colors on the board!</Theme.Text>
        <Picker
          selectedValue={options.difficulty}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue) => {
            this.handleDifficultyUpdate(itemValue)
          }}
        >
          { Object.keys(difficulties).map((difficulty) => (
            <Picker.Item key={difficulty} label={`${difficulty} (${difficulties[difficulty]})`} value={difficulties[difficulty]}></Picker.Item>
          ))}
        </Picker>
      </View>
    )
  }
}

export default OptionsScreen
