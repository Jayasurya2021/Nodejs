import React, { useRef, useState } from 'react'
import OnlineExamResult from './components/OnlineExamResult'

function App() {

  const outputRef = useRef(0)
const [value, setValue] = useState(0)
  function handleClick(){
    const result = outputRef.current + 1
    console.log(result)
  }

  function hanldeUpdate(){
    setValue(outputRef.current)
  }
  return (
    <div>

      {outputRef.current}
      <button onClick={handleClick}>click</button>
      <button onClick={hanldeUpdate}>update</button>
      {/* <OnlineExamResult/> */}
    </div>
  )
}

export default App
