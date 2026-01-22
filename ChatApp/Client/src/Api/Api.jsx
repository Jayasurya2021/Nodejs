import axios from "axios";

const api = axios.create({
    baseUrl:"http://localhost:5000"

     },
    {withCredentials: true,})

    export default api