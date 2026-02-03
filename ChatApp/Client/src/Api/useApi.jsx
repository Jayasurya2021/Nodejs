import { useState } from "react";
import api from "./Api"
function useApi() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = async ({ url, method = "get", data = null }) => {
        setLoading(true)
        setError(null)
        try {
            const res = await api({
                url,
                method,
                data
            })
            return res.data

        } catch (error) {
            setError(error)
            throw error;
        }
        finally {
            setLoading(false)
        }

    }

    return { request, loading, error }
}

export default useApi;