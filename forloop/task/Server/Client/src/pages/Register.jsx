
import { useState } from 'react'

const Register = () => {

    const [userData, setUserData] = useState({})
    function storeData(e){
        const {name, value} = e.target
        setUserData({...userData, [name]:value})
        console.log(userData)
    }

    

  return (
    <div>
         <form onSubmit={(e)=>HandleSubmit(e)}>
        <input type="text" name='name'  placeholder="name" onChange={(e)=>setUserData(storeData(e))}/>
        <input type="text" name='email' placeholder="email" onChange={(e)=>setUserData(storeData(e))}/>
        <input type="text" name='gender'  placeholder="gender"onChange={(e)=>setUserData(storeData(e))}/>
        <input type="password"  name='password' placeholder="password" onChange={(e)=>setUserData(storeData(e))}/>
        <input type="password" name='rePassword' placeholder="re-Enter password"onChange={(e)=>setUserData(storeData(e))} />
        <button type="submit">submit</button>
    </form>
    </div>
  )
}

export default Register;
