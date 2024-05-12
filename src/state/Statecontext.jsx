import React, { useContext, createContext } from 'react'

const context = createContext()

export default function StateContext({ children }) {
    return (
        <context.Provider
            value={{

            }}>
            {children}
        </context.Provider>
    )
}

export const useStateContext = () => useContext(context)