import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserDataFetch = () => {

    const [data, setData] = useState([])


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.get("https://jsonplaceholder.typicode.com/users")
                    setData(res.data)
                console.log(res.data)
            } catch (error) {
                alert(`API error : ${error}`)
                console.log(error)
            }
        }
        fetchdata()
    }, [])
    return (
        <div>   
            {data.length === 0 ? "Loading" : data.map((e) => (
                <div key={e.id} style={{ width: "150px", height: "200px", backgroundColor: "lightgreen" }}>
                    <h5 >name: {e.name}</h5>
                    <h5>email: {e.email}</h5>
                    <h5>company: {e.company.name}</h5>
                </div>
            ))}


        </div>
    )
}

export default UserDataFetch
