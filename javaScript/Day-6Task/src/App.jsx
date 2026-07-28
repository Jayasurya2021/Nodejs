import React, { useEffect, useRef, useState } from 'react'

function App() {

  const outputRef = useRef("")

  useEffect(()=>{
    outputRef.current
  })

  return (
    <div>

      <input type="text" value={outputRef.current} ref={outputRef} />
      <button onClick={handleClick}>click</button>

    </div>
  )
}

export default App
