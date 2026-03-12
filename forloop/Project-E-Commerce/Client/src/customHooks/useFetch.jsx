import axios from "axios"
import { useEffect, useState } from "react"


function useFetch(url, method = "GET", body = null) {
    const [datas, setData] = useState([])
    const [loading, SetLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                SetLoading(true)
                const res = await axios(
                    url = url,
                    method = method,
                    data = body
                )
                setData(res.data)
            } catch (error) {
                setError(error)
            } finally {
                SetLoading(false)
            }
        }
        fetchData()

    }, [url])
    return { datas, loading, error }

}

export default useFetch
