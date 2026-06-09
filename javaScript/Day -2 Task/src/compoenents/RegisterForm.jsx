import React, { useState } from 'react'

const RegisterForm = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function HandleSubmit(e) {
        e.preventDefault()
        if (email.length <= 0){
             return alert("email must be required")}
        if (password.length < 6){
             return alert("password at least 6 characters ")}

         alert("login succesfully")

    }
    return (    
        <div>
            <form onSubmit={HandleSubmit}>
                <input type="text" value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>submit</button>
            </form>

        </div>
    )
}

export default RegisterForm
