import React, { useContext, createContext, useState, useEffect } from 'react'
import { useStateContext } from './Statecontext'

const context = createContext()

export default function GameContext({ children }) {
    const { isPlaying, vh, setDidJump } = useStateContext()
    const [change, setChange] = useState(Number(new Date()))
    const [obstacles, setObstacles] = useState([])
    const [clouds, setClouds] = useState([])
    const [score, setScore] = useState(0)
    const [avrgSpeed, setAvrgSpeed] = useState(30)
    const [highScore, setHighScore] = useState(Number(localStorage.highScore) || 0)
    const [log, setLog] = useState('')

    const [runnerConfig, setRunnerConfig] = useState({
        height: 'md',
        left: -20,
        top: `${(vh) / 2}px`,
    })

    function jump() {
        setRunnerConfig({
            left: window.innerWidth / 4,
            top: `${(vh) / 2}px`,
            width: 54,
            height: 54
        })
        let jh = Number(runnerConfig.top.replace('px', ''))
        const interval = setInterval(() => {
            let nextVal = jh - 10
            jh = nextVal
            setRunnerConfig(prev => ({
                ...prev,
                top: `${nextVal}px`
            }))
        }, 18);
        setTimeout(() => {
            clearInterval(interval)
            const newInterval = setInterval(() => {
                let nextVal = jh + 10
                jh = nextVal
                if (nextVal >= (vh) / 2) {
                    nextVal = vh / 2
                    setRunnerConfig(prev => ({
                        ...prev,
                        top: `${nextVal}px`
                    }))
                    return clearInterval(newInterval)
                }
                setRunnerConfig(prev => ({
                    ...prev,
                    top: `${nextVal}px`
                }))
            }, 18);
            setTimeout(() => {
                clearInterval(newInterval)
                setRunnerConfig({
                    left: window.innerWidth / 4,
                    top: `${(vh) / 2}px`,
                    width: 54,
                    height: 54
                })
                setLog('')
                setDidJump(false)
            }, 300);
        }, 300);
    }

    useEffect(() => {
        setInterval(() => {
            const playState = isPlaying
            playState && setChange(Number(new Date()))
        }, 100)
        setInterval(() => {
            setAvrgSpeed(prev => prev + 5)
        }, 1000 * 15)
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
                jump,
                score,
                setScore,
                highScore,
                setHighScore,
                log,
                setLog,
                avrgSpeed,
                setAvrgSpeed
            }}>
            {children}
        </context.Provider>
    )
}

export const useGameContext = () => useContext(context)