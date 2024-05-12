import { useState } from 'react'
import './App.css'
import StateContext from './state/Statecontext'
import Layout from './Layout'

function App() {

  return (
    <StateContext>
      <Layout />
    </StateContext>
  )
}

export default App
