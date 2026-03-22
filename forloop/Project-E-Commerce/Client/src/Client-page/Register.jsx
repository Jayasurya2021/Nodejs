import { useEffect, useState } from "react"
import useFetch from "../customHooks/useFetch"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
const Register = () => {

  const navigate = useNavigate();


  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user"
  })

  const { fetchData, data, loading, error } = useFetch()

  function handleChange(e) {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
    console.log(userData)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      toast.error("Password Mismatch")
      return;
    }
    console.log("check Password Mismatch")
    fetchData("/client/register", "POST", userData)
    console.log("fetch check")
  }
  useEffect(() => {
      if (data?.token) {
        console.log("check")
        setUserData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "user"
        })
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

        <input
          type="text"
          name="name"
          placeholder="Your name"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Re-enter password"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

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
