// import { useState } from "react"
import Login from "./Login"


function App() {

//  const [data2 , setData2] = useState()
  const datas = "1.this is the passing data to parent component to a a child component"

  //  function callBack({data1}){
  //   setData2(data1)
  //   }


  return (
    <>
    {/* <h4>{data2}</h4> */}
      <Login datas={datas}/>
    </>
  )
}

export default App
