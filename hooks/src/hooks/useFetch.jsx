import axios from 'axios'
import React, { useEffect, useState } from 'react'

function useFetch(Url, method, req) {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const [error, setError] = useState({})

    useEffect(() => {
        async function fetchdata() {
            try {
                setLoading(true)
                const res = await axios(
                    {
                        url: Url,
                        method: method,
                        data: req
                    }
                )

                console.log(res.data)
                setData(res.data)
            } catch (error) {
                setError(error)
                console.log(error)
            } finally {
                setLoading(false)
            }

        }
        fetchdata()
    }, [])
    return { loading, data, error }
}

export default useFetch
