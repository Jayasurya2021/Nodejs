import {createContext, useState } from 'react'


const messageContext = createContext({Children});


function Provider() {

  
  const [message , setMessage] = useState("this is message")

  return (
    <messageContext.Provider value={[message , setMessage ]}>
      {Children}
    </messageContext.Provider>
  )
}

export {Provider}

export default messageContext;
