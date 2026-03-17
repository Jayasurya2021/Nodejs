import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify";

function useFetch() {
    const [data, setData] = useState(null)
    const [loading, SetLoading] = useState(false)
    const [error, setError] = useState(null)


    async function fetchData(url, method = "GET", body = null) {
        try {
            SetLoading(true)
            const res = await axios({
                url: url,
                method: method,
                data: body
            })

            if (!res.data) {
                throw new Error("product not valid");
            }
            setData(res.data)
            if (res.data?.message) {
                toast.success(res.data.message)
            }
        } catch (error) {
            const errorMsg =
                err.response?.data?.message || "Something went wrong";
            setError(errorMsg)
            toast.error(errorMsg)
        } finally {
            SetLoading(false)
        }
    }

    return { fetchData, data, loading, error }

}

export default useFetch
