import React, { useState, useEffect } from 'react'
import { objectSizes, obstacleTypes } from '../assets/schemas'
import { useGameContext } from '../state/Gamecontext'
import { useStateContext } from '../state/Statecontext'

const Obstacle = ({ obstc }) => {
  const { change, setObstacles, runnerConfig } = useGameContext()
  const { isPlaying, setIsPlaying, gameOver, setGameOver, vh } = useStateContext()

  const [config, setConfig] = useState({
    height: objectSizes[obstc.size],
    left: window.innerWidth,
    top: obstc.type == 'flyes' ?
      `${(Math.floor(Math.random() * vh) / 2) / 1.2}px`
      : `calc( ${vh / 2}px - ${objectSizes[obstc.size]})`,
    id: obstc.id,
    children: obstc.children
  })

  useEffect(() => {
    const runnerClientXMatch = Boolean(Number(config.left) < 125 && Number(config.left) > 80)
    const height = Number(config.height.replace('px', ''))
    const top = Number(config.top.replace('px', ''))-height || (vh / 2)-height
    const runnerTop = Number(runnerConfig.top.replace('px', ''))
    const runnerClientYMatch = Boolean((runnerTop < top + height) && (runnerTop > top))
    const isColided = Boolean(runnerClientXMatch && runnerClientYMatch)
    runnerClientXMatch && console.log(runnerTop, top + height, top)
    isColided && (() => {
      setIsPlaying(false)
      setGameOver(true)
      alert('Game Over')
    })()
    isPlaying && !gameOver && setConfig(prev => {
      const speed = obstc.type == 'ground' ?
        obstc.speed < 3 ? 5 : obstc.speed
        : obstc.speed < 5 ? 10 : obstc.speed
      const newLeft = config.left - speed
      newLeft < -100 &&
        (() => {
          setObstacles(prev => {
            const currObstacles = prev
            const processed = currObstacles.filter(obstc => obstc.id != config.id)
            return processed
          })
        })()
      return {
        ...prev,
        left: newLeft,
        top: obstc.type == 'ground' ?
          `calc( ${vh / 2}px - ${objectSizes[obstc.size]})`
          : prev.top
      }
    })

  }, [change])

  return (
    <pre className={`rounded mt-auto ${obstc.type == 'ground' && 'bg-danger'} obj`} style={{
      position: 'fixed',
      ...config
    }}>
      {config.children.map(child => obstacleTypes[child])}
    </pre>
  )
}

export default Obstacle