import React, { useRef, useState } from 'react'

const SearchTracker = () => {

    const [search, setSearch] = useState("")
    const Previousref = useRef("")


    function handleclick() {
        Previousref.current = search
        console.log(Previousref.current)
        setSearch("")

    }

    return (
        <div>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={handleclick}>search</button>
            <h5> current Search: {search}</h5>
            <h5> Previous search : {Previousref.current}</h5>
            
        </div>
    )
}

export default SearchTracker
