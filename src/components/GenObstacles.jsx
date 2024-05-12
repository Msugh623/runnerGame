import React, { useEffect } from 'react'
import Obstacle from "./Obstacle"
import { useGameContext } from '../state/Gamecontext'
import { objectSizes, obstacleTypes } from '../assets/schemas'

const GenObstacles = () => {
  const { obstacles, setObstacles } = useGameContext()
  const sizes = Object.keys(objectSizes)
  const types = Object.keys(obstacleTypes)

  function addObstacle() {
    const randomSize = sizes[Math.floor(Math.random() * 3)]
    const randomType = types[Math.floor(Math.random() * 2)] || 'ground'
    const numObstacles = randomType == 'flyes' ? 2 : Math.floor(Math.random() * 2)
    const id = `obst${Math.floor(Math.random() * 10000000)}`

    let newObstacle = {
      id,
      type: randomType,
      size: randomSize,
      children: [],
      speed: randomType == 'flyes' ? 10 : 5
    }
    for (let i = 0; i < numObstacles; i++) {
      newObstacle.children.push(newObstacle.type)
    }
    setObstacles(prev => ([...prev, newObstacle]))
  }

  useEffect(() => {
    setTimeout(addObstacle)
    setInterval(() => {
      const rnm = Math.floor(Math.random() * 5000)
      const randomNo = rnm > 2000 ? rnm : 4000
      setTimeout(addObstacle, randomNo)
    }, 5000)
  }, [])

  return (
    <div>
      {
        obstacles.map(obstc => (
          <Obstacle key={obstc.id} obstc={obstc} />)
        )
      }
    </div>
  )
}

export default GenObstacles