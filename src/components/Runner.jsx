import React, { useEffect } from 'react'
import { useGameContext } from '../state/Gamecontext'
import { useStateContext } from '../state/StateContext'

const Runner = () => {
  const { runnerConfig, setRunnerConfig } = useGameContext()
  const { vh } = useStateContext()

  useEffect(() => {
    setRunnerConfig({
      height: 'md',
      left: 80,
      top: `${(vh) / 2}px`,
    })
  }, [vh])

  return (
    <div className='mt-auto o-shown runnerBody' style={{
      position: 'fixed',
      ...runnerConfig
    }}>
      <div className='bg-info runner px-1 rounded'>
        runner
      </div>
    </div>
  )
}

export default Runner