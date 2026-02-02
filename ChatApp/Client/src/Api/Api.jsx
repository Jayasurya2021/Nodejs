import axios from "axios";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
     },
    {withCredentials: true})

    api.interceptors.response.use(()=>{
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return token;
    })

    export default api