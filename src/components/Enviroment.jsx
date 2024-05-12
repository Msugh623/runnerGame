import React, { useEffect } from 'react'
import { useStateContext } from '../state/StateContext'
import { useGameContext } from '../state/GameContext'

import Ground from './Ground'
import GenClouds from './GenClouds'
import GenObstacles from './GenObstacles'
import Runner from './Runner'

const Enviroment = () => {
    const { setIsPlaying } = useStateContext()
  const { jump } = useGameContext()

    useEffect(() => {
        onkeydown = ({ code }) => {
            // console.log(code)
            code == 'MediaPlayPause' && setIsPlaying(prev => !prev)
            code == 'ArrowUp' && jump()
        }
    }, [])
    return (
        <div className='vh-100 w-100 bg-primary text-white d-flex flex-column ox-hidden'>
            <GenClouds />
            <GenObstacles />
            <Runner />
            <Ground />
        </div>
    )
}

export default Enviroment