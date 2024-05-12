import React, { useEffect, useState } from 'react'
import { useGameContext } from '../state/Gamecontext'
import { useStateContext } from '../state/Statecontext'
import { objectSizes } from '../assets/schemas'

const Cloud = ({ cloud }) => {
  const { change, setObstacles } = useGameContext()
  const { isPlaying, gameOver } = useStateContext()

  const [config, setConfig] = useState({
    height: objectSizes[cloud.size],
    left: window.innerWidth,
    top: `${(Math.floor(Math.random() * window.innerHeight) / 2) / 3}px`,
    id: cloud.id,
    children: cloud.children
  })
  useEffect(() => {
    isPlaying && !gameOver && setConfig(prev => {
      const newLeft = config.left - cloud.speed
      newLeft < -100 &&
        (() => {
          setObstacles(prev => {
            const currObstacles = prev
            const processed = currObstacles.filter(cloud => cloud.id != config.id)
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
    <pre className={`rounded mt-auto bg-light cloud obj`} style={{
      position: 'fixed',
      ...config
    }}>
      {config.children.map(() => '______')}
    </pre>
  )
}

export default Cloud