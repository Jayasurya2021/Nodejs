import React, { createContext, useContext } from 'react'
import { UserContext } from './compoenents/userProvider'

function App() {

  const { name } = useContext(UserContext)

  return (
    <div>
      {name}
    </div>
  )
}

export default App
