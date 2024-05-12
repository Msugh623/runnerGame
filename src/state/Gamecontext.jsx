import React, { useContext, createContext, useState } from 'react'

const context = createContext()

export default function GameContext({ children }) {
    const [name, setName] = useState('name')
    return (
        <context.Provider
            value={{
                name
            }}>
            {children}
        </context.Provider>
    )
}

export const useGameContext = () => useContext(context)