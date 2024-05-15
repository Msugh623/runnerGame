import React, { Suspense, lazy } from 'react'
import GameContext from './state/Gamecontext'
import { obstacleTypes } from './assets/schemas'
const Enviroment = lazy(() => import('./components/Enviroment'))

const Layout = () => {
    return (
        <>
            <GameContext>
                <Suspense fallback={<div className='bg-succes'>
                    <div className="d-flex">
                        Loading...
                        <div className="m-auto" style={{
                                position: 'fixed',
                                top: '150vh'
                            }}>
                            <img className=' runner p-0 rounded'
                                src='/media/cycling (1).png'
                                style={{
                                    width: '50px',
                                    height: '50px',
                                }} />
                            <img src={obstacleTypes['ground']} width={'50px'} alt='Obstacle' />
                        </div>
                    </div>
                </div>}>
                    <Enviroment />
                </Suspense>
            </GameContext>
        </>
    )
}

export default Layout