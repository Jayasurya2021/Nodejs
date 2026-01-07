import axios from "axios";

const reportApi = axios.create({
    baseURL: "http://localhost:5000",
});

// Automatically add token
reportApi.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default reportApi;
