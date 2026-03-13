import axios from "axios"
import { useState } from "react"


function useFetch() {
    const [datas, setData] = useState([])
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
        } catch (error) {
            setError(error)
        } finally {
            SetLoading(false)
        }
    }

    return { fetchData, datas, loading, error }

}

export default useFetch
