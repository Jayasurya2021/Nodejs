import { useState } from "react"
import { toast } from "react-toastify";
import {api} from "../Api/Api"


function useFetch() {
    const [data, setData] = useState(null)
    const [loading, SetLoading] = useState(false)
    const [error, setError] = useState(null)


    async function fetchData(url, method = "GET", body = null) {
        try {
            SetLoading(true)
            const res = await api({
                url: url,
                method: method,
                data: body
            })

            if (!res.data) {
                throw new Error("request Failed");
            }
            setData(res.data)
            if (res.data?.message) {
                toast.success(res.data.message)
            }
        } catch (error) {
            const errorMsg =
                error.response?.data?.message || "Something went wrong";
            setError(errorMsg)
            toast.error(errorMsg)
        } finally {
            SetLoading(false)
        }
    }

    return { fetchData, data, loading, error }

}

export default useFetch
