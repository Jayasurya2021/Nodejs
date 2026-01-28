import { useEffect, useState } from "react";
import axios from "axios";

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
            axios.post("http://localhost:5000/register",{
                name, 
                email,
                password
            },{
                withCredentials: true
            })
                .then((res) => console.log(res))
                .catch(err => console.log(err))
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" value={name} placeholder="name" onChange={(e) => setName(e.target.value)} />
                <input type="text" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <input type="text" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <button>submit</button>
            </form>
        </>
    )
}

export default Register;