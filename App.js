import React from 'react'
import {
  StatusBar, View, NativeModules, Platform, SafeAreaView,
} from 'react-native'
import Grid from './components/grid/grid'
// import ScoreBoard from './components/score-manager/scoreboard'
// import PointPopper from './components/score-manager/point-popper'
import ScoreManager from './components/score-manager/score-manager'
import Theme from './theme'

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
          borderTopWidth: 2,
          borderColor: '#333',
          flexDirection: 'column',
        }}
        >
          <ScoreManager.Scoreboard score={score} points={points} />
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            >
              <View style={{
                flexGrow: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
              >
                <Theme.Text>Moves Left</Theme.Text>
                <Theme.Text>10</Theme.Text>
              </View>
              <View style={{
                flexGrow: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
              >
                <Theme.Text>High Score</Theme.Text>
                <Theme.Text>10,000</Theme.Text>
              </View>
              <View style={{
                flexGrow: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
              >
                <Theme.Text>Restart</Theme.Text>
                <Theme.Text>[O]</Theme.Text>
              </View>
            </View>
          </SafeAreaView>
        </View>
        <ScoreManager.PointPopper coords={lastTouch} points={points} />
      </View>
    )
  }
}

export default App
