import React from 'react'
import { playSound, playGameOverSound, playNewHighScoreSound } from '../../classes/audio/audio-manager'
import CenteredMessage from '../game-messages/centered-message'

export const tilesBrokenEvent = () => {
  playSound()
}

export const gameOverEvent = () => {
  // console.log('GAME OVER!')
  playGameOverSound()
}

export const getGameOverMessage = (width, height) => (<CenteredMessage width={width} height={height} messageTextArray={['Game', 'Over']} autoOut={false} />)

export const highScoreSurpassedEvent = () => {
  // console.log('NEW HIGH SCORE!!')
  playNewHighScoreSound()
}

export const getNewHighScoreMessage = (width, height) => (<CenteredMessage width={width} height={height} messageTextArray={['Woah Nice!', 'New High Score!']} autoOut />)

export const tilesDeSpawnedEvent = () => {

}
