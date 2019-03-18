import React from 'react'
import {
  StatusBar, View, NativeModules, Platform,
} from 'react-native'
import Grid from './grid/grid'
import ScoreBoard from './scoreboard/scoreboard'
import PointPopper from './point-popper/point-popper'

class App extends React.Component {
  state = {
    sbHeight: 0,
    score: 0,
    points: 0,
    lastTouch: {},
  }

  componentDidMount = () => {
    const { StatusBarManager } = NativeModules

    const assignHeightAndroid = () => {
      this.setState({ sbHeight: StatusBar.currentHeight })
    }

    const assignHeightIOS = () => StatusBarManager.getHeight(({ height }) => {
      this.setState({ sbHeight: height })
    })
    if (Platform.OS === 'android') {
      assignHeightAndroid()
    }
    else {
      assignHeightIOS()
    }
  }

  componentDidUpdate = () => {

  }

  handleUpdateScore = (scoreIncrease, event) => {
    console.log('Score updating', event)
    const { score } = this.state
    this.setState({
      score: Math.ceil(score + scoreIncrease),
      points: scoreIncrease,
      lastTouch: {
        x: event.pageX,
        y: event.pageY,
      },
    })
  }

  render() {
    const {
      sbHeight, score, points, lastTouch,
    } = this.state

    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <StatusBar barStyle="light-content" />
        <View style={{
          height: sbHeight + 5,
          borderBottomWidth: 5,
          borderColor: '#333',
        }}
        />
        <Grid style={{ paddingVertical: 10 }} handleUpdateScore={this.handleUpdateScore} />
        <View style={{
          flex: 1,
          borderTopWidth: 5,
          borderColor: '#333',
        }}
        >
          <ScoreBoard score={score} points={points} />
        </View>
        <PointPopper coords={lastTouch} points={points} />
      </View>
    )
  }
}

export default App
