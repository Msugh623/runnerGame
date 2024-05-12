import React, { useContext, createContext, useState, useEffect } from 'react'
import { useStateContext } from './Statecontext'

const context = createContext()

export default function GameContext({ children }) {
    const { isPlaying,vh } = useStateContext()
    const [change, setChange] = useState(Number(new Date()))
    const [obstacles, setObstacles] = useState([])
    const [clouds, setClouds] = useState([])

    const [runnerConfig, setRunnerConfig] = useState({
        height: 'md',
        left: 50,
        top: `${(vh) / 2}px`,
    })

    function jump() {
        setRunnerConfig(prev => ({
            ...prev,
            top: `${((vh) / 2) - 30}px`
        }))
        setTimeout(() => {
            setRunnerConfig(prev => ({
                ...prev,
                top: `${((vh) / 2) - 60}px`
            }))
        }, 200)
        setTimeout(() => {
            setRunnerConfig(prev => ({
                ...prev,
                top: `${((vh) / 2) - 90}px`
            }))
        }, 400)
        setTimeout(() => {
            setRunnerConfig(prev => ({
                ...prev,
                top: `${((vh) / 2) - 120}px`
            }))
        }, 600)
        setTimeout(() => {
            setRunnerConfig(prev => ({
                ...prev,
                top: `${((vh) / 2) - 80}px`
            }))
        }, 800)
        setTimeout(() => {
            setRunnerConfig(prev => ({
                ...prev,
                top: `${((vh) / 2) - 30}px`
            }))
        }, 1000)
        setTimeout(() => {
            setRunnerConfig(prev => ({
                ...prev,
                top: `${((vh) / 2) - 20}px`
            }))
        }, 1400)
        setTimeout(() => {
            setRunnerConfig(prev => ({
                ...prev,
                top: `${((vh) / 2)}px`
            }))
        }, 1600)
    }

    useEffect(() => {
        setInterval(() => {
            const playState = isPlaying
            playState && setChange(Number(new Date()))
        }, 100)
    }, [])

    return (
        <context.Provider
            value={{
                change,
                clouds,
                setClouds,
                obstacles,
                setObstacles,
                runnerConfig,
                setRunnerConfig,
                jump
            }}>
            {children}
        </context.Provider>
    )
}

export const useGameContext = () => useContext(context)