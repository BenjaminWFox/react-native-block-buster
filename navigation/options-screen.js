import React from 'react'
import {
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import Theme from '../theme'
import { setOptions, difficulties } from '../classes/options-manager'

class OptionsScreen extends React.Component {
  constructor(props) {
    super(props)

    const options = props.route.params?.gameOptions ?? {}

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

  handleSoundUpdate = (hasSound) => {
    const { options } = this.state

    console.log('event:', hasSound)

    options.sound = hasSound

    setOptions(options)

    this.setState({ options })
  }

  handleSoundOn = () => {
    this.handleSoundUpdate(true)
  }

  handleSoundOff = () => {
    this.handleSoundUpdate(false)
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
          <View>
            <View>
              <Theme.Text>SOUND</Theme.Text>
            </View>
            <View>
              <Theme.Button
                title="On"
                backgroundColor={options.sound ? Theme.colors.jewel.orange : Theme.colors.white}
                textColor={options.sound ? '#ffffff' : '#999999'}
                onPressFunc={this.handleSoundOn}
              />
              <Theme.Button
                title="Off"
                backgroundColor={!options.sound ? Theme.colors.jewel.orange : Theme.colors.white}
                textColor={!options.sound ? '#ffffff' : '#999999'}
                onPressFunc={this.handleSoundOff}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

OptionsScreen.propTypes = {
  route: PropTypes.object.isRequired,
}

export default OptionsScreen
