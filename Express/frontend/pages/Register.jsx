import { useState } from "react";


function Register (){
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
function handlechange(e){
e.preventdefault()

}

    return(
        <>
        <form onSubmit={handlechange}>
            <input type="text" value={name} onChange={()=>setName(e.target.value)} placeholder="Enter your Name" />
            <input type="text" value={email} onChange={()=>setEmail(e.target.value)} placeholder="Enter your email" />
            <input type="text" value={password} onChange={()=>setPassword(e.target.value)} placeholder="Enter your password" />
            <button>Register</button>
        </form>
        </>
    )

}

export default Register;