import React, { useContext, createContext, useState, useEffect } from 'react'

const context = createContext()

export default function StateContext({ children }) {
    const [gameOver, setGameOver] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true)
    const [vh, setVh] = useState(window.innerHeight)
    const [vw, setVw] = useState(window.innerWidth)
    const [prevScreen, setPrevSrc] = useState('')
    const [didJump, setDidJump] = useState(false)

    useEffect(() => {
        window.onresize = () => {
            setTimeout(() => {
                setVh(window.innerHeight)
                setVw(window.innerWidth)
            })
        }
    }, [])
    return (
        <context.Provider
            value={{
                isPlaying,
                setIsPlaying,
                vh,
                setVh,
                vw,
                setVw,
                gameOver,
                setGameOver,
                prevScreen,
                setPrevSrc,
                didJump,
                setDidJump
            }}>
            {children}
        </context.Provider>
    )
}

export const useStateContext = () => useContext(context)