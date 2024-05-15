import React, { useEffect } from 'react'
import { useGameContext } from '../state/Gamecontext'
import { useStateContext } from '../state/Statecontext'

const Ground = () => {
  const { score, setScore, setHighScore, highScore, change , log,jump} = useGameContext();
  const { isPlaying, gameOver } = useStateContext();

  useEffect(() => {
    isPlaying && !gameOver && setScore(prev => {
      const nextScore = Number(prev) + 1
      nextScore > highScore &&
        (() => {
          setHighScore(nextScore)
          localStorage.highScore = nextScore
        })();
      return nextScore
    })
  }, [change])

  return (
    <div className='nav ground bg-success' onClick={jump}>
      <div className="d-flex">
        <div className="mt-auto small ps-2">
          <div>{log}</div>
          Score: {score},  HI: {highScore}
        </div>
      </div>
    </div>
  )
}

export default Ground