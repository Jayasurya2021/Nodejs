import { useState } from "react";

function SignUp() {

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    Username:"",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e){
    e.preventDefault()
    const emailFormet = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors = {};
    if(!userData.name.length<6) newErrors.name = "Minmum six Characters"
    if(!emailFormet.test(userData.email)) newErrors.email = "Please Enter Valid Email Id"
    if(!userData.password.length<6) newErrors.password = "Minmum six Characters"
    if(!userData.mobile.length<=10) newErrors.mobile = "Please Enter Valid Mobile Number"
   
  }
  
  return (
    <div>
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="Username"
            placeholder="Enter your name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            placeholder="Enter mobile number"
            value={userData.mobile}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>

      <div>
        Already have an account? Login
      </div>
    </div>
  );
}

export default SignUp;
