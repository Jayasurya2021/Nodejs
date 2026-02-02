import { useState } from "react";
import api from "./Api"
function useApi() {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = async ({ url, method = "get", data = null }) => {
        setLoading(true)
        try {
            const res = await api({
                url,
                method,
                data
            })

            setUserData(res.data)
            return res.data

        } catch (error) {
            setError(error)
            console.log(error)

        }
        setLoading(false)
    }

    return { request, userData, loading, error }
}

export default useApi;