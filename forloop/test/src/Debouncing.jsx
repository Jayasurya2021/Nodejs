import { useEffect, useState } from 'react'

function Debouncing() {

    const [search, setSearch] = useState('')
    const [debouncing, setDebouncing] = useState("")

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncing(search)
        }, 5000);

        return () => clearTimeout(timer)

    }, [search])

    useEffect(() => {
        if (debouncing) {
            console.log(`api call ${debouncing}`)
        }
    }, [debouncing])
    return (
        <div>
            <input type="text" placeholder='search' onChange={(e) => setSearch(e.target.value)} />

        </div>
    )
}

export default Debouncing
