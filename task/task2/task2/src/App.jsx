import { useState } from 'react'
import './App.css'

function App() {
  const [data, setdata] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])

  function handlechange() {

  }
  return (
    <>

      <button >{data[0]}</button>
      <button >{data[1]}</button>
      <button >{data[2]}</button><br />
      <button >{data[3]}</button>
      <button onClick={handlechange} >{data[4]}</button>
      <button >{data[5]}</button>
      <button >{data[6]}</button><br />
      <button >{data[7]}</button>
      <button >{data[8]}</button>
      <button >{data[9]}</button>
    </>
  )
}

export default App
