import { useEffect, useState } from "react"
import useFetch from "../customHooks/useFetch"
import { useNavigate } from "react-router-dom"
function Login() {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const { fetchData, data, error, loading } = useFetch()

    function handleChange(e) {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetchData("/client/login", "POST", userData)
    }

    useEffect(() => {
        if (data?.token) {
            localStorage.setItem("token", data.token)
            navigate("/")

        }
    }, [data, error])




    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-80"
            >
                <h2 className="text-xl font-bold mb-4 text-center">Login Account</h2>

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


                <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded font-semibold"
                >
                    {loading ? "Loading..." : "Login Your account"}
                </button>
            </form>
        </div>
    )
}

export default Login
