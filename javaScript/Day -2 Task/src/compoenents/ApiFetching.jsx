import React, { useEffect, useState } from 'react'
import axios from 'axios'


const ApiFetching = () => {

    const [datas, setDatas] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://jsonplaceholder.typicode.com/users")
                setDatas(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    return (
        <>
        <h1>Fetching datas</h1>
            {datas.map((e, i) => (
                <h5 key={i}>{e.name}</h5>
            ))}
        </>
    )
}

export default ApiFetching
