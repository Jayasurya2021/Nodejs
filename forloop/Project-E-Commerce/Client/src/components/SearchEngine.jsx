import { useState } from "react"
import useDebouncing from "../customHooks/useDebouncing"
import useFetch from "../customHooks/useFetch"

function SearchEngine() {

    const [search, setSearch] = useState("")

    const debouncing = useDebouncing(search, 500)
    const { data, loading } = useFetch(`http://localhost:5000/searchdata?search=${debouncing}`, "GET",)
    console.log(debouncing)
    function handleChange (){
        
    }

    return (
        <div>
            <input type="text"
                value={search}
                placeholder="search..."
                onChange={(e) => {
                    handleChange();
                    setSearch(e.target.value)
                }} /><br />
            {data ? data.map((e, i) => (
                <li key={i}>{e}</li>
            )) : " "

            }
        </div>
    )
}

export default SearchEngine
