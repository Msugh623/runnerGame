import React, { useContext, createContext, useState, useEffect } from 'react'

const context = createContext()

export default function GameContext({ children }) {
    const [change, setChange] = useState(Number(new Date()))
    const [obstacles, setObstacles] = useState([])
    const [clouds, setClouds] = useState([])
    const [isPlaying, setIsPlaying] = useState(true)

    useEffect(() => {
        setInterval(() => {
            const playState = isPlaying
            playState && setChange(Number(new Date()))
        }, 100)
        onkeyup = ({ code }) => {
            code == 'MediaPlayPause' && setIsPlaying(false)
        }
    }, [])

    return (
        <context.Provider
            value={{
                change,
                clouds,
                setClouds,
                obstacles,
                setObstacles,
                isPlaying,
                setIsPlaying,
            }}>
            {children}
        </context.Provider>
    )
}

export const useGameContext = () => useContext(context)