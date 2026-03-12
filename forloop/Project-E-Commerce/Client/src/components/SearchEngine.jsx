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
        <div className="relative w-full max-w-md">

  {/* Search Input */}
  <input
    type="text"
    value={search}
    placeholder="Search products..."
    onChange={(e) => {
      handleChange();
      setSearch(e.target.value);
    }}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
  />

  {/* Search Results */}
  {data && data.length > 0 && (
    <ul className="absolute w-full bg-white border border-gray-200 rounded-lg mt-2 shadow-lg max-h-60 overflow-y-auto">
      {data.map((e, i) => (
        <li
          key={i}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
        >
          {e}
        </li>
      ))}
    </ul>
  )}

</div>
    )
}

export default SearchEngine
