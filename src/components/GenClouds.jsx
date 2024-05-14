import React, { useEffect } from 'react'
import Cloud from './Cloud'
import { objectSizes } from '../assets/schemas'
import { useGameContext } from '../state/Gamecontext'
import { useStateContext } from '../state/Statecontext'

const GenClouds = () => {
  const { clouds, setClouds } = useGameContext()
  const { isPlaying, gameOver } = useStateContext()

  const sizes = Object.keys(objectSizes)
  function addCloud() {
    const randomSize = sizes[Math.floor(Math.random() * 3)]
    const numObstacles = Math.floor(Math.random() * 2)
    const id = `obst${Math.floor(Math.random() * 10000000)}`

    let newCloud = {
      id,
      size: randomSize,
      children: [],
      speed: Math.floor(Math.random() * 3) + 1
    }
    for (let i = 0; i < numObstacles; i++) {
      newCloud.children.push('cloud')
    }
    setClouds(prev => ([...prev, newCloud]))
  }
  useEffect(() => {
    setTimeout(addCloud)
    setInterval(() => {
      const rnm = Math.floor(Math.random() * 6000)
      const randomNo = rnm > 1000 ? rnm : 5000
      clouds.length < 5 && isPlaying && !gameOver && setTimeout(addCloud, randomNo)
    }, 8000)
  }, [])

  return (
    <div>
      {clouds.map(cloud => (
        <Cloud key={cloud.id} cloud={cloud} />
      ))}
    </div>
  )
}

export default GenClouds