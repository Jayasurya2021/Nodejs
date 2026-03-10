import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"


function SearchEngine() {

    const [search, setSearch] = useState("")
    const [debouncing, setDebouncing] = useState("")
    const [responce, setResponce] = useState([])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncing(search)
        }, 500);

        return ()=> clearTimeout(timer)
    }, [search])

    useEffect(()=>{
        const res = axios(`http://localhost:5000/searchdata?search=${debouncing}`)
        setResponce(res)
        

    },[debouncing])
    return (
        <div>
            <input type="text"
                value={search}
                placeholder="search..."
                onChange={(e) => setSearch(e.target.value)} />
                {responce.map((e, i)=>(
                    <option value="" key={i}>{e}</option>
                ))}
                
        </div>
    )
}

export default SearchEngine
