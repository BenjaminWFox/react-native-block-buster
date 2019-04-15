import React from 'react'
import CenteredMessage from '../game-messages/centered-message'

export const tilesBrokenEvent = (audioManager, hitTiles = 1) => {
  let notesToPlay = 1

  if (hitTiles > 3) {
    notesToPlay = 2
  }

  if (hitTiles > 5) {
    notesToPlay = 3
  }

  audioManager.playHarmonyChord(notesToPlay)
}

export const gameOverEvent = (audioManager) => {
  // console.log('GAME OVER!')
  audioManager.playGameOverSound()
}

export const getGameOverMessage = (width, height) => (<CenteredMessage width={width} height={height} messageTextArray={['Game', 'Over']} autoOut={false} />)

export const highScoreSurpassedEvent = (audioManager) => {
  // console.log('NEW HIGH SCORE!!')
  audioManager.playNewHighScoreSound()
}

export const getNewHighScoreMessage = (width, height) => (<CenteredMessage width={width} height={height} messageTextArray={['Woah Nice!', 'New High Score!']} autoOut />)

export const tilesDeSpawnedEvent = () => {

}
