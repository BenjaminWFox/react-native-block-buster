import React from 'react'
import { View } from 'react-native'
import Theme from '../theme'
import { difficulties } from '../classes/options-manager'
import ScoreManager from '../components/score-manager/score-manager'

class HighScoresScreen extends React.Component {
  state = {
    highScores: [],
  }

  componentDidMount = async () => {
    this.updateHighScores()
  }

  updateHighScores = async () => {
    const scoreArray = []
    const blastArray = []

    const [scores, blasts] = await Promise.all(
      Object.keys(difficulties).map((key) => ScoreManager.getHighScore(difficulties[key])),
      Object.keys(difficulties).map((key) => ScoreManager.getHighBlast(difficulties[key])),
    )

    console.log('SCORES', scores)
    console.log('BLASTS', blasts)

    Object.keys(difficulties).forEach((key, index) => {
      scoreArray.push({
        difficulty: key,
        score: scores[index],
      })
      blastArray.push({
        difficulty: key,
        blast: blasts[index],
      })
    })

    this.setState({
      highScores: scoreArray,
      highBlasts: blastArray,
    })
  }

  clearHighScore = async (difficulty) => {
    await ScoreManager.deleteHighScore(difficulties[difficulty])

    this.updateHighScores()
  }

  render() {
    const { highScores, highBlasts } = this.state

    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000000',
      }}
      >
        {highScores.map((scoreObject, i) => (
          <View
            key={scoreObject.difficulty}
            style={{
              margin: 5, justifyContent: 'center', alignItems: 'center',
            }}
          >
            <Theme.Text style={{ fontSize: 30 }}>
              {scoreObject.difficulty}
              {' '}
              :
              {' '}
              {scoreObject.score}
              {' / '}
              {highBlasts[i].blast}
            </Theme.Text>
            <Theme.Button
              title="reset"
              variant="small"
              backgroundColor={Theme.colors.jewel.red}
              textColor={Theme.colors.white}
              onPressFunc={() => {
                this.clearHighScore(scoreObject.difficulty)
              }}
            >
            </Theme.Button>
          </View>
        ))}
      </View>
    )
  }
}
export default HighScoresScreen
