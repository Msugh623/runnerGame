import React, { useState, useEffect } from 'react'
import { objectSizes, obstacleTypes } from '../assets/schemas'
import { useGameContext } from '../state/Gamecontext'
import { useStateContext } from '../state/Statecontext'

const Obstacle = ({ obstc }) => {
  const { change, setObstacles, runnerConfig } = useGameContext()
  const { isPlaying, setIsPlaying, gameOver, setGameOver, vh, setPrevSrc } = useStateContext()

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
    setTimeout(() => {
      const runnerClientXMatch = Boolean(Number(config.left) < (Number(runnerConfig.left) + Number(runnerConfig.width)) &&
        Number(config.left) > Number(runnerConfig.left) - Number((runnerConfig.width - 20)))
      const height = Number(config.height.replace('px', ''))
      const top = Number(config.top.replace('px', '')) - height || (vh / 2) - height
      const bottom = top + height + height;
      const runnerTop = Number(runnerConfig.top.replace('px', '')) - Number(runnerConfig.height)
      const runnerBottom = runnerTop + runnerConfig.height
      const runnerClientYMatch = Boolean(runnerTop >= top && runnerTop <= bottom
        || runnerBottom >= top && runnerBottom <= bottom
      )
      const isColided = Boolean(runnerClientXMatch && runnerClientYMatch)

      // runnerClientXMatch &&
      //   setTimeout(() => console.log(runnerTop, runnerBottom, top, bottom))

      isColided && (() => {
        setIsPlaying(false)
        setGameOver(true)
        setPrevSrc(document?.getElementById('env')?.innerHTML)
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
          },);
  }, [change])

  return (
    <pre className={`rounded mt-auto ${obstc.type == 'ground' ? 'bg-danger' : 'bg-dark'} obj p-0`} style={{
      position: 'fixed',
      ...config
    }}>
      {config.children.map(child => obstacleTypes[child] || 'ground')}
    </pre>
  )
}

export default Obstacle