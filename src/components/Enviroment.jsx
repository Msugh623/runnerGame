import React, { useEffect } from 'react'
import { useStateContext } from '../state/Statecontext'
import { useGameContext } from '../state/Gamecontext'

import Ground from './Ground'
import GenClouds from './GenClouds'
import GenObstacles from './GenObstacles'
import Runner from './Runner'

const Enviroment = () => {
    const { setIsPlaying, gameOver, prevScreen, vw } = useStateContext()
    const { jump, score, highScore, setLog, runnerConfig } = useGameContext()

    useEffect(() => {
        onkeydown = ({ code }) => {
            console.log(code)
            code == 'MediaPlayPause' && setIsPlaying(prev => !prev)
            code == 'ArrowUp' || code == 'Space' &&
                (() => {
                    jump()
                })()
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
                    <h1 className='px-2 mb-0 bg-slate shadow-lg'
                        style={{
                            backdropFilter: 'blur(10px)'
                        }}>Game Over</h1>
                    <div className='z-3 d-flex' style={{
                        position: 'fixed',
                        top: '40vh',
                        left: '0',
                        right: '0',
                    }}>
                        <div className="mx-auto shadow-lg rounded p-2 bg-slate pop">
                            <div>Score: {score} High: {highScore}</div>
                            <div className='d-flex'>
                                <div className="m-auto">
                                    <button className='z-4 fs-2 border-0 btn p-0 rounded-circle'
                                        autoFocus
                                        onClick={() => location.reload()}>
                                        <div className="rtt-180">🔄</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: prevScreen }}>
                    </div>
                </div>
            }
        </div >
    )
}

export default Enviroment