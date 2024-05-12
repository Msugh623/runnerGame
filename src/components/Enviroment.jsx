import React, { useEffect } from 'react'
import { useGameContext } from '../state/GameContext'

import Ground from './Ground'
import GenClouds from './GenClouds'
import GenObstacles from './GenObstacles'
import Runner from './Runner'

const Enviroment = () => {
    
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