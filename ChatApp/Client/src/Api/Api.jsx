import axios from "axios";
const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_ORIGIN_LINK

     },
    {withCredentials: true})

    export default api