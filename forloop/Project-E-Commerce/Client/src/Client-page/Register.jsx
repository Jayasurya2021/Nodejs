import { useEffect, useState } from "react"
import useFetch from "../customHooks/useFetch"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
const Register = () => {

  const navigate = useNavigate();

  // form datas state varaible
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [verifyopt, setVerifyopt] = useState(false)

  // mobile state variable 
  const [mobile, setMobile] = useState()

  // custom hook for data fetching
  const { fetchData, data, loading, error } = useFetch()

  // otp Generate
  function GenerateOtp() {
    fetchData("/otp/generate", "POST", { mobile })
  }

  // otp verification
  function otpverification() {
    fetchData("/otp/verification", "POST", { otp })
  }
  // form data submision
  function handleSubmit(e) {
    e.preventDefault();
    // checking the password 
    if (password !== confirmPassword) {
      toast.error("Password Mismatch")
      return;
    }
    console.log("check Password Mismatch")
    const payload = { name, email, password, mobile, role: "user" }
    fetchData("/client/register", "POST", payload)
    console.log("fetch check")
  }
  // varifiy the user datas
  useEffect(() => {
    // opt verification
    if (data?.otpVerifivation) {
      setVerifyopt(true)
    }
    if (data?.token && (verifyopt || data?.otpverification) ) {
      console.log("check")
      // store the token in local storage
      localStorage.setItem("token", data.token)
      console.log(data)
      navigate("/clientlogin")

    } else {
      console.log(error)
    }
  }, [data, error])


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Create Account</h2>
        {/* User name */}
        <input
          type="text"
          name="name"
          placeholder="Your name"
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        {/* user Email */}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        {/* mobile */}
        <input
          type="text"
          name="mobile"
          placeholder="mobile"
          onChange={(e) => setMobile(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        {/* confirm password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Re-enter password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        {/* opt generate button */}
        <button type="button" onClick={GenerateOtp}   className="w-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all duration-200 text-white font-semibold py-2 rounded-lg shadow-md mt-2">
          Generate Otp
        </button>
        {/* opt enter input feild */}
        <input
          type="text"
          name="Otp"
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Otp"
          className="w-full mb-4 p-2 border rounded"
        />
        {/* verifiy the opt button */}
        <button type="button" onClick={otpverification}   className="w-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all duration-200 text-white font-semibold py-2 rounded-lg shadow-md mt-2">
          verify Otp
        </button>

        {/* form submision button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded font-semibold"
        >

          {loading ? "Creating..." : "Create your account"}
        </button>
      </form>
    </div>
  )
}

export default Register
