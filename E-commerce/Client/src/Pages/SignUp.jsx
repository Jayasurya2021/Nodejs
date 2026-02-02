import {useState } from "react";
import {}

function SignUp() {

    const [userData, SetUserData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
    })
    function handleChange(e) {
        const {name, value} = e.target
        SetUserData({ ...userData, [name]: value })
        console.log(userData)
    }
    function RegisterData(){
        if(userData.name.length!==6) "Minimum Six Characters"
        const emailVerification = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailFormet.test(email)) newErrors.email = "Enter a valid email";
        if(userData.mobile.length!==10) "Please Enter Valid Mobile Number"
        if(userData.password.length!==6) "Minimum Six Characters"
        if(userData.password!==userData.confirmPassword) "Your Password and Conform Password are different"
    }



    return (
        <>
            <div>
                <h2>Create Account</h2>
                <form onSubmit={RegisterData}>
                    <div>
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={userData.name}
                            name="name"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Email</label>
                       <input
                            type="email"
                            placeholder="Enter your Email"
                            value={userData.email}
                            name="email"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Mobile Number</label>
                        <input
                            type="number"
                            placeholder="Enter your Mobile"
                            value={userData.mobile}
                            name="mobile"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="text"
                            placeholder="Enter your Password"
                            value={userData.password}
                            name="password"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Confirm Password</label>
                        <input
                            type="text"
                            placeholder="Enter your confirmPassword"
                            value={userData.confirmPassword}
                            name="confirmPassword"
                            onChange={handleChange}
                        />
                    </div>

                    <button>Register</button>
                </form>

                <div>
                    Already have an account? Login
                </div>
            </div>
        </>
    )
}

export default SignUp;