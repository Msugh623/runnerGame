import React, { Suspense, lazy } from 'react'
import GameContext from './state/Gamecontext'
const Enviroment = lazy(() => import('./components/Enviroment'))

const Layout = () => {
    return (
        <>
            <GameContext>
                <Suspense fallback={'loading...'}>
                    <Enviroment />
                </Suspense>
            </GameContext>
        </>
    )
}

export default Layout