import React, { useState, useEffect } from 'react'
import { objectSizes, obstacleTypes } from '../assets/schemas'
import { useGameContext } from '../state/Gamecontext'

const Obstacle = ({ obstc }) => {
  const { change, setObstacles } = useGameContext()

  const [config, setConfig] = useState({
    height: objectSizes[obstc.size],
    left: window.innerWidth,
    top: obstc.type == 'flyes' ?
      `${(Math.floor(Math.random() * window.innerHeight) / 2) / 2}px`
      : `calc( ${window.innerHeight / 2}px - ${objectSizes[obstc.size]})`,
    id: obstc.id,
    children: obstc.children
  })
  useEffect(() => {
    setConfig(prev => {
      const newLeft = config.left - obstc.speed
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
        left: newLeft
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