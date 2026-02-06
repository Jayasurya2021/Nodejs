import axios from "axios";
const Api = axios.create({
    baseURL: "http://localhost:5000",
}, {
    withCredentials: true,
})

Api.interceptors.request.use((req)=>{
   const token = localStorage.getItem("token")
    if (token) {
      req.headers.Authorization = `Bearer ${token}`
    }
})
export default Api