import React, { useEffect } from 'react'
import { useGameContext } from '../state/Gamecontext'
import { useStateContext } from '../state/Statecontext'

const Runner = () => {
  const { runnerConfig, setRunnerConfig } = useGameContext()
  const { vh } = useStateContext()

  useEffect(() => {
    setRunnerConfig({
      left: window.innerWidth / 4,
      top: `${(vh) / 2}px`,
      width: 54,
      height: 54,
    })
  }, [vh])

  return (
    <div className='mt-auto o-shown runnerBody' style={{
      position: 'fixed',
      ...runnerConfig
    }}>
      <div className='bg-info runner px-1 rounded'
        style={{
          width: runnerConfig.width,
          height: runnerConfig.height,
        }}>
        runner
      </div>
    </div>
  )
}

export default Runner