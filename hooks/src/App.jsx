import React from 'react'
import { createContext } from "react";
import CompenentA from "./compoenents/CompenentA"

export const profileConext = createContext(null)
function App() {
  return (
    <>
      <profileConext.provider value={"surya"}>
        <CompenentA />
      </profileConext.provider>


    </>
  )
}

export default App
