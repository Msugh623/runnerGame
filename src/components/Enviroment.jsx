import React, { useEffect, useState } from 'react'
import { useStateContext } from '../state/Statecontext'
import { useGameContext } from '../state/Gamecontext'

import Ground from './Ground'
import GenClouds from './GenClouds'
import GenObstacles from './GenObstacles'
import Runner from './Runner'

const Enviroment = () => {
    const { setIsPlaying, gameOver, } = useStateContext()
    const { jump, change } = useGameContext()
    const [prevScreen, setPrevSrc] = useState('')

    useEffect(() => {
        !gameOver && setPrevSrc(document?.getElementById('env')?.innerHTML)
    }, [change])

    useEffect(() => {
        onkeydown = ({ code }) => {
            // console.log(code)
            code == 'MediaPlayPause' && setIsPlaying(prev => !prev)
            code == 'ArrowUp' && jump()
        }
    }, [])

    return (
        <div className='vh-100 w-100 bg-primary text-white d-flex flex-column ox-hidden' id='env'>
            {!gameOver ?
                < >
                    <GenClouds />
                    <GenObstacles />
                    <Runner />
                    <Ground />
                </>
                :
                <div className='d-flex p-3 p-sm-4 p-md-5'>
                    <h1 className='p-1'>Game Over</h1>
                    <div className='ms-auto'>
                        <button onClick={() => location.reload()}>🔄</button>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: prevScreen }}>
                    </div>
                </div>
            }
        </div >
    )
}

export default Enviroment