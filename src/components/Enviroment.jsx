import React from 'react'
import { useGameContext } from '../state/Gamecontext'

const Enviroment = () => {
    const { name } = useGameContext()
    return (
        <div>
            {name}
        </div>
    )
}

export default Enviroment